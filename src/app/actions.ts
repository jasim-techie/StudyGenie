// src/app/actions.ts
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput } from "@/lib/types";

export async function handleGenerateStudyPlan(
  data: GenerateStudyScheduleInput & { topicsForResources: string[] }
): Promise<{ schedule: GeneratedStudyScheduleOutput | null; resources: SuggestedLearningResourcesOutput | null; error?: string }> {
  try {
    const scheduleInput: GenerateStudyScheduleInput = {
      subjects: data.subjects,
      topics: data.topics,
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    const resourcesInput: SuggestLearningResourcesInput = {
      subject: data.subjects.join(', '), // Assuming subjects is an array for the flow
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
