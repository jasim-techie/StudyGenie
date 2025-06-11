
// src/app/actions.ts
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import { generateTopicImage } from "@/ai/flows/generate-topic-image-flow";
import { extractTextFromImage, ExtractTextFromImageInput } from "@/ai/flows/extract-text-from-image-flow"; // New import
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput } from "@/lib/types";

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

export async function handleGenerateStudyPlan(
  data: Omit<GenerateStudyScheduleInput, 'topicImageInputs' | 'subjects' | 'topics'> & {
    subjects: string[];
    topics: string; // Topics can now be a block of text from OCR or comma-separated
    topicsForResources: string[]; // This should ideally be derived from the final topics
    topicImages?: FileList; // Supplementary images for topics
  }
): Promise<{ schedule: GeneratedStudyScheduleOutput | null; resources: SuggestedLearningResourcesOutput | null; error?: string }> {
  try {
    let topicImageInputsForSchedule: string[] | undefined = undefined;
    const topicsArray = data.topics.split(',').map(t => t.trim()).filter(t => t); // Attempt to split if comma-separated for image gen

    if (data.topicImages && data.topicImages.length > 0) {
      const imagePromises = Array.from(data.topicImages).map(file => fileToDataUri(file));
      topicImageInputsForSchedule = await Promise.all(imagePromises);
    } else if (topicsArray.length > 0) { // Use split topics for generating individual images
      console.log("Attempting to generate topic images as none were uploaded.");
      const generatedImagePromises = topicsArray.map(async (topic) => {
        try {
          const result = await generateTopicImage({ topicText: topic });
          return result.imageDataUri;
        } catch (genError) {
          console.warn(`Failed to generate image for topic "${topic}":`, genError instanceof Error ? genError.message : String(genError));
          return null;
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
      // Pass the topics string directly. The AI flow for schedule generation will handle it.
      // If it's a block of text from OCR, the AI needs to interpret it.
      // If it's comma-separated, it will work as before.
      topics: [data.topics], // Send as an array with one element (the block of text or comma-separated list)
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImageInputsForSchedule,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    // For resources, use the topicsArray derived from splitting, or a more sophisticated method if topics is a block
    // For simplicity, if data.topics is a large block, topicsForResources might need separate handling or use the same block
    const resourcesInput: SuggestLearningResourcesInput = {
      subject: data.subjects.join(', '), 
      topics: data.topicsForResources.length > 0 ? data.topicsForResources : topicsArray, // Fallback to topicsArray
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
