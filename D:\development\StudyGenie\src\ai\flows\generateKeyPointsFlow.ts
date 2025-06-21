
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
  structuredKeyPoints: z.record(z.array(z.string())).describe('A JSON object where each key is a main topic or module from the source text, and the value is an array of key points for that topic. The total number of points should align with the mark weightage.'),
});
export type GenerateKeyPointsOutput = z.infer<typeof GenerateKeyPointsOutputSchema>;

export async function generateKeyPoints(input: GenerateKeyPointsInput): Promise<GenerateKeyPointsOutput> {
  return generateKeyPointsFlow(input);
}

const keyPointsPrompt = ai.definePrompt({
  name: 'keyPointsPrompt',
  input: {schema: GenerateKeyPointsInputSchema},
  output: {schema: GenerateKeyPointsOutputSchema},
  prompt: `You are an expert academic assistant. Your task is to analyze the provided "Answer Content", identify the main topics or modules within it, and generate a structured list of key points for each topic. The total number of points generated across all topics must strictly adhere to the "Point Count Requirement" based on the specified "Mark Weightage".

**CRITICAL INSTRUCTIONS:**
1.  **Identify Topics:** First, identify the main topics, sections, or modules from the "Answer Content". These will become the keys in your output JSON object.
2.  **Point Count Requirement:** The TOTAL number of key points across all topics must be EXACTLY the number specified below for the given mark weightage.
    *   **2 marks:** Generate exactly 2 key points in total.
    *   **4 marks:** Generate exactly 4 key points in total.
    *   **8 marks:** Generate exactly 7 key points in total.
    *   **10 marks:** Generate exactly 8 key points in total.
    *   **12 marks:** Generate exactly 10 key points in total.
    *   **16 marks:** Generate exactly 12 key points in total.
    *   **20 marks:** Generate exactly 15 key points in total.
3.  **Content Augmentation:** If the provided "Answer Content" is brief or lacks sufficient detail to meet the point count required (especially for 12, 16, and 20 marks), you MUST research the topic and add supplementary, relevant information to create a complete and comprehensive answer. Do not merely state the content is insufficient. Expand upon the provided text with your own knowledge to meet the requirement.
4.  **Output Format:** The output must be a JSON object with a single key "structuredKeyPoints". The value of "structuredKeyPoints" must be another JSON object where each key is a topic name (e.g., "MODULE I CONCEPTS OF SUSTAINABLE DEVELOPMENT") and each value is an array of strings representing the key points for that topic.

**Answer Content:**
{{{answerContent}}}

**Mark Weightage:** {{markWeightage}} marks.

Generate the structured key points based on these rules.
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
    
    if (!output || !output.structuredKeyPoints) {
        console.error("Key point generation prompt did not return expected output structure.");
        throw new Error("Failed to generate key points. The AI model might have returned an unexpected format.");
    }
    return output;
  }
);
