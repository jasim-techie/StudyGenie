
"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { QuizGenerator } from "@/components/features/quiz/QuizGenerator";
import { QuizDisplay } from "@/components/features/quiz/QuizDisplay";
import { handleCreateQuiz } from "../actions";
import type { CreatedQuizOutput } from "@/lib/types";

export default function QuizMakerPage() {
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizJson, setQuizJson] = useState<string | null>(null);

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
        <div className="space-y-8 max-w-2xl mx-auto">
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
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
