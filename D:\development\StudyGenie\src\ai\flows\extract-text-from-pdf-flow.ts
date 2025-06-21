
'use server';
/**
 * @fileOverview Extracts text from a PDF document using AI.
 *
 * - extractTextFromPdf - A function that extracts text from a PDF.
 * - ExtractTextFromPdfInput - The input type for the extractTextFromPdf function.
 * - ExtractTextFromPdfOutput - The return type for the extractTextFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTextFromPdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The PDF document as a data URI that must include a MIME type (application/pdf) and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromPdfInput = z.infer<typeof ExtractTextFromPdfInputSchema>;

const ExtractTextFromPdfOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the PDF document.'),
});
export type ExtractTextFromPdfOutput = z.infer<typeof ExtractTextFromPdfOutputSchema>;

export async function extractTextFromPdf(input: ExtractTextFromPdfInput): Promise<ExtractTextFromPdfOutput> {
  return extractTextFromPdfFlow(input);
}

const extractTextFromPdfFlow = ai.defineFlow(
  {
    name: 'extractTextFromPdfFlow',
    inputSchema: ExtractTextFromPdfInputSchema,
    outputSchema: ExtractTextFromPdfOutputSchema,
  },
  async (input: ExtractTextFromPdfInput) => {
    // Use ai.generate for potentially better handling of multimodal inputs like PDF data URIs.
    // Gemini 1.5 Flash is generally good for document understanding.
    const {output} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', 
        prompt: [
            {media: {url: input.pdfDataUri}}, // Pass the PDF data URI as media
            {text: "Extract all textual content from this PDF document. Prioritize extracting the main body text. If no text is found, return an empty string. Place the result in the 'extractedText' field of the JSON output."}
        ],
        output: {
             schema: ExtractTextFromPdfOutputSchema, 
        },
        config: {
            // Optional: Adjust safety settings if needed
            // safetySettings: [{ category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'}]
        }
    });
    
    // The 'output' field from ai.generate contains the structured data.
    // If output is null or extractedText is missing, return an empty string.
    const extractedText = output?.extractedText || "";

    return { extractedText };
  }
);
