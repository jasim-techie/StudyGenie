
"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StudyPlanForm } from "@/components/features/study-plan/StudyPlanForm";
import { TimetableDisplay } from "@/components/features/study-plan/TimetableDisplay";
import { TimeAllocationChart } from "@/components/features/study-plan/TimeAllocationChart";
import { ResourceSuggestions } from "@/components/features/study-plan/ResourceSuggestions";
import { PdfExportButton } from "@/components/shared/PdfExportButton";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateStudyPlan } from "../actions";
import type { StudyPlanFormValues, GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, TimetableEntry } from "@/lib/types";
import { format } from "date-fns";

export default function StudyPlanPage() {
  const [studyPlanLoading, setStudyPlanLoading] = useState(false);
  const [schedule, setSchedule] = useState<GeneratedStudyScheduleOutput | null>(null);
  const [resources, setResources] = useState<SuggestedLearningResourcesOutput | null>(null);
  const { toast } = useToast();

  const onStudyPlanSubmit = async (data: StudyPlanFormValues) => {
    setStudyPlanLoading(true);
    setSchedule(null);
    setResources(null);
    
    toast({ title: "Generating Study Plan", description: "AI is crafting your personalized plan. This may take a moment..." });
    
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
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
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
