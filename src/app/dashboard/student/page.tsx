
"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { StudyRoom } from "@/components/study-genie/StudyRoom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileQuestion, HelpCircleIcon, Home, LayoutDashboard, LogOut, Settings, Sparkles, User, BrainCircuit, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";


const quickLinks = [
  { name: "New Study Plan", href: "/study-plan", icon: BookOpen, description: "Generate a personalized study schedule." },
  { name: "Quiz Maker", href: "/quiz-maker", icon: HelpCircleIcon, description: "Test your knowledge from notes." },
  { name: "Key Point Extractor", href: "/key-points", icon: Sparkles, description: "Extract key points from answers." },
];

function StudentPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    const nameFromQuery = searchParams.get("name");
    if (nameFromQuery) {
      setStudentName(nameFromQuery);
    }
  }, [searchParams]);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out. (Simulation)",
    });
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <User className="h-16 w-16 mx-auto text-primary mb-2 rounded-full bg-primary/10 p-3 border-2 border-primary/20" />
              <h2 className="text-lg lg:text-xl font-semibold">{studentName}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Student Portal</p>
            </div>
            <nav className="space-y-1.5">
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href={`/dashboard/student?name=${encodeURIComponent(studentName)}`}><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/study-plan"><BookOpen className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Study Plan AI</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/quiz-maker"><HelpCircleIcon className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Quiz Maker</Link>
              </Button>
               <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/key-points"><Sparkles className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Key Points</Link>
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
              Welcome back, <span className="text-primary">{studentName}!</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              Ready to ace your studies? Let's get started.
            </p>
          </div>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground/90">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out bg-primary/5 border-primary/20 col-span-1 sm:col-span-2 lg:col-span-1">
                    <CardHeader className="pb-3">
                    <LayoutDashboard className="h-7 w-7 sm:h-8 sm:w-8 text-primary mb-1.5" />
                    <CardTitle className="text-lg sm:text-xl">Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground">Track your completed topics and quiz scores here. (Feature Coming Soon)</p>
                    </CardContent>
                </Card>
            </div>
          </section>
          
          <StudyRoom />

        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Student Dashboard.</p>
      </footer>
    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Loading Dashboard...</p>
      </div>
    }>
      <StudentPageContent />
    </Suspense>
  );
}
