
"use client";

import { Suspense } from "react";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import { Loader2, Copy } from "lucide-react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen, LayoutDashboard, HelpCircleIcon, Sparkles } from "lucide-react";

const quickLinks = [
  { name: "New Study Plan", href: "/?tab=study-plan", icon: BookOpen, description: "Generate a personalized study schedule." },
  { name: "Study Room", href: "/?tab=study-room", icon: LayoutDashboard, description: "Organize your notes and track progress." },
  { name: "Quiz Maker", href: "/?tab=quiz-maker", icon: HelpCircleIcon, description: "Test your knowledge from notes." },
  { name: "Key Point Extractor", href: "/?tab=key-points", icon: Sparkles, description: "Extract key points from answers." },
];

function StudentPageContent() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleCopyCode = () => {
    if (userProfile?.familyCode) {
      navigator.clipboard.writeText(userProfile.familyCode);
      toast({
        title: "Copied to Clipboard!",
        description: `Your family code ${userProfile.familyCode} has been copied.`,
      });
    }
  };

  // 1. Show a loader while the initial auth check is running.
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Authenticating...</p>
      </div>
    );
  }

  // 2. If auth is checked and there's no user, redirect them.
  if (!user) {
    router.replace('/login');
    return null; // Render nothing while redirecting
  }
  
  // 3. If there's a user but the profile is still loading from Firestore.
  if (!userProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Loading Profile...</p>
      </div>
    );
  }

  // 4. If the user's role is not 'student', redirect them.
  if (userProfile.role !== 'student') {
    router.replace('/dashboard/parent');
    return null; // Render nothing while redirecting
  }

  // 5. Success! Render the dashboard.
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-foreground">
            Welcome back, <span className="text-primary">{userProfile.name}!</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-1">
            Ready to ace your studies? Let's get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
             <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground/90">Quick Access to AI Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {quickLinks.map(link => (
                  <Card key={link.name} className="hover:shadow-lg transition-shadow duration-200 ease-in-out border-border/70 bg-card/80 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                      <link.icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent mb-1.5" />
                      <CardTitle className="text-lg sm:text-xl">{link.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 h-10">{link.description}</p>
                      <Button variant="link" asChild className="p-0 text-primary text-sm">
                          <Link href={link.href}>Go to Tool</Link>
                      </Button>
                      </CardContent>
                  </Card>
                  ))}
              </div>
            </section>
          </div>

          {/* Sidebar-like card */}
          <div className="md:col-span-1">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Your Family Code</CardTitle>
                    <CardDescription>Share this code with your parent to allow them to view your progress.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Badge variant="outline" className="text-2xl tracking-widest font-mono p-3 cursor-pointer" onClick={handleCopyCode}>
                        {userProfile.familyCode}
                        <Copy className="ml-3 h-5 w-5" />
                    </Badge>
                </CardContent>
            </Card>
          </div>
        </div>

      </main>
      <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Student Dashboard.</p>
      </footer>
    </div>
  );
}

export default function StudentDashboardPage() {
    return (
        <Suspense>
            <StudentPageContent />
        </Suspense>
    )
}
