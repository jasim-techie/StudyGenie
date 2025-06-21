
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

const MAX_WORDS_KEY_POINTS = 5000; // Increased limit for answer content
const MARK_WEIGHTAGES = [2, 4, 8, 10, 12, 16, 20];

interface KeyPointGeneratorProps {
  generateKeyPointsAction: (
    answerContent: string,
    markWeightage: number
  ) => Promise<{ keyPointsData: GenerateKeyPointsOutput | null; error?: string }>;
}

export function KeyPointGenerator({ generateKeyPointsAction }: KeyPointGeneratorProps) {
  const [answerContent, setAnswerContent] = useState<string>("");
  const [markWeightage, setMarkWeightage] = useState<number>(MARK_WEIGHTAGES[0]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [generatedKeyPoints, setGeneratedKeyPoints] = useState<GenerateKeyPointsOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const words = answerContent.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    if (words.length > MAX_WORDS_KEY_POINTS) {
      setError(`Word limit exceeded. Maximum ${MAX_WORDS_KEY_POINTS} words allowed.`);
    } else {
      setError(null);
    }
  }, [answerContent]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setAnswerContent(newText);
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
      setError(`Word limit exceeded. Maximum ${MAX_WORDS_KEY_POINTS} words allowed.`);
      toast({ title: "Word Limit Exceeded", description: `Please reduce your content to ${MAX_WORDS_KEY_POINTS} words or less.`, variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedKeyPoints(null);
    toast({ title: "Generating Key Points", description: "AI is extracting key points from your content..." });

    try {
      const result = await generateKeyPointsAction(answerContent, markWeightage);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.keyPointsData?.keyPointsByTopic) {
        setGeneratedKeyPoints(result.keyPointsData);
        toast({ title: "Key Points Generated!", description: "Your key points are ready." });
      } else {
        throw new Error("Key points not found in response.");
      }
    } catch (err) {
      console.error("Error generating key points:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      toast({ title: "Key Point Generation Failed", description: errorMessage, variant: "destructive" });
      setError(`Failed to generate key points: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          Key Point Extractor
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
          {Object.keys(generatedKeyPoints.keyPointsByTopic).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(generatedKeyPoints.keyPointsByTopic).map(([topic, points]) => (
                <div key={topic}>
                  <h4 className="font-semibold text-lg mb-2">{topic}</h4>
                  <ul className="space-y-2 list-disc list-inside bg-muted/50 p-4 rounded-md">
                    {points.map((point, index) => (
                      <li key={index} className="text-base text-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
