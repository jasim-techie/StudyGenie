
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import { generateTopicImage, GenerateTopicImageInput } from "@/ai/flows/generate-topic-image-flow";
import { extractTextFromImage, ExtractTextFromImageInput } from "@/ai/flows/extract-text-from-image-flow";
import { generateKeyPoints as generateKeyPointsFlow, GenerateKeyPointsInput as GenerateKeyPointsFlowInput } from "@/ai/flows/generateKeyPointsFlow"; // Renamed import
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput, SubjectEntry, GenerateKeyPointsOutput } from "@/lib/types";

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

interface HandleGenerateStudyPlanData {
  subjects: SubjectEntry[];
  examDate: string;
  startDate: string;
  availableStudyHoursPerDay: number;
  supplementaryTopicImages?: FileList | null;
}

export async function handleGenerateStudyPlan(
  data: HandleGenerateStudyPlanData
): Promise<{ schedule: GeneratedStudyScheduleOutput | null; resources: SuggestedLearningResourcesOutput | null; error?: string }> {
  try {
    const subjectNames = data.subjects.map(s => s.name);
    const allTopicTexts: string[] = data.subjects.reduce((acc, s) => {
        if (s.topics && s.topics.trim() !== "") {
            acc.push(s.topics.trim());
        }
        return acc;
    }, [] as string[]);

    let supplementaryTopicImageDataUris: string[] | undefined = undefined;
    if (data.supplementaryTopicImages && data.supplementaryTopicImages.length > 0) {
      const imagePromises = Array.from(data.supplementaryTopicImages).map(file => fileToDataUri(file));
      supplementaryTopicImageDataUris = await Promise.all(imagePromises);
    }

    let topicImagesForSchedule: string[] = supplementaryTopicImageDataUris || [];

    if ((!supplementaryTopicImageDataUris || supplementaryTopicImageDataUris.length === 0) && allTopicTexts.length > 0) {
        const generatedTopicImagePromises = allTopicTexts.map(async (topicBlock) => {
            const imageGenInputText = topicBlock.length > 100 ? topicBlock.substring(0, 100) + "..." : topicBlock;
             if (imageGenInputText) {
                const imageResult = await generateTopicImage({ topicText: imageGenInputText });
                return imageResult.imageDataUri;
            }
            return null;
        });
        const generatedImages = (await Promise.all(generatedTopicImagePromises)).filter(img => img !== null) as string[];
        topicImagesForSchedule = [...topicImagesForSchedule, ...generatedImages];
    }

    const scheduleInput: GenerateStudyScheduleInput = {
      subjects: subjectNames,
      topics: allTopicTexts.length > 0 ? allTopicTexts : ["General Studies"],
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImagesForSchedule.length > 0 ? topicImagesForSchedule : undefined,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    const resourcesInput: SuggestLearningResourcesInput = {
      subject: subjectNames.join(', ') || "General Studies", 
      topics: allTopicTexts.length > 0 ? allTopicTexts : ["general knowledge"],
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
  numQuestions: number = 5
): Promise<{ quizData: CreatedQuizOutput | null; error?: string }> {
  try {
    if (!notesText || notesText.trim() === "") {
        return { quizData: null, error: "Notes text cannot be empty." };
    }
    
    const quizInput: CreateQuizFromNotesInput = { notesText, numQuestions };
    const quizData = await createQuizFromNotes(quizInput);
    return { quizData };
  } catch (error) {
    console.error("Error creating quiz:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create quiz due to an unexpected error.";
    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return { quizData: null, error: "Quiz generation failed due to API rate limits. Please try again later or with shorter notes." };
    }
    if (errorMessage.toLowerCase().includes("token count exceeds") || errorMessage.toLowerCase().includes("input token count")) {
      return { quizData: null, error: "Your notes are too long for the AI to process. Please shorten them and try again." };
    }
    return { quizData: null, error: errorMessage };
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
    console.error("Error generating key points:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate key points.";
     if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return { keyPointsData: null, error: "Key point generation failed due to API rate limits. Please try again later or with shorter content." };
    }
    if (errorMessage.toLowerCase().includes("token count exceeds") || errorMessage.toLowerCase().includes("input token count")) {
      return { keyPointsData: null, error: "Your content is too long for the AI to process. Please shorten it and try again." };
    }
    return { keyPointsData: null, error: errorMessage };
  }
}
