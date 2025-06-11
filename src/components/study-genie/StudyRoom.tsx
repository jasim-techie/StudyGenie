
"use client";

import { useState } from "react";
import type { StudyRoomSubject, UploadedFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, UploadCloud, FileText, Trash2, BookOpen, CheckSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

export function StudyRoom() {
  const [subjects, setSubjects] = useState<StudyRoomSubject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const { toast } = useToast();

  const handleAddSubject = () => {
    if (newSubjectName.trim() === "") {
      toast({ title: "Error", description: "Subject name cannot be empty.", variant: "destructive" });
      return;
    }
    setSubjects([
      ...subjects,
      { id: crypto.randomUUID(), name: newSubjectName, files: [] },
    ]);
    setNewSubjectName("");
    toast({ title: "Success", description: `Subject "${newSubjectName}" added.`});
  };

  const handleRemoveSubject = (subjectId: string) => {
    setSubjects(subjects.filter(s => s.id !== subjectId));
    toast({ title: "Success", description: `Subject removed.`});
  };

  const handleFileUpload = (subjectId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Placeholder for actual file upload logic
      const newFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.name.split('.').pop() as UploadedFile['type'] || 'doc', // Basic type detection
        isStudied: false,
      };
      setSubjects(
        subjects.map((subject) =>
          subject.id === subjectId
            ? { ...subject, files: [...subject.files, newFile] }
            : subject
        )
      );
      toast({ title: "File 'Uploaded'", description: `${file.name} added to subject. (This is a placeholder, no actual upload occurred)`});
    }
     // Reset file input to allow uploading the same file again if needed
    if (event.target) {
      event.target.value = "";
    }
  };
  
  const handleRemoveFile = (subjectId: string, fileId: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? { ...subject, files: subject.files.filter(f => f.id !== fileId) }
          : subject
      )
    );
    toast({ title: "File Removed", description: `File removed from subject.`});
  };

  const toggleFileStudied = (subjectId: string, fileId: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              files: subject.files.map((file) =>
                file.id === fileId ? { ...file, isStudied: !file.isStudied } : file
              ),
            }
          : subject
      )
    );
  };

  const getFileIcon = (fileType: UploadedFile['type']) => {
    // This can be expanded with more specific icons
    if (fileType === 'pdf') return <FileText className="h-5 w-5 text-red-500" />;
    if (fileType === 'ppt' || fileType === 'pptx') return <FileText className="h-5 w-5 text-orange-500" />;
    if (fileType === 'doc' || fileType === 'docx') return <FileText className="h-5 w-5 text-blue-500" />;
    if (fileType === 'img' || fileType === 'png' || fileType === 'jpg') return <FileText className="h-5 w-5 text-green-500" />; // Placeholder, could use ImageIcon
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-border/80">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center">
            <BookOpen className="mr-3 h-8 w-8 text-primary" />
            My Study Room
          </CardTitle>
          <CardDescription>Organize your notes and track your study progress for each subject.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 items-end">
            <div className="flex-grow">
              <Label htmlFor="new-subject" className="text-base font-medium">Add New Subject</Label>
              <Input
                id="new-subject"
                placeholder="e.g., Organic Chemistry"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="mt-1 text-base h-11"
              />
            </div>
            <Button onClick={handleAddSubject} className="w-full sm:w-auto text-base py-3 h-11">
              <PlusCircle className="mr-2 h-5 w-5" /> Add Subject
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Tip: Subjects added here are for organizing your notes. They are separate from study plan subjects for now.</p>
        </CardContent>
      </Card>

      {subjects.length === 0 && (
        <Card className="shadow-md">
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No subjects added yet. Add a subject to start organizing your study materials!</p>
          </CardContent>
        </Card>
      )}

      <Accordion type="multiple" className="w-full space-y-4">
        {subjects.map((subject) => (
          <AccordionItem value={subject.id} key={subject.id} className="bg-card border border-border/60 rounded-lg shadow-md overflow-hidden">
            <AccordionTrigger className="text-xl font-medium hover:bg-secondary/30 px-6 py-4 transition-colors duration-150 ease-in-out">
              <div className="flex justify-between items-center w-full">
                <span>{subject.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handleRemoveSubject(subject.id); }} 
                  className="text-destructive hover:bg-destructive/10"
                  aria-label={`Remove subject ${subject.name}`}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 border-t">
              <div className="space-y-4">
                <Label
                  htmlFor={`file-upload-${subject.id}`}
                  className="w-full sm:w-auto cursor-pointer inline-block"
                >
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <span>
                      <UploadCloud className="mr-2 h-4 w-4" /> Upload Notes (PDF, PPT, DOC, Image)
                    </span>
                  </Button>
                  <Input
                    id={`file-upload-${subject.id}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(subject.id, e)}
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.png,.jpg,.jpeg" // Example accept types
                  />
                </Label>

                {subject.files.length === 0 ? (
                  <p className="text-muted-foreground italic">No files uploaded for this subject yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {subject.files.map((file) => (
                      <li
                        key={file.id}
                        className={`flex items-center justify-between space-x-3 p-3 rounded-md border transition-all ${file.isStudied ? 'bg-green-500/10 border-green-500/30' : 'bg-muted/30'}`}
                      >
                        <div className="flex items-center space-x-3 flex-grow">
                          {getFileIcon(file.type)}
                          <span className={`text-sm ${file.isStudied ? 'line-through text-muted-foreground' : ''}`}>{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Checkbox
                            id={`studied-${subject.id}-${file.id}`}
                            checked={file.isStudied}
                            onCheckedChange={() => toggleFileStudied(subject.id, file.id)}
                            aria-label={`Mark ${file.name} as studied`}
                          />
                          <Label htmlFor={`studied-${subject.id}-${file.id}`} className="text-xs cursor-pointer select-none">
                            {file.isStudied ? 'Studied' : 'Mark as Studied'}
                          </Label>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/80 hover:bg-destructive/10" onClick={() => handleRemoveFile(subject.id, file.id)}>
                            <Trash2 className="h-4 w-4"/>
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                 <p className="text-xs text-muted-foreground pt-2 border-t mt-4">File uploads are simulated. Actual file storage requires backend setup.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
