
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
    const {text} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', 
        prompt: [
            {media: {url: input.pdfDataUri}}, // Pass the PDF data URI as media
            {text: "Extract all textual content from this PDF document. Prioritize extracting the main body text. Return only the extracted text. If no text is found, return an empty string."}
        ],
        output: { // Requesting structured output might not be necessary if we just want raw text
             schema: ExtractTextFromPdfOutputSchema, 
        },
        config: {
            // Optional: Adjust safety settings if needed
            // safetySettings: [{ category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'}]
        }
    });
    
    // The 'text' field from the ai.generate response should contain the extracted text if the model processes it directly.
    // If the output schema forces a structured response, 'text' might be part of an object.
    // For simplicity, we'll assume 'text' contains the direct extraction or the model adheres to the schema implicitly.
    // If the model returns a structured JSON like { "extractedText": "..." } in the `text` field due to schema hinting,
    // we might need to parse it. However, usually for direct text extraction, the `text` field of the response is sufficient.
    // Let's assume the model provides the text directly or the schema helps structure it such that `text` is the core content.
    let resultText = text || "";

    // Check if the response itself is a JSON string that needs parsing (if schema isn't auto-applied to response structure)
    try {
      const parsedOutput = ExtractTextFromPdfOutputSchema.parse(JSON.parse(resultText));
      resultText = parsedOutput.extractedText;
    } catch (e) {
      // Not a JSON string, or doesn't match schema, assume resultText is already the extracted text
    }


    return { extractedText: resultText };
  }
);

