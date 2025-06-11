
// src/app/actions.ts
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import { generateTopicImage } from "@/ai/flows/generate-topic-image-flow"; // New import
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput } from "@/lib/types";

// Helper to convert File to Data URI
async function fileToDataUri(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function handleGenerateStudyPlan(
  data: Omit<GenerateStudyScheduleInput, 'topicImageInputs' | 'subjects' | 'topics'> & {
    subjects: string[];
    topics: string[];
    topicsForResources: string[];
    topicImages?: FileList;
  }
): Promise<{ schedule: GeneratedStudyScheduleOutput | null; resources: SuggestedLearningResourcesOutput | null; error?: string }> {
  try {
    let topicImageInputsForSchedule: string[] | undefined = undefined;

    if (data.topicImages && data.topicImages.length > 0) {
      // User uploaded images, use them
      const imagePromises = Array.from(data.topicImages).map(file => fileToDataUri(file));
      topicImageInputsForSchedule = await Promise.all(imagePromises);
    } else if (data.topics && data.topics.length > 0) {
      // No images uploaded by user, try to generate them for each topic
      // Note: Toast notifications should be handled client-side before calling this action.
      console.log("Attempting to generate topic images as none were uploaded.");
      const generatedImagePromises = data.topics.map(async (topic) => {
        try {
          const result = await generateTopicImage({ topicText: topic });
          return result.imageDataUri;
        } catch (genError) {
          console.warn(`Failed to generate image for topic "${topic}":`, genError instanceof Error ? genError.message : String(genError));
          return null; // Return null if image generation fails for a topic
        }
      });
      const generatedImages = (await Promise.all(generatedImagePromises)).filter(img => img !== null) as string[];
      if (generatedImages.length > 0) {
        topicImageInputsForSchedule = generatedImages;
        console.log(`Successfully generated ${generatedImages.length} topic images.`);
      } else {
        console.log("No topic images were generated or all generations failed.");
      }
    }

    const scheduleInput: GenerateStudyScheduleInput = {
      subjects: data.subjects,
      topics: data.topics,
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImageInputsForSchedule,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    const resourcesInput: SuggestLearningResourcesInput = {
      subject: data.subjects.join(', '), 
      topics: data.topicsForResources,
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
