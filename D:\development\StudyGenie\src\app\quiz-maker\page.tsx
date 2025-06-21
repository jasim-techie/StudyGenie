"use client";

import { useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { QuizGenerator } from "@/components/study-genie/QuizGenerator";
import { QuizDisplay } from "@/components/study-genie/QuizDisplay";
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
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by Genkit & Next.js</p>
      </footer>
    </div>
  );
}
