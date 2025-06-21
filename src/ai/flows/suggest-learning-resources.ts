
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
  prompt: `You are an AI assistant designed to suggest learning resources for students.

  Given the subject: {{{subject}}}
  And the following topics: {{#each topics}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Suggest a list of learning resources, that will help the user study the material.
  These learning resources can be links to websites, specific books, or other study materials.
  Format your response as a JSON array of strings.
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
