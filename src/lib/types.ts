export interface StudyPlanFormValues {
  subjects: string;
  topics: string;
  examDate: Date;
  startDate: Date;
  studyHoursPerDay: number;
  topicImages?: FileList; // For topic image uploads
}

export interface TimetableEntry {
  date: string;
  topics: string[];
  completed?: boolean[];
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
  correctAnswer: string; // This could be the text of the correct option or an index
  explanation?: string;
  userAnswer?: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

// Type for the output of generateStudySchedule AI flow
export type GeneratedTimetableEntry = {
  date: string;
  topics: string[];
};

export type GeneratedStudyScheduleOutput = {
  timetable: GeneratedTimetableEntry[];
  summary: string; // e.g., "Mathematics: 40%, Physics: 30%, History: 30%"
};

// Type for the output of suggestLearningResources AI flow
export type SuggestedLearningResourcesOutput = {
  resourceSuggestions: string[];
};

// Type for the output of createQuizFromNotes AI flow
export type CreatedQuizOutput = {
  quiz: string; // JSON string representing the quiz
};

export interface TimeAllocationData {
  subject: string;
  hours: number;
  fill: string;
}
