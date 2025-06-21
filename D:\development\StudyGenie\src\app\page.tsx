"use client";

import { Suspense } from "react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookCopy, HelpCircleIcon, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BookCopy,
    title: "AI Study Plan Generator",
    description: "Input your subjects, exam dates, and available hours to get a personalized, day-by-day study schedule.",
    href: "/study-plan",
    cta: "Create a Plan"
  },
  {
    icon: HelpCircleIcon,
    title: "AI Quiz Maker",
    description: "Paste your study notes or any text, and our AI will generate a multiple-choice quiz to test your knowledge.",
    href: "/quiz-maker",
    cta: "Make a Quiz"
  },
  {
    icon: Sparkles,
    title: "AI Key Point Extractor",
    description: "Upload a PDF or paste long answers to have the AI extract and structure the key points based on mark weightage.",
    href: "/key-points",
    cta: "Extract Points"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Suspense fallback={<div className="h-[68px] sm:h-[76px] w-full bg-card/95 border-b shadow-sm" />}>
        <Header />
      </Suspense>
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tighter text-foreground">
            Smarter Studying, <span className="text-primary">Powered by AI</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Welcome to StudyGenie AI. Get personalized study plans, generate quizzes from your notes, and extract key points effortlessly. Let's make learning more efficient.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="text-lg py-7 px-8">
              <Link href="/study-plan">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg py-7 px-8">
               <Link href="/login">Login / Sign Up</Link>
            </Button>
          </div>
        </section>

        <section className="mt-16 sm:mt-24">
           <h2 className="text-3xl font-bold text-center mb-10 font-headline">Our Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={feature.href}>
                      {feature.cta} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
           </div>
        </section>
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by Genkit & Next.js</p>
      </footer>
    </div>
  );
}
