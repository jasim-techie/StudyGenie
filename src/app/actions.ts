// src/app/actions.ts
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput } from "@/lib/types";

// Helper to convert File to Data URI
async function fileToDataUri(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function handleGenerateStudyPlan(
  data: Omit<GenerateStudyScheduleInput, 'topicImageInputs' | 'subjects' | 'topics'> & {
    subjects: string[]; // Expecting string array from page.tsx
    topics: string[];   // Expecting string array from page.tsx
    topicsForResources: string[];
    topicImages?: FileList; // Receive FileList from form
  }
): Promise<{ schedule: GeneratedStudyScheduleOutput | null; resources: SuggestedLearningResourcesOutput | null; error?: string }> {
  try {
    let topicImageInputs: string[] | undefined = undefined;
    if (data.topicImages && data.topicImages.length > 0) {
      const imagePromises = Array.from(data.topicImages).map(file => fileToDataUri(file));
      topicImageInputs = await Promise.all(imagePromises);
    }

    const scheduleInput: GenerateStudyScheduleInput = {
      subjects: data.subjects,
      topics: data.topics,
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImageInputs,
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
