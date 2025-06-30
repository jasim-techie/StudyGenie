
"use client";

import { Suspense, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import { Loader2, User, BookOpen, HelpCircleIcon, Sparkles, Home, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const quickLinks = [
  { name: "New Study Plan", href: "/?tab=study-plan", icon: BookOpen, description: "Generate a personalized study schedule." },
  { name: "Quiz Maker", href: "/?tab=quiz-maker", icon: HelpCircleIcon, description: "Test your knowledge from notes." },
  { name: "Key Point Extractor", href: "/?tab=key-points", icon: Sparkles, description: "Extract key points from answers." },
];

function StudentDashboardContent() {
  const { user, userProfile, loading, profileLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If the initial auth check is done and there's still no user, then redirect.
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully signed out." });
      router.push('/login');
    } catch (error) {
      console.error("Logout Error:", error);
      toast({ title: "Logout Failed", description: "An error occurred while signing out.", variant: "destructive" });
    }
  };

  // 1. Show a generic loader while the initial auth check is running.
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Authenticating...</p>
      </div>
    );
  }

  // 2. If auth is checked and there's no user, show a redirecting state.
  if (!user) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Redirecting to login...</p>
      </div>
    );
  }

  // 3. If there's a user, but we are still waiting for their profile from Firestore.
  if (profileLoading) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Loading Profile...</p>
      </div>
    );
  }
  
  // 4. If the profile failed to load for some reason after trying.
  if (!userProfile) {
     return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-center">
        <div className="bg-destructive/10 border border-destructive p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-destructive-foreground">Could not load your profile.</h2>
          <p className="mt-2 text-muted-foreground">Please try logging out and back in.</p>
           <Button onClick={handleLogout} variant="destructive" className="mt-4">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </div>
      </div>
    );
  }

  // 5. Success! Render the dashboard.
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <User className="h-16 w-16 mx-auto text-primary mb-2 rounded-full bg-primary/10 p-3 border-2 border-primary/20" />
              <h2 className="text-lg lg:text-xl font-semibold">{userProfile.name}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Student Portal</p>
            </div>
            <nav className="space-y-1.5">
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3 bg-primary/10 text-primary" asChild>
                <Link href="/dashboard"><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/?tab=study-plan"><BookOpen className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Study Plan AI</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/?tab=quiz-maker"><HelpCircleIcon className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Quiz Maker</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/?tab=key-points"><Sparkles className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Key Points</Link>
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
              Welcome back, <span className="text-primary">{userProfile.name}!</span>
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
                          <Link href={link.href}>Go to Tool</Link>
                      </Button>
                    </CardContent>
                </Card>
                ))}
            </div>
          </section>
        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by Firebase & Next.js</p>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        }>
            <StudentDashboardContent />
        </Suspense>
    )
}
