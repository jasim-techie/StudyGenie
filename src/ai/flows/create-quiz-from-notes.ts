
'use server';

/**
 * @fileOverview Creates a quiz from provided study notes text.
 *
 * - createQuizFromNotes - A function that generates a quiz from study notes.
 * - CreateQuizFromNotesInput - The input type for the createQuizFromNotes function (expects text).
 * - CreateQuizFromNotesOutput - The return type for the createQuizFromNotes function (quiz JSON).
 */

import {ai} from '../genkit';
import {z} from 'zod';

// Input schema for the main exported function
const CreateQuizFromNotesInputSchema = z.object({
  notesText: z.string().describe(
      "The study notes as a block of text."
    ),
  numQuestions: z.number().optional().default(5).describe('Number of questions to generate (e.g., 5 to 10).'),
});
export type CreateQuizFromNotesInput = z.infer<typeof CreateQuizFromNotesInputSchema>;


const CreateQuizFromNotesOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format. The JSON should be an object with a "title" (string) and "questions" (array of objects). Each question object should have "id" (string, e.g., "q1"), "questionText" (string), "options" (array of 4 strings), "correctAnswer" (string - one of the options), and optionally "explanation" (string).'),
});
export type CreateQuizFromNotesOutput = z.infer<typeof CreateQuizFromNotesOutputSchema>;

export async function createQuizFromNotes(input: CreateQuizFromNotesInput): Promise<CreateQuizFromNotesOutput> {
  return createQuizFromNotesFlow(input);
}

const quizGenerationPrompt = ai.definePrompt({
  name: 'quizGenerationPrompt',
  input: {schema: CreateQuizFromNotesInputSchema}, // Input schema now directly takes notesText and numQuestions
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
    // ... additional questions matching this structure (ensure {{numQuestions}} are generated)
  ]
}

Ensure the 'id' for each question is unique (e.g., "q1", "q2", ...).
Ensure the 'correctAnswer' string exactly matches one of the strings in the 'options' array.

Study Notes Text:
{{{notesText}}}

Quiz JSON:`,
  // Consider specifying a model good for structured JSON output if default struggles.
  // model: 'googleai/gemini-1.5-flash-latest', // or 'gemini-1.0-pro'
  config: {
    // Adjust safety settings if quizzes on sensitive topics are blocked
    // safetySettings: [{category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE'}]
  }
});

// Define an approximate character limit for the notes text.
// This is a safeguard, actual token limits are model-dependent.
// 3000 words is approx 3000 * 5 chars/word (avg) = 15000 chars. Let's use a slightly higher buffer.
const MAX_TEXT_LENGTH_FOR_QUIZ_INPUT = 20000; // Approx characters for 3000-4000 words.

const createQuizFromNotesFlow = ai.defineFlow(
  {
    name: 'createQuizFromNotesFlow',
    inputSchema: CreateQuizFromNotesInputSchema, 
    outputSchema: CreateQuizFromNotesOutputSchema, 
  },
  async (inputRequest: CreateQuizFromNotesInput) => {
    let notesText = inputRequest.notesText;

    if (!notesText || notesText.trim() === "") {
      console.error("Notes text is empty.");
      throw new Error("Please provide some notes to generate a quiz.");
    }
    console.log(`Notes text received. Length: ${notesText.length} characters.`);

    // Step 2: Truncate if text is too long (a simple strategy)
    // This should ideally be handled by client-side validation (word count), but good to have a server safeguard.
    if (notesText.length > MAX_TEXT_LENGTH_FOR_QUIZ_INPUT) {
      console.warn(`Notes text is very long (${notesText.length} chars), truncating to ${MAX_TEXT_LENGTH_FOR_QUIZ_INPUT} chars for quiz generation input.`);
      notesText = notesText.substring(0, MAX_TEXT_LENGTH_FOR_QUIZ_INPUT);
    }

    // Step 3: Generate quiz from the text
    console.log("Generating quiz from notes text...");
    // Pass numQuestions from inputRequest, defaulting to 5 if not provided.
    const {output} = await quizGenerationPrompt({ notesText: notesText, numQuestions: inputRequest.numQuestions || 5 }); 
    
    if (!output || !output.quiz) {
        console.error("Quiz generation prompt did not return expected output structure.");
        throw new Error("Failed to generate quiz content from the notes. The AI model might have returned an unexpected format.");
    }
    console.log("Quiz generation successful.");
    return output;
  }
);
