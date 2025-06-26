
"use client";

import { useState, useRef } from "react";
import type { StudyRoomSubject, UploadedFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, UploadCloud, FileText, Trash2, BookOpen, FileUp, AlertTriangle, GripVertical } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MAX_FILENAME_LENGTH = 30;

export function StudyRoom() {
  const [subjects, setSubjects] = useState<StudyRoomSubject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const { toast } = useToast();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleAddSubject = () => {
    if (newSubjectName.trim() === "") {
      toast({ title: "Error", description: "Subject name cannot be empty.", variant: "destructive" });
      return;
    }
    const newSubject: StudyRoomSubject = { 
        id: crypto.randomUUID(), 
        name: newSubjectName, 
        files: [],
        createdAt: new Date().toISOString(),
    };
    setSubjects([...subjects, newSubject]);
    setNewSubjectName("");

    console.log(`Firestore Write (Simulated): Adding subject to users/{uid}/subjects/${newSubject.id}`, newSubject);
    toast({ title: "Subject Added", description: `"${newSubjectName}" has been added to your study room.`});
  };

  const handleRemoveSubject = (subjectId: string, subjectName: string) => {
    setSubjects(subjects.filter(s => s.id !== subjectId));
    console.log(`Firestore Write (Simulated): Deleting subject users/{uid}/subjects/${subjectId}`);
    toast({ title: "Subject Removed", description: `"${subjectName}" has been removed.`});
  };

  const triggerFileInput = (subjectId: string) => {
    fileInputRefs.current[subjectId]?.click();
  }

  const handleFileUpload = (subjectId: string, subjectName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase() as UploadedFile['type'] || 'doc';
      const newFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: fileType,
        isStudied: false,
        uploadedAt: new Date().toISOString(),
        firebaseStorageUrl: `simulated/users/uid/subjects/${subjectName}/${file.name}`
      };
      
      console.log(`Firebase Storage (Simulated): Uploading file to ${newFile.firebaseStorageUrl}`);
      
      setSubjects(
        subjects.map((subject) =>
          subject.id === subjectId
            ? { ...subject, files: [...subject.files, newFile] }
            : subject
        )
      );

      console.log(`Firestore Write (Simulated): Adding file metadata to users/{uid}/subjects/${subjectId}/files/${newFile.id}`, newFile);
      toast({ title: "File Added (Simulated)", description: `${file.name} added to ${subjectName}.`});
    }
    if (event.target) {
      event.target.value = ""; // Reset file input
    }
  };
  
  const handleRemoveFile = (subjectId: string, fileId: string, fileName: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? { ...subject, files: subject.files.filter(f => f.id !== fileId) }
          : subject
      )
    );
    console.log(`Firebase Storage (Simulated): Deleting file ${fileName}`);
    console.log(`Firestore Write (Simulated): Deleting file metadata users/{uid}/subjects/${subjectId}/files/${fileId}`);
    toast({ title: "File Removed", description: `"${fileName}" has been removed.`});
  };

  const toggleFileStudied = (subjectId: string, fileId: string, isStudied: boolean) => {
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
     console.log(`Firestore Write (Simulated): Updating isStudied to ${!isStudied} for users/{uid}/subjects/${subjectId}/files/${fileId}`);
  };

  const getFileIcon = (fileType: UploadedFile['type'] | undefined) => {
    const type = fileType?.toLowerCase();
    if (type === 'pdf') return <FileText className="h-5 w-5 text-red-600" />;
    if (['ppt', 'pptx'].includes(type || '')) return <FileText className="h-5 w-5 text-orange-500" />;
    if (['doc', 'docx'].includes(type || '')) return <FileText className="h-5 w-5 text-blue-600" />;
    if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(type || '')) return <FileText className="h-5 w-5 text-green-600" />;
    if (type === 'txt') return <FileText className="h-5 w-5 text-gray-700" />;
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };
  
  const truncateFileName = (name: string, maxLength: number = MAX_FILENAME_LENGTH) => {
    if (name.length <= maxLength) return name;
    const extension = name.includes('.') ? name.substring(name.lastIndexOf('.')) : '';
    const baseName = name.includes('.') ? name.substring(0, name.lastIndexOf('.')) : name;
    const truncatedBaseName = baseName.substring(0, maxLength - extension.length - 3); // -3 for "..."
    return `${truncatedBaseName}...${extension}`;
  }


  return (
    <div className="space-y-6 sm:space-y-8">
      <Card className="shadow-xl border-border/80">
        <CardHeader>
          <CardTitle className="font-headline text-2xl sm:text-3xl flex items-center">
            <BookOpen className="mr-3 h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            My Study Room
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Organize your notes and track your study progress for each subject.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 items-end">
            <div className="flex-grow w-full sm:w-auto">
              <Label htmlFor="new-subject" className="text-base font-medium">Add New Subject</Label>
              <Input
                id="new-subject"
                placeholder="e.g., Organic Chemistry"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="mt-1 text-base h-11"
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
              />
            </div>
            <Button onClick={handleAddSubject} className="w-full sm:w-auto text-base py-3 h-11 shrink-0">
              <PlusCircle className="mr-2 h-5 w-5" /> Add Subject
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This is a simulation. Data is not saved permanently. Full persistence requires Firebase integration.
          </p>
        </CardContent>
      </Card>

      {subjects.length === 0 && (
        <Card className="shadow-md border-border/60">
          <CardContent className="pt-6 text-center text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="font-medium">Your Study Room is Empty</p>
            <p className="text-sm">Add a subject above to start organizing your materials.</p>
          </CardContent>
        </Card>
      )}

      <Accordion type="multiple" className="w-full space-y-4">
        {subjects.map((subject) => {
          const studiedCount = subject.files.filter(f => f.isStudied).length;
          const totalCount = subject.files.length;
          const progressPercentage = totalCount > 0 ? (studiedCount / totalCount) * 100 : 0;

          return (
          <AccordionItem value={subject.id} key={subject.id} className="bg-card border border-border/60 rounded-lg shadow-md overflow-hidden">
            <AccordionTrigger className="text-lg sm:text-xl font-medium hover:bg-muted/20 data-[state=open]:bg-muted/20 px-4 sm:px-6 py-3 sm:py-4 transition-colors duration-150 ease-in-out">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
                  <GripVertical className="h-5 w-5 text-muted-foreground hidden sm:block" />
                  <span className="truncate">{subject.name}</span>
                   {totalCount > 0 && (
                      <Badge variant="secondary">{studiedCount}/{totalCount} Studied</Badge>
                   )}
                </div>
                <Button 
                  asChild
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleRemoveSubject(subject.id, subject.name); 
                  }} 
                  className="text-destructive hover:bg-destructive/10 h-8 w-8 sm:h-9 sm:w-9 ml-2 shrink-0"
                  aria-label={`Remove subject ${subject.name}`}
                >
                  <span role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleRemoveSubject(subject.id, subject.name)}>
                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 py-4 border-t bg-muted/10">
              <div className="space-y-4">
                 {totalCount > 0 && (
                    <div className="space-y-2">
                        <Label>Progress</Label>
                        <Progress value={progressPercentage} className="h-2" />
                    </div>
                )}
                <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => triggerFileInput(subject.id)}>
                        <FileUp className="mr-2 h-4 w-4" /> Upload Notes
                    </Button>
                    <Input
                        id={`file-upload-${subject.id}`}
                        type="file"
                        ref={el => fileInputRefs.current[subject.id] = el}
                        className="hidden"
                        onChange={(e) => handleFileUpload(subject.id, subject.name, e)}
                        accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.svg"
                    />
                </div>

                {subject.files.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-sm">No files uploaded for this subject yet.</p>
                    <p className="text-xs">Click "Upload Notes" to add your materials.</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {subject.files.map((file) => (
                      <Card
                        key={file.id}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 p-3 rounded-md border transition-all ${file.isStudied ? 'bg-green-500/10 border-green-500/40 hover:border-green-500/60' : 'bg-background hover:border-primary/50'}`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 flex-grow min-w-0">
                          {getFileIcon(file.type)}
                          <span 
                            title={file.name}
                            className={`text-sm font-medium truncate ${file.isStudied ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                          >
                            {truncateFileName(file.name)}
                          </span>
                          {file.isStudied && <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs h-5">Studied</Badge>}
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end sm:justify-normal mt-2 sm:mt-0">
                           <div className="flex items-center space-x-1.5">
                             <Checkbox
                                id={`studied-${subject.id}-${file.id}`}
                                checked={file.isStudied}
                                onCheckedChange={() => toggleFileStudied(subject.id, file.id, file.isStudied)}
                                aria-label={`Mark ${file.name} as studied`}
                                className="h-5 w-5"
                              />
                              <Label htmlFor={`studied-${subject.id}-${file.id}`} className="text-xs cursor-pointer select-none">
                                {file.isStudied ? 'Mark Unstudied' : 'Mark as Studied'}
                              </Label>
                           </div>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/80 hover:bg-destructive/10" onClick={() => handleRemoveFile(subject.id, file.id, file.name)}>
                            <Trash2 className="h-4 w-4"/>
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                {subject.files.length > 0 && (
                    <p className="text-xs text-muted-foreground pt-3 border-t mt-3">
                        <AlertTriangle className="inline h-3 w-3 mr-1" />
                        File uploads are simulated. Actual storage and viewing requires backend setup.
                    </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  );
}
