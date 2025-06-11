#!/bin/bash
echo "Creating project structure and files for StudyGenie AI..."

# Create directories
mkdir -p ./src/ai/flows
mkdir -p ./src/app/dashboard/student
mkdir -p ./src/app/dashboard/parent
mkdir -p ./src/app/login
mkdir -p ./src/components/icons
mkdir -p ./src/components/study-genie
mkdir -p ./src/components/ui
mkdir -p ./src/hooks
mkdir -p ./src/lib
echo "Directories created."

# Create root files
cat <<EOF > ./.env

EOF

cat <<EOF > ./README.md
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
EOF

cat <<EOF > ./apphosting.yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
EOF

cat <<EOF > ./components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
EOF

cat <<EOF > ./next.config.ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
EOF

cat <<EOF > ./package.json
{
  "name": "study-genie-ai",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/googleai": "^1.8.0",
    "@genkit-ai/next": "^1.8.0",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "firebase": "^11.8.1",
    "genkit": "^1.8.0",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "next-themes": "^0.3.0",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "genkit-cli": "^1.8.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
EOF

cat <<EOF > ./tailwind.config.ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['Source Code Pro', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
EOF

cat <<EOF > ./tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
echo "Root files created."

# Create src/ai files
cat <<EOF > ./src/ai/dev.ts
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-learning-resources.ts';
import '@/ai/flows/create-quiz-from-notes.ts';
import '@/ai/flows/generate-study-schedule.ts';
import '@/ai/flows/generate-topic-image-flow.ts';
import '@/ai/flows/extract-text-from-image-flow.ts';
import '@/ai/flows/extract-text-from-pdf-flow.ts';
import '@/ai/flows/generateKeyPointsFlow.ts';
EOF

cat <<EOF > ./src/ai/genkit.ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
EOF

cat <<EOF > ./src/ai/flows/create-quiz-from-notes.ts
'use server';

/**
 * @fileOverview Creates a quiz from provided study notes text.
 *
 * - createQuizFromNotes - A function that generates a quiz from study notes.
 * - CreateQuizFromNotesInput - The input type for the createQuizFromNotes function (expects text).
 * - CreateQuizFromNotesOutput - The return type for the createQuizFromNotes function (quiz JSON).
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Input schema for the main exported function
const CreateQuizFromNotesInputSchema = z.object({
  notesText: z.string().describe(
      "The study notes as a block of text."
    ),
  numQuestions: z.number().optional().default(5).describe('Number of questions to generate (e.g., 5 to 10).'),
});
export type CreateQuizFromNotesInput = z.infer<typeof CreateQuizFromNotesInputSchema>;


const CreateQuizFromNotesOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format. The JSON should be an object with a "title" (string) and "questions" (array of objects). Each question object should have "id" (string, e.g., "q1"), "questionText" (string), "options" (array of 4 strings), "correctAnswer" (string - one of the options), and optionally "explanation" (string).'),
});
export type CreateQuizFromNotesOutput = z.infer<typeof CreateQuizFromNotesOutputSchema>;

export async function createQuizFromNotes(input: CreateQuizFromNotesInput): Promise<CreateQuizFromNotesOutput> {
  return createQuizFromNotesFlow(input);
}

const quizGenerationPrompt = ai.definePrompt({
  name: 'quizGenerationPrompt',
  input: {schema: CreateQuizFromNotesInputSchema}, // Input schema now directly takes notesText and numQuestions
  output: {schema: CreateQuizFromNotesOutputSchema},
  prompt: \`You are an expert quiz maker.
Based on the following study notes text, create a quiz with {{numQuestions}} multiple-choice questions.
Each question must have exactly 4 distinct options.
One option must be the correct answer.
If possible, provide a brief explanation for why the correct answer is correct.

Format the entire output as a single, valid JSON object that strictly adheres to the following structure:
{
  "title": "Quiz based on Your Notes",
  "questions": [
    {
      "id": "q1",
      "questionText": "Sample question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option C",
      "explanation": "This is why Option C is the correct answer."
    }
    // ... additional questions matching this structure (ensure {{numQuestions}} are generated)
  ]
}

Ensure the 'id' for each question is unique (e.g., "q1", "q2", ...).
Ensure the 'correctAnswer' string exactly matches one of the strings in the 'options' array.

Study Notes Text:
{{{notesText}}}

Quiz JSON:\`,
  config: {}
});

const MAX_TEXT_LENGTH_FOR_QUIZ_INPUT = 20000; 

const createQuizFromNotesFlow = ai.defineFlow(
  {
    name: 'createQuizFromNotesFlow',
    inputSchema: CreateQuizFromNotesInputSchema, 
    outputSchema: CreateQuizFromNotesOutputSchema, 
  },
  async (inputRequest: CreateQuizFromNotesInput) => {
    let notesText = inputRequest.notesText;

    if (!notesText || notesText.trim() === "") {
      console.error("Notes text is empty.");
      throw new Error("Please provide some notes to generate a quiz.");
    }
    console.log(\`Notes text received. Length: \${notesText.length} characters.\`);

    if (notesText.length > MAX_TEXT_LENGTH_FOR_QUIZ_INPUT) {
      console.warn(\`Notes text is very long (\${notesText.length} chars), truncating to \${MAX_TEXT_LENGTH_FOR_QUIZ_INPUT} chars for quiz generation input.\`);
      notesText = notesText.substring(0, MAX_TEXT_LENGTH_FOR_QUIZ_INPUT);
    }

    console.log("Generating quiz from notes text...");
    const {output} = await quizGenerationPrompt({ notesText: notesText, numQuestions: inputRequest.numQuestions || 5 }); 
    
    if (!output || !output.quiz) {
        console.error("Quiz generation prompt did not return expected output structure.");
        throw new Error("Failed to generate quiz content from the notes. The AI model might have returned an unexpected format.");
    }
    console.log("Quiz generation successful.");
    return output;
  }
);
EOF

cat <<EOF > ./src/ai/flows/extract-text-from-image-flow.ts
'use server';
/**
 * @fileOverview Extracts text from an image using AI.
 *
 * - extractTextFromImage - A function that extracts text from an image.
 * - ExtractTextFromImageInput - The input type for the extractTextFromImage function.
 * - ExtractTextFromImageOutput - The return type for the extractTextFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTextFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromImageInput = z.infer<typeof ExtractTextFromImageInputSchema>;

const ExtractTextFromImageOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the image.'),
});
export type ExtractTextFromImageOutput = z.infer<typeof ExtractTextFromImageOutputSchema>;

export async function extractTextFromImage(input: ExtractTextFromImageInput): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async (input: ExtractTextFromImageInput) => {
    const {text} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', 
        prompt: [
            {media: {url: input.imageDataUri}},
            {text: "Extract all text visible in this image. Return only the extracted text as a single block. If no text is found, return an empty string."}
        ],
        output: {
            schema: ExtractTextFromImageOutputSchema,
        },
        config: {}
    });
    return { extractedText: text || "" };
  }
);
EOF

cat <<EOF > ./src/ai/flows/extract-text-from-pdf-flow.ts
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
    const {text} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', 
        prompt: [
            {media: {url: input.pdfDataUri}}, 
            {text: "Extract all textual content from this PDF document. Prioritize extracting the main body text. Return only the extracted text. If no text is found, return an empty string."}
        ],
        output: { 
             schema: ExtractTextFromPdfOutputSchema, 
        },
        config: {}
    });
    
    let resultText = text || "";
    try {
      const parsedOutput = ExtractTextFromPdfOutputSchema.parse(JSON.parse(resultText));
      resultText = parsedOutput.extractedText;
    } catch (e) {
      // Not a JSON string, or doesn't match schema, assume resultText is already the extracted text
    }
    return { extractedText: resultText };
  }
);
EOF

cat <<EOF > ./src/ai/flows/generate-study-schedule.ts
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
  prompt: \`You are an expert study timetable generator. Given the following information, create a study timetable.

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
\`,
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
    if (output.summary && !output.summary.includes(":") && !output.summary.toLowerCase().includes("no summary")) {
      console.warn("The AI's summary might not be a structured allocation. Consider re-prompting or providing a default if needed.");
    }
    return output;
  }
);
EOF

cat <<EOF > ./src/ai/flows/generate-topic-image-flow.ts
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

const generateTopicImageFlow = ai.defineFlow(
  {
    name: 'generateTopicImageFlow',
    inputSchema: GenerateTopicImageInputSchema,
    outputSchema: GenerateTopicImageOutputSchema,
  },
  async (input: GenerateTopicImageInput) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', 
      prompt: \`Generate a visually appealing and relevant image representing the study topic: "\${input.topicText}". The image should be simple, clear, and suitable for a study aid.\`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], 
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return an image URL.');
    }
    return {imageDataUri: media.url};
  }
);
EOF

cat <<EOF > ./src/ai/flows/generateKeyPointsFlow.ts
'use server';
/**
 * @fileOverview Generates key points from answer content based on mark weightage.
 *
 * - generateKeyPoints - A function that extracts key points.
 * - GenerateKeyPointsInput - The input type.
 * - GenerateKeyPointsOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateKeyPointsInputSchema = z.object({
  answerContent: z.string().describe('The full answer content from notes or textbook.'),
  markWeightage: z.number().describe('The desired mark weightage for the answer (e.g., 2, 4, 8, 12, 16, 20 marks).'),
});
export type GenerateKeyPointsInput = z.infer<typeof GenerateKeyPointsInputSchema>;

const GenerateKeyPointsOutputSchema = z.object({
  keyPoints: z.array(z.string()).describe('An array of essential key points extracted from the content, tailored to the mark weightage.'),
});
export type GenerateKeyPointsOutput = z.infer<typeof GenerateKeyPointsOutputSchema>;

export async function generateKeyPoints(input: GenerateKeyPointsInput): Promise<GenerateKeyPointsOutput> {
  return generateKeyPointsFlow(input);
}

const keyPointsPrompt = ai.definePrompt({
  name: 'keyPointsPrompt',
  input: {schema: GenerateKeyPointsInputSchema},
  output: {schema: GenerateKeyPointsOutputSchema},
  prompt: \`You are an expert academic assistant. Your task is to extract essential key points from the provided answer content.
The detail and number of key points should be appropriate for an answer that would receive {{markWeightage}} marks.
Focus on the most crucial information needed to fully answer a question of that weightage. Present the key points as a list.

Answer Content:
{{{answerContent}}}

Key Points for a {{markWeightage}}-mark answer:
\`,
});

const generateKeyPointsFlow = ai.defineFlow(
  {
    name: 'generateKeyPointsFlow',
    inputSchema: GenerateKeyPointsInputSchema,
    outputSchema: GenerateKeyPointsOutputSchema,
  },
  async (input: GenerateKeyPointsInput) => {
    if (!input.answerContent || input.answerContent.trim() === "") {
      throw new Error("Answer content cannot be empty.");
    }
    if (input.markWeightage <= 0) {
      throw new Error("Mark weightage must be a positive number.");
    }

    const {output} = await keyPointsPrompt(input);
    
    if (!output || !output.keyPoints) {
        console.error("Key point generation prompt did not return expected output structure.");
        throw new Error("Failed to generate key points. The AI model might have returned an unexpected format.");
    }
    return output;
  }
);
EOF

cat <<EOF > ./src/ai/flows/suggest-learning-resources.ts
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

import {ai} from '@/ai/genkit';
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
  prompt: \`You are an AI assistant designed to suggest learning resources for students.

  Given the subject: {{{subject}}}
  And the following topics: {{#each topics}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Suggest a list of learning resources, that will help the user study the material.
  These learning resources can be links to websites, specific books, or other study materials.
  Format your response as a JSON array of strings.
  \`,
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
EOF
echo "src/ai files created."

# Create src/app files
cat <<EOF > ./src/app/actions.ts
"use server";

import { generateStudySchedule, GenerateStudyScheduleInput } from "@/ai/flows/generate-study-schedule";
import { suggestLearningResources, SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";
import { createQuizFromNotes, CreateQuizFromNotesInput } from "@/ai/flows/create-quiz-from-notes";
import { generateTopicImage } from "@/ai/flows/generate-topic-image-flow";
import { extractTextFromImage, ExtractTextFromImageInput } from "@/ai/flows/extract-text-from-image-flow";
import { generateKeyPoints as generateKeyPointsFlow, GenerateKeyPointsInput as GenerateKeyPointsFlowInput } from "@/ai/flows/generateKeyPointsFlow";
import type { GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput, GenerateKeyPointsOutput, StudyPlanFormValues } from "@/lib/types";
// import { extractTextFromPdf } from "@/ai/flows/extract-text-from-pdf-flow"; // Not currently used directly by other actions

async function fileToDataUri(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return \`data:\${file.type};base64,\${buffer.toString('base64')}\`;
}

export async function handleImageUploadForTopicExtraction(
  imageDataUri: string
): Promise<{ extractedText: string | null; error?: string }> {
  try {
    const input: ExtractTextFromImageInput = { imageDataUri };
    const result = await extractTextFromImage(input);
    return { extractedText: result.extractedText };
  } catch (error) {
    console.error("Error extracting text from image:", error);
    return { extractedText: null, error: error instanceof Error ? error.message : "Failed to extract text from image." };
  }
}

interface HandleGenerateStudyPlanData extends Omit<StudyPlanFormValues, 'examDate' | 'startDate'> {
  examDate: string;
  startDate: string;
}

export async function handleGenerateStudyPlan(
  data: HandleGenerateStudyPlanData
): Promise<{ schedule: GeneratedStudyScheduleOutput | null; resources: SuggestedLearningResourcesOutput | null; error?: string }> {
  try {
    const subjectNames = data.subjects.map(s => s.name);
    const allTopicTexts: string[] = data.subjects.reduce((acc, s) => {
        if (s.topics && s.topics.trim() !== "") {
            const individualTopics = s.topics.split(/[\n,]+/).map(topic => topic.trim()).filter(topic => topic !== "");
            acc.push(...individualTopics);
        }
        return acc;
    }, [] as string[]);

    let topicImagesForSchedule: string[] = [];

    if (allTopicTexts.length > 0) {
        const uniqueTopicTextsForImageGen = Array.from(new Set(allTopicTexts)); 

        const generatedTopicImagePromises = uniqueTopicTextsForImageGen.map(async (topicText) => {
            const imageGenInputText = topicText.length > 100 ? topicText.substring(0, 97) + "..." : topicText;
             if (imageGenInputText) {
                try {
                    const imageResult = await generateTopicImage({ topicText: imageGenInputText });
                    return imageResult.imageDataUri;
                } catch (imgErr) {
                    console.warn(\`Failed to generate image for topic "\${topicText}":\`, imgErr);
                    return null; 
                }
            }
            return null;
        });
        const generatedImages = (await Promise.all(generatedTopicImagePromises)).filter(img => img !== null) as string[];
        topicImagesForSchedule.push(...generatedImages);
    }
    
    const scheduleInputTopics = allTopicTexts.length > 0 ? Array.from(new Set(allTopicTexts)) : ["General Studies"];

    const scheduleInput: GenerateStudyScheduleInput = {
      subjects: subjectNames,
      topics: scheduleInputTopics, 
      examDate: data.examDate,
      startDate: data.startDate,
      availableStudyHoursPerDay: data.availableStudyHoursPerDay,
      topicImageInputs: topicImagesForSchedule.length > 0 ? topicImagesForSchedule : undefined,
    };
    const schedule = await generateStudySchedule(scheduleInput);

    const resourcesInput: SuggestLearningResourcesInput = {
      subject: subjectNames.join(', ') || "General Studies", 
      topics: scheduleInputTopics, 
    };
    const resources = await suggestLearningResources(resourcesInput);
    
    return { schedule, resources };
  } catch (error) {
    console.error("Error generating study plan:", error);
    return { schedule: null, resources: null, error: error instanceof Error ? error.message : "Failed to generate study plan." };
  }
}

export async function handleCreateQuiz(
  notesText: string,
  numQuestions: number = 5
): Promise<{ quizData: CreatedQuizOutput | null; error?: string }> {
  try {
    if (!notesText || notesText.trim() === "") {
        return { quizData: null, error: "Notes text cannot be empty." };
    }
    
    const quizInput: CreateQuizFromNotesInput = { notesText, numQuestions };
    const quizData = await createQuizFromNotes(quizInput);
    return { quizData };
  } catch (error) {
    const typedError = error as Error;
    console.error("Error creating quiz:", typedError);
    const errorMessage = typedError.message || "Failed to create quiz due to an unexpected error.";
    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return { quizData: null, error: "Quiz generation failed due to API rate limits. Please try again later or with shorter notes." };
    }
    if (errorMessage.toLowerCase().includes("token count exceeds") || errorMessage.toLowerCase().includes("input token count") || errorMessage.toLowerCase().includes("maximum number of tokens allowed")) {
      return { quizData: null, error: "Your notes are too long for the AI to process. Please shorten them and try again." };
    }
    return { quizData: null, error: errorMessage };
  }
}

export async function handleGenerateKeyPoints(
  answerContent: string,
  markWeightage: number
): Promise<{ keyPointsData: GenerateKeyPointsOutput | null; error?: string }> {
  try {
    if (!answerContent || answerContent.trim() === "") {
      return { keyPointsData: null, error: "Answer content cannot be empty." };
    }
    if (markWeightage <= 0) {
        return { keyPointsData: null, error: "Mark weightage must be a positive number." };
    }

    const input: GenerateKeyPointsFlowInput = { answerContent, markWeightage };
    const keyPointsData = await generateKeyPointsFlow(input);
    return { keyPointsData };
  } catch (error) {
    const typedError = error as Error;
    console.error("Error generating key points:", typedError);
    const errorMessage = typedError.message || "Failed to generate key points.";
     if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return { keyPointsData: null, error: "Key point generation failed due to API rate limits. Please try again later or with shorter content." };
    }
    if (errorMessage.toLowerCase().includes("token count exceeds") || errorMessage.toLowerCase().includes("input token count")) {
      return { keyPointsData: null, error: "Your content is too long for the AI to process. Please shorten it and try again." };
    }
    return { keyPointsData: null, error: errorMessage };
  }
}
EOF

cat <<EOF > ./src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 25% 97%; /* Light gray #F5F5FA */
    --foreground: 240 10% 20%; /* Dark gray for text */
    --card: 0 0% 100%;
    --card-foreground: 240 10% 20%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 20%;
    --primary: 220 88% 61%; /* Vivid blue #4285F4 */
    --primary-foreground: 0 0% 100%; /* White */
    --secondary: 240 10% 90%; /* Lighter gray for secondary elements */
    --secondary-foreground: 240 10% 20%;
    --muted: 240 10% 85%; /* Muted gray */
    --muted-foreground: 240 10% 40%;
    --accent: 184 100% 36%; /* Teal #00A9B5 */
    --accent-foreground: 0 0% 100%; /* White */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 10% 80%;
    --input: 240 10% 88%;
    --ring: 220 88% 61%; /* Vivid blue for focus rings */
    --chart-1: 220 88% 61%; /* Primary color */
    --chart-2: 184 100% 36%; /* Accent color */
    --chart-3: 210 70% 55%;
    --chart-4: 30 80% 60%;
    --chart-5: 120 40% 55%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 10%;
    --foreground: 0 0% 98%;
    --card: 240 10% 10%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 10%;
    --popover-foreground: 0 0% 98%;
    --primary: 220 88% 61%; /* Vivid blue #4285F4 */
    --primary-foreground: 0 0% 100%; /* White */
    --secondary: 240 5% 20%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 5% 25%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 184 100% 36%; /* Teal #00A9B5 */
    --accent-foreground: 0 0% 100%; /* White */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5% 20%;
    --input: 240 5% 22%;
    --ring: 220 88% 61%;
    --chart-1: 220 88% 61%;
    --chart-2: 184 100% 36%;
    --chart-3: 210 70% 65%;
    --chart-4: 30 80% 70%;
    --chart-5: 120 40% 65%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF

cat <<EOF > ./src/app/layout.tsx
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'StudyGenie AI',
  description: 'Personalized study plans and quizzes powered by AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
EOF

cat <<EOF > ./src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/study-genie/Header";
import { StudyPlanForm } from "@/components/study-genie/StudyPlanForm";
import { TimetableDisplay } from "@/components/study-genie/TimetableDisplay";
import { TimeAllocationChart } from "@/components/study-genie/TimeAllocationChart";
import { ResourceSuggestions } from "@/components/study-genie/ResourceSuggestions";
import { QuizGenerator } from "@/components/study-genie/QuizGenerator";
import { QuizDisplay } from "@/components/study-genie/QuizDisplay";
import { KeyPointGenerator } from "@/components/study-genie/KeyPointGenerator";
import { PdfExportButton } from "@/components/study-genie/PdfExportButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, BookCopy, HelpCircleIcon, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateStudyPlan, handleCreateQuiz } from "./actions";
import type { StudyPlanFormValues, GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, TimetableEntry, CreatedQuizOutput, SubjectEntry as FormSubjectEntry } from "@/lib/types";
import { format } from "date-fns";
import { useSearchParams, useRouter } from 'next/navigation';


export default function HomePage() {
  const [studyPlanLoading, setStudyPlanLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  
  const [schedule, setSchedule] = useState<GeneratedStudyScheduleOutput | null>(null);
  const [resources, setResources] = useState<SuggestedLearningResourcesOutput | null>(null);
  const [quizJson, setQuizJson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("study-plan");

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section === 'quiz-maker' || section === 'key-points') {
      setActiveTab(section);
      // Clean the URL by removing the section query param after scrolling
      const current = new URL(window.location.toString());
      current.searchParams.delete('section');
      router.replace(current.pathname + current.search, { scroll: false });

      // Scroll to the element if needed
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams, router]);


  const onStudyPlanSubmit = async (data: StudyPlanFormValues) => {
    setStudyPlanLoading(true);
    setSchedule(null);
    setResources(null);
    
    const formattedSubjects: FormSubjectEntry[] = data.subjects.map(s => ({
        id: s.id,
        name: s.name,
        topics: s.topics,
        notesImageForTopics: s.notesImageForTopics,
        ocrTextPreview: s.ocrTextPreview
    }));
    
    const hasAnyTopicText = formattedSubjects.some(s => s.topics && s.topics.trim() !== "");
    const willGenerateImages = hasAnyTopicText; 

    if (willGenerateImages) {
      toast({ title: "Generating Study Plan & Topic Images", description: "AI is crafting your plan and may create images for your topics. This can take a moment..." });
    } else {
      toast({ title: "Generating Study Plan", description: "AI is crafting your personalized plan..." });
    }
    
    const result = await handleGenerateStudyPlan({
      subjects: formattedSubjects,
      examDate: format(data.examDate, "yyyy-MM-dd"),
      startDate: format(data.startDate, "yyyy-MM-dd"),
      availableStudyHoursPerDay: data.studyHoursPerDay,
    });

    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      setSchedule(result.schedule);
      setResources(result.resources);
      toast({ title: "Success!", description: "Your study plan and resources are ready." });
    }
    setStudyPlanLoading(false);
  };

  const onQuizGenerated = (generatedQuizJson: string) => {
    setQuizJson(generatedQuizJson);
    setQuizLoading(false);
  };
  
  const handleRetakeQuiz = () => {
    setQuizJson(null); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 md:w-fit mx-auto mb-8">
            <TabsTrigger value="study-plan" className="text-base py-2.5">
              <BookCopy className="mr-2 h-5 w-5" /> Study Plan Generator
            </TabsTrigger>
            <TabsTrigger value="quiz-maker" id="quiz-maker" className="text-base py-2.5">
              <HelpCircleIcon className="mr-2 h-5 w-5" /> Quiz Maker
            </TabsTrigger>
            <TabsTrigger value="key-points" id="key-points" className="text-base py-2.5">
              <Sparkles className="mr-2 h-5 w-5" /> Key Point Extractor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study-plan">
            <div className="space-y-8">
              <StudyPlanForm onSubmit={onStudyPlanSubmit} isLoading={studyPlanLoading} />
              {studyPlanLoading && (
                <div className="flex flex-col justify-center items-center py-8 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="ml-0 mt-4 text-lg text-muted-foreground">
                    AI is crafting your plan...
                  </p>
                </div>
              )}
              {schedule && (
                <div className="mt-8 space-y-8">
                  <TimetableDisplay timetable={schedule.timetable.map(t => ({...t, topics: t.topics || []})) as TimetableEntry[]} />
                  {schedule.summary && schedule.summary.trim() !== "" && <TimeAllocationChart summary={schedule.summary} />}
                  {resources && resources.resourceSuggestions && resources.resourceSuggestions.length > 0 && <ResourceSuggestions resources={resources.resourceSuggestions} />}
                  <div className="text-center mt-6">
                    <PdfExportButton disabled={!schedule} />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="quiz-maker">
            <div className="space-y-8">
              {!quizJson ? (
                <QuizGenerator 
                  onQuizGenerated={onQuizGenerated} 
                  isLoading={quizLoading}
                  setIsLoading={setQuizLoading}
                  createQuizAction={async (notesText: string, numQuestions?: number): Promise<{ quizData: CreatedQuizOutput | null; error?: string }> => {
                     const result = await handleCreateQuiz(notesText, numQuestions);
                     return result as { quizData: CreatedQuizOutput | null; error?: string };
                  }}
                />
              ) : (
                <QuizDisplay quizJson={quizJson} onRetakeQuiz={handleRetakeQuiz} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="key-points">
            <div className="space-y-8">
              <KeyPointGenerator />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by Genkit & Next.js</p>
      </footer>
    </div>
  );
}
EOF

cat <<EOF > ./src/app/providers.tsx
"use client";
import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
EOF

cat <<EOF > ./src/app/login/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, UserCog, LogIn, BrainCircuit, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const actionText = isLoginView ? "Login" : "Signup";

    if (!fullName.trim()) {
        toast({
            title: "Name Required",
            description: "Please enter your full name.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    toast({
      title: \`\${actionText} Attempt\`,
      description: \`Simulating \${actionText.toLowerCase()} as \${role} (\${fullName}) with email: \${email}. In a real app, this would call an authentication service.\`,
    });
    
    setTimeout(() => {
      setIsLoading(false);
      const dashboardPath = role === "student" ? '/dashboard/student' : '/dashboard/parent';
      router.push(\`\${dashboardPath}?name=\${encodeURIComponent(fullName)}\`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4 selection:bg-primary/20">
       <Link href="/" className="flex items-center gap-2.5 text-primary mb-6 sm:mb-8 hover:opacity-90 transition-opacity">
          <BrainCircuit className="h-10 w-10 sm:h-12 sm:w-12" />
          <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight">StudyGenie AI</h1>
        </Link>
      <Card className="w-full max-w-md shadow-2xl border-border/60 bg-card/90 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-headline">{isLoginView ? "Welcome Back!" : "Create Your Account"}</CardTitle>
          <CardDescription>{isLoginView ? "Sign in to continue your learning journey." : "Join StudyGenie AI to get started."}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <Label className="text-base mb-2 block font-medium">Select Your Role</Label>
              <div className="relative flex w-full rounded-lg bg-muted p-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={cn(
                    "relative z-10 flex-1 py-2.5 px-4 text-center text-sm font-medium transition-colors duration-300 ease-out rounded-md",
                    role === "student" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <User className="inline-block mr-1.5 h-4 w-4 mb-0.5" /> Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("parent")}
                  className={cn(
                    "relative z-10 flex-1 py-2.5 px-4 text-center text-sm font-medium transition-colors duration-300 ease-out rounded-md",
                    role === "parent" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <UserCog className="inline-block mr-1.5 h-4 w-4 mb-0.5" /> Parent
                </button>
                <div
                  className={cn(
                    "absolute inset-0 m-1.5 h-[calc(100%-0.75rem)] w-[calc(50%-0.375rem)] rounded-md shadow-md transition-all duration-300 ease-out",
                    role === "student" ? "translate-x-0 bg-primary" : "translate-x-full bg-red-600"
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder={role === "student" ? "Your Name" : "Parent's Name"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="text-base h-11 bg-background/70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base h-11 bg-background/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base h-11 pr-10 bg-background/70"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className={cn(
                "w-full text-base py-3 h-12 font-semibold transition-all duration-300 ease-out transform hover:scale-105 focus:ring-4",
                role === "student" ? "bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary/30" : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600/30"
              )} 
              disabled={isLoading}
            >
              {isLoading ? (
                \`\${isLoginView ? "Logging in" : "Signing up"}...\`
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" /> {isLoginView ? "Login" : "Sign Up"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3 pt-5">
          <Button variant="link" onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-muted-foreground hover:text-primary">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
           <p className="text-xs text-center text-muted-foreground/80 border-t pt-3 w-full">
             This is a placeholder {isLoginView ? 'login' : 'signup'}. No actual authentication is performed.
           </p>
        </CardFooter>
      </Card>
    </div>
  );
}
EOF

cat <<EOF > ./src/app/dashboard/student/page.tsx
"use client";

import { Header } from "@/components/study-genie/Header";
import { StudyRoom } from "@/components/study-genie/StudyRoom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, HelpCircleIcon, Home, LayoutDashboard, LogOut, Settings, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const quickLinks = [
  { name: "New Study Plan", href: "/", icon: BookOpen, description: "Generate a personalized study schedule." },
  { name: "Quiz Maker", href: "/?section=quiz-maker", icon: HelpCircleIcon, description: "Test your knowledge from notes.", sectionId: "quiz-maker" },
  { name: "Key Point Extractor", href: "/?section=key-points", icon: Sparkles, description: "Extract key points from answers.", sectionId: "key-points" },
];

export default function StudentDashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    const nameFromQuery = searchParams.get("name");
    if (nameFromQuery) {
      setStudentName(decodeURIComponent(nameFromQuery));
    }
  }, [searchParams]);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out. (Simulation)",
    });
    router.push('/login');
  };

  const handleLinkClick = (href: string, sectionId?: string) => {
    if (sectionId && href.startsWith("/?section=")) {
        router.push(href); 
    } else {
        router.push(href);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <User className="h-16 w-16 mx-auto text-primary mb-2 rounded-full bg-primary/10 p-3 border-2 border-primary/20" />
              <h2 className="text-lg lg:text-xl font-semibold">{studentName}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Student Portal</p>
            </div>
            <nav className="space-y-1.5">
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href={\`/dashboard/student?name=\${encodeURIComponent(studentName)}\`}><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => handleLinkClick("/", undefined)}>
                <BookOpen className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Study Plan AI
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => handleLinkClick("/?section=quiz-maker", "quiz-maker")}>
                <HelpCircleIcon className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Quiz Maker
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => handleLinkClick("/?section=key-points", "key-points")}>
                <Sparkles className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Key Points
              </Button>
            </nav>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => toast({title: "Feature Coming Soon", description: "Account settings will be available here."})}>
              <Settings className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Logout
            </Button>
          </div>
        </aside>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-foreground">
              Welcome back, <span className="text-primary">{studentName}!</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              Ready to ace your studies? Let's get started.
            </p>
          </div>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground/90">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {quickLinks.map(link => (
                <Card key={link.name} className="hover:shadow-lg transition-shadow duration-200 ease-in-out border-border/70 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                    <link.icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent mb-1.5" />
                    <CardTitle className="text-lg sm:text-xl">{link.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 h-10">{link.description}</p>
                    <Button variant="link" asChild className="p-0 text-primary text-sm">
                        <Link href={link.href} onClick={(e) => { e.preventDefault(); handleLinkClick(link.href, link.sectionId); }}>Go to {link.name.split(' ')[0]}</Link>
                    </Button>
                    </CardContent>
                </Card>
                ))}
                <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out bg-primary/5 border-primary/20 col-span-1 sm:col-span-2 lg:col-span-1">
                    <CardHeader className="pb-3">
                    <LayoutDashboard className="h-7 w-7 sm:h-8 sm:w-8 text-primary mb-1.5" />
                    <CardTitle className="text-lg sm:text-xl">Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">Track your completed topics and quiz scores here. (Feature Coming Soon)</p>
                    </CardContent>
                </Card>
            </div>
          </section>
          
          <StudyRoom />

        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Student Dashboard.</p>
      </footer>
    </div>
  );
}
EOF

cat <<EOF > ./src/app/dashboard/parent/page.tsx
"use client";

import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Home, LogOut, MessageCircleQuestion, Settings, User, Users, CheckCircle2, Brain, Search } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const mockStudentName = "Your Child"; 

const mockSubjectsProgress = [
  { id: "1", name: "Mathematics", topicsCovered: 8, topicsTotal: 12, lastStudiedFile: "Chapter 3 Notes.pdf", quizAttempts: 3, avgScore: 75 },
  { id: "2", name: "Physics", topicsCovered: 5, topicsTotal: 10, lastStudiedFile: "Newton's Laws.ppt", quizAttempts: 1, avgScore: 90 },
  { id: "3", name: "Chemistry", topicsCovered: 10, topicsTotal: 10, lastStudiedFile: "Periodic Table.docx", quizAttempts: 5, avgScore: 82 },
  { id: "4", name: "Biology", topicsCovered: 2, topicsTotal: 15, lastStudiedFile: "Cell Structure.pdf", quizAttempts: 0, avgScore: 0 },
];

export default function ParentDashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [parentName, setParentName] = useState("Guardian");
  const [studentName, setStudentName] = useState(mockStudentName);

  useEffect(() => {
    const nameFromQuery = searchParams.get("name");
    if (nameFromQuery) {
      setParentName(decodeURIComponent(nameFromQuery));
    }
    const studentNameFromQuery = searchParams.get("studentName"); 
    if (studentNameFromQuery) {
        setStudentName(decodeURIComponent(studentNameFromQuery));
    } else if (nameFromQuery) { 
        setStudentName(\`\${decodeURIComponent(nameFromQuery)}'s Child\`);
    }

  }, [searchParams]);


  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out. (Simulation)",
    });
    router.push('/login');
  };
  
  const handleAskQuestionOnFile = (subjectName: string, fileName: string) => {
    toast({
        title: \`Ask AI about \${fileName}\`,
        description: \`This feature would allow you to ask questions or get summaries based on the content of "\${fileName}" for \${subjectName}. Backend integration needed.\`,
        duration: 5000
    });
  };
  
  const handleViewDetailedReport = (subjectName: string) => {
     toast({
        title: \`Detailed Report for \${subjectName}\`,
        description: \`This would show a detailed report of quizzes, study time, etc. for \${subjectName}. (Feature Coming Soon)\`,
        duration: 4000
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <Users className="h-16 w-16 mx-auto text-red-600 mb-2 rounded-full bg-red-600/10 p-3 border-2 border-red-600/20" />
              <h2 className="text-lg lg:text-xl font-semibold">{parentName}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Parent Portal</p>
            </div>
            <nav className="space-y-1.5">
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href={\`/dashboard/parent?name=\${encodeURIComponent(parentName)}\`}><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => toast({title: "Coming Soon", description: "Student profile & settings will be here."})}>
                <User className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Child's Profile
              </Button>
            </nav>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => toast({title: "Feature Coming Soon", description: "Account settings will be available here."})}>
              <Settings className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Logout
            </Button>
          </div>
        </aside>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-foreground">
              {studentName}'s Progress Overview
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              Stay updated on your child's study activities and progress.
            </p>
          </div>

          <Card className="shadow-xl border-border/80 mb-6 sm:mb-8 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-xl sm:text-2xl lg:text-3xl flex items-center">
                <BarChart3 className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
                Subject Progress
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                View topics covered, quiz performance, and last accessed materials for {studentName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {mockSubjectsProgress.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No subject data available for {studentName} yet.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {mockSubjectsProgress.map(subject => (
                  <Card key={subject.id} className="bg-card border-border/60 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg sm:text-xl font-semibold">{subject.name}</CardTitle>
                        <Badge variant={subject.topicsCovered === subject.topicsTotal ? "default" : "secondary"} className={\`\${subject.topicsCovered === subject.topicsTotal ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'} text-xs sm:text-sm shadow-sm\`}>
                          {subject.topicsCovered === subject.topicsTotal && <CheckCircle2 className="inline mr-1.5 h-4 w-4"/>}
                          {subject.topicsCovered} / {subject.topicsTotal} Topics
                        </Badge>
                      </div>
                       <Progress 
                            value={(subject.topicsCovered / subject.topicsTotal) * 100} 
                            className="h-2 sm:h-2.5 mt-2" 
                            indicatorClassName={subject.topicsCovered === subject.topicsTotal ? "bg-green-500" : "bg-primary"}
                        />
                    </CardHeader>
                    <CardContent className="text-xs sm:text-sm space-y-1.5">
                      <p className="text-muted-foreground">Last material: <em className="text-foreground">{subject.lastStudiedFile}</em></p>
                      <p className="text-muted-foreground">Quiz Attempts: <span className="font-medium text-foreground">{subject.quizAttempts}</span></p>
                      <p className="text-muted-foreground">Average Score: <span className={\`font-medium \${subject.avgScore >= 70 ? 'text-green-600' : 'text-orange-600'}\`}>{subject.avgScore > 0 ? \`\${subject.avgScore}%\` : 'N/A'}</span></p>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
                       <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAskQuestionOnFile(subject.name, subject.lastStudiedFile)}
                          className="w-full sm:w-auto"
                        >
                         <MessageCircleQuestion className="mr-1.5 h-4 w-4" /> Ask AI about "{truncateFileName(subject.lastStudiedFile)}"
                       </Button>
                       <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetailedReport(subject.name)}
                          className="w-full sm:w-auto text-primary hover:text-primary/80"
                        >
                         <Search className="mr-1.5 h-4 w-4" /> View Report
                       </Button>
                    </CardFooter>
                  </Card>
                ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground pt-4 border-t mt-4 text-center">
                Progress data is currently mocked. Real data requires backend integration.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-border/80 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline text-xl sm:text-2xl flex items-center">
                    <Brain className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                    Parental AI Tools (Coming Soon)
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                    Future tools to help you support {studentName}'s learning journey.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Custom Quiz Generation</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Create quizzes on specific weak areas identified from reports.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Study Habit Insights</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">AI-driven suggestions based on study patterns.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Learning Resource Curation</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Suggest supplementary materials for challenging topics.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Goal Setting & Tracking</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Collaborate with {studentName} to set and monitor academic goals.</p>
                </div>
            </CardContent>
          </Card>

        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Parent Dashboard.</p>
      </footer>
    </div>
  );
}

function truncateFileName(name: string, maxLength: number = 20): string {
  if (name.length <= maxLength) return name;
  const extension = name.includes('.') ? name.substring(name.lastIndexOf('.')) : '';
  const baseName = name.includes('.') ? name.substring(0, name.lastIndexOf('.')) : name;
  if (baseName.length <= maxLength - extension.length - 3) return name;
  return \`\${baseName.substring(0, maxLength - extension.length - 3)}...\${extension}\`;
}
EOF
echo "src/app files created."

# Create src/components files
cat <<EOF > ./src/components/icons/LogoIcon.tsx
import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      <path d="M12 6v6l4 2" />
      <path d="M8 12h8" />
      <path d="M10 15l-2 2" />
      <path d="M14 15l2 2" />
      <path d="M12 18v-3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
EOF

cat <<EOF > ./src/components/study-genie/Header.tsx
"use client";

import Link from 'next/link';
import { BrainCircuit, Sun, Moon, LogIn, Menu, BookOpen, HelpCircleIcon, Sparkles, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { href: "/", label: "Study Plan AI", icon: BookOpen },
  { href: "/?section=quiz-maker", label: "Quiz Maker", icon: HelpCircleIcon, sectionId: "quiz-maker" },
  { href: "/?section=key-points", label: "Key Points", icon: Sparkles, sectionId: "key-points"},
  { href: "/dashboard/student", label: "Student Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/parent", label: "Parent Dashboard", icon: UserCircle },
];


export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleDesktopLinkClick = (href: string, sectionId?: string) => {
    if (sectionId && href.startsWith("/?section=")) {
        router.push(href); // This will trigger useEffect in HomePage to scroll
    } else {
        router.push(href);
    }
  };
  
  const handleMobileLinkClick = (href: string, sectionId?: string) => {
      if (sectionId && href.startsWith("/?section=")) {
        router.push(href);
      } else {
        router.push(href);
      }
  };

  return (
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-6 border-b shadow-sm bg-card/95 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <BrainCircuit className="h-7 w-7 sm:h-8 sm:w-8" />
          <h1 className="text-xl sm:text-2xl font-headline font-bold">StudyGenie AI</h1>
        </Link>
        
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.slice(0,3).map((link) => (
               <Button key={link.label} variant="ghost" asChild size="sm" onClick={() => handleDesktopLinkClick(link.href, link.sectionId)}>
                <Link href={link.href} className="flex items-center gap-1.5">
                  <link.icon className="h-4 w-4" /> {link.label}
                </Link>
              </Button>
            ))}
          </nav>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Link href="/login" passHref className="hidden md:block">
            <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login / Sign Up
            </Button>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-2 text-primary">
                        <BrainCircuit className="h-7 w-7" />
                        <h2 className="text-xl font-headline font-bold">StudyGenie AI</h2>
                        </Link>
                    </SheetClose>
                  </div>
                  <nav className="flex-grow p-4 space-y-2">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => handleMobileLinkClick(link.href, link.sectionId)}
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors text-base"
                        >
                          <link.icon className="h-5 w-5 text-muted-foreground" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="p-4 border-t">
                     <SheetClose asChild>
                        <Link href="/login" passHref className="w-full">
                            <Button variant="outline" className="w-full">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login / Sign Up
                            </Button>
                        </Link>
                     </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
EOF

cat <<EOF > ./src/components/study-genie/KeyPointGenerator.tsx
"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, ListChecks } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GenerateKeyPointsOutput } from "@/lib/types";
import { handleGenerateKeyPoints } from "@/app/actions";

const MAX_WORDS_KEY_POINTS = 5000; 
const MARK_WEIGHTAGES = [2, 4, 8, 12, 16, 20];

export function KeyPointGenerator() {
  const [answerContent, setAnswerContent] = useState<string>("");
  const [markWeightage, setMarkWeightage] = useState<number>(MARK_WEIGHTAGES[0]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [generatedKeyPoints, setGeneratedKeyPoints] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const words = answerContent.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    if (words.length > MAX_WORDS_KEY_POINTS) {
      setError(\`Word limit exceeded. Maximum \${MAX_WORDS_KEY_POINTS} words allowed.\`);
    } else {
      setError(null);
    }
  }, [answerContent]); 

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setAnswerContent(newText);
    const words = newText.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    if (words.length > MAX_WORDS_KEY_POINTS) {
      setError(\`Word limit exceeded. Maximum \${MAX_WORDS_KEY_POINTS} words allowed.\`);
    } else {
      setError(null);
    }
  };
  
  const handleMarkWeightageChange = (value: string) => {
    setMarkWeightage(parseInt(value, 10));
  };

  const handleSubmit = async () => {
    if (!answerContent.trim()) {
      setError("Please paste your answer content.");
      toast({ title: "Empty Content", description: "Please paste some text to generate key points.", variant: "destructive" });
      return;
    }
    if (wordCount > MAX_WORDS_KEY_POINTS) {
      setError(\`Word limit exceeded. Maximum \${MAX_WORDS_KEY_POINTS} words allowed.\`);
      toast({ title: "Word Limit Exceeded", description: \`Please reduce your content to \${MAX_WORDS_KEY_POINTS} words or less.\`, variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedKeyPoints(null);
    toast({ title: "Generating Key Points", description: "AI is extracting key points from your content..." });

    try {
      const result = await handleGenerateKeyPoints(answerContent, markWeightage);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.keyPointsData?.keyPoints) {
        setGeneratedKeyPoints(result.keyPointsData.keyPoints);
        toast({ title: "Key Points Generated!", description: "Your key points are ready." });
      } else {
        throw new Error("Key points not found in response.");
      }
    } catch (err) {
      console.error("Error generating key points:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      toast({ title: "Key Point Generation Failed", description: errorMessage, variant: "destructive" });
      setError(\`Failed to generate key points: \${errorMessage}\`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          Key Point Generator
        </CardTitle>
        <CardDescription>
          Paste your full answer content and select the mark weightage. 
          The AI will extract essential key points to aid your revision. Max {MAX_WORDS_KEY_POINTS} words.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="answer-content-input" className="text-base font-medium">Full Answer Content</Label>
          <Textarea
            id="answer-content-input"
            value={answerContent}
            onChange={handleTextChange}
            placeholder="Paste your answer content here..."
            rows={12}
            className="mt-2 text-base min-h-[150px] resize-y"
          />
          <div className="mt-2 flex justify-between items-center text-sm">
            <p className={wordCount > MAX_WORDS_KEY_POINTS ? "text-destructive" : "text-muted-foreground"}>
              Word Count: {wordCount} / {MAX_WORDS_KEY_POINTS}
            </p>
            {error && !isLoading && <p className="text-destructive text-xs">{error}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="mark-weightage-select" className="text-base font-medium">Desired Mark Weightage</Label>
          <Select onValueChange={handleMarkWeightageChange} defaultValue={String(markWeightage)}>
            <SelectTrigger id="mark-weightage-select" className="w-full md:w-[180px] mt-2 text-base h-11">
              <SelectValue placeholder="Select marks" />
            </SelectTrigger>
            <SelectContent>
              {MARK_WEIGHTAGES.map(mark => (
                <SelectItem key={mark} value={String(mark)} className="text-base">
                  {mark} Marks
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || wordCount === 0 || wordCount > MAX_WORDS_KEY_POINTS || !!error} 
          className="w-full text-base py-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Key Points...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Key Points
            </>
          )}
        </Button>
      </CardFooter>

      {generatedKeyPoints && !isLoading && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-xl font-headline flex items-center mb-4">
            <ListChecks className="mr-2 h-5 w-5 text-primary" />
            Generated Key Points ({markWeightage} Marks)
          </h3>
          {generatedKeyPoints.length > 0 ? (
            <ul className="space-y-2 list-disc list-inside bg-muted/50 p-4 rounded-md">
              {generatedKeyPoints.map((point, index) => (
                <li key={index} className="text-base text-foreground">
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No specific key points were extracted. The AI might need more context or the content might be too brief for the selected marks.</p>
          )}
        </CardContent>
      )}
       {error && !isLoading && generatedKeyPoints === null && (
         <CardContent className="mt-6 border-t pt-6">
            <p className="text-destructive text-center">{error}</p>
         </CardContent>
       )}
    </Card>
  );
}
EOF

cat <<EOF > ./src/components/study-genie/PdfExportButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PdfExportButtonProps {
  disabled?: boolean;
}

export function PdfExportButton({ disabled = false }: PdfExportButtonProps) {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality is not yet implemented.",
      variant: "default",
    });
    console.log("Attempting to export PDF...");
  };

  return (
    <Button onClick={handleExport} disabled={disabled} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Export Plan as PDF
    </Button>
  );
}
EOF

cat <<EOF > ./src/components/study-genie/QuizDisplay.tsx
"use client";

import { useState, useEffect } from "react";
import type { Quiz, QuizQuestion } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, HelpCircle, Trophy, RotateCcw } from "lucide-react";

interface QuizDisplayProps {
  quizJson: string;
  onRetakeQuiz: () => void;
}

export function QuizDisplay({ quizJson, onRetakeQuiz }: QuizDisplayProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    try {
      const parsedQuiz: Quiz = JSON.parse(quizJson);
      const quizWithIds = {
        ...parsedQuiz,
        questions: parsedQuiz.questions.map((q, index) => ({
          ...q,
          id: q.id || \`q-\${index}\`
        }))
      };
      setQuiz(quizWithIds);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResults(false);
      setScore(0);
    } catch (error) {
      console.error("Failed to parse quiz JSON:", error);
      setQuiz(null); 
    }
  }, [quizJson]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    let calculatedScore = 0;
    quiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  if (!quiz) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Quiz</AlertTitle>
        <AlertDescription>There was an issue loading the quiz. Please try generating it again.</AlertDescription>
      </Alert>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (showResults) {
    const percentage = (score / quiz.questions.length) * 100;
    return (
      <Card className="shadow-lg w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
            Quiz Results: {quiz.title}
          </CardTitle>
          <CardDescription>You scored {score} out of {quiz.questions.length} ({percentage.toFixed(1)}%)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quiz.questions.map((q, index) => (
            <div key={q.id} className={\`p-4 rounded-md border \${userAnswers[q.id] === q.correctAnswer ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}\`}>
              <p className="font-medium">{index + 1}. {q.questionText}</p>
              <p className="text-sm mt-1">Your answer: <span className={userAnswers[q.id] === q.correctAnswer ? 'text-green-700' : 'text-red-700'}>{userAnswers[q.id] || "Not answered"}</span></p>
              <p className="text-sm">Correct answer: <span className="text-green-700">{q.correctAnswer}</span></p>
              {q.explanation && <p className="text-xs mt-1 text-muted-foreground">Explanation: {q.explanation}</p>}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={onRetakeQuiz} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz or Generate New
          </Button>