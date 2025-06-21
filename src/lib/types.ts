
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

export interface StudySchedule {
  timetable: TimetableEntry[];
  summary: string;
}

export interface LearningResource {
  name: string;
  url?: string;
  description?: string;
}

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

export type GeneratedStudyScheduleOutput = {
  timetable: TimetableEntry[];
  summary: string;
};

export type SuggestedLearningResourcesOutput = {
  resourceSuggestions: string[];
};

export type CreatedQuizOutput = {
  quiz: string;
};

export interface TimeAllocationData {
  subject: string; 
  hours: number;
  fill: string;
}

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


// Types for Study Room
export interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'ppt' | 'pptx' | 'doc' | 'docx' | 'txt' | 'png' | 'jpg' | 'jpeg' | 'gif' | 'svg' ; // Example types
  isStudied: boolean;
  // downloadUrl?: string; // For actual file download
}

export interface StudyRoomSubject {
  id: string;
  name: string;
  files: UploadedFile[];
}
