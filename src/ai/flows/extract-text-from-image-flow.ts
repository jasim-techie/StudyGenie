
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

const prompt = ai.definePrompt({
  name: 'extractTextFromImagePrompt',
  input: {schema: ExtractTextFromImageInputSchema},
  output: {schema: ExtractTextFromImageOutputSchema},
  model: 'googleai/gemini-2.0-flash-exp', // Ensure this model supports multimodal input for OCR
  prompt: `{{media url=imageDataUri}} Extract all text visible in this image. Return only the extracted text as a single block. If no text is found, return an empty string.`,
  config: {
    responseModalities: ['TEXT'], // We only need text output
  }
});

const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async (input: ExtractTextFromImageInput) => {
    // Using ai.generate directly for multimodal input as per new guidelines
    const {text} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // Or gemini-1.5-flash-latest
        prompt: [
            {media: {url: input.imageDataUri}},
            {text: "Extract all text visible in this image. Return only the extracted text as a single block. If no text is found, return an empty string."}
        ],
        output: {
            schema: ExtractTextFromImageOutputSchema,
        },
        config: {
            // Safety settings can be adjusted if needed
            // safetySettings: [{ category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'}]
        }
    });
    // The model should directly return the structured output if 'output.schema' is provided to ai.generate
    // However, if it returns a simple string in `text`, and we expect a structured output,
    // we might need to parse it or adjust the prompt to ensure JSON output if the schema isn't auto-applied.
    // For simple text extraction, `text` should suffice.
    // Assuming the model respects the output schema or the text itself is the extractedText
    
    // If the output from ai.generate with schema is directly the object:
    // const result = await ai.generate(...); return result.output();
    // If it's plain text:
    return { extractedText: text || "" };
  }
);
