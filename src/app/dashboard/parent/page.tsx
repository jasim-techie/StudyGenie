
"use client";

import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookCopy, FileQuestion, Home, LogOut, MessageCircleQuestion, Settings, User, Users, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


// Mock data - in a real app, this would come from user state/backend
const parentName = "Ms. Guardian";
const studentName = "Alex Student"; // Assuming parent is linked to one student for this placeholder

const mockSubjectsProgress = [
  { id: "1", name: "Mathematics", topicsCovered: 8, topicsTotal: 12, lastStudiedFile: "Chapter 3 Notes.pdf" },
  { id: "2", name: "Physics", topicsCovered: 5, topicsTotal: 10, lastStudiedFile: "Newton's Laws.ppt" },
  { id: "3", name: "Chemistry", topicsCovered: 10, topicsTotal: 10, lastStudiedFile: "Periodic Table.docx" },
];

export default function ParentDashboardPage() {
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
  
  const handleAskQuestion = (subjectName: string, fileName: string) => {
    toast({
        title: `Ask AI about ${fileName}`,
        description: `This feature would allow you to ask questions based on the content of "${fileName}" for ${subjectName}. Backend integration needed.`,
        duration: 5000
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar Placeholder */}
        <aside className="w-64 bg-card p-6 space-y-6 border-r hidden md:flex flex-col justify-between">
          <div>
            <div className="text-center mb-8">
              <Users className="h-16 w-16 mx-auto text-primary mb-2 rounded-full bg-primary/10 p-2" />
              <h2 className="text-xl font-semibold">{parentName}</h2>
              <p className="text-sm text-muted-foreground">Parent Portal</p>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-base py-3" asChild>
                <Link href="/dashboard/parent"><Home className="mr-2 h-5 w-5" /> Dashboard Home</Link>
              </Button>
              {/* Add more navigation links as needed */}
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
              {studentName}'s Progress Overview
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Stay updated on your child's study activities and progress.
            </p>
          </div>

          {/* Subjects Progress Section */}
          <Card className="shadow-xl border-border/80 mb-8">
            <CardHeader>
              <CardTitle className="font-headline text-3xl flex items-center">
                <BarChart3 className="mr-3 h-8 w-8 text-primary" />
                Subject Progress
              </CardTitle>
              <CardDescription>
                View topics covered vs. pending for each subject {studentName} is studying.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSubjectsProgress.length === 0 ? (
                <p className="text-muted-foreground">No subject data available for {studentName} yet.</p>
              ) : (
                mockSubjectsProgress.map(subject => (
                  <Card key={subject.id} className="bg-muted/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex justify-between items-center">
                        {subject.name}
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${subject.topicsCovered === subject.topicsTotal ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {subject.topicsCovered === subject.topicsTotal ? <CheckCircle2 className="inline mr-1 h-4 w-4"/> : null}
                          {subject.topicsCovered} / {subject.topicsTotal} Topics Covered
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-1">Last material accessed: <em>{subject.lastStudiedFile}</em></p>
                       {/* Progress Bar (Simple) */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                            <div 
                                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
                                style={{ width: `${(subject.topicsCovered / subject.topicsTotal) * 100}%` }}
                            ></div>
                        </div>
                    </CardContent>
                    <CardFooter>
                       <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAskQuestion(subject.name, subject.lastStudiedFile)}
                        >
                         <MessageCircleQuestion className="mr-2 h-4 w-4" /> Ask AI about "{subject.lastStudiedFile}"
                       </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
              <p className="text-xs text-muted-foreground pt-4 border-t mt-4">Progress data is currently mocked. Real data requires backend integration.</p>
            </CardContent>
          </Card>
          
          {/* Other Parent Features - Placeholder */}
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">More Parent Tools (Coming Soon)</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Detailed quiz performance reports.</li>
                    <li>Study time tracking.</li>
                    <li>Communication channel with student (via app).</li>
                </ul>
            </CardContent>
          </Card>

        </main>
      </div>
       <footer className="py-6 text-center text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Parent Dashboard.</p>
      </footer>
    </div>
  );
}
