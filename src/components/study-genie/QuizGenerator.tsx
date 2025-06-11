"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, FileQuestion } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizGeneratorProps {
  onQuizGenerated: (quizJson: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  createQuizAction: (notesDataUri: string) => Promise<{ quizData: { quiz: string } | null; error?: string }>;
}

export function QuizGenerator({ onQuizGenerated, isLoading, setIsLoading, createQuizAction }: QuizGeneratorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setFileError(null);
      } else {
        setFile(null);
        setFileError("Please upload a PDF file.");
        toast({ title: "Invalid File Type", description: "Only PDF files are accepted for quiz generation.", variant: "destructive" });
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setFileError("Please select a PDF file to upload.");
      return;
    }

    setIsLoading(true);
    setFileError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      if (dataUri) {
        try {
          const result = await createQuizAction(dataUri);
          if (result.error) {
            throw new Error(result.error);
          }
          if (result.quizData?.quiz) {
            onQuizGenerated(result.quizData.quiz);
            toast({ title: "Quiz Generated!", description: "Your quiz is ready to be taken." });
          } else {
            throw new Error("Quiz data not found in response.");
          }
        } catch (error) {
          console.error("Error generating quiz:", error);
          const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
          toast({ title: "Quiz Generation Failed", description: errorMessage, variant: "destructive" });
          setFileError(`Failed to generate quiz: ${errorMessage}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFileError("Could not read file data.");
        toast({ title: "File Read Error", description: "Could not read file data.", variant: "destructive" });
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setFileError("Error reading file.");
      toast({ title: "File Read Error", description: "Error reading file.", variant: "destructive" });
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <FileQuestion className="mr-2 h-6 w-6 text-primary" />
          Study Notes Quiz Maker
        </CardTitle>
        <CardDescription>
          Upload your study notes (PDF) and we&apos;ll generate a quiz for you!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="notes-upload" className="text-base font-medium">Upload PDF Notes</Label>
          <div className="mt-2 flex items-center space-x-3">
            <Input
              id="notes-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <Button onClick={handleSubmit} disabled={!file || isLoading} size="icon" aria-label="Generate Quiz">
              <UploadCloud className="h-5 w-5" />
            </Button>
          </div>
          {file && <p className="mt-2 text-sm text-muted-foreground">Selected file: {file.name}</p>}
          {fileError && <p className="mt-2 text-sm text-destructive">{fileError}</p>}
        </div>
        
        {isLoading && (
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Generating quiz, please wait...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
