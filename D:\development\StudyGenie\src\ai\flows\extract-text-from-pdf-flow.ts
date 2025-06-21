
'use server';
/**
 * @fileOverview Extracts text from a PDF document using AI.
 *
 * - extractTextFromPdf - A function that extracts text from a PDF.
 * - ExtractTextFromPdfInput - The input type for the extractTextFromPdf function.
 * - ExtractTextFromPdfOutput - The return type for the extractTextFromPdf function (now a string).
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

// The output is now just a plain string.
export type ExtractTextFromPdfOutput = string;

export async function extractTextFromPdf(input: ExtractTextFromPdfInput): Promise<ExtractTextFromPdfOutput> {
  return extractTextFromPdfFlow(input);
}

const extractTextFromPdfFlow = ai.defineFlow(
  {
    name: 'extractTextFromPdfFlow',
    inputSchema: ExtractTextFromPdfInputSchema,
    outputSchema: z.string(), // The output schema is now just a string.
  },
  async (input: ExtractTextFromPdfInput) => {
    const {text} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', 
        prompt: [
            {media: {url: input.pdfDataUri}},
            {text: "You are an expert Optical Character Recognition (OCR) system. Extract all text from the provided document. Return only the extracted text as a single block. If no text is found, return an empty string."}
        ],
    });
    
    if (!text) {
      return "";
    }

    // Defensively parse the output. The model might return raw text or a JSON string like {"extractedText": "..."}.
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed.extractedText === 'string') {
        return parsed.extractedText;
      }
    } catch (e) {
      // If parsing fails, it's likely the plain text we wanted.
      return text;
    }
    
    // Fallback for malformed JSON or other unexpected structures.
    return text;
  }
);
