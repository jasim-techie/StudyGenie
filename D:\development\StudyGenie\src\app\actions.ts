
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import { generateTopicImage } from "@/ai/flows/generate-topic-image-flow"; // Removed GenerateTopicImageInput as it's not used directly by other actions
import { extractTextFromImage, ExtractTextFromImageInput } from "@/ai/flows/extract-text-from-image-flow";
import { generateKeyPoints as generateKeyPointsFlow, GenerateKeyPointsInput as GenerateKeyPointsFlowInput } from "@/ai/flows/generateKeyPointsFlow";
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput, SubjectEntry, GenerateKeyPointsOutput, StudyPlanFormValues } from "@/lib/types"; // Added StudyPlanFormValues
import { extractTextFromPdf } from "@/ai/flows/extract-text-from-pdf-flow"; // Ensure this is imported if used by createQuizFromNotes

// Helper to convert File to Data URI
async function fileToDataUri(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function handleImageUploadForTopicExtraction(
  imageDataUri: string
): Promise<{ extractedText: string | null; error?: string }> {
  try {
    const input: ExtractTextFromImageInput = { imageDataUri };
    const result = await extractTextFromImage(input);
    return { extractedText: result.extractedText };
  } catch (error) {
    console.error("Error extracting text from image:", error);
    return { extractedText: null, error: error instanceof Error ? error.message : "Failed to extract text from image." };
  }
}

interface HandleGenerateStudyPlanData extends Omit<StudyPlanFormValues, 'supplementaryTopicImages' | 'examDate' | 'startDate'> {
  // Omit supplementaryTopicImages as it's removed
  // examDate and startDate will be strings here
  examDate: string;
  startDate: string;
}


export async function handleGenerateStudyPlan(
  data: HandleGenerateStudyPlanData
): Promise<{ schedule: GeneratedStudyScheduleOutput | null; resources: SuggestedLearningResourcesOutput | null; error?: string }> {
  try {
    const subjectNames = data.subjects.map(s => s.name);
    const allTopicTexts: string[] = data.subjects.reduce((acc, s) => {
        if (s.topics && s.topics.trim() !== "") {
            // Split topics by newline or comma, then trim and filter out empty strings
            const individualTopics = s.topics.split(/[\n,]+/).map(topic => topic.trim()).filter(topic => topic !== "");
            acc.push(...individualTopics);
        }
        return acc;
    }, [] as string[]);

    let topicImagesForSchedule: string[] = [];

    // Generate images for topic texts if any exist
    // This logic runs regardless of per-subject OCR uploads, for manually entered topics or as a fallback.
    if (allTopicTexts.length > 0) {
        const uniqueTopicTextsForImageGen = Array.from(new Set(allTopicTexts)); // Avoid generating images for duplicate topic strings

        const generatedTopicImagePromises = uniqueTopicTextsForImageGen.map(async (topicText) => {
            // Create a concise version for image generation prompt if topic is too long
            const imageGenInputText = topicText.length > 100 ? topicText.substring(0, 97) + "..." : topicText;
             if (imageGenInputText) {
                try {
                    const imageResult = await generateTopicImage({ topicText: imageGenInputText });
                    return imageResult.imageDataUri;
                } catch (imgErr) {
                    console.warn(`Failed to generate image for topic "${topicText}":`, imgErr);
                    return null; // Continue if one image fails
                }
            }
            return null;
        });
        const generatedImages = (await Promise.all(generatedTopicImagePromises)).filter(img => img !== null) as string[];
        topicImagesForSchedule.push(...generatedImages);
    }
    
    // Consolidate all unique topic texts for the schedule input.
    // The generateStudySchedule prompt is designed to handle a list of topics.
    const scheduleInputTopics = allTopicTexts.length > 0 ? Array.from(new Set(allTopicTexts)) : ["General Studies"];


    const scheduleInput: GenerateStudyScheduleInput = {
      subjects: subjectNames,
      topics: scheduleInputTopics, 
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImagesForSchedule.length > 0 ? topicImagesForSchedule : undefined,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    const resourcesInput: SuggestLearningResourcesInput = {
      subject: subjectNames.join(', ') || "General Studies", 
      topics: scheduleInputTopics, // Use the same consolidated list for resource suggestions
    };
    const resources = await suggestLearningResources(resourcesInput);
    
    return { schedule, resources };
  } catch (error) {
    console.error("Error generating study plan:", error);
    return { schedule: null, resources: null, error: error instanceof Error ? error.message : "Failed to generate study plan." };
  }
}

export async function handleCreateQuiz(
  notesText: string,
  numQuestions: number = 5 // Default to 5 if not provided
): Promise<{ quizData: CreatedQuizOutput | null; error?: string }> {
  try {
    if (!notesText || notesText.trim() === "") {
        return { quizData: null, error: "Notes text cannot be empty." };
    }
    
    const quizInput: CreateQuizFromNotesInput = { notesText, numQuestions };
    const quizData = await createQuizFromNotes(quizInput);
    return { quizData };
  } catch (error) {
    const typedError = error as Error;
    console.error("Error creating quiz:", typedError);
    const errorMessage = typedError.message || "Failed to create quiz due to an unexpected error.";
    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return { quizData: null, error: "Quiz generation failed due to API rate limits. Please try again later or with shorter notes." };
    }
    if (errorMessage.toLowerCase().includes("token count exceeds") || errorMessage.toLowerCase().includes("input token count") || errorMessage.toLowerCase().includes("maximum number of tokens allowed")) {
      return { quizData: null, error: "Your notes are too long for the AI to process. Please shorten them and try again." };
    }
    return { quizData: null, error: errorMessage };
  }
}

export async function handlePdfUploadForKeyPoints(
  pdfFile: File
): Promise<{ extractedText: string | null; error?: string }> {
  try {
    if (!pdfFile.type.includes("pdf")) {
      return { extractedText: null, error: "Invalid file type. Please upload a PDF." };
    }
    const pdfDataUri = await fileToDataUri(pdfFile);
    const result = await extractTextFromPdf({ pdfDataUri });
    return { extractedText: result.extractedText };
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return { extractedText: null, error: error instanceof Error ? error.message : "Failed to extract text from PDF." };
  }
}

export async function handleGenerateKeyPoints(
  answerContent: string,
  markWeightage: number
): Promise<{ keyPointsData: GenerateKeyPointsOutput | null; error?: string }> {
  try {
    if (!answerContent || answerContent.trim() === "") {
      return { keyPointsData: null, error: "Answer content cannot be empty." };
    }
    if (markWeightage <= 0) {
        return { keyPointsData: null, error: "Mark weightage must be a positive number." };
    }

    const input: GenerateKeyPointsFlowInput = { answerContent, markWeightage };
    const keyPointsData = await generateKeyPointsFlow(input);
    return { keyPointsData };
  } catch (error) {
    const typedError = error as Error;
    console.error("Error generating key points:", typedError);
    const errorMessage = typedError.message || "Failed to generate key points.";
     if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return { keyPointsData: null, error: "Key point generation failed due to API rate limits. Please try again later or with shorter content." };
    }
    if (errorMessage.toLowerCase().includes("token count exceeds") || errorMessage.toLowerCase().includes("input token count")) {
      return { keyPointsData: null, error: "Your content is too long for the AI to process. Please shorten it and try again." };
    }
    return { keyPointsData: null, error: errorMessage };
  }
}
