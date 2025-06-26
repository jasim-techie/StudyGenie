
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, UserCog, LogIn, BrainCircuit, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDocs, query, where, collection, serverTimestamp } from "firebase/firestore";

const generateFamilyCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [familyCode, setFamilyCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();
  const { user, userProfile, loading } = useAuth();
  
  useEffect(() => {
    // If loading is false and user is logged in, redirect them.
    if (!loading && user && userProfile) {
        const dashboardPath = userProfile.role === 'student' ? '/dashboard/student' : '/dashboard/parent';
        router.push(dashboardPath);
    }
  }, [user, userProfile, loading, router]);


  const handleSignUp = async () => {
    if (!fullName.trim()) {
      toast({ title: "Name Required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }
    if (!auth || !db) {
        toast({ title: "Firebase Not Configured", description: "Please ensure your Firebase credentials are correct in .env.local", variant: "destructive" });
        return;
    }

    setIsLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let userDocData: any = {
          uid: user.uid,
          name: fullName,
          email: user.email,
          role: role,
          createdAt: serverTimestamp(),
      };

      if (role === 'student') {
        userDocData.familyCode = generateFamilyCode();
      } else { // Parent
        if (!familyCode.trim() || familyCode.length !== 6) {
          throw new Error("A valid 6-character family code is required for parent accounts.");
        }
        // Find student by family code
        const q = query(collection(db, "users"), where("familyCode", "==", familyCode), where("role", "==", "student"));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          throw new Error("No student found with that family code. Please check the code and try again.");
        }
        const studentDoc = querySnapshot.docs[0];
        userDocData.familyCode = familyCode;
        userDocData.linkedStudent = studentDoc.id;
      }
      
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), userDocData);

      toast({
        title: "Account Created!",
        description: "You have been successfully signed up.",
      });
      // The useEffect will handle the redirect
    } catch (error: any) {
        console.error("Sign up error:", error);
        let errorMessage = "An unknown error occurred during sign up.";
        if ((error.code && String(error.code).includes('api-key')) || (error.message && String(error.message).includes('api-key'))) {
          errorMessage = "Your Firebase API Key is not valid. Please check your .env.local file and restart the development server.";
        } else if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email address is already in use.";
        } else if (error.code === 'auth/weak-password') {
            errorMessage = "The password is too weak. Please use at least 6 characters.";
        } else if (error.message) {
            errorMessage = error.message;
        }
        toast({
            title: "Sign Up Failed",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!auth) {
        toast({ title: "Firebase Not Configured", description: "Please ensure your Firebase credentials are correct in .env.local", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        toast({
            title: "Login Successful",
            description: "Welcome back!",
        });
        // The useEffect will handle the redirect
    } catch (error: any) {
        console.error("Login error:", error);
        let errorMessage = "An unknown error occurred.";
        if ((error.code && String(error.code).includes('api-key')) || (error.message && String(error.message).includes('api-key'))) {
          errorMessage = "Your Firebase API Key is not valid. Please check your .env.local file and restart the development server.";
        } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            errorMessage = "Invalid email or password. Please try again.";
        } else {
           errorMessage = "Invalid email or password. Please try again.";
        }
        toast({
            title: "Login Failed",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };
  
  if (loading || user) {
     return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg font-medium text-foreground">Loading...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4 selection:bg-primary/20">
       <Link href="/" className="flex items-center gap-2.5 text-primary mb-6 sm:mb-8 hover:opacity-90 transition-opacity">
          <BrainCircuit className="h-10 w-10 sm:h-12 sm:w-12" />
          <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight">StudyGenie AI</h1>
        </Link>
      <Card className="w-full max-w-md shadow-2xl border-border/60 bg-card/90 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-headline">{isLoginView ? "Welcome Back!" : "Create Your Account"}</CardTitle>
          <CardDescription>{isLoginView ? "Sign in to continue your learning journey." : "Join StudyGenie AI to get started."}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLoginView && (
              <div>
                <Label className="text-base mb-2 block font-medium">I am a...</Label>
                <div className="relative flex w-full rounded-lg bg-muted p-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={cn(
                      "relative z-10 flex-1 py-2.5 px-4 text-center text-sm font-medium transition-colors duration-300 ease-out rounded-md",
                      role === "student" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <User className="inline-block mr-1.5 h-4 w-4 mb-0.5" /> Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("parent")}
                    className={cn(
                      "relative z-10 flex-1 py-2.5 px-4 text-center text-sm font-medium transition-colors duration-300 ease-out rounded-md",
                      role === "parent" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <UserCog className="inline-block mr-1.5 h-4 w-4 mb-0.5" /> Parent
                  </button>
                  <div
                    className={cn(
                      "absolute inset-0 m-1.5 h-[calc(100%-0.75rem)] w-[calc(50%-0.375rem)] rounded-md shadow-md transition-all duration-300 ease-out",
                      role === "student" ? "translate-x-0 bg-primary" : "translate-x-full bg-red-600"
                    )}
                  />
                </div>
              </div>
            )}
            
            {!isLoginView && (
               <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={role === "student" ? "Your Name" : "Parent's Name"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="text-base h-11 bg-background/70"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base h-11 bg-background/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base h-11 pr-10 bg-background/70"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            {!isLoginView && role === "parent" && (
                <div className="space-y-2">
                    <Label htmlFor="familyCode" className="text-base">Child's Family Code</Label>
                    <Input
                        id="familyCode"
                        type="text"
                        placeholder="e.g. A1B2C3"
                        value={familyCode}
                        onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                        required
                        maxLength={6}
                        className="text-base h-11 bg-background/70 tracking-widest"
                    />
                     <p className="text-xs text-muted-foreground pt-1">Enter the 6-digit code provided by your child to link accounts.</p>
                </div>
            )}

            <Button 
              type="submit" 
              className={cn(
                "w-full text-base py-3 h-12 font-semibold transition-all duration-300 ease-out transform hover:scale-105 focus:ring-4",
                role === "student" ? "bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary/30" : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600/30"
              )} 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2"/>
              ) : (
                <LogIn className="mr-2 h-5 w-5" /> 
              )}
               {isLoading ? `${isLoginView ? "Logging in" : "Signing up"}...` : (isLoginView ? "Login" : "Sign Up")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3 pt-5">
          <Button variant="link" onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-muted-foreground hover:text-primary">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
           <p className="text-xs text-center text-muted-foreground/80 border-t pt-3 w-full">
            You will be redirected after successful {isLoginView ? 'login' : 'signup'}.
           </p>
        </CardFooter>
      </Card>
    </div>
  );
}
