
'use server';
/**
 * @fileOverview Generates an image for a given topic text using AI.
 *
 * - generateTopicImage - A function that generates an image for a topic.
 * - GenerateTopicImageInput - The input type for the generateTopicImage function.
 * - GenerateTopicImageOutput - The return type for the generateTopicImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTopicImageInputSchema = z.object({
  topicText: z.string().describe('The text of the topic to generate an image for.'),
});
export type GenerateTopicImageInput = z.infer<typeof GenerateTopicImageInputSchema>;

const GenerateTopicImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>'."
    ),
});
export type GenerateTopicImageOutput = z.infer<typeof GenerateTopicImageOutputSchema>;

export async function generateTopicImage(input: GenerateTopicImageInput): Promise<GenerateTopicImageOutput> {
  return generateTopicImageFlow(input);
}

// This flow is defined but not directly called by the wrapper.
// The wrapper calls the prompt directly for image generation with specific model and config.
const generateTopicImageFlow = ai.defineFlow(
  {
    name: 'generateTopicImageFlow',
    inputSchema: GenerateTopicImageInputSchema,
    outputSchema: GenerateTopicImageOutputSchema,
  },
  async (input: GenerateTopicImageInput) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Specific model for image generation
      prompt: `Generate a visually appealing and relevant image representing the study topic: "${input.topicText}". The image should be simple, clear, and suitable for a study aid.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must include IMAGE
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return an image URL.');
    }
    return {imageDataUri: media.url};
  }
);
