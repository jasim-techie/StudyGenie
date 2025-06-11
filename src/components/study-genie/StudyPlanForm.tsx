
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, BookOpen, ListChecks, CalendarDays, Clock, ImageUp, FileText, ImageIcon, Loader2, PlusCircle, XCircle, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { StudyPlanFormValues, SubjectEntry } from "@/lib/types";
import { type ChangeEvent, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleImageUploadForTopicExtraction } from "@/app/actions";

const subjectEntrySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Subject name is required."),
  topicInputMode: z.enum(["manual", "image"]).default("manual"),
  topics: z.string(), // Will be populated by manual input or OCR
  notesImageForTopics: z.any().nullable().optional(), // Store File object
  ocrTextPreview: z.string().nullable().optional(),
});

const formSchema = z.object({
  subjects: z.array(subjectEntrySchema).min(1, "Please add at least one subject."),
  examDate: z.date({ required_error: "Exam date is required." }),
  startDate: z.date({ required_error: "Start date is required." }),
  studyHoursPerDay: z.coerce.number().min(0.5, "Minimum 0.5 hours").max(12, "Maximum 12 hours"),
  supplementaryTopicImages: z.any().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface StudyPlanFormProps {
  onSubmit: (data: StudyPlanFormValues) => Promise<void>; // Make onSubmit async
  isLoading: boolean;
}

export function StudyPlanForm({ onSubmit, isLoading }: StudyPlanFormProps) {
  const [ocrLoadingStates, setOcrLoadingStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [{ id: crypto.randomUUID(), name: "", topicInputMode: "manual", topics: "", notesImageForTopics: null, ocrTextPreview: null }],
      studyHoursPerDay: 3,
      startDate: new Date(),
      examDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subjects",
  });

  const handleNotesImageChangeForSubject = async (subjectIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const subjectId = fields[subjectIndex].id;

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid File Type", description: "Please upload an image file for topic extraction.", variant: "destructive" });
        form.setValue(`subjects.${subjectIndex}.notesImageForTopics`, null);
        return;
      }
      setOcrLoadingStates(prev => ({ ...prev, [subjectId]: true }));
      form.setValue(`subjects.${subjectIndex}.ocrTextPreview`, "Extracting text from image...");
      form.setValue(`subjects.${subjectIndex}.topics`, ""); // Clear manual topics

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUri = reader.result as string;
        const result = await handleImageUploadForTopicExtraction(imageDataUri);
        setOcrLoadingStates(prev => ({ ...prev, [subjectId]: false }));
        if (result.error) {
          toast({ title: "OCR Error", description: result.error, variant: "destructive" });
          form.setValue(`subjects.${subjectIndex}.ocrTextPreview`, `Error: ${result.error}`);
        } else if (result.extractedText !== null) {
          form.setValue(`subjects.${subjectIndex}.topics`, result.extractedText);
          form.setValue(`subjects.${subjectIndex}.ocrTextPreview`, result.extractedText || "No text extracted.");
          toast({ title: "Text Extracted", description: `Text for subject "${form.getValues(`subjects.${subjectIndex}.name`)}" populated.` });
        }
      };
      reader.readAsDataURL(file);
      form.setValue(`subjects.${subjectIndex}.notesImageForTopics`, file);
    }
  };

  async function handleSubmit(values: FormSchemaType) {
    // Validate that topics are provided for each subject based on its input mode
    for (let i = 0; i < values.subjects.length; i++) {
      const subject = values.subjects[i];
      if (!subject.topics || subject.topics.trim() === "") {
        toast({
          title: `Missing Topics for ${subject.name || `Subject ${i + 1}`}`,
          description: `Please enter topics or upload an image for topic extraction for ${subject.name || `Subject ${i + 1}`}.`,
          variant: "destructive"
        });
        return; // Stop submission
      }
    }
    await onSubmit(values);
  }
  
  const totalOcrLoading = Object.values(ocrLoadingStates).some(loading => loading);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        
        {fields.map((field, index) => {
          const subjectId = field.id;
          const currentOcrLoading = ocrLoadingStates[subjectId] || false;
          return (
            <Card key={field.id} className="shadow-md border border-border/70 p-0 transition-all duration-300 ease-in-out hover:shadow-lg">
              <CardHeader className="bg-muted/30 p-4 rounded-t-lg border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="font-headline text-xl">Subject {index + 1}</CardTitle>
                  {fields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove subject</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name={`subjects.${index}.name`}
                  render={({ field: subjectNameField }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base"><BookOpen className="mr-2 h-5 w-5 text-primary" />Subject Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mathematics" {...subjectNameField} className="text-base"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name={`subjects.${index}.topicInputMode`}
                  render={({ field: modeField }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">Topic Input Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            modeField.onChange(value);
                            form.setValue(`subjects.${index}.topics`, "");
                            form.setValue(`subjects.${index}.ocrTextPreview`, null);
                            form.setValue(`subjects.${index}.notesImageForTopics`, null);
                          }}
                          value={modeField.value}
                          className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="manual" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center text-base">
                              <FileText className="mr-2 h-5 w-5 text-primary" /> Manual Entry
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="image" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center text-base">
                              <ImageIcon className="mr-2 h-5 w-5 text-primary" /> Upload Notes Image (OCR)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch(`subjects.${index}.topicInputMode`) === "manual" && (
                  <FormField
                    control={form.control}
                    name={`subjects.${index}.topics`}
                    render={({ field: topicsField }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base"><ListChecks className="mr-2 h-5 w-5 text-primary" />Topics (Manual)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter topics, separated by commas or line-by-line." {...topicsField} rows={4} className="text-base"/>
                        </FormControl>
                        <FormDescription>Enter topics for this subject.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch(`subjects.${index}.topicInputMode`) === "image" && (
                  <FormField
                    control={form.control}
                    name={`subjects.${index}.notesImageForTopics`}
                    render={({ field: { onChange: onFileChangeHandler, value, ...restField } }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-base"><ImageUp className="mr-2 h-5 w-5 text-primary" />Upload Notes Image for Topics</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleNotesImageChangeForSubject(index, e)}
                            {...restField}
                            className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                          />
                        </FormControl>
                        <FormDescription>Upload an image of your notes for this subject. Text will be extracted to populate topics.</FormDescription>
                        {currentOcrLoading && (
                          <div className="flex items-center space-x-2 mt-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span>Extracting text...</span>
                          </div>
                        )}
                        {form.watch(`subjects.${index}.ocrTextPreview`) && !currentOcrLoading && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-medium text-foreground">Extracted Text Preview:</p>
                            <Textarea readOnly value={form.watch(`subjects.${index}.ocrTextPreview`) || ""} rows={5} className="bg-muted/50 border-border/50 text-sm"/>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                 {/* Hidden field to store topics from OCR, always read by handleSubmit */}
                {form.watch(`subjects.${index}.topicInputMode`) === 'image' && (
                    <Controller
                        control={form.control}
                        name={`subjects.${index}.topics`}
                        render={({ field }) => <Input type="hidden" {...field} />}
                    />
                )}
              </CardContent>
            </Card>
          );
        })}

        <Button type="button" variant="outline" onClick={() => append({ id: crypto.randomUUID(), name: "", topicInputMode: "manual", topics: "", notesImageForTopics: null, ocrTextPreview: null })} className="w-full md:w-auto flex items-center gap-2 group hover:border-primary hover:text-primary transition-colors">
          <PlusCircle className="h-5 w-5 group-hover:text-primary transition-colors" /> Add Another Subject
        </Button>
        
        <FormField
          control={form.control}
          name="supplementaryTopicImages"
          render={({ field: { onChange, value, ...restField } }) => (
            <FormItem>
              <FormLabel className="flex items-center text-base"><ImageUp className="mr-2 h-5 w-5 text-primary" />General Supplementary Topic Images (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.files)}
                  {...restField}
                  className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </FormControl>
              <FormDescription>Upload additional images for the overall plan, if any. These are different from notes uploaded for OCR per subject.</FormDescription>
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
                <FormLabel className="flex items-center text-base"><CalendarDays className="mr-2 h-5 w-5 text-primary" />Study Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal text-base h-11",
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
                <FormLabel className="flex items-center text-base"><CalendarDays className="mr-2 h-5 w-5 text-primary" />Exam Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal text-base h-11",
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
              <FormLabel className="flex items-center text-base"><Clock className="mr-2 h-5 w-5 text-primary" />Available Study Hours Per Day</FormLabel>
              <FormControl>
                <Input type="number" step="0.5" {...field} className="text-base h-11" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || totalOcrLoading} className="w-full md:w-auto text-base py-3 px-6 h-auto transition-all duration-300 ease-in-out hover:shadow-lg focus:ring-4 focus:ring-primary/30">
          {isLoading ? (
            <> <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Plan...</>
          ) : totalOcrLoading ? (
            <> <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Image(s)...</>
          ) : (
            "Generate Study Plan"
          )}
        </Button>
      </form>
    </Form>
  );
}
