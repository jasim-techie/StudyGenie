
'use server';
/**
 * @fileOverview Extracts text from an image using AI.
 *
 * - extractTextFromImage - A function that extracts text from an image.
 * - ExtractTextFromImageInput - The input type for the extractTextFromImage function.
 * - ExtractTextFromImageOutput - The return type for the extractTextFromImage function.
 */

import {ai} from '../genkit';
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
    const {text} = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: [
        {media: {url: input.imageDataUri}},
        {text: "Extract all text visible in this image. Respond with only the extracted text, not in JSON format. If no text is found, return an empty string."},
      ],
      config: {
        responseModalities: ['TEXT'],
      },
    });

    let resultText = text || '';

    // A robust check in case the model *still* returns JSON despite the prompt.
    try {
      // Try to parse it as JSON.
      const parsedOutput = JSON.parse(resultText);
      // If successful, and it has our expected key, use that value.
      if (parsedOutput && typeof parsedOutput.extractedText === 'string') {
        resultText = parsedOutput.extractedText;
      }
    } catch (e) {
      // It's not a JSON string, so we can use it as is.
    }

    return {extractedText: resultText};
  }
);
