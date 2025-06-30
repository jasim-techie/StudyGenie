
"use client";

import { Suspense, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, HelpCircleIcon, Sparkles } from "lucide-react";

const quickLinks = [
  { name: "New Study Plan", href: "/?tab=study-plan", icon: BookOpen, description: "Generate a personalized study schedule." },
  { name: "Quiz Maker", href: "/?tab=quiz-maker", icon: HelpCircleIcon, description: "Test your knowledge from notes." },
  { name: "Key Point Extractor", href: "/?tab=key-points", icon: Sparkles, description: "Extract key points from answers." },
];

function StudentDashboardContent() {
  const { user, userProfile, loading, profileLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the initial auth check is done and there's still no user, then redirect.
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]); // Dependencies for the effect

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
  // The useEffect above will handle the actual redirect.
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
      <div className="flex h-screen w-full items-center justify-center bg-background text-center">
        <div>
          <p className="text-lg font-medium text-destructive-foreground bg-destructive p-4 rounded-md">
            Could not load your profile.
          </p>
          <p className="mt-2 text-muted-foreground">Please try logging out and back in.</p>
        </div>
      </div>
    );
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

        <div className="grid grid-cols-1 gap-8">
             <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground/90">Quick Access to AI Tools</h2>
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
            
            <section>
              <Card className="shadow-lg border-border/70 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Family Code</CardTitle>
                  <CardDescription>
                    This is your unique code for account linking features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
                        <p className="text-2xl font-mono font-bold text-primary tracking-widest">
                            {userProfile.familyCode || "GENERATING..."}
                        </p>
                    </div>
                </CardContent>
              </Card>
            </section>
        </div>

      </main>
      <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by Ai & Next.js</p>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
    return (
        <Suspense>
            <StudentDashboardContent />
        </Suspense>
    )
}
