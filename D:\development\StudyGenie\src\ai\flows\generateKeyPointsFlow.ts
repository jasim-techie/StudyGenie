
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
  markWeightage: z.number().describe('The desired mark weightage for the answer (e.g., 2, 4, 8, 10, 12, 16, 20 marks).'),
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
  prompt: `You are an expert academic assistant. Your primary task is to generate a structured list of key points from the provided "Answer Content". The number and depth of these points must strictly adhere to the specified "Mark Weightage".

**CRITICAL INSTRUCTIONS:**
1.  **Point Count Requirement:** Generate the EXACT number of key points specified below for the given mark weightage.
    *   **2 marks:** Generate exactly 2 key points.
    *   **4 marks:** Generate exactly 4 key points.
    *   **8 marks:** Generate exactly 7 key points.
    *   **10 marks:** Generate exactly 8 key points.
    *   **12 marks:** Generate exactly 10 key points.
    *   **16 marks:** Generate exactly 12 key points.
    *   **20 marks:** Generate exactly 15 key points.
2.  **Content Augmentation:** If the provided "Answer Content" is brief or lacks sufficient detail to meet the point count and depth required for the selected "Mark Weightage" (especially for 12, 16, and 20 marks), you MUST research the topic and add supplementary, relevant information to create a complete and comprehensive answer. Do not merely state that the content is insufficient. Expand upon the provided text with your own knowledge to meet the requirement.
3.  **Output Format:** The output must be a JSON object with a single key "keyPoints", which is an array of strings.

**Answer Content:**
{{{answerContent}}}

**Mark Weightage:** {{markWeightage}} marks.

Generate the key points based on these rules.
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
