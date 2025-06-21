"use client";

import { useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { StudyPlanForm } from "@/components/study-genie/StudyPlanForm";
import { TimetableDisplay } from "@/components/study-genie/TimetableDisplay";
import { TimeAllocationChart } from "@/components/study-genie/TimeAllocationChart";
import { ResourceSuggestions } from "@/components/study-genie/ResourceSuggestions";
import { PdfExportButton } from "@/components/study-genie/PdfExportButton";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateStudyPlan } from "../actions";
import type { StudyPlanFormValues, GeneratedStudyScheduleOutput, SuggestedLearningResourcesOutput, TimetableEntry, SubjectEntry as FormSubjectEntry } from "@/lib/types";
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
      toast({ title: "Generating Study Plan & Topic Images", description: "AI is crafting your plan and may create images. This can take a moment..." });
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-8">
          <StudyPlanForm onSubmit={onStudyPlanSubmit} isLoading={studyPlanLoading} />
          {studyPlanLoading && (
            <div className="flex flex-col justify-center items-center py-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-0 mt-4 text-lg text-muted-foreground">
                AI is crafting your plan and may be generating images...
              </p>
            </div>
          )}
          {schedule && (
            <div className="mt-8 space-y-8">
              <TimetableDisplay timetable={schedule.timetable.map(t => ({ ...t, topics: t.topics || [] })) as TimetableEntry[]} />
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
        <p className="text-xs mt-1">Powered by Genkit & Next.js</p>
      </footer>
    </div>
  );
}
