
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant learning resources based on the topics the user is studying.
 *
 * @requires genkit
 * @requires z
 *
 * @exports suggestLearningResources - An asynchronous function that takes SuggestLearningResourcesInput and returns SuggestLearningResourcesOutput.
 * @exports SuggestLearningResourcesInput - The input type for the suggestLearningResources function.
 * @exports SuggestLearningResourcesOutput - The return type for the suggestLearningResources function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SuggestLearningResourcesInputSchema = z.object({
  subject: z.string().describe('The subject of study (e.g., Mathematics, History, Biology).'),
  topics: z.array(z.string()).describe('An array of topics to find learning resources for.'),
});
export type SuggestLearningResourcesInput = z.infer<typeof SuggestLearningResourcesInputSchema>;

const SuggestLearningResourcesOutputSchema = z.object({
  resourceSuggestions: z
    .array(z.string())
    .describe('An array of suggested learning resources (e.g., URLs, book titles, etc.).'),
});
export type SuggestLearningResourcesOutput = z.infer<typeof SuggestLearningResourcesOutputSchema>;

export async function suggestLearningResources(input: SuggestLearningResourcesInput): Promise<SuggestLearningResourcesOutput> {
  return suggestLearningResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningResourcesPrompt',
  input: {schema: SuggestLearningResourcesInputSchema},
  output: {schema: SuggestLearningResourcesOutputSchema},
  prompt: `You are an AI assistant expert at finding high-quality, real-world learning resources for students.

  Given the subject: {{{subject}}}
  And the following topics: {{#each topics}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Suggest a list of 5-7 learning resources that will help the user study the material.

  **CRITICAL INSTRUCTIONS:**
  1.  **Prioritize Real URLs:** Provide real, direct URLs to videos and articles. The links should be from reputable educational sources.
  2.  **Reputable Sources:** Focus on sources like YouTube (from channels like Khan Academy, CrashCourse, Organic Chemistry Tutor, etc.), Byjus, Wikipedia, Khan Academy's website, and other well-known, trusted educational platforms.
  3.  **Mix of Content:** Include a mix of video links (e.g., from YouTube) and article/interactive links where possible.
  4.  **No Generic Books:** Do not suggest generic book titles. If you suggest a book, it must be a specific, well-known textbook for that subject.
  5.  **Format:** Format your response as a JSON array of strings, where each string is a resource (ideally a direct URL).

  Example for "Calculus" topic "Limits":
  {
    "resourceSuggestions": [
      "https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity",
      "https://www.youtube.com/watch?v=riXcZT2Jpds",
      "https://en.wikipedia.org/wiki/Limit_of_a_function",
      "https://byjus.com/maths/limits/"
    ]
  }

  JSON Output:
  `,
});

const suggestLearningResourcesFlow = ai.defineFlow(
  {
    name: 'suggestLearningResourcesFlow',
    inputSchema: SuggestLearningResourcesInputSchema,
    outputSchema: SuggestLearningResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
