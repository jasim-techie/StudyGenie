
"use client";

import { Header } from "@/components/study-genie/Header";
import { StudyRoom } from "@/components/study-genie/StudyRoom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileQuestion, HelpCircleIcon, Home, LayoutDashboard, LogOut, Settings, Sparkles, User, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


// Mock data - in a real app, this would come from user state/backend
const studentName = "Alex Student"; 
const quickLinks = [
  { name: "New Study Plan", href: "/", icon: BookOpen, description: "Generate a personalized study schedule." },
  { name: "Quiz Maker", href: "/#quiz-maker", icon: HelpCircleIcon, description: "Test your knowledge from notes.", sectionId: "quiz-maker" },
  { name: "Key Point Extractor", href: "/#key-points", icon: Sparkles, description: "Extract key points from answers.", sectionId: "key-points" },
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

  const handleLinkClick = (href: string, sectionId?: string) => {
    if (sectionId && href === "/") {
        router.push('/'); // Go to home page first
        setTimeout(() => { // Allow time for navigation
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        router.push(href);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar Placeholder - For larger screens */}
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <User className="h-16 w-16 mx-auto text-primary mb-2 rounded-full bg-primary/10 p-3 border-2 border-primary/20" />
              <h2 className="text-lg lg:text-xl font-semibold">{studentName}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Student Portal</p>
            </div>
            <nav className="space-y-1.5">
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href="/dashboard/student"><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => handleLinkClick("/", undefined)}>
                <BookOpen className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Study Plan AI
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => handleLinkClick("/", "quiz-maker")}>
                <HelpCircleIcon className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Quiz Maker
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => handleLinkClick("/", "key-points")}>
                <Sparkles className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Key Points
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

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-foreground">
              Welcome back, <span className="text-primary">{studentName}!</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              Ready to ace your studies? Let's get started.
            </p>
          </div>

          {/* Quick Links Section */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground/90">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {quickLinks.map(link => (
                <Card key={link.name} className="hover:shadow-lg transition-shadow duration-200 ease-in-out border-border/70">
                    <CardHeader className="pb-3">
                    <link.icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent mb-1.5" />
                    <CardTitle className="text-lg sm:text-xl">{link.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 h-10">{link.description}</p>
                    <Button variant="link" asChild className="p-0 text-primary text-sm">
                        <Link href={link.href} onClick={(e) => { e.preventDefault(); handleLinkClick(link.href, link.sectionId); }}>Go to {link.name.split(' ')[0]}</Link>
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
          
          {/* Study Room Section */}
          <StudyRoom />

        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Student Dashboard.</p>
      </footer>
    </div>
  );
}
