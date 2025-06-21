
'use server';
/**
 * @fileOverview Extracts text from an image using AI.
 *
 * - extractTextFromImage - A function that extracts text from an image.
 * - ExtractTextFromImageInput - The input type for the extractTextFromImage function.
 * - ExtractTextFromImageOutput - The return type for the extractTextFromImage function (now a string).
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

// The output is now just a plain string.
export type ExtractTextFromImageOutput = string;

export async function extractTextFromImage(input: ExtractTextFromImageInput): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: z.string(), // The output schema is now just a string.
  },
  async (input: ExtractTextFromImageInput) => {
    const {text} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: [
            {media: {url: input.imageDataUri}},
            {text: "You are an expert Optical Character Recognition (OCR) system. Extract all text from the provided image. Return only the extracted text as a single block. If no text is found, return an empty string."}
        ],
    });

    if (!text) {
      return "";
    }

    // Defensively parse the output. The model might return raw text or a JSON string.
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed.extractedText === 'string') {
        return parsed.extractedText;
      }
    } catch (e) {
      // It's not a JSON string, so it's likely the plain text we wanted.
      return text;
    }
    
    // Fallback for malformed JSON or other unexpected structures.
    return text;
  }
);
