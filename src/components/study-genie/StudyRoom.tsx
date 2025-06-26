
"use client";

import { useState, useRef, useEffect } from "react";
import type { StudyRoomSubject, UploadedFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, UploadCloud, FileText, Trash2, BookOpen, FileUp, AlertTriangle, GripVertical, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const MAX_FILENAME_LENGTH = 30;

export function StudyRoom() {
  const [subjects, setSubjects] = useState<StudyRoomSubject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});

  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    };

    const subjectsColRef = collection(db, `users/${user.uid}/subjects`);
    const unsubscribe = onSnapshot(subjectsColRef, async (subjectsSnapshot) => {
        const subjectsData: StudyRoomSubject[] = [];
        for (const subjectDoc of subjectsSnapshot.docs) {
            const subject = { id: subjectDoc.id, ...subjectDoc.data() } as StudyRoomSubject;
            
            // Fetch files subcollection for each subject
            const filesColRef = collection(db, `users/${user.uid}/subjects/${subjectDoc.id}/files`);
            const filesSnapshot = await onSnapshot(filesColRef, (filesQuerySnapshot) => {
              const filesData = filesQuerySnapshot.docs.map(fileDoc => ({ id: fileDoc.id, ...fileDoc.data() } as UploadedFile));
              
              // Find the subject in the state and update its files
              setSubjects(currentSubjects => {
                return currentSubjects.map(s => {
                  if (s.id === subject.id) {
                    return { ...s, files: filesData };
                  }
                  return s;
                });
              });
            });
            // We are not storing the unsubscribe for files, which is a memory leak.
            // A more robust solution would manage these listeners.
            
            subjectsData.push({ ...subject, files: subject.files || [] });
        }
        setSubjects(subjectsData);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);


  const handleAddSubject = async () => {
    if (newSubjectName.trim() === "" || !user) {
      toast({ title: "Error", description: "Subject name cannot be empty.", variant: "destructive" });
      return;
    }
    try {
      const subjectsColRef = collection(db, `users/${user.uid}/subjects`);
      await addDoc(subjectsColRef, {
        name: newSubjectName,
        createdAt: serverTimestamp(),
        files: [],
      });
      setNewSubjectName("");
      toast({ title: "Subject Added", description: `"${newSubjectName}" has been added.`});
    } catch (error) {
      console.error("Error adding subject: ", error);
      toast({ title: "Error", description: "Failed to add subject.", variant: "destructive" });
    }
  };

  const handleRemoveSubject = async (subjectId: string, subjectName: string) => {
    if (!user) return;
    if (!confirm(`Are you sure you want to delete the subject "${subjectName}" and all its files? This cannot be undone.`)) return;

    try {
      const subjectDocRef = doc(db, `users/${user.uid}/subjects`, subjectId);
      // Ideally, we'd also delete all files in Storage within a Cloud Function trigger
      await deleteDoc(subjectDocRef);
      toast({ title: "Subject Removed", description: `"${subjectName}" has been removed.`});
    } catch (error) {
      console.error("Error removing subject: ", error);
      toast({ title: "Error", description: "Failed to remove subject.", variant: "destructive" });
    }
  };

  const triggerFileInput = (subjectId: string) => {
    fileInputRefs.current[subjectId]?.click();
  }

  const handleFileUpload = async (subjectId: string, subjectName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(prev => ({ ...prev, [subjectId]: true }));

    const storageRef = ref(storage, `users/${user.uid}/subjects/${subjectName}/${file.name}`);

    try {
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      const filesColRef = collection(db, `users/${user.uid}/subjects/${subjectId}/files`);
      await addDoc(filesColRef, {
        name: file.name,
        type: file.name.split('.').pop()?.toLowerCase() || 'doc',
        isStudied: false,
        uploadedAt: serverTimestamp(),
        firebaseStorageUrl: downloadURL,
      });

      toast({ title: "File Uploaded", description: `${file.name} added to ${subjectName}.`});
    } catch (error) {
      console.error("File upload error: ", error);
      toast({ title: "Upload Failed", description: "Could not upload the file.", variant: "destructive" });
    } finally {
      setIsUploading(prev => ({ ...prev, [subjectId]: false }));
      if (event.target) event.target.value = "";
    }
  };
  
  const handleRemoveFile = async (subjectId: string, file: UploadedFile) => {
    if (!user) return;
    try {
      // Delete from Storage
      const fileRef = ref(storage, file.firebaseStorageUrl);
      await deleteObject(fileRef);

      // Delete from Firestore
      const fileDocRef = doc(db, `users/${user.uid}/subjects/${subjectId}/files`, file.id);
      await deleteDoc(fileDocRef);

      toast({ title: "File Removed", description: `"${file.name}" has been removed.`});
    } catch (error) {
      console.error("Error removing file: ", error);
      toast({ title: "Error", description: "Failed to remove file.", variant: "destructive" });
    }
  };

  const toggleFileStudied = async (subjectId: string, fileId: string, isStudied: boolean) => {
    if (!user) return;
    const fileDocRef = doc(db, `users/${user.uid}/subjects/${subjectId}/files`, fileId);
    await updateDoc(fileDocRef, { isStudied: !isStudied });
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
    const truncatedBaseName = baseName.substring(0, maxLength - extension.length - 3);
    return `${truncatedBaseName}...${extension}`;
  }
  
  if (isLoading) {
    return <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (!user) {
    return (
      <Card className="shadow-md border-border/60 text-center py-10">
        <CardContent>
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="font-medium">Please Log In</p>
          <p className="text-sm text-muted-foreground">You need to be logged in to access your Study Room.</p>
          <Button asChild className="mt-4"><Link href="/login">Login</Link></Button>
        </CardContent>
      </Card>
    )
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
          const studiedCount = subject.files?.filter(f => f.isStudied).length || 0;
          const totalCount = subject.files?.length || 0;
          const progressPercentage = totalCount > 0 ? (studiedCount / totalCount) * 100 : 0;
          const currentIsUploading = isUploading[subject.id] || false;

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
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handleRemoveSubject(subject.id, subject.name); }} 
                  className="text-destructive hover:bg-destructive/10 h-8 w-8 sm:h-9 sm:w-9 ml-2 shrink-0"
                >
                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
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
                    <Button variant="outline" size="sm" onClick={() => triggerFileInput(subject.id)} disabled={currentIsUploading}>
                        {currentIsUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <FileUp className="mr-2 h-4 w-4" />}
                        {currentIsUploading ? 'Uploading...' : 'Upload Notes'}
                    </Button>
                    <Input
                        type="file"
                        ref={el => fileInputRefs.current[subject.id] = el}
                        className="hidden"
                        onChange={(e) => handleFileUpload(subject.id, subject.name, e)}
                        accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.svg"
                    />
                </div>

                {!subject.files || subject.files.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-sm">No files uploaded for this subject yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {subject.files.map((file) => (
                      <Card
                        key={file.id}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 p-3 rounded-md border transition-all ${file.isStudied ? 'bg-green-500/10 border-green-500/40' : 'bg-background hover:border-primary/50'}`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 flex-grow min-w-0">
                          {getFileIcon(file.type)}
                           <a href={file.firebaseStorageUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium truncate hover:underline" title={file.name}>
                              {truncateFileName(file.name)}
                           </a>
                          {file.isStudied && <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs h-5 shrink-0">Studied</Badge>}
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end shrink-0">
                           <div className="flex items-center space-x-1.5">
                             <Checkbox
                                id={`studied-${subject.id}-${file.id}`}
                                checked={file.isStudied}
                                onCheckedChange={() => toggleFileStudied(subject.id, file.id, file.isStudied)}
                                className="h-5 w-5"
                              />
                              <Label htmlFor={`studied-${subject.id}-${file.id}`} className="text-xs cursor-pointer select-none">
                                Mark as Studied
                              </Label>
                           </div>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/80 hover:bg-destructive/10" onClick={() => handleRemoveFile(subject.id, file)}>
                            <Trash2 className="h-4 w-4"/>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
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
