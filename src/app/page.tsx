"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/study-genie/Header";
import { StudyPlanForm } from "@/components/study-genie/StudyPlanForm";
import { TimetableDisplay } from "@/components/study-genie/TimetableDisplay";
import { TimeAllocationChart } from "@/components/study-genie/TimeAllocationChart";
import { ResourceSuggestions } from "@/components/study-genie/ResourceSuggestions";
import { QuizGenerator } from "@/components/study-genie/QuizGenerator";
import { QuizDisplay } from "@/components/study-genie/QuizDisplay";
import { KeyPointGenerator } from "@/components/study-genie/KeyPointGenerator";
import { PdfExportButton } from "@/components/study-genie/PdfExportButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, BookCopy, HelpCircleIcon, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateStudyPlan, handleCreateQuiz } from "./actions";
import type { StudyPlanFormValues, GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, TimetableEntry, CreatedQuizOutput, SubjectEntry as FormSubjectEntry } from "@/lib/types";
import { format } from "date-fns";
import { useSearchParams, useRouter } from 'next/navigation';


export default function HomePage() {
  const [studyPlanLoading, setStudyPlanLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  
  const [schedule, setSchedule] = useState<GeneratedStudyScheduleOutput | null>(null);
  const [resources, setResources] = useState<SuggestedLearningResourcesOutput | null>(null);
  const [quizJson, setQuizJson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("study-plan");

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section === 'quiz-maker' || section === 'key-points') {
      setActiveTab(section);
      // Clean the URL by removing the section query param after scrolling
      const current = new URL(window.location.toString());
      current.searchParams.delete('section');
      router.replace(current.pathname + current.search, { scroll: false });

      // Scroll to the element if needed
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams, router]);


  const onStudyPlanSubmit = async (data: StudyPlanFormValues) => {
    setStudyPlanLoading(true);
    setSchedule(null);
    setResources(null);
    
    const formattedSubjects: FormSubjectEntry[] = data.subjects.map(s => ({
        id: s.id,
        name: s.name,
        topics: s.topics,
        notesImageForTopics: s.notesImageForTopics,
        ocrTextPreview: s.ocrTextPreview
    }));
    
    const hasAnyTopicText = formattedSubjects.some(s => s.topics && s.topics.trim() !== "");
    const willGenerateImages = hasAnyTopicText; 

    if (willGenerateImages) {
      toast({ title: "Generating Study Plan & Topic Images", description: "AI is crafting your plan and may create images for your topics. This can take a moment..." });
    } else {
      toast({ title: "Generating Study Plan", description: "AI is crafting your personalized plan..." });
    }
    
    const result = await handleGenerateStudyPlan({
      subjects: formattedSubjects,
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 md:w-fit mx-auto mb-8">
            <TabsTrigger value="study-plan" className="text-base py-2.5">
              <BookCopy className="mr-2 h-5 w-5" /> Study Plan Generator
            </TabsTrigger>
            <TabsTrigger value="quiz-maker" id="quiz-maker" className="text-base py-2.5">
              <HelpCircleIcon className="mr-2 h-5 w-5" /> Quiz Maker
            </TabsTrigger>
            <TabsTrigger value="key-points" id="key-points" className="text-base py-2.5">
              <Sparkles className="mr-2 h-5 w-5" /> Key Point Extractor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study-plan">
            <div className="space-y-8">
              <StudyPlanForm onSubmit={onStudyPlanSubmit} isLoading={studyPlanLoading} />
              {studyPlanLoading && (
                <div className="flex flex-col justify-center items-center py-8 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="ml-0 mt-4 text-lg text-muted-foreground">
                    AI is crafting your plan...
                  </p>
                </div>
              )}
              {schedule && (
                <div className="mt-8 space-y-8">
                  <TimetableDisplay timetable={schedule.timetable.map(t => ({...t, topics: t.topics || []})) as TimetableEntry[]} />
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
          </TabsContent>

          <TabsContent value="key-points">
            <div className="space-y-8">
              <KeyPointGenerator />
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
