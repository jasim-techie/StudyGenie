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
  topics: z
    .array(z.string())
    .describe('List of topics to cover, e.g., Algebra, Thermodynamics, Organic Chemistry.'),
  topicImageInputs: z.array(z.string().url()).optional().describe('Optional array of topic images as data URIs, providing visual context for the topics.'),
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

Subjects: {{{subjects}}}
Topics: {{{topics}}}
{{#if topicImageInputs}}
Visual context for topics:
{{#each topicImageInputs}}
{{media url=this}}
{{/each}}
{{/if}}
Exam Date: {{examDate}}
Start Date: {{startDate}}
Available Study Hours Per Day: {{availableStudyHoursPerDay}}

Analyze the text topics and any provided visual context to understand the study material.
Create a timetable that splits the topics across the days, taking into account the available time and difficulty of the topics.
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
