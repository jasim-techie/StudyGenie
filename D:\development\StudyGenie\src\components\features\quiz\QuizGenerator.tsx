
"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CreatedQuizOutput } from "@/lib/types";

interface QuizGeneratorProps {
  onQuizGenerated: (quizJson: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  createQuizAction: (notesText: string, numQuestions?: number) => Promise<{ quizData: CreatedQuizOutput | null; error?: string }>;
}

const MAX_WORDS = 3000;

export function QuizGenerator({ onQuizGenerated, isLoading, setIsLoading, createQuizAction }: QuizGeneratorProps) {
  const [notesText, setNotesText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const words = notesText.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    if (words.length > MAX_WORDS) {
      setError(`Word limit exceeded. Maximum ${MAX_WORDS} words allowed.`);
    } else {
      setError(null);
    }
  }, [notesText]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotesText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!notesText.trim()) {
      setError("Please paste your study notes.");
      toast({ title: "Empty Notes", description: "Please paste some text to generate a quiz.", variant: "destructive" });
      return;
    }
    if (wordCount > MAX_WORDS) {
      setError(`Word limit exceeded. Maximum ${MAX_WORDS} words allowed.`);
      toast({ title: "Word Limit Exceeded", description: `Please reduce your notes to ${MAX_WORDS} words or less.`, variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // For now, let's default to 5 questions. This could be a user input later.
    const numQuestions = 5; 

    try {
      const result = await createQuizAction(notesText, numQuestions);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.quizData?.quiz) {
        onQuizGenerated(result.quizData.quiz);
        toast({ title: "Quiz Generated!", description: "Your quiz is ready to be taken." });
      } else {
        throw new Error("Quiz data not found in response.");
      }
    } catch (err) {
      console.error("Error generating quiz:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      toast({ title: "Quiz Generation Failed", description: errorMessage, variant: "destructive" });
      setError(`Failed to generate quiz: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <FileQuestion className="mr-2 h-6 w-6 text-primary" />
          Paste Your Study Notes
        </CardTitle>
        <CardDescription>
          Enter your notes, textbook content, or copied material below (max ${MAX_WORDS} words). 
          Our AI will generate a quiz to help you review.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="notes-input" className="text-base font-medium">Your Study Notes</Label>
          <Textarea
            id="notes-input"
            value={notesText}
            onChange={handleTextChange}
            placeholder="Paste your notes here..."
            rows={15}
            className="mt-2 text-base min-h-[200px] resize-y"
          />
          <div className="mt-2 flex justify-between items-center text-sm">
            <p className={wordCount > MAX_WORDS ? "text-destructive" : "text-muted-foreground"}>
              Word Count: {wordCount} / {MAX_WORDS}
            </p>
            {error && <p className="text-destructive">{error}</p>}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || wordCount === 0 || wordCount > MAX_WORDS} 
          className="w-full text-base py-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Generate Quiz ({wordCount > 0 && wordCount <= MAX_WORDS ? '5 Questions' : '...'})
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
