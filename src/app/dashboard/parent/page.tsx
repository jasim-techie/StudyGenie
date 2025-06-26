
"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, FileQuestion, Home, LogOut, MessageCircleQuestion, Settings, User, CheckCircle2, Brain, Search, Loader2, Send } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import type { StudyRoomSubject, UserProfile, CrosscheckQuestion } from "@/lib/types";

function ParentPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, userProfile } = useAuth();
  
  const [studentProfile, setStudentProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<StudyRoomSubject[]>([]);
  const [crosscheckQuestion, setCrosscheckQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (userProfile && userProfile.role === 'parent' && userProfile.linkedStudent) {
      const studentId = userProfile.linkedStudent;

      // Fetch student profile
      const studentDocRef = doc(db, 'users', studentId);
      getDoc(studentDocRef).then(docSnap => {
        if (docSnap.exists()) {
          setStudentProfile(docSnap.data() as UserProfile);
        }
      });
      
      // Listen for student's subjects in real-time
      const subjectsColRef = collection(db, `users/${studentId}/subjects`);
      const unsubscribe = onSnapshot(subjectsColRef, (snapshot) => {
        const subjectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyRoomSubject));
        setSubjects(subjectsData);
        setIsLoadingData(false);
      });

      return () => unsubscribe();
    } else {
        setIsLoadingData(false);
    }
  }, [userProfile]);


  const handleLogout = async () => {
    await signOut(auth);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login');
  };
  
  const handleSendCrosscheck = async () => {
    if (!crosscheckQuestion.trim() || !userProfile || !studentProfile) {
      toast({ variant: "destructive", title: "Error", description: "Question cannot be empty." });
      return;
    }
    
    setIsSending(true);
    try {
      const questionsColRef = collection(db, `crosscheck/${studentProfile.familyCode}/questions`);
      await addDoc(questionsColRef, {
        questionText: crosscheckQuestion,
        type: "short", // Defaulting to short answer
        askedBy: userProfile.name,
        askedAt: serverTimestamp(),
      });

      toast({
        title: "Question Sent!",
        description: `Your question has been sent to ${studentProfile.name}.`,
      });
      setCrosscheckQuestion("");
    } catch (error) {
      console.error("Error sending question: ", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to send question." });
    } finally {
      setIsSending(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Student Data...</p>
      </div>
    );
  }

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
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => toast({title: "Coming Soon", description: "Student profile & settings will be here."})}>
                <User className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Child's Profile
              </Button>
            </nav>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => toast({title: "Feature Coming Soon", description: "Account settings will be available here."})}>
              <Settings className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Logout
            </Button>
          </div>
        </aside>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-foreground">
              {studentProfile ? `${studentProfile.name}'s Progress Overview` : "Student Progress Overview"}
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
                      <BarChart3 className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
                      Subject Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    {!studentProfile ? (
                        <p className="text-muted-foreground text-center py-4">No student linked. Please sign up with a valid family code.</p>
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
                        <FileQuestion className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                        Crosscheck Question
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        {studentProfile ? `Send a quick question to ${studentProfile.name}.` : "Link to a student to send questions."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea 
                      placeholder="e.g., What is the powerhouse of the cell?"
                      value={crosscheckQuestion}
                      onChange={(e) => setCrosscheckQuestion(e.target.value)}
                      rows={4}
                      className="text-base"
                      disabled={!studentProfile || isSending}
                    />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSendCrosscheck} className="w-full" disabled={!studentProfile || isSending}>
                    {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    {isSending ? "Sending..." : "Send Question"}
                  </Button>
                </CardFooter>
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
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Loading Dashboard...</p>
      </div>
    }>
      <ParentPageContent />
    </Suspense>
  );
}
