"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, BookOpen, ListChecks, CalendarDays, Clock, ImageUp } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { StudyPlanFormValues } from "@/lib/types"; // Adjusted to use the imported type fully
import type { ChangeEvent } from "react";


const formSchema = z.object({
  subjects: z.string().min(1, "Please enter at least one subject."),
  topics: z.string().min(1, "Please enter topics to cover."),
  examDate: z.date({ required_error: "Exam date is required." }),
  startDate: z.date({ required_error: "Start date is required." }),
  studyHoursPerDay: z.coerce.number().min(0.5, "Minimum 0.5 hours").max(12, "Maximum 12 hours"),
  topicImages: z.instanceof(FileList).optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface StudyPlanFormProps {
  onSubmit: (data: StudyPlanFormValues) => void; // StudyPlanFormValues already includes topicImages
  isLoading: boolean;
}

export function StudyPlanForm({ onSubmit, isLoading }: StudyPlanFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: "",
      topics: "",
      studyHoursPerDay: 3,
      startDate: new Date(),
      examDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
    },
  });

  async function handleSubmit(values: FormSchemaType) {
    // The values already match StudyPlanFormValues if we ensure FormSchemaType is compatible
    // No need to convert topicImages here if the action handler expects FileList
    // However, the action handler will need to convert FileList to data URIs.
    // For simplicity, we'll pass FileList and let the action handler deal with it.
    // If the action handler expects data URIs directly, conversion should happen here.
    // Let's assume onSubmit (which leads to the server action) can handle FileList
    // or that the page component will do the conversion.
    // The type StudyPlanFormValues already defined topicImages as FileList.
    onSubmit(values as StudyPlanFormValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><BookOpen className="mr-2 h-4 w-4" />Subjects</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Mathematics, Physics, History" {...field} />
              </FormControl>
              <FormDescription>Enter subjects, separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><ListChecks className="mr-2 h-4 w-4" />Topics</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Algebra, Thermodynamics, World War II" {...field} rows={3} />
              </FormControl>
              <FormDescription>Enter topics for each subject, separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="topicImages"
          render={({ field: { onChange, value, ...restField } }) => (
            <FormItem>
              <FormLabel className="flex items-center"><ImageUp className="mr-2 h-4 w-4" />Topic Images (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.files)}
                  {...restField}
                  className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </FormControl>
              <FormDescription>Upload images related to your topics for better context.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center"><CalendarDays className="mr-2 h-4 w-4" />Study Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center"><CalendarDays className="mr-2 h-4 w-4" />Exam Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < (form.getValues("startDate") || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="studyHoursPerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><Clock className="mr-2 h-4 w-4" />Available Study Hours Per Day</FormLabel>
              <FormControl>
                <Input type="number" step="0.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? "Generating Plan..." : "Generate Study Plan"}
        </Button>
      </form>
    </Form>
  );
}
