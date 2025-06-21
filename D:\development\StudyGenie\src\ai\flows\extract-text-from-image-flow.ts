
'use server';
/**
 * @fileOverview Extracts text from an image using AI.
 *
 * - extractTextFromImage - A function that extracts text from an image.
 * - ExtractTextFromImageInput - The input type for the extractTextFromImage function.
 * - ExtractTextFromImageOutput - The return type for the extractTextFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTextFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromImageInput = z.infer<typeof ExtractTextFromImageInputSchema>;

const ExtractTextFromImageOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the image.'),
});
export type ExtractTextFromImageOutput = z.infer<typeof ExtractTextFromImageOutputSchema>;

export async function extractTextFromImage(input: ExtractTextFromImageInput): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async (input: ExtractTextFromImageInput) => {
    const {output} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: [
            {media: {url: input.imageDataUri}},
            {text: "Extract all text visible in this image. If no text is found, return an empty string. Place the result in the 'extractedText' field of the JSON output."}
        ],
        output: {
            schema: ExtractTextFromImageOutputSchema,
        },
        config: {
            // Safety settings can be adjusted if needed
            // safetySettings: [{ category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'}]
        }
    });

    const extractedText = output?.extractedText || "";

    return { extractedText: extractedText };
  }
);
