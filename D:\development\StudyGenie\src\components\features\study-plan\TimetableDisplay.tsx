
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { TimetableEntry as GeneratedTimetableEntry } from "@/lib/types"; // Use GeneratedTimetableEntry to avoid conflict
import { CalendarClock, CheckCircle2 } from "lucide-react";

interface TimetableEntry extends GeneratedTimetableEntry {
  completed: boolean[];
}

interface TimetableDisplayProps {
  timetable: GeneratedTimetableEntry[];
}

export function TimetableDisplay({ timetable: initialTimetable }: TimetableDisplayProps) {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);

  useEffect(() => {
    setTimetable(
      initialTimetable.map(entry => ({
        ...entry,
        completed: Array(entry.topics.length).fill(false),
      }))
    );
  }, [initialTimetable]);

  const handleTopicToggle = (dateIndex: number, topicIndex: number) => {
    setTimetable(prevTimetable =>
      prevTimetable.map((entry, i) =>
        i === dateIndex
          ? {
              ...entry,
              completed: entry.completed.map((status, j) =>
                j === topicIndex ? !status : status
              ),
            }
          : entry
      )
    );
  };
  
  if (!timetable || timetable.length === 0) {
    return null; 
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <CalendarClock className="mr-2 h-6 w-6 text-primary" />
          Your Study Timetable
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {timetable.map((entry, dateIndex) => (
            <AccordionItem value={`item-${dateIndex}`} key={dateIndex}>
              <AccordionTrigger className="text-lg font-medium hover:bg-secondary/50 px-4 py-3 rounded-md">
                {new Date(entry.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                {entry.topics.length > 0 ? (
                  <ul className="space-y-3">
                    {entry.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center space-x-3 p-2 bg-background rounded-md border">
                        <Checkbox
                          id={`topic-${dateIndex}-${topicIndex}`}
                          checked={entry.completed[topicIndex]}
                          onCheckedChange={() => handleTopicToggle(dateIndex, topicIndex)}
                          aria-label={`Mark ${topic} as complete`}
                        />
                        <Label
                          htmlFor={`topic-${dateIndex}-${topicIndex}`}
                          className={`flex-1 text-sm ${
                            entry.completed[topicIndex] ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {topic}
                        </Label>
                        {entry.completed[topicIndex] && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">No topics scheduled for this day. Perhaps a rest day or catch-up day!</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
