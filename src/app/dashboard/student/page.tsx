
"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { User, Home, BookOpen, HelpCircleIcon, Sparkles, LayoutDashboard, Settings, LogOut, Loader2, MessageCircleQuestion, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { CrosscheckQuestion } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const quickLinks = [
  { name: "New Study Plan", href: "/?tab=study-plan", icon: BookOpen, description: "Generate a personalized study schedule." },
  { name: "Study Room", href: "/?tab=study-room", icon: LayoutDashboard, description: "Organize your notes and track progress." },
  { name: "Quiz Maker", href: "/?tab=quiz-maker", icon: HelpCircleIcon, description: "Test your knowledge from notes." },
  { name: "Key Point Extractor", href: "/?tab=key-points", icon: Sparkles, description: "Extract key points from answers." },
];

type QuestionWithStatus = CrosscheckQuestion & { answered: boolean };

function StudentPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  
  const [questions, setQuestions] = useState<QuestionWithStatus[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<QuestionWithStatus | null>(null);
  const [answer, setAnswer] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    if (authLoading) return; // Wait for initial auth check
    if (!user) {
        router.replace('/login');
        return;
    }
    if (!userProfile) return; // Wait for profile to be loaded
    if (userProfile.role !== 'student' || !userProfile.familyCode) {
        setQuestions([]);
        return;
    }
    
    const studentUid = user.uid;
    const q = query(
        collection(db, `crosscheck/${userProfile.familyCode}/questions`),
        orderBy("askedAt", "desc")
    );
      
    let answerUnsubscribers: Record<string, () => void> = {};

    const questionsUnsubscribe = onSnapshot(q, (querySnapshot) => {
        const activeQuestionIds = new Set(querySnapshot.docs.map(d => d.id));
        Object.keys(answerUnsubscribers).forEach(qid => {
            if (!activeQuestionIds.has(qid)) {
                answerUnsubscribers[qid]();
                delete answerUnsubscribers[qid];
            }
        });

        const fetchedQuestions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            answered: false,
            ...doc.data()
        } as QuestionWithStatus));

        setQuestions(fetchedQuestions);

        fetchedQuestions.forEach((question) => {
            if (answerUnsubscribers[question.id]) return;

            const answerDocRef = doc(db, `crosscheck/${userProfile.familyCode}/questions/${question.id}/answers`, studentUid);
            const answerUnsubscribe = onSnapshot(answerDocRef, (answerDoc) => {
                const isAnswered = answerDoc.exists();
                setQuestions(currentQuestions => 
                    currentQuestions.map(q => 
                        q.id === question.id ? { ...q, answered: isAnswered } : q
                    )
                );
            });
            answerUnsubscribers[question.id] = answerUnsubscribe;
        });
    });

    return () => {
        questionsUnsubscribe();
        Object.values(answerUnsubscribers).forEach(unsub => unsub());
    };
  }, [user, userProfile, authLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login');
  };

  const handleCopyCode = () => {
    if (userProfile?.familyCode) {
      navigator.clipboard.writeText(userProfile.familyCode);
      toast({
        title: "Copied to Clipboard!",
        description: `Your family code ${userProfile.familyCode} has been copied.`,
      });
    }
  };

  const handleOpenAnswerDialog = (question: QuestionWithStatus) => {
    setActiveQuestion(question);
    setAnswer("");
  };

  const handleAnswerSubmit = async () => {
    if (!answer.trim() || !activeQuestion || !user || !userProfile) return;

    setIsAnswering(true);
    try {
      const answerRef = doc(db, `crosscheck/${userProfile.familyCode}/questions/${activeQuestion.id}/answers`, user.uid);
      await setDoc(answerRef, {
        answerText: answer,
        answeredBy: user.uid,
        studentName: userProfile.name,
        answeredAt: serverTimestamp(),
      });
      
      toast({ title: "Answer Submitted!", description: "Your answer has been sent." });
      setActiveQuestion(null);
      setAnswer("");
    } catch (error) {
      console.error("Error submitting answer: ", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to submit answer." });
    } finally {
      setIsAnswering(false);
    }
  };

  // --- Loading and Auth Guard Logic ---
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
  
  if (userProfile && userProfile.role !== 'student') {
    router.replace('/dashboard/parent');
    return null;
  }
  
  return (
    <>
    <Dialog open={!!activeQuestion} onOpenChange={() => setActiveQuestion(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{activeQuestion?.askedBy} has a question for you!</DialogTitle>
          <DialogDescription className="text-lg pt-2">{activeQuestion?.questionText}</DialogDescription>
        </DialogHeader>
        <Textarea 
          placeholder="Type your answer here..."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          rows={5}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setActiveQuestion(null)}>Cancel</Button>
          <Button onClick={handleAnswerSubmit} disabled={isAnswering}>
            {isAnswering ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
            Submit Answer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <User className="h-16 w-16 mx-auto text-primary mb-2 rounded-full bg-primary/10 p-3 border-2 border-primary/20" />
                <span className="absolute bottom-2 right-0 block h-4 w-4 rounded-full bg-green-500 border-2 border-card"></span>
              </div>
              <h2 className="text-lg lg:text-xl font-semibold">{userProfile?.name}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Student Portal</p>
              {userProfile?.familyCode && (
                <div className="mt-2 text-center">
                    <p className="text-xs text-muted-foreground">Family Code:</p>
                    <Badge variant="outline" className="text-sm tracking-widest font-mono cursor-pointer" onClick={handleCopyCode}>
                        {userProfile.familyCode}
                        <Copy className="ml-2 h-3 w-3" />
                    </Badge>
                </div>
              )}
            </div>
            <nav className="space-y-1.5">
              <Button variant="secondary" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href={`/dashboard/student`}><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/?tab=study-room"><LayoutDashboard className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Study Room</Link>
              </Button>
            </nav>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => toast({title: "Feature Coming Soon"})}>
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
              Welcome back, <span className="text-primary">{userProfile?.name}!</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              Ready to ace your studies? Let's get started.
            </p>
          </div>
          
          {questions.some(q => !q.answered) && (
            <Alert className="mb-6 border-accent/50 text-accent-foreground [&>svg]:text-accent">
                <MessageCircleQuestion className="h-4 w-4" />
                <AlertTitle className="font-headline text-lg">You have new questions!</AlertTitle>
                <AlertDescription>
                   Your parent has sent you some questions to check your understanding. See them in the "Crosscheck" section below.
                </AlertDescription>
            </Alert>
          )}

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground/90">Quick Access to AI Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {quickLinks.map(link => (
                <Card key={link.name} className="hover:shadow-lg transition-shadow duration-200 ease-in-out border-border/70 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                    <link.icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent mb-1.5" />
                    <CardTitle className="text-lg sm:text-xl">{link.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 h-10">{link.description}</p>
                    <Button variant="link" asChild className="p-0 text-primary text-sm">
                        <Link href={link.href}>Go to {link.name.split(' ')[0]}</Link>
                    </Button>
                    </CardContent>
                </Card>
                ))}
            </div>
          </section>

           <Card className="shadow-lg border-border/80 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline text-xl sm:text-2xl flex items-center">
                    <MessageCircleQuestion className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    Crosscheck Questions from Parents
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions.length > 0 ? questions.map(q => (
                <Card key={q.id} className={`p-4 ${q.answered ? 'bg-muted/60' : ''}`}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <p className={`text-base font-medium ${q.answered ? 'line-through text-muted-foreground' : ''}`}>{q.questionText}</p>
                      <p className="text-xs text-muted-foreground">Asked by: {q.askedBy}</p>
                    </div>
                    {q.answered ? (
                      <div className="flex items-center text-green-600 font-medium text-sm">
                        <Check className="h-4 w-4 mr-1.5" /> Answered
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => handleOpenAnswerDialog(q)}>
                        Answer Question
                      </Button>
                    )}
                  </div>
                </Card>
              )) : (
                <p className="text-center text-muted-foreground text-sm py-4">No questions from your parents at the moment.</p>
              )}
            </CardContent>
          </Card>

        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Student Dashboard.</p>
      </footer>
    </div>
    </>
  );
}

export default function StudentDashboardPage() {
  return (
    <Suspense>
      <StudentPageContent />
    </Suspense>
  );
}
