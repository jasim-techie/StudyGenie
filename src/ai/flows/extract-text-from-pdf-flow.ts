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
    const {text} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', 
        prompt: [
            {media: {url: input.pdfDataUri}}, 
            {text: "Extract all textual content from this PDF document. Prioritize extracting the main body text. Return only the extracted text. If no text is found, return an empty string."}
        ],
        output: { 
             schema: ExtractTextFromPdfOutputSchema, 
        },
        config: {}
    });
    
    let resultText = text || "";
    try {
      const parsedOutput = ExtractTextFromPdfOutputSchema.parse(JSON.parse(resultText));
      resultText = parsedOutput.extractedText;
    } catch (e) {
      // Not a JSON string, or doesn't match schema, assume resultText is already the extracted text
    }
    return { extractedText: resultText };
  }
);
