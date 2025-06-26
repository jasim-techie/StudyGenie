
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { CalendarIcon, BookOpen, ListChecks, CalendarDays, Clock, ImageIcon, Loader2, PlusCircle, Trash2, Crop } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { StudyPlanFormValues } from "@/lib/types";
import { type ChangeEvent, useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleImageUploadForTopicExtraction } from "@/app/actions";
import { ImageCropDialog } from "./ImageCropDialog";

const subjectEntrySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Subject name is required."),
  topics: z.string(), 
  notesImageForTopics: z.any().nullable().optional(), 
  ocrTextPreview: z.string().nullable().optional(),
});

const formSchema = z.object({
  subjects: z.array(subjectEntrySchema).min(1, "Please add at least one subject."),
  examDate: z.date({ required_error: "Exam date is required." }),
  startDate: z.date({ required_error: "Start date is required." }),
  studyHoursPerDay: z.coerce.number().min(0.5, "Minimum 0.5 hours").max(12, "Maximum 12 hours"),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface StudyPlanFormProps {
  onSubmit: (data: StudyPlanFormValues) => Promise<void>;
  isLoading: boolean;
}

export function StudyPlanForm({ onSubmit, isLoading }: StudyPlanFormProps) {
  const [ocrLoadingStates, setOcrLoadingStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // State for the crop dialog
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [subjectIndexToUpdate, setSubjectIndexToUpdate] = useState<number | null>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [{ id: crypto.randomUUID(), name: "", topics: "", notesImageForTopics: null, ocrTextPreview: null }],
      studyHoursPerDay: 3,
      startDate: undefined,
      examDate: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subjects",
  });

  useEffect(() => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    form.setValue('startDate', today, { shouldValidate: false, shouldDirty: false });
    form.setValue('examDate', thirtyDaysFromNow, { shouldValidate: false, shouldDirty: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelectForCropping = (subjectIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid File Type", description: "Please upload an image file.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
        setSubjectIndexToUpdate(subjectIndex);
        setIsCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset file input to allow re-selection of the same file
    if(event.target) event.target.value = "";
  };

  const handleCropComplete = async (croppedImageDataUri: string) => {
    if (subjectIndexToUpdate === null) return;

    const subjectId = fields[subjectIndexToUpdate].id;
    setOcrLoadingStates(prev => ({ ...prev, [subjectId]: true }));
    form.setValue(`subjects.${subjectIndexToUpdate}.ocrTextPreview`, "Extracting text from cropped image...");

    const result = await handleImageUploadForTopicExtraction(croppedImageDataUri);
    setOcrLoadingStates(prev => ({ ...prev, [subjectId]: false }));

    if (result.error || !result.extractedTopics) {
      toast({ title: "OCR Error", description: result.error || "Failed to extract text.", variant: "destructive" });
      form.setValue(`subjects.${subjectIndexToUpdate}.ocrTextPreview`, `Error: ${result.error || "Unknown error"}`);
    } else {
      const { newLineSeparatedTopics, rawText } = result.extractedTopics;
      const currentTopics = form.getValues(`subjects.${subjectIndexToUpdate}.topics`);
      const newTopics = currentTopics ? `${currentTopics}\n${newLineSeparatedTopics}` : newLineSeparatedTopics;
      
      form.setValue(`subjects.${subjectIndexToUpdate}.topics`, newTopics, { shouldValidate: true });
      form.setValue(`subjects.${subjectIndexToUpdate}.ocrTextPreview`, rawText || "No text extracted.");
      toast({ title: "Text Extracted & Appended", description: "Topics have been added from your image." });
    }

    // Reset crop dialog state
    setIsCropDialogOpen(false);
    setImageToCrop(null);
    setSubjectIndexToUpdate(null);
  };
  
  const triggerImageUpload = (subjectId: string) => {
    fileInputRefs.current[subjectId]?.click();
  };

  async function handleSubmit(values: FormSchemaType) {
    if (!values.startDate || !values.examDate) {
        toast({ title: "Dates Required", description: "Please ensure both start and exam dates are selected.", variant: "destructive" });
        return;
    }

    for (let i = 0; i < values.subjects.length; i++) {
      const subject = values.subjects[i];
      if (!subject.topics || subject.topics.trim() === "") {
        toast({ title: `Missing Topics for ${subject.name || `Subject ${i + 1}`}`, description: `Please enter topics or upload an image for topic extraction.`, variant: "destructive" });
        return; 
      }
    }
    await onSubmit(values);
  }
  
  const totalOcrLoading = Object.values(ocrLoadingStates).some(loading => loading);

  return (
    <>
      <ImageCropDialog 
        isOpen={isCropDialogOpen}
        onClose={() => setIsCropDialogOpen(false)}
        imageSrc={imageToCrop}
        onCropComplete={handleCropComplete}
      />
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
                  
                  <FormField
                    control={form.control}
                    name={`subjects.${index}.topics`}
                    render={({ field: topicsField }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center text-base"><ListChecks className="mr-2 h-5 w-5 text-primary" />Topics</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => triggerImageUpload(subjectId)}
                            disabled={currentOcrLoading || isLoading}
                            className="ml-2"
                          >
                            {currentOcrLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <ImageIcon className="mr-2 h-4 w-4" />
                            )}
                            Upload & Crop Image
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea placeholder="Enter topics manually, separated by commas or new lines. Or, upload an image to extract topics." {...topicsField} rows={5} className="text-base mt-2"/>
                        </FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(el) => fileInputRefs.current[subjectId] = el}
                          onChange={(e) => handleFileSelectForCropping(index, e)}
                        />
                        <FormDescription>Use the button to upload an image of your notes, crop the relevant area, and extract text.</FormDescription>
                        {currentOcrLoading && (
                          <div className="flex items-center space-x-2 mt-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span>Extracting text...</span>
                          </div>
                        )}
                        {form.watch(`subjects.${index}.ocrTextPreview`) && !currentOcrLoading && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-medium text-foreground">Last OCR Extraction Preview (Raw Text):</p>
                            <Textarea readOnly value={form.watch(`subjects.${index}.ocrTextPreview`) || ""} rows={3} className="bg-muted/50 border-border/50 text-sm"/>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            );
          })}

          <Button type="button" variant="outline" onClick={() => append({ id: crypto.randomUUID(), name: "", topics: "", notesImageForTopics: null, ocrTextPreview: null })} className="w-full md:w-auto flex items-center gap-2 group hover:border-primary hover:text-primary transition-colors">
            <PlusCircle className="h-5 w-5 group-hover:text-primary transition-colors" /> Add Another Subject
          </Button>
          
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
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0,0,0,0);
                          return date < new Date(today.setDate(today.getDate() - 1));
                        }}
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
                        disabled={(date) => {
                          const currentStartDate = form.getValues("startDate");
                          if (currentStartDate instanceof Date && !isNaN(currentStartDate.getTime())) {
                             return date < currentStartDate;
                          }
                          const today = new Date();
                          today.setHours(0,0,0,0);
                          return date < today;
                        }}
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
    </>
  );
}
