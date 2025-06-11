
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import { generateTopicImage, GenerateTopicImageInput } from "@/ai/flows/generate-topic-image-flow";
import { extractTextFromImage, ExtractTextFromImageInput } from "@/ai/flows/extract-text-from-image-flow";
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput, SubjectEntry } from "@/lib/types";

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
    // Consolidate all topics from all subjects. Each s.topics is expected to be a string of comma/newline separated topics.
    // Or it could be a block of text from OCR. The AI will need to parse distinct topics.
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

    // Generate images for topics if no supplementary images are provided AND topics exist
    if ((!supplementaryTopicImageDataUris || supplementaryTopicImageDataUris.length === 0) && allTopicTexts.length > 0) {
        // For image generation, we might want to pick representative keywords from topic texts.
        // Here, we'll take the first few words of each topic block if it's long.
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
      topics: allTopicTexts.length > 0 ? allTopicTexts : ["General Studies"], // Send combined topic texts or a default
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImagesForSchedule.length > 0 ? topicImagesForSchedule : undefined,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    // For resources, also use the combined topic texts.
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
  numQuestions: number = 5 // Default to 5 questions, can be made configurable
): Promise<{ quizData: CreatedQuizOutput | null; error?: string }> {
  try {
    if (!notesText || notesText.trim() === "") {
        return { quizData: null, error: "Notes text cannot be empty." };
    }
    // Potentially add a server-side length check here too, though client-side word count is primary.
    
    const quizInput: CreateQuizFromNotesInput = { notesText, numQuestions };
    const quizData = await createQuizFromNotes(quizInput);
    return { quizData };
  } catch (error) {
    console.error("Error creating quiz:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create quiz due to an unexpected error.";
    // More specific error check for rate limits, if possible by inspecting `error`
    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return { quizData: null, error: "Quiz generation failed due to API rate limits. Please try again later or with shorter notes." };
    }
    if (errorMessage.toLowerCase().includes("token count exceeds")) {
      return { quizData: null, error: "Your notes are too long for the AI to process. Please shorten them and try again." };
    }
    return { quizData: null, error: errorMessage };
  }
}
