
"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, BookCopy, FileQuestion, Home, LogOut, MessageCircleQuestion, Settings, User, Users, CheckCircle2, Brain, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

const mockStudentName = "Your Child"; 

const mockSubjectsProgress = [
  { id: "1", name: "Mathematics", topicsCovered: 8, topicsTotal: 12, lastStudiedFile: "Chapter 3 Notes.pdf", quizAttempts: 3, avgScore: 75 },
  { id: "2", name: "Physics", topicsCovered: 5, topicsTotal: 10, lastStudiedFile: "Newton's Laws.ppt", quizAttempts: 1, avgScore: 90 },
  { id: "3", name: "Chemistry", topicsCovered: 10, topicsTotal: 10, lastStudiedFile: "Periodic Table.docx", quizAttempts: 5, avgScore: 82 },
  { id: "4", name: "Biology", topicsCovered: 2, topicsTotal: 15, lastStudiedFile: "Cell Structure.pdf", quizAttempts: 0, avgScore: 0 },
];

function truncateFileName(name: string, maxLength: number = 20): string {
  if (name.length <= maxLength) return name;
  const extension = name.includes('.') ? name.substring(name.lastIndexOf('.')) : '';
  const baseName = name.includes('.') ? name.substring(0, name.lastIndexOf('.')) : name;
  if (baseName.length <= maxLength - extension.length - 3) return name;
  return \`\${baseName.substring(0, maxLength - extension.length - 3)}...\${extension}\`;
}

function ParentPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [parentName, setParentName] = useState("Guardian");
  const [studentName, setStudentName] = useState(mockStudentName);

  useEffect(() => {
    const nameFromQuery = searchParams.get("name");
    if (nameFromQuery) {
      setParentName(nameFromQuery);
    }
  }, [searchParams]);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out. (Simulation)",
    });
    router.push('/login');
  };
  
  const handleAskQuestionOnFile = (subjectName: string, fileName: string) => {
    toast({
        title: \`Ask AI about \${fileName}\`,
        description: \`This feature would allow you to ask questions or get summaries based on the content of "\${fileName}" for \${subjectName}. Backend integration needed.\`,
        duration: 5000
    });
  };
  
  const handleViewDetailedReport = (subjectName: string) => {
     toast({
        title: \`Detailed Report for \${subjectName}\`,
        description: \`This would show a detailed report of quizzes, study time, etc. for \${subjectName}. (Feature Coming Soon)\`,
        duration: 4000
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      
      <div className="flex flex-1">
        <aside className="w-60 lg:w-64 bg-card p-4 lg:p-6 space-y-6 border-r hidden md:flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-center mb-8">
              <Users className="h-16 w-16 mx-auto text-red-600 mb-2 rounded-full bg-red-600/10 p-3 border-2 border-red-600/20" />
              <h2 className="text-lg lg:text-xl font-semibold">{parentName}</h2>
              <p className="text-xs lg:text-sm text-muted-foreground">Parent Portal</p>
            </div>
            <nav className="space-y-1.5">
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" asChild>
                <Link href={\`/dashboard/parent?name=\${encodeURIComponent(parentName)}\`}><Home className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm lg:text-base py-2.5 lg:py-3" onClick={() => toast({title: "Coming Soon", description: "Student profile & settings will be here."})}>
                <User className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Child's Profile
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
              {studentName}'s Progress Overview
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              Stay updated on your child's study activities and progress.
            </p>
          </div>

          <Card className="shadow-xl border-border/80 mb-6 sm:mb-8 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-xl sm:text-2xl lg:text-3xl flex items-center">
                <BarChart3 className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
                Subject Progress
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                View topics covered, quiz performance, and last accessed materials for {studentName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {mockSubjectsProgress.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No subject data available for {studentName} yet.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {mockSubjectsProgress.map(subject => (
                  <Card key={subject.id} className="bg-card border-border/60 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg sm:text-xl font-semibold">{subject.name}</CardTitle>
                        <Badge variant={subject.topicsCovered === subject.topicsTotal ? "default" : "secondary"} className={\`\${subject.topicsCovered === subject.topicsTotal ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'} text-xs sm:text-sm shadow-sm\`}>
                          {subject.topicsCovered === subject.topicsTotal && <CheckCircle2 className="inline mr-1.5 h-4 w-4"/>}
                          {subject.topicsCovered} / {subject.topicsTotal} Topics
                        </Badge>
                      </div>
                       <Progress 
                            value={(subject.topicsCovered / subject.topicsTotal) * 100} 
                            className="h-2 sm:h-2.5 mt-2" 
                            indicatorClassName={subject.topicsCovered === subject.topicsTotal ? "bg-green-500" : "bg-primary"}
                        />
                    </CardHeader>
                    <CardContent className="text-xs sm:text-sm space-y-1.5">
                      <p className="text-muted-foreground">Last material: <em className="text-foreground">{subject.lastStudiedFile}</em></p>
                      <p className="text-muted-foreground">Quiz Attempts: <span className="font-medium text-foreground">{subject.quizAttempts}</span></p>
                      <p className="text-muted-foreground">Average Score: <span className={\`font-medium \${subject.avgScore >= 70 ? 'text-green-600' : 'text-orange-600'}\`}>{subject.avgScore > 0 ? \`\${subject.avgScore}%\` : 'N/A'}</span></p>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
                       <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAskQuestionOnFile(subject.name, subject.lastStudiedFile)}
                          className="w-full sm:w-auto"
                        >
                         <MessageCircleQuestion className="mr-1.5 h-4 w-4" /> Ask AI about "{truncateFileName(subject.lastStudiedFile)}"
                       </Button>
                       <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetailedReport(subject.name)}
                          className="w-full sm:w-auto text-primary hover:text-primary/80"
                        >
                         <Search className="mr-1.5 h-4 w-4" /> View Report
                       </Button>
                    </CardFooter>
                  </Card>
                ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground pt-4 border-t mt-4 text-center">
                Progress data is currently mocked. Real data requires backend integration.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-border/80 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline text-xl sm:text-2xl flex items-center">
                    <Brain className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                    Parental AI Tools (Coming Soon)
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                    Future tools to help you support {studentName}'s learning journey.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Custom Quiz Generation</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Create quizzes on specific weak areas identified from reports.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Study Habit Insights</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">AI-driven suggestions based on study patterns.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Learning Resource Curation</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Suggest supplementary materials for challenging topics.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-1">Goal Setting & Tracking</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Collaborate with {studentName} to set and monitor academic goals.</p>
                </div>
            </CardContent>
          </Card>

        </main>
      </div>
       <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Parent Dashboard.</p>
      </footer>
    </div>
  );
}

export default function ParentDashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Loading Dashboard...</p>
      </div>
    }>
      <ParentPageContent />
    </Suspense>
  );
}
