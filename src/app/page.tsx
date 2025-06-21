
"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, HelpCircleIcon, Sparkles, ArrowRight } from "lucide-react";

const features = [
  {
    name: "Study Plan Generator",
    href: "/study-plan",
    icon: BookOpen,
    description: "Generate a personalized, day-by-day study schedule to keep you on track for your exams.",
  },
  {
    name: "Quiz Maker",
    href: "/quiz-maker",
    icon: HelpCircleIcon,
    description: "Turn your notes or textbook chapters into interactive quizzes to test your knowledge.",
  },
  {
    name: "Key Point Extractor",
    href: "/key-points",
    icon: Sparkles,
    description: "Paste long answers or content and let AI extract the most important points for revision.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline text-foreground">
            Welcome to StudyGenie AI
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your personal AI-powered assistant to help you study smarter, not harder.
            Choose a tool below to get started.
          </p>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature) => (
              <Card key={feature.name} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex-grow">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center font-headline text-2xl">{feature.name}</CardTitle>
                  <CardDescription className="text-center pt-2">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={feature.href}>
                      Go to {feature.name.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
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
