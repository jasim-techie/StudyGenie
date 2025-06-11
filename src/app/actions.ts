
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
    const allTopics = data.subjects.map(s => s.topics).filter(t => t && t.trim() !== "");

    let supplementaryTopicImageDataUris: string[] | undefined = undefined;
    if (data.supplementaryTopicImages && data.supplementaryTopicImages.length > 0) {
      const imagePromises = Array.from(data.supplementaryTopicImages).map(file => fileToDataUri(file));
      supplementaryTopicImageDataUris = await Promise.all(imagePromises);
    }

    let topicImagesForSchedule: string[] = supplementaryTopicImageDataUris || [];

    // Generate images for topics if no supplementary images are provided AND topics exist
    if (!supplementaryTopicImageDataUris || supplementaryTopicImageDataUris.length === 0) {
        const generatedTopicImagePromises = allTopics.filter(topicBlock => topicBlock && topicBlock.trim() !== "").map(async (topicBlock) => {
            // Consider taking the first few words or a summary of the topicBlock for image generation if it's too long
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
      topics: allTopics.length > 0 ? allTopics : ["General Studies"],
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImagesForSchedule.length > 0 ? topicImagesForSchedule : undefined,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    const resourcesInput: SuggestLearningResourcesInput = {
      subject: subjectNames.join(', ') || "General Studies", 
      topics: allTopics.length > 0 ? allTopics : ["general knowledge"],
    };
    const resources = await suggestLearningResources(resourcesInput);
    
    return { schedule, resources };
  } catch (error) {
    console.error("Error generating study plan:", error);
    return { schedule: null, resources: null, error: error instanceof Error ? error.message : "Failed to generate study plan." };
  }
}

export async function handleCreateQuiz(
  notesDataUri: string
): Promise<{ quizData: CreatedQuizOutput | null; error?: string }> {
  try {
    const quizInput: CreateQuizFromNotesInput = { notesDataUri };
    const quizData = await createQuizFromNotes(quizInput);
    return { quizData };
  } catch (error) {
    console.error("Error creating quiz:", error);
    return { quizData: null, error: error instanceof Error ? error.message : "Failed to create quiz." };
  }
}
