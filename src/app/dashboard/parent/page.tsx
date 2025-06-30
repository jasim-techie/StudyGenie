
"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, FileQuestion, Home, LogOut, MessageCircleQuestion, Settings, User, CheckCircle2, Brain, Search, Loader2, Send, Clock, Link as LinkIcon } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { collection, doc, onSnapshot, addDoc, serverTimestamp, query, orderBy, where, getDocs, updateDoc } from "firebase/firestore";
import type { StudyRoomSubject, UserProfile, CrosscheckQuestion, UploadedFile, CrosscheckAnswer } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ParentPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  
  const [studentProfile, setStudentProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<StudyRoomSubject[]>([]);
  const [crosscheckQuestion, setCrosscheckQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [crosscheckHistory, setCrosscheckHistory] = useState<CrosscheckQuestion[]>([]);
  const [familyCodeInput, setFamilyCodeInput] = useState("");
  const [isLinking, setIsLinking] = useState(false);

  // Effect to fetch student data once parent profile is loaded and linked
  useEffect(() => {
    if (!userProfile || !userProfile.linkedStudent) {
      setStudentProfile(null);
      setSubjects([]);
      return;
    }
    
    const studentId = userProfile.linkedStudent;
    const studentDocRef = doc(db, 'users', studentId);

    const studentUnsubscribe = onSnapshot(studentDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const studentData = docSnap.data() as UserProfile;
        setStudentProfile(studentData);
      } else {
        setStudentProfile(null);
        toast({ title: "Error", description: "Linked student profile not found.", variant: "destructive"});
      }
    });

    const subjectsColRef = collection(db, `users/${studentId}/subjects`);
    const subjectsUnsubscribe = onSnapshot(subjectsColRef, (subjectsSnapshot) => {
      const newSubjects = subjectsSnapshot.docs.map(subjectDoc => ({ id: subjectDoc.id, ...subjectDoc.data() } as StudyRoomSubject));
      setSubjects(newSubjects);
    }, (error) => {
      console.error("Error fetching subjects: ", error);
      toast({ title: "Error", description: "Could not fetch subjects.", variant: "destructive" });
    });

    return () => {
      studentUnsubscribe();
      subjectsUnsubscribe();
    };
  }, [userProfile, toast]);

  // Effect for fetching cross-check history
  useEffect(() => {
    if (!studentProfile?.familyCode) return;
    
    const questionsQuery = query(collection(db, `crosscheck/${studentProfile.familyCode}/questions`), orderBy("askedAt", "desc"));
    const questionsUnsubscribe = onSnapshot(questionsQuery, (questionsSnapshot) => {
        const fetchedQuestions = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CrosscheckQuestion));
        setCrosscheckHistory(fetchedQuestions);
    });

    return () => questionsUnsubscribe();
}, [studentProfile]);


  const handleLogout = async () => {
    await signOut(auth);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login');
  };
  
  const handleLinkStudent = async () => {
    if (!familyCodeInput.trim() || !user) {
      toast({ title: "Family code required", variant: "destructive" });
      return;
    }
    setIsLinking(true);
    try {
      const q = query(collection(db, "users"), where("familyCode", "==", familyCodeInput), where("role", "==", "student"));
      const studentQuerySnapshot = await getDocs(q);

      if (studentQuerySnapshot.empty) {
        toast({ title: "No Student Found", description: "Please check the family code and try again.", variant: "destructive" });
        return;
      }
      const studentDoc = studentQuerySnapshot.docs[0];
      const parentDocRef = doc(db, "users", user.uid);
      await updateDoc(parentDocRef, { linkedStudent: studentDoc.id });

      toast({ title: "Success!", description: `You are now linked to ${studentDoc.data().name}.` });
      // The component will re-render due to userProfile change in AuthContext, no manual reload needed.
    } catch (error) {
      console.error("Error linking student:", error);
      toast({ title: "Error", description: "Could not link student account.", variant: "destructive" });
    } finally {
      setIsLinking(false);
    }
  };

  const getInitials = (name: string = "") => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  // --- Loading and Auth Guard Logic ---
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Authenticating...</p>
      </div>
    );
  }

  if (user && !userProfile) {
     return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg font-medium text-foreground">Loading Profile...</p>
        </div>
    );
  }

  if (!user) return null; // Redirect is handled by useEffect

  if (userProfile && userProfile.role !== 'parent') {
    router.replace('/dashboard/student');
    return null;
  }

  // Unlinked Parent View
  if (userProfile && !userProfile.linkedStudent) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center justify-center gap-2">
                        <LinkIcon className="h-6 w-6 text-primary" />
                        Link to a Student Account
                    </CardTitle>
                    <CardDescription>Enter your child's 6-digit Family Code to view their progress.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Label htmlFor="family-code" className="sr-only">Family Code</Label>
                    <Input 
                        id="family-code"
                        value={familyCodeInput}
                        onChange={(e) => setFamilyCodeInput(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        className="text-center text-lg tracking-widest font-mono h-12"
                    />
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button onClick={handleLinkStudent} className="w-full" disabled={isLinking}>
                        {isLinking ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        Link Account
                    </Button>
                    <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                </CardFooter>
            </Card>
        </div>
    );
  }

  // Linked Parent View
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <Users className="h-16 w-16 mx-auto text-red-600 mb-2 rounded-full bg-red-600/10 p-3 border-2 border-red-600/20" />
              <h2 className="text-lg lg:text-xl font-semibold">{userProfile?.name}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Parent Portal</p>
            </div>
            <nav className="space-y-1.5">
              <Button variant="secondary" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href={`/dashboard/parent`}><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
            </nav>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Logout
            </Button>
          </div>
        </aside>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-foreground">
              {studentProfile ? `${studentProfile.name}'s Progress` : "Student Progress Overview"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              Stay updated on your child's study activities and progress.
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                <Card className="shadow-xl border-border/80 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl sm:text-2xl lg:text-3xl flex items-center">
                      <BarChart3 className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                      Subject Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    {!studentProfile ? (
                        <p className="text-muted-foreground text-center py-4">Could not load student data.</p>
                    ) : subjects.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">{studentProfile.name} has not added any subjects yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {subjects.map(subject => {
                        const filesStudied = subject.files?.filter(f => f.isStudied).length || 0;
                        const filesTotal = subject.files?.length || 0;
                        const progress = filesTotal > 0 ? (filesStudied / filesTotal) * 100 : 0;
                        const isComplete = filesStudied === filesTotal && filesTotal > 0;

                        return (
                        <Card key={subject.id} className="bg-card border-border/60 hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2 sm:pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg sm:text-xl font-semibold">{subject.name}</CardTitle>
                              <Badge variant={isComplete ? "default" : "secondary"} className={`${isComplete ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'} text-xs sm:text-sm shadow-sm`}>
                                {isComplete && <CheckCircle2 className="inline mr-1.5 h-4 w-4"/>}
                                {filesStudied} / {filesTotal} Files Studied
                              </Badge>
                            </div>
                            <Progress 
                                value={progress} 
                                className="h-2 sm:h-2.5 mt-2" 
                                indicatorClassName={isComplete ? "bg-green-500" : "bg-primary"}
                            />
                          </CardHeader>
                        </Card>
                      )})}
                      </div>
                    )}
                  </CardContent>
                </Card>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
               <Card className="shadow-lg border-border/80 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-xl sm:text-2xl flex items-center">
                    <Clock className="mr-2 sm:mr-3 h-6 w-6 text-primary" />
                    Question History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {crosscheckHistory.length > 0 ? crosscheckHistory.map(q => (
                      <AccordionItem value={q.id} key={q.id}>
                        <AccordionTrigger>{q.questionText}</AccordionTrigger>
                        <AccordionContent>
                           <p className="text-sm text-muted-foreground text-center py-2">Answers would appear here.</p>
                        </AccordionContent>
                      </AccordionItem>
                    )) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No questions have been asked yet.</p>
                    )}
                  </Accordion>
                </CardContent>
              </Card>

            </div>
          </div>
        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Parent Dashboard.</p>
      </footer>
    </div>
  );
}

export default function ParentDashboardPage() {
  return (
    <Suspense>
      <ParentPageContent />
    </Suspense>
  );
}
