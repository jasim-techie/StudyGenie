
// --- User Authentication & Profile ---
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'parent';
  familyCode: string; // Generated for students, entered by parents
  linkedStudent?: string; // For parents, the UID of their child
  createdAt: string; // ISO Date String
}

// --- Study Room ---
export interface UploadedFile {
  id: string; // Firestore document ID
  name: string;
  type: 'pdf' | 'ppt' | 'pptx' | 'doc' | 'docx' | 'txt' | 'png' | 'jpg' | 'jpeg' | 'gif' | 'svg';
  isStudied: boolean;
  uploadedAt: string; // ISO Date String
  firebaseStorageUrl: string;
  summary?: string; // Optional AI-generated summary
}

export interface StudyRoomSubject {
  id: string; // Firestore document ID
  name:string;
  files: UploadedFile[];
  createdAt: string; // ISO Date String
}

// --- Cross-check (Parent-Student Questions) ---
export interface CrosscheckQuestion {
    id: string;
    questionText: string;
    type: 'mcq' | 'short';
    options?: string[]; // Only for MCQ
    correctOption?: string; // Only for MCQ
    askedBy: string; // Parent UID
    askedAt: string; // ISO Date String
}

export interface CrosscheckAnswer {
    id: string;
    answerText: string;
    answeredBy: string; // Student UID
    answeredAt: string; // ISO Date String
    isCorrect?: boolean; // Optional: for auto-graded MCQs
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
