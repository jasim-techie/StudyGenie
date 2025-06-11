
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, BookOpen, ListChecks, CalendarDays, Clock, ImageUp, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { StudyPlanFormValues } from "@/lib/types"; 
import { type ChangeEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleImageUploadForTopicExtraction } from "@/app/actions";

const formSchema = z.object({
  subjects: z.string().min(1, "Please enter at least one subject."),
  topics: z.string().min(1, "Please enter topics or upload notes for topic extraction."),
  examDate: z.date({ required_error: "Exam date is required." }),
  startDate: z.date({ required_error: "Start date is required." }),
  studyHoursPerDay: z.coerce.number().min(0.5, "Minimum 0.5 hours").max(12, "Maximum 12 hours"),
  topicImages: z.any().optional(), // For supplementary topic images
  topicInputMode: z.enum(["manual", "image"]).default("manual"),
  notesImageForTopics: z.any().optional(), // For OCR topic extraction
});

type FormSchemaType = z.infer<typeof formSchema>;

interface StudyPlanFormProps {
  onSubmit: (data: StudyPlanFormValues) => void;
  isLoading: boolean;
}

export function StudyPlanForm({ onSubmit, isLoading }: StudyPlanFormProps) {
  const [ocrLoading, setOcrLoading] = useState(false);
  const [extractedOcrTextPreview, setExtractedOcrTextPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: "",
      topics: "",
      studyHoursPerDay: 3,
      startDate: new Date(),
      examDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      topicInputMode: "manual",
    },
  });

  const topicInputMode = form.watch("topicInputMode");

  const handleNotesImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid File Type", description: "Please upload an image file for topic extraction.", variant: "destructive" });
        form.setValue("notesImageForTopics", null);
        return;
      }
      setOcrLoading(true);
      setExtractedOcrTextPreview("Extracting text from image...");
      form.setValue("topics", ""); // Clear manual topics if image is uploaded

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUri = reader.result as string;
        const result = await handleImageUploadForTopicExtraction(imageDataUri);
        setOcrLoading(false);
        if (result.error) {
          toast({ title: "OCR Error", description: result.error, variant: "destructive" });
          setExtractedOcrTextPreview(`Error: ${result.error}`);
        } else if (result.extractedText !== null) {
          form.setValue("topics", result.extractedText);
          setExtractedOcrTextPreview(result.extractedText || "No text extracted.");
          toast({ title: "Text Extracted", description: "Text from notes image has been populated into the topics field." });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(values: FormSchemaType) {
    const finalTopics = values.topics;
    
    if (!finalTopics && values.topicInputMode === "image") {
        toast({ title: "Missing Topics", description: "Please upload an image for topic extraction or enter topics manually.", variant: "destructive"});
        return;
    }
    if (!finalTopics && values.topicInputMode === "manual") {
        toast({ title: "Missing Topics", description: "Please enter your study topics.", variant: "destructive"});
        return;
    }


    onSubmit({
        subjects: values.subjects,
        topics: finalTopics,
        examDate: values.examDate,
        startDate: values.startDate,
        studyHoursPerDay: values.studyHoursPerDay,
        topicImages: values.topicImages,
    });
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
            name="topicInputMode"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>Topic Input Method</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("topics", ""); // Clear topics when mode changes
                        setExtractedOcrTextPreview(null);
                        form.setValue("notesImageForTopics", null);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                    >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="manual" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                        <FileText className="mr-2 h-4 w-4" /> Manual Entry
                        </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value="image" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                         <ImageIcon className="mr-2 h-4 w-4" /> Upload Notes Image (for OCR)
                        </FormLabel>
                    </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

        {topicInputMode === "manual" && (
            <FormField
            control={form.control}
            name="topics"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex items-center"><ListChecks className="mr-2 h-4 w-4" />Topics (Manual)</FormLabel>
                <FormControl>
                    <Textarea placeholder="Enter topics, separated by commas or line-by-line." {...field} rows={4} />
                </FormControl>
                <FormDescription>Enter topics for each subject.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        )}

        {topicInputMode === "image" && (
            <FormField
            control={form.control}
            name="notesImageForTopics"
            render={({ field: { onChange: onFileChangeHandler, value, ...restField } }) => ( // Renamed onChange to avoid conflict
                <FormItem>
                <FormLabel className="flex items-center"><ImageUp className="mr-2 h-4 w-4" />Upload Notes Image for Topics</FormLabel>
                <FormControl>
                    <Input
                    type="file"
                    accept="image/*"
                    onChange={handleNotesImageChange} // Use our custom handler
                    {...restField}
                    className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                </FormControl>
                <FormDescription>Upload an image of your notes. Text will be extracted to populate topics.</FormDescription>
                {ocrLoading && (
                    <div className="flex items-center space-x-2 mt-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" /> 
                        <span>Extracting text...</span>
                    </div>
                )}
                {extractedOcrTextPreview && !ocrLoading && (
                    <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium">Extracted Text Preview:</p>
                        <Textarea readOnly value={extractedOcrTextPreview} rows={5} className="bg-muted/50"/>
                    </div>
                )}
                <FormMessage />
                </FormItem>
            )}
            />
        )}
        
        {/* Hidden field to store topics from OCR, always read by handleSubmit */}
        {topicInputMode === 'image' && (
            <FormField
                control={form.control}
                name="topics"
                render={({ field }) => <Input type="hidden" {...field} />}
            />
        )}


         <FormField
          control={form.control}
          name="topicImages"
          render={({ field: { onChange, value, ...restField } }) => (
            <FormItem>
              <FormLabel className="flex items-center"><ImageUp className="mr-2 h-4 w-4" />Supplementary Topic Images (Optional)</FormLabel>
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
              <FormDescription>Upload additional images for specific topics if needed. These are different from notes uploaded for OCR.</FormDescription>
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
        <Button type="submit" disabled={isLoading || ocrLoading} className="w-full md:w-auto">
          {isLoading ? "Generating Plan..." : (ocrLoading ? "Processing Image..." : "Generate Study Plan")}
        </Button>
      </form>
    </Form>
  );
}
