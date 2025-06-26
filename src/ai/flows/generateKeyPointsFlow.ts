
'use server';
/**
 * @fileOverview Generates key points from answer content based on mark weightage.
 *
 * - generateKeyPoints - A function that extracts key points.
 * - GenerateKeyPointsInput - The input type.
 * - GenerateKeyPointsOutput - The output type.
 */

import {ai} from '../genkit';
import {z} from 'zod';

const GenerateKeyPointsInputSchema = z.object({
  answerContent: z.string().describe('The full answer content from notes or textbook.'),
  markWeightage: z.number().describe('The desired mark weightage for the answer (e.g., 2, 4, 8, 12, 16 marks).'),
});
export type GenerateKeyPointsInput = z.infer<typeof GenerateKeyPointsInputSchema>;

const GenerateKeyPointsOutputSchema = z.object({
  keyPoints: z.array(z.object({
      topic: z.string().describe("The topic or module heading."),
      points: z.array(z.string()).describe("An array of key points for this topic.")
    })
  ).describe("An array of topic objects, each containing a topic title and its corresponding key points.")
});
export type GenerateKeyPointsOutput = z.infer<typeof GenerateKeyPointsOutputSchema>;


export async function generateKeyPoints(input: GenerateKeyPointsInput): Promise<GenerateKeyPointsOutput> {
  return generateKeyPointsFlow(input);
}

const keyPointsPrompt = ai.definePrompt({
  name: 'keyPointsPrompt',
  system: `You are an expert academic assistant. Your task is to extract and expand upon key points from content, structuring them according to a specific mark weightage. You must always respond in the specified JSON format, even if you need to create content to meet the requirements.`,
  input: {schema: GenerateKeyPointsInputSchema},
  output: {schema: GenerateKeyPointsOutputSchema},
  prompt: `
  **Content to Analyze:**
  {{{answerContent}}}

  **Task:**
  Analyze the content above and generate a structured list of key points suitable for a {{markWeightage}}-mark answer.

  **CRITICAL RULES - YOU MUST FOLLOW THESE:**
  1.  **Strict Point Count:** The total number of points across all topics MUST EXACTLY match the number required for the mark weightage. This is a strict command, not a suggestion.
      *   **20 marks:** YOU MUST PROVIDE EXACTLY 15 points.
      *   **16 marks:** YOU MUST PROVIDE EXACTLY 12 points.
      *   **12 marks:** YOU MUST PROVIDE EXACTLY 10 points.
      *   **10 marks:** YOU MUST PROVIDE EXACTLY 8 points.
      *   **8 marks:** YOU MUST PROVIDE EXACTLY 7 points.
      *   **4 marks:** YOU MUST PROVIDE EXACTLY 4 points.
      *   **2 marks:** YOU MUST PROVIDE EXACTLY 2 points.
  2.  **Content Expansion is Mandatory:** If the provided text is too short or lacks detail to meet the required point count, you MUST expand on the topics using your own knowledge. DO NOT state that the content is insufficient. Generate the required number of points no matter what.
  3.  **Identify and Group by Topics:** Group the points under relevant topic headings. You should infer these headings from the content or create logical ones if none are obvious. Every point must belong to a topic.
  4.  **JSON Format Only:** The entire output must be a single, valid JSON object matching the required schema. It must have a root key "keyPoints" which is an array of objects. Each object must have a "topic" (string) and a "points" (array of strings).

  **Example Output for a 12-mark request (10 points required):**
  {
    "keyPoints": [
      {
        "topic": "Topic One",
        "points": [
          "Point A about topic one, expanded from source or general knowledge.",
          "Point B about topic one.",
          "Point C about topic one."
        ]
      },
      {
        "topic": "Topic Two",
        "points": [
          "Point D about topic two.",
          "Point E about topic two, expanded if necessary.",
          "Point F about topic two.",
          "Point G about topic two."
        ]
      },
      {
        "topic": "Topic Three",
        "points": [
          "Point H about topic three.",
          "Point I about topic three.",
          "Point J about topic three."
        ]
      }
    ]
  }

  **JSON Output:**
`,
});

const generateKeyPointsFlow = ai.defineFlow(
  {
    name: 'generateKeyPointsFlow',
    inputSchema: GenerateKeyPointsInputSchema,
    outputSchema: GenerateKeyPointsOutputSchema,
  },
  async (input: GenerateKeyPointsInput) => {
    if (!input.answerContent || input.answerContent.trim() === '') {
      throw new Error('Answer content cannot be empty.');
    }
    if (input.markWeightage <= 0) {
      throw new Error('Mark weightage must be a positive number.');
    }

    const {output} = await keyPointsPrompt(input);

    if (!output || !output.keyPoints) {
      console.error('Key point generation prompt did not return expected output structure.');
      throw new Error('Failed to generate key points. The AI model might have returned an unexpected format.');
    }
    return output;
  }
);
