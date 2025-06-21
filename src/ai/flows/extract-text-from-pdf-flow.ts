
'use server';
/**
 * @fileOverview Extracts text from a PDF document using AI.
 *
 * - extractTextFromPdf - A function that extracts text from a PDF.
 * - ExtractTextFromPdfInput - The input type for the extractTextFromPdf function.
 * - ExtractTextFromPdfOutput - The return type for the extractTextFromPdf function.
 */

import {ai} from '../genkit';
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
        {text: "Extract all textual content from this PDF document. Prioritize extracting the main body text. Respond with only the extracted text, not in JSON format. If no text is found, return an empty string."},
      ],
    });

    let resultText = text || '';

    // A robust check in case the model *still* returns JSON despite the prompt.
    try {
      const parsedOutput = JSON.parse(resultText);
      if (parsedOutput && typeof parsedOutput.extractedText === 'string') {
        resultText = parsedOutput.extractedText;
      }
    } catch (e) {
      // Not JSON, use as is.
    }

    return {extractedText: resultText};
  }
);
