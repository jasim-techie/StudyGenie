'use server';

/**
 * @fileOverview Creates a quiz from uploaded study notes.
 *
 * - createQuizFromNotes - A function that generates a quiz from study notes.
 * - CreateQuizFromNotesInput - The input type for the createQuizFromNotes function.
 * - CreateQuizFromNotesOutput - The return type for the createQuizFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CreateQuizFromNotesInputSchema = z.object({
  notesDataUri: z
    .string()
    .describe(
      "The study notes as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CreateQuizFromNotesInput = z.infer<typeof CreateQuizFromNotesInputSchema>;

const CreateQuizFromNotesOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format.'),
});
export type CreateQuizFromNotesOutput = z.infer<typeof CreateQuizFromNotesOutputSchema>;

export async function createQuizFromNotes(input: CreateQuizFromNotesInput): Promise<CreateQuizFromNotesOutput> {
  return createQuizFromNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createQuizFromNotesPrompt',
  input: {schema: CreateQuizFromNotesInputSchema},
  output: {schema: CreateQuizFromNotesOutputSchema},
  prompt: `You are an expert quiz maker. Please take the study notes provided and create a quiz in JSON format to test the student's knowledge of the material.\n\nStudy Notes: {{notesDataUri}}\n\nQuiz:`,
});

const createQuizFromNotesFlow = ai.defineFlow(
  {
    name: 'createQuizFromNotesFlow',
    inputSchema: CreateQuizFromNotesInputSchema,
    outputSchema: CreateQuizFromNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
