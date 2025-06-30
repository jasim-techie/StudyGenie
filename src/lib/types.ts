import type { Timestamp } from "firebase/firestore";

// --- Student Profile ---
export interface StudentProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: Timestamp; 
  familyCode: string;
}

// --- Study Plan Generator ---
export interface SubjectEntry {
  id: string; // Unique ID for React key prop
  name: string;
  topics: string; // Stores manually entered topics or OCR results
  notesImageForTopics?: File | null; // Stores the File object for image upload for OCR
  ocrTextPreview?: string | null; // For displaying OCR result or status
}

export interface StudyPlanFormValues {
  subjects: SubjectEntry[];
  examDate: Date;
  startDate: Date;
  studyHoursPerDay: number;
}

export interface TimetableEntry {
  date: string;
  topics: string[];
}

export interface GeneratedStudyScheduleOutput {
  timetable: TimetableEntry[];
  summary: string;
}

// --- Resource Suggester ---
export type SuggestedLearningResourcesOutput = {
  resourceSuggestions: string[];
};

// --- Quiz Maker ---
export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  userAnswer?: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export type CreatedQuizOutput = {
  quiz: string;
};


// --- Charting ---
export interface TimeAllocationData {
  subject: string; 
  hours: number;
  fill: string;
}

// --- Key Point Extractor ---
export interface GenerateKeyPointsInput {
  answerContent: string;
  markWeightage: number;
}

export interface GenerateKeyPointsOutput {
  keyPoints: Array<{
    topic: string;
    points: string[];
  }>;
}
