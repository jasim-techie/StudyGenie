
// src/ai/flows/generate-study-schedule.ts
'use server';

/**
 * @fileOverview Generates a personalized study timetable using AI, potentially including image-based topics.
 *
 * - generateStudySchedule - A function that generates the study schedule.
 * - GenerateStudyScheduleInput - The input type for the generateStudySchedule function.
 * - GenerateStudyScheduleOutput - The return type for the generateStudySchedule function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateStudyScheduleInputSchema = z.object({
  subjects: z
    .array(z.string())
    .describe('List of subjects to study, e.g., Mathematics, Physics, Chemistry.'),
  topics: z
    .array(z.string()) 
    .describe('A list of all topics across all subjects. The AI should identify distinct study topics from this input and distribute them appropriately.'),
  topicImageInputs: z.array(z.string().url()).optional().describe('Optional array of AI-generated or supplementary topic images as data URIs, providing visual context for specific topics.'),
  examDate: z.string().describe('The date of the exam, e.g., 2024-12-31.'),
  startDate: z.string().describe('The date to start studying, e.g., 2024-10-01.'),
  availableStudyHoursPerDay: z
    .number()
    .describe('The number of hours available to study each day, e.g., 3.'),
});
export type GenerateStudyScheduleInput = z.infer<typeof GenerateStudyScheduleInputSchema>;

const GenerateStudyScheduleOutputSchema = z.object({
  timetable: z
    .array(z.object({
      date: z.string().describe('The date for this study session, e.g., 2024-10-01.'),
      topics: z
        .array(z.string())
        .describe('List of topics to study on this date, e.g., [Algebra, Functions]. These topics should be drawn from the overall list provided in the input.'),
    }))
    .describe('A list of study sessions, each containing a date and a list of topics to study on that date.'),
  summary: z.string().describe('A summary of the study plan, including time allocation per subject. e.g., "Mathematics: 40%, Physics: 30%, Chemistry: 30%" or "Mathematics: 20 hours, Physics: 15 hours, Chemistry: 15 hours"'),
});
export type GenerateStudyScheduleOutput = z.infer<typeof GenerateStudyScheduleOutputSchema>;

export async function generateStudySchedule(input: GenerateStudyScheduleInput): Promise<GenerateStudyScheduleOutput> {
  return generateStudyScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudySchedulePrompt',
  input: {schema: GenerateStudyScheduleInputSchema},
  output: {schema: GenerateStudyScheduleOutputSchema},
  prompt: `You are an expert study timetable generator. Given the following information, create a study timetable.

Subjects: {{#each subjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Topics to cover (these are from all subjects combined, distribute them logically): 
{{#each topics}}
- {{{this}}}
{{/each}}

{{#if topicImageInputs}}
Here are some visual aids or symbolic images related to the topics. Use them for inspiration or context if helpful, but do not attempt to display them directly in the JSON output.
{{#each topicImageInputs}}
{{media url=this}}
{{/each}}
{{/if}}

Exam Date: {{examDate}}
Start Date: {{startDate}}
Available Study Hours Per Day: {{availableStudyHoursPerDay}}

Analyze the subjects and the provided list of topics.
Create a daily timetable that splits these topics across the available days, starting from the 'Start Date' and leading up to the 'Exam Date'.
Consider the number of subjects and the total topics to allocate them reasonably within the 'Available Study Hours Per Day'.
For the 'summary', provide an estimated breakdown of time allocation per subject, either in percentages (e.g., "Mathematics: 40%, Physics: 30%") or in estimated total hours per subject (e.g., "Biology: 25 hours, History: 15 hours").

Provide the timetable and summary strictly in the specified JSON format. Ensure each entry in the 'timetable' array has a 'date' and a 'topics' array. The 'topics' array should contain strings of the topics scheduled for that day.
`,
});

const generateStudyScheduleFlow = ai.defineFlow(
  {
    name: 'generateStudyScheduleFlow',
    inputSchema: GenerateStudyScheduleInputSchema,
    outputSchema: GenerateStudyScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("Failed to generate study schedule. The AI model did not return the expected output.");
    }
    // Ensure the output structure is what we expect, especially the summary.
    // The schema validation handles the structure, but let's be explicit about summary format expectation.
    if (output.summary && !output.summary.includes(":") && !output.summary.toLowerCase().includes("no summary")) {
      // If summary is just a generic sentence and not a breakdown.
      console.warn("The AI's summary might not be a structured allocation. Consider re-prompting or providing a default if needed.");
      // Potentially, we could try to infer a basic summary if the AI fails to provide a good one.
      // For now, we'll pass it through.
    }
    return output;
  }
);
