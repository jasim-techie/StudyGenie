
"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/study-genie/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Link as LinkIcon, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ParentPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();
  
  const [studentProfile, setStudentProfile] = useState<UserProfile | null>(null);
  const [studentLoading, setStudentLoading] = useState(true);
  const [familyCodeInput, setFamilyCodeInput] = useState("");
  const [isLinking, setIsLinking] = useState(false);
  const [linkedStudentName, setLinkedStudentName] = useState<string | null>(null);

  // Effect to fetch linked student's name if it exists
  useEffect(() => {
    if (userProfile && userProfile.role === 'parent' && userProfile.linkedStudent) {
      const fetchStudentName = async () => {
        setStudentLoading(true);
        const studentDocRef = doc(db, 'users', userProfile.linkedStudent!);
        const studentDocSnap = await getDoc(studentDocRef);
        if (studentDocSnap.exists()) {
            setLinkedStudentName(studentDocSnap.data().name);
        }
        setStudentLoading(false);
      };
      fetchStudentName();
    } else {
        setStudentLoading(false);
    }
  }, [userProfile]);

  const handleLinkStudent = async () => {
    if (!familyCodeInput.trim() || !user) {
      toast({ title: "Family code required", variant: "destructive" });
      return;
    }
    setIsLinking(true);
    try {
      const q = query(collection(db, "users"), where("familyCode", "==", familyCodeInput.trim()), where("role", "==", "student"));
      const studentQuerySnapshot = await getDocs(q);

      if (studentQuerySnapshot.empty) {
        toast({ title: "No Student Found", description: "Please check the family code and try again.", variant: "destructive" });
        return;
      }
      
      const studentDoc = studentQuerySnapshot.docs[0];
      const parentDocRef = doc(db, "users", user.uid);
      await updateDoc(parentDocRef, { linkedStudent: studentDoc.id });

      toast({ title: "Success!", description: `You are now linked to ${studentDoc.data().name}. The page will now refresh.` });
      // Reload to ensure the new state is reflected everywhere
      router.refresh();

    } catch (error) {
      console.error("Error linking student:", error);
      toast({ title: "Error", description: "Could not link student account.", variant: "destructive" });
    } finally {
      setIsLinking(false);
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
    return null;
  }
  
  // 3. If there's a user but the parent's profile is still loading from Firestore.
  if (!userProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-medium text-foreground">Loading Profile...</p>
      </div>
    );
  }

  // 4. If the user's role is not 'parent', redirect them.
  if (userProfile.role !== 'parent') {
    router.replace('/dashboard/student');
    return null;
  }
  
  // 5. Success! Render the dashboard.
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/10">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-foreground">
                Parent Dashboard
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
                Welcome, {userProfile.name}.
            </p>
        </div>
        
        {studentLoading ? (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Checking for linked student...</p>
            </div>
        ) : linkedStudentName ? (
            <Alert className="border-green-500/50 text-green-700 [&>svg]:text-green-600">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle className="font-headline text-lg">Account Linked!</AlertTitle>
              <AlertDescription>
                 You are successfully connected to your student: <strong>{linkedStudentName}</strong>. 
                 <br/>
                 You can now view their study progress and activities. (Feature coming soon)
              </AlertDescription>
            </Alert>
        ) : (
            <Card className="max-w-lg mx-auto shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <LinkIcon className="h-6 w-6 text-primary" />
                        Link to a Student Account
                    </CardTitle>
                    <CardDescription>Enter your child's 6-digit Family Code to view their progress.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Label htmlFor="family-code" className="sr-only">Family Code</Label>
                    <Input 
                        id="family-code"
                        value={familyCodeInput}
                        onChange={(e) => setFamilyCodeInput(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        className="text-center text-lg tracking-widest font-mono h-12"
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleLinkStudent} className="w-full" disabled={isLinking}>
                        {isLinking ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        Link Account
                    </Button>
                </CardFooter>
            </Card>
        )}
      </main>
      <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t bg-card">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. Parent Dashboard.</p>
      </footer>
    </div>
  );
}

export default function ParentDashboardPage() {
    return (
        <Suspense>
            <ParentPageContent />
        </Suspense>
    )
}
