
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
import { cn } from "@/lib/utils";

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
          id: q.id || `q-${index}`
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
  
  // Handle case where there are no questions
  if (quiz.questions.length === 0) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Empty Quiz</AlertTitle>
        <AlertDescription>This quiz has no questions. Please try generating it again with different notes.</AlertDescription>
      </Alert>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = quiz.questions.length > 0 ? ((currentQuestionIndex + 1) / quiz.questions.length) * 100 : 0;

  if (showResults) {
    const percentage = quiz.questions.length > 0 ? (score / quiz.questions.length) * 100 : 0;
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
          {quiz.questions.map((q, index) => {
            const isCorrect = userAnswers[q.id] === q.correctAnswer;
            const cardClasses = cn(
              "p-4 rounded-md border",
              isCorrect ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
            );
            const answerClasses = cn(isCorrect ? 'text-green-700' : 'text-red-700');

            return (
              <div key={q.id} className={cardClasses}>
                <p className="font-medium">{index + 1}. {q.questionText}</p>
                <p className="text-sm mt-1">Your answer: <span className={answerClasses}>{userAnswers[q.id] || "Not answered"}</span></p>
                <p className="text-sm">Correct answer: <span className="text-green-700">{q.correctAnswer}</span></p>
                {q.explanation && <p className="text-xs mt-1 text-muted-foreground">Explanation: {q.explanation}</p>}
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <Button onClick={onRetakeQuiz} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz or Generate New
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // This part will only be reached if quiz exists, has questions, and showResults is false
  if (!currentQuestion) {
    // This should ideally not be reached if the empty quiz check above works, but as a safeguard:
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Quiz Error</AlertTitle>
        <AlertDescription>Could not load the current question. Please try generating the quiz again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="shadow-lg w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <HelpCircle className="mr-2 h-6 w-6 text-primary" />
          {quiz.title}
        </CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
        <Progress value={progress} className="w-full mt-2 h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-lg font-medium mb-4">{currentQuestion.questionText}</p>
          <RadioGroup
            value={userAnswers[currentQuestion.id] || ""}
            onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
            className="space-y-2"
          >
            {currentQuestion.options.map((option, index) => (
              <Label
                key={index}
                htmlFor={`${currentQuestion.id}-option-${index}`}
                className="flex items-center space-x-3 p-3 border rounded-md hover:bg-secondary/50 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
              >
                <RadioGroupItem value={option} id={`${currentQuestion.id}-option-${index}`} />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} variant="outline">
          Previous
        </Button>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <Button onClick={handleNextQuestion}>Next</Button>
        ) : (
          <Button onClick={handleSubmitQuiz} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Submit Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
