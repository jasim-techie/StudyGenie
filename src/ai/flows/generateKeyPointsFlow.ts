
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
  keyPointsByTopic: z.record(z.array(z.string())).describe('An object where each key is a topic or module heading, and the value is an array of key points for that topic.'),
});
export type GenerateKeyPointsOutput = z.infer<typeof GenerateKeyPointsOutputSchema>;

export async function generateKeyPoints(input: GenerateKeyPointsInput): Promise<GenerateKeyPointsOutput> {
  return generateKeyPointsFlow(input);
}

const keyPointsPrompt = ai.definePrompt({
  name: 'keyPointsPrompt',
  input: {schema: GenerateKeyPointsInputSchema},
  output: {schema: GenerateKeyPointsOutputSchema},
  prompt: `You are an expert academic assistant. Your task is to extract essential key points from the provided content, structured by topic.

  **Instructions:**
  1.  **Identify Main Topics:** First, analyze the provided content and identify the main sections or topics. These are often indicated by headings like "MODULE I", "Introduction", or other clear titles.
  2.  **Generate Points per Topic:** For each topic you identify, generate a list of key points.
  3.  **Adhere to Mark Weightage:** The number and detail of the points must strictly follow this structure based on the user's requested mark weightage:
      *   **20 marks:** Exactly 15 comprehensive key points in total, distributed logically across the topics.
      *   **16 marks:** Exactly 12 detailed key points.
      *   **12 marks:** Exactly 10 key points.
      *   **10 marks:** Exactly 8 key points.
      *   **8 marks:** Exactly 7 key points.
      *   **4 marks:** Exactly 4 key points.
      *   **2 marks:** Exactly 2 concise key points.
  4.  **Expand if Necessary:** If the provided content is too brief for the requested mark weightage, you MUST expand on the topics using your own knowledge to meet the required number of points. For example, if asked for a 20-mark answer (15 points) but the text is short, add relevant details, examples, or explanations to create a comprehensive answer.
  5.  **Format Output as JSON:** Structure the entire output as a single JSON object. The keys of the object should be the topic headings you identified. The value for each key should be an array of strings, where each string is a key point.

  **Example Output for a 12-mark request:**
  {
    "MODULE I: CONCEPTS OF SUSTAINABLE DEVELOPMENT": [
      "Sustainable Development aims to meet present needs without compromising the ability of future generations to meet their own.",
      "Key linkages exist between environment and development, where environmental degradation can hamper economic progress.",
      "Globalization introduces complex environmental challenges, including trans-boundary pollution and resource depletion.",
      "Issues like population growth, poverty, and pollution are interconnected drivers of environmental stress."
    ],
    "MODULE II: SOCIO-ECONOMIC SYSTEMS": [
      "Demographic dynamics, including population age structure and distribution, are crucial for sustainability planning.",
      "Policies for sustainable development must integrate economic goals with social equity and environmental protection.",
      "International trade can be a vehicle for sustainable development if managed with fair trade practices and environmental standards.",
      "Sustainable agriculture and energy systems are fundamental pillars for long-term socio-economic stability."
    ],
    "MODULE III: FRAMEWORK FOR SUSTAINABILITY": [
       "Sustainability indicators (e.g., Ecological Footprint) are essential tools for measuring progress towards sustainability goals.",
       "Hurdles to sustainability include political inertia, lack of public awareness, and technological limitations."
    ]
  }

  **Content to Analyze:**
  {{{answerContent}}}

  **JSON Output for a {{markWeightage}}-mark answer:**
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

    if (!output || !output.keyPointsByTopic) {
      console.error('Key point generation prompt did not return expected output structure.');
      throw new Error('Failed to generate key points. The AI model might have returned an unexpected format.');
    }
    return output;
  }
);
