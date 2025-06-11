
'use server';
/**
 * @fileOverview Generates key points from answer content based on mark weightage.
 *
 * - generateKeyPoints - A function that extracts key points.
 * - GenerateKeyPointsInput - The input type.
 * - GenerateKeyPointsOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateKeyPointsInputSchema = z.object({
  answerContent: z.string().describe('The full answer content from notes or textbook.'),
  markWeightage: z.number().describe('The desired mark weightage for the answer (e.g., 2, 4, 8, 12, 16 marks).'),
});
export type GenerateKeyPointsInput = z.infer<typeof GenerateKeyPointsInputSchema>;

const GenerateKeyPointsOutputSchema = z.object({
  keyPoints: z.array(z.string()).describe('An array of essential key points extracted from the content, tailored to the mark weightage.'),
});
export type GenerateKeyPointsOutput = z.infer<typeof GenerateKeyPointsOutputSchema>;

export async function generateKeyPoints(input: GenerateKeyPointsInput): Promise<GenerateKeyPointsOutput> {
  return generateKeyPointsFlow(input);
}

const keyPointsPrompt = ai.definePrompt({
  name: 'keyPointsPrompt',
  input: {schema: GenerateKeyPointsInputSchema},
  output: {schema: GenerateKeyPointsOutputSchema},
  prompt: `You are an expert academic assistant. Your task is to extract essential key points from the provided answer content.
The detail and number of key points should be appropriate for an answer that would receive {{markWeightage}} marks.
Focus on the most crucial information needed to fully answer a question of that weightage. Present the key points as a list.

Answer Content:
{{{answerContent}}}

Key Points for a {{markWeightage}}-mark answer:
`,
});

const generateKeyPointsFlow = ai.defineFlow(
  {
    name: 'generateKeyPointsFlow',
    inputSchema: GenerateKeyPointsInputSchema,
    outputSchema: GenerateKeyPointsOutputSchema,
  },
  async (input: GenerateKeyPointsInput) => {
    if (!input.answerContent || input.answerContent.trim() === "") {
      throw new Error("Answer content cannot be empty.");
    }
    if (input.markWeightage <= 0) {
      throw new Error("Mark weightage must be a positive number.");
    }

    const {output} = await keyPointsPrompt(input);
    
    if (!output || !output.keyPoints) {
        console.error("Key point generation prompt did not return expected output structure.");
        throw new Error("Failed to generate key points. The AI model might have returned an unexpected format.");
    }
    return output;
  }
);
