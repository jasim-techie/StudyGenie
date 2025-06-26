
'use server';
/**
 * @fileOverview Extracts and formats topics from a cropped image area using AI.
 *
 * - extractTextFromImage - A function that extracts and formats topics from an image.
 * - ExtractTextFromImageInput - The input type for the function.
 * - ExtractTextFromImageOutput - The return type for the function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const ExtractTextFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The cropped image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromImageInput = z.infer<typeof ExtractTextFromImageInputSchema>;

const ExtractTextFromImageOutputSchema = z.object({
  commaSeparatedTopics: z.string().describe('The extracted topics as a single, comma-separated string (e.g., "Topic A, Topic B").'),
  newLineSeparatedTopics: z.string().describe('The extracted topics as a single string, with each topic on a new line.'),
  rawText: z.string().describe('The raw, unprocessed text extracted directly from the image before formatting.'),
});
export type ExtractTextFromImageOutput = z.infer<typeof ExtractTextFromImageOutputSchema>;

export async function extractTextFromImage(input: ExtractTextFromImageInput): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const prompt = ai.definePrompt({
    name: 'extractAndFormatTopicsPrompt',
    input: { schema: ExtractTextFromImageInputSchema },
    output: { schema: ExtractTextFromImageOutputSchema },
    prompt: `You are an intelligent text processing assistant. Your task is to extract text from an image and format it into a list of study topics.

Image for analysis:
{{media url=imageDataUri}}

Instructions:
1. Extract all visible text from the image. This is the 'rawText'.
2. From the extracted text, identify distinct study topics or sub-topics.
3. Split the topics based on the following delimiters: commas (",") and dashes ("-"). Treat each part as a separate topic. For example, "Algebra - Trigonometry" becomes two topics: "Algebra" and "Trigonometry".
4. Clean up each identified topic by trimming leading/trailing whitespace.
5. Format the final list of cleaned topics in two ways for the output JSON:
   - 'commaSeparatedTopics': A single string with all topics separated by a comma and a space.
   - 'newLineSeparatedTopics': A single string with each topic on a new line (using "\\n").
6. If no text is found, return empty strings for all fields.

Example of processing the text "Physics - Mechanics, Electromagnetism":
{
  "commaSeparatedTopics": "Physics, Mechanics, Electromagnetism",
  "newLineSeparatedTopics": "Physics\\nMechanics\\nElectromagnetism",
  "rawText": "Physics - Mechanics, Electromagnetism"
}

Respond ONLY with the valid JSON object that strictly adheres to the output schema.
`
});


const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async (input: ExtractTextFromImageInput) => {
    const { output } = await prompt(input);

    if (!output) {
        throw new Error("AI failed to return a valid response for topic extraction.");
    }
    
    return output;
  }
);
