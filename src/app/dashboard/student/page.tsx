
"use client";

import { Header } from "@/components/study-genie/Header";
import { StudyRoom } from "@/components/study-genie/StudyRoom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileQuestion, HelpCircleIcon, Home, LayoutDashboard, LogOut, Settings, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


// Mock data - in a real app, this would come from user state/backend
const studentName = "Alex Student"; 
const quickLinks = [
  { name: "Create New Study Plan", href: "/", icon: BookOpen },
  { name: "Take a Quiz", href: "/#quiz-maker", icon: HelpCircleIcon }, // Assuming main page has quiz tab
  { name: "Key Point Extractor", href: "/#key-points", icon: Sparkles },
];

export default function StudentDashboardPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    // Placeholder for actual logout logic
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out. (Simulation)",
    });
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar Placeholder */}
        <aside className="w-64 bg-card p-6 space-y-6 border-r hidden md:flex flex-col justify-between">
          <div>
            <div className="text-center mb-8">
              <User className="h-16 w-16 mx-auto text-primary mb-2 rounded-full bg-primary/10 p-2" />
              <h2 className="text-xl font-semibold">{studentName}</h2>
              <p className="text-sm text-muted-foreground">Student Portal</p>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-base py-3" asChild>
                <Link href="/dashboard/student"><Home className="mr-2 h-5 w-5" /> Dashboard Home</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base py-3" asChild>
                <Link href="/"><BookOpen className="mr-2 h-5 w-5" /> Study Plan AI</Link>
              </Button>
              {/* Add more navigation links as needed */}
               <Button variant="ghost" className="w-full justify-start text-base py-3" asChild>
                <Link href="/#quiz-maker"><HelpCircleIcon className="mr-2 h-5 w-5" /> Quiz Maker</Link>
              </Button>
                <Button variant="ghost" className="w-full justify-start text-base py-3" asChild>
                <Link href="/#key-points"><Sparkles className="mr-2 h-5 w-5" /> Key Points</Link>
              </Button>
            </nav>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-base py-3">
              <Settings className="mr-2 h-5 w-5" /> Settings (Placeholder)
            </Button>
            <Button variant="outline" className="w-full justify-start text-base py-3" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline text-foreground">
              Welcome back, <span className="text-primary">{studentName}!</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Ready to ace your studies? Let's get started.
            </p>
          </div>

          {/* Quick Links/Stats Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {quickLinks.map(link => (
              <Card key={link.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                   <link.icon className="h-8 w-8 text-accent mb-2" />
                  <CardTitle className="text-xl">{link.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="link" asChild className="p-0 text-primary">
                    <Link href={link.href}>Go to {link.name.split(' ')[0]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
             <Card className="hover:shadow-lg transition-shadow bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                   <LayoutDashboard className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Your Progress (Coming Soon)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Track your completed topics and quiz scores here.</p>
                </CardContent>
              </Card>
          </div>
          
          {/* Study Room Section */}
          <StudyRoom />

        </main>
      </div>
       <footer className="py-6 text-center text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Student Dashboard.</p>
      </footer>
    </div>
  );
}
