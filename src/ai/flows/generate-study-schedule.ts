
// src/ai/flows/generate-study-schedule.ts
'use server';

/**
 * @fileOverview Generates a personalized study timetable using AI, potentially including image-based topics.
 *
 * - generateStudySchedule - A function that generates the study schedule.
 * - GenerateStudyScheduleInput - The input type for the generateStudySchedule function.
 * - GenerateStudyScheduleOutput - The return type for the generateStudySchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyScheduleInputSchema = z.object({
  subjects: z
    .array(z.string())
    .describe('List of subjects to study, e.g., Mathematics, Physics, Chemistry.'),
  // Topics can be a single string (block of text from OCR) or a list of strings (manually entered)
  // The prompt will need to handle this. We send it as an array of one string if it's a block.
  topics: z
    .array(z.string()) 
    .describe('A list containing either a single block of text (e.g., from OCR) or multiple comma-separated topics. The AI should identify distinct topics from this input.'),
  topicImageInputs: z.array(z.string().url()).optional().describe('Optional array of supplementary topic images as data URIs, providing visual context for specific topics.'),
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
        .describe('List of topics to study on this date, e.g., [Algebra, Functions].'),
    }))
    .describe('A list of study sessions, each containing a date and a list of topics to study on that date.'),
  summary: z.string().describe('A summary of the study plan, including time allocation per subject.'),
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

Topics input: 
{{#each topics}}
{{{this}}}
{{/each}}
(If the topics input above is a large block of text, please identify distinct study topics from it. If it's already a list, use them as is.)

{{#if topicImageInputs}}
Visual context for specific topics:
{{#each topicImageInputs}}
{{media url=this}}
{{/each}}
{{/if}}
Exam Date: {{examDate}}
Start Date: {{startDate}}
Available Study Hours Per Day: {{availableStudyHoursPerDay}}

Analyze the subjects and the provided topics (whether as a list or a block of text needing topic extraction).
Create a timetable that splits the identified topics across the days, taking into account the available time and perceived difficulty of the topics.
Provide the timetable in JSON format, making sure to include the date and topics for each session. Also, provide a summary of the study plan, including time allocation per subject.
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
    return output!;
  }
);

