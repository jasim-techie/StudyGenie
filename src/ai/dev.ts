
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-learning-resources.ts';
import '@/ai/flows/create-quiz-from-notes.ts';
import '@/ai/flows/generate-study-schedule.ts';
import '@/ai/flows/generate-topic-image-flow.ts';
import '@/ai/flows/extract-text-from-image-flow.ts';
import '@/ai/flows/extract-text-from-pdf-flow.ts'; // Added new PDF extraction flow
