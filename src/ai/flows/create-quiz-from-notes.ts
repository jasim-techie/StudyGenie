
'use server';

/**
 * @fileOverview Creates a quiz from extracted study notes text.
 *
 * - createQuizFromNotes - A function that generates a quiz from study notes.
 * - CreateQuizFromNotesInput - The input type for the createQuizFromNotes function (expects PDF URI).
 * - CreateQuizFromNotesOutput - The return type for the createQuizFromNotes function (quiz JSON).
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { extractTextFromPdf } from './extract-text-from-pdf-flow';
import type { ExtractTextFromPdfInput } from './extract-text-from-pdf-flow';


// Input schema for the main exported function (still takes PDF URI)
const CreateQuizFromNotesInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The study notes as a PDF data URI. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type CreateQuizFromNotesInput = z.infer<typeof CreateQuizFromNotesInputSchema>;

// Schema for the prompt that generates the quiz (takes extracted text)
const QuizGenerationPromptInputSchema = z.object({
  extractedNotesText: z.string().describe('The text extracted from the study notes.'),
  numQuestions: z.number().optional().default(5).describe('Number of questions to generate.'),
});

const CreateQuizFromNotesOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format. The JSON should be an object with a "title" (string) and "questions" (array of objects). Each question object should have "id" (string, e.g., "q1"), "questionText" (string), "options" (array of 4 strings), "correctAnswer" (string - one of the options), and optionally "explanation" (string).'),
});
export type CreateQuizFromNotesOutput = z.infer<typeof CreateQuizFromNotesOutputSchema>;

export async function createQuizFromNotes(input: CreateQuizFromNotesInput): Promise<CreateQuizFromNotesOutput> {
  return createQuizFromNotesFlow(input);
}

const quizGenerationPrompt = ai.definePrompt({
  name: 'quizGenerationPrompt',
  input: {schema: QuizGenerationPromptInputSchema},
  output: {schema: CreateQuizFromNotesOutputSchema},
  prompt: `You are an expert quiz maker.
Based on the following study notes text, create a quiz with {{numQuestions}} multiple-choice questions.
Each question must have exactly 4 distinct options.
One option must be the correct answer.
If possible, provide a brief explanation for why the correct answer is correct.

Format the entire output as a single, valid JSON object that strictly adheres to the following structure:
{
  "title": "Quiz based on Your Notes",
  "questions": [
    {
      "id": "q1",
      "questionText": "Sample question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option C",
      "explanation": "This is why Option C is the correct answer."
    }
    // ... additional questions matching this structure
  ]
}

Ensure the 'id' for each question is unique (e.g., "q1", "q2", ...).
Ensure the 'correctAnswer' string exactly matches one of the strings in the 'options' array.

Study Notes Text:
{{{extractedNotesText}}}

Quiz JSON:`,
  // Consider specifying a model good for structured JSON output if default struggles.
  // model: 'googleai/gemini-1.5-flash-latest', // or 'gemini-1.0-pro'
  config: {
    // Adjust safety settings if quizzes on sensitive topics are blocked
    // safetySettings: [{category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE'}]
  }
});

// Define an approximate character limit. ~4 chars/token. Gemini 1.5 Flash has a large context window,
// but the quiz prompt itself adds tokens. This is a safeguard.
const MAX_TEXT_LENGTH_FOR_QUIZ_INPUT = 300000; // Approx 75k tokens for text.

const createQuizFromNotesFlow = ai.defineFlow(
  {
    name: 'createQuizFromNotesFlow',
    inputSchema: CreateQuizFromNotesInputSchema, // Takes PDF URI
    outputSchema: CreateQuizFromNotesOutputSchema, // Outputs Quiz JSON
  },
  async (inputRequest: CreateQuizFromNotesInput) => {
    // Step 1: Extract text from the PDF
    console.log("Starting PDF text extraction...");
    const extractionInput: ExtractTextFromPdfInput = { pdfDataUri: inputRequest.pdfDataUri };
    const extractionResult = await extractTextFromPdf(extractionInput);
    let notesText = extractionResult.extractedText;

    if (!notesText || notesText.trim() === "") {
      console.error("PDF text extraction returned empty.");
      throw new Error("Could not extract any text from the provided PDF. Please ensure it's a valid, text-based PDF.");
    }
    console.log(`PDF text extracted. Length: ${notesText.length} characters.`);

    // Step 2: Truncate if text is too long (a simple strategy, chunking would be more advanced)
    if (notesText.length > MAX_TEXT_LENGTH_FOR_QUIZ_INPUT) {
      console.warn(`Extracted text is very long (${notesText.length} chars), truncating to ${MAX_TEXT_LENGTH_FOR_QUIZ_INPUT} chars for quiz generation input.`);
      notesText = notesText.substring(0, MAX_TEXT_LENGTH_FOR_QUIZ_INPUT);
    }

    // Step 3: Generate quiz from the extracted (and possibly truncated) text
    console.log("Generating quiz from extracted text...");
    const {output} = await quizGenerationPrompt({ extractedNotesText: notesText, numQuestions: 5 }); // Defaulting to 5 questions
    
    if (!output || !output.quiz) {
        console.error("Quiz generation prompt did not return expected output structure.");
        throw new Error("Failed to generate quiz content from the extracted text. The AI model might have returned an unexpected format.");
    }
    console.log("Quiz generation successful.");
    return output;
  }
);

