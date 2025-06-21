
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
  markWeightage: z.number().describe('The desired mark weightage for the answer (e.g., 2, 4, 8, 12, 16, 20 marks).'),
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
  prompt: `You are an expert academic assistant. Your task is to extract and summarize essential key points from the provided answer content. The level of detail and number of points must be appropriate for an answer that would receive {{markWeightage}} marks.

- For low marks (e.g., 2-4), provide a few high-level, crucial points.
- For medium marks (e.g., 8-12), provide more detailed points, including key definitions and concepts.
- For high marks (e.g., 16-20), provide a comprehensive list of points. This should include main ideas, supporting details, examples, and any important sub-points. The response for a 20-mark question should be thorough and well-structured.

Present the key points as a list of strings in the 'keyPoints' field of the JSON output.

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
