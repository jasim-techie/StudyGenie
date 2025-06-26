
"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Header } from "@/components/study-genie/Header";
import { StudyPlanForm } from "@/components/study-genie/StudyPlanForm";
import { TimetableDisplay } from "@/components/study-genie/TimetableDisplay";
import { TimeAllocationChart } from "@/components/study-genie/TimeAllocationChart";
import { ResourceSuggestions } from "@/components/study-genie/ResourceSuggestions";
import { PdfExportButton } from "@/components/study-genie/PdfExportButton";
import { QuizGenerator } from "@/components/study-genie/QuizGenerator";
import { QuizDisplay } from "@/components/study-genie/QuizDisplay";
import { KeyPointGenerator } from "@/components/study-genie/KeyPointGenerator";
import { handleGenerateStudyPlan, handleCreateQuiz, handleGenerateKeyPoints } from "./actions";
import type { StudyPlanFormValues, GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, CreatedQuizOutput, GenerateKeyPointsOutput } from "@/lib/types";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, BookCopy, HelpCircleIcon, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function HomePageContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Global state for all features
  const [activeTab, setActiveTab] = useState("study-plan");

  // Study Plan State
  const [studyPlanLoading, setStudyPlanLoading] = useState(false);
  const [schedule, setSchedule] = useState<GeneratedStudyScheduleOutput | null>(null);
  const [resources, setResources] = useState<SuggestedLearningResourcesOutput | null>(null);

  // Quiz Maker State
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizJson, setQuizJson] = useState<string | null>(null);
  
  // Key Points State
  const [keyPointsLoading, setKeyPointsLoading] = useState(false);
  const [keyPointsData, setKeyPointsData] = useState<GenerateKeyPointsOutput | null>(null);


  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'quiz-maker' || tab === 'key-points') {
      setActiveTab(tab);
    } else {
      setActiveTab('study-plan');
    }
  }, [searchParams]);

  // Study Plan Logic
  const onStudyPlanSubmit = async (data: StudyPlanFormValues) => {
    setStudyPlanLoading(true);
    setSchedule(null);
    setResources(null);
    toast({ title: "Generating Study Plan", description: "AI is crafting your personalized plan..." });
    const result = await handleGenerateStudyPlan({
      subjects: data.subjects,
      examDate: format(data.examDate, "yyyy-MM-dd"),
      startDate: format(data.startDate, "yyyy-MM-dd"),
      availableStudyHoursPerDay: data.studyHoursPerDay,
    });
    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      setSchedule(result.schedule);
      setResources(result.resources);
      toast({ title: "Success!", description: "Your study plan and resources are ready." });
    }
    setStudyPlanLoading(false);
  };
  
  // Quiz Maker Logic
  const onQuizGenerated = (generatedQuizJson: string) => {
    setQuizJson(generatedQuizJson);
    setQuizLoading(false);
  };
  const handleRetakeQuiz = () => setQuizJson(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <section className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline text-foreground">
            Welcome to StudyGenie AI
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your personal AI-powered assistant to help you study smarter, not harder.
            Choose a tool below to get started.
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12 md:w-fit mx-auto mb-8">
            <TabsTrigger value="study-plan" className="text-base py-2.5 h-full">
              <BookCopy className="mr-2 h-5 w-5" /> Study Plan Generator
            </TabsTrigger>
            <TabsTrigger value="quiz-maker" id="quiz-maker" className="text-base py-2.5 h-full">
              <HelpCircleIcon className="mr-2 h-5 w-5" /> Quiz Maker
            </TabsTrigger>
            <TabsTrigger value="key-points" id="key-points" className="text-base py-2.5 h-full">
              <Sparkles className="mr-2 h-5 w-5" /> Key Point Extractor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study-plan">
             <div className="space-y-8 max-w-4xl mx-auto">
                <StudyPlanForm onSubmit={onStudyPlanSubmit} isLoading={studyPlanLoading} />
                {studyPlanLoading && (
                  <div className="flex flex-col justify-center items-center py-8 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="ml-0 mt-4 text-lg text-muted-foreground">AI is crafting your plan...</p>
                  </div>
                )}
                {schedule && (
                  <div className="mt-8 space-y-8">
                    <TimetableDisplay timetable={schedule.timetable} />
                    {schedule.summary && schedule.summary.trim() !== "" && <TimeAllocationChart summary={schedule.summary} />}
                    {resources && resources.resourceSuggestions && resources.resourceSuggestions.length > 0 && <ResourceSuggestions resources={resources.resourceSuggestions} />}
                    <div className="text-center mt-6">
                      <PdfExportButton disabled={!schedule} />
                    </div>
                  </div>
                )}
              </div>
          </TabsContent>

          <TabsContent value="quiz-maker">
             <div className="space-y-8 max-w-3xl mx-auto">
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
          </TabsContent>

          <TabsContent value="key-points">
            <div className="space-y-8 max-w-3xl mx-auto">
              <KeyPointGenerator generateKeyPointsAction={handleGenerateKeyPoints} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by Genkit & Next.js</p>
      </footer>
    </div>
  );
}


export default function HomePage() {
  return (
    <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
      <HomePageContent />
    </Suspense>
  )
}
