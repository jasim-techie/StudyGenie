
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, LogIn, BrainCircuit, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLoginView) {
      // --- LOGIN LOGIC ---
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Login Successful", description: "Welcome back!" });
        router.push('/dashboard');
      } catch (error: any) {
        console.error("Login error:", error.code);
        let description = "An unknown error occurred. Please try again.";
        
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            description = "Invalid email or password. Please check your credentials and try again.";
        } else if (error.code === 'auth/user-disabled') {
            description = "This account has been disabled. Please contact support.";
        } else if (error.code === 'auth/invalid-email') {
            description = "The email address is not valid.";
        }

        toast({ 
            title: "Login Failed", 
            description: description, 
            variant: "destructive" 
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // --- SIGN UP LOGIC ---
      if (!fullName.trim()) {
        toast({ title: "Name Required", description: "Please enter your full name.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create student profile data
        const studentDocData = {
            uid: user.uid,
            name: fullName,
            email: user.email,
            createdAt: serverTimestamp(),
        };
        
        // Save student profile to 'students' collection in Firestore
        await setDoc(doc(db, "students", user.uid), studentDocData);
        toast({ title: "Account Created!", description: "You have been successfully signed up." });
        router.push('/dashboard');

      } catch (error: any) {
          console.error("Sign up error:", error);
          const errorMessage = error.code === 'auth/email-already-in-use' ? "This email address is already in use."
                             : error.code === 'auth/weak-password' ? "Password must be at least 6 characters."
                             : "An unknown error occurred during sign up.";
          toast({ title: "Sign Up Failed", description: errorMessage, variant: "destructive" });
      } finally {
          setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4 selection:bg-primary/20">
      <Link href="/" className="flex items-center gap-2.5 text-primary mb-6 sm:mb-8">
        <BrainCircuit className="h-10 w-10 sm:h-12 sm:w-12" />
        <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight">StudyGenie AI</h1>
      </Link>
      <Card className="w-full max-w-md shadow-2xl border-border/60 bg-card/90 backdrop-blur-md">
        <div className="p-2">
            <div className="relative flex w-full rounded-lg bg-muted p-1.5 shadow-inner">
                <button type="button" onClick={() => setIsLoginView(true)} className={cn("relative z-10 flex-1 py-2.5 px-4 text-center text-sm font-medium transition-colors duration-300 ease-out rounded-md", isLoginView ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                    <LogIn className="inline-block mr-1.5 h-4 w-4 mb-0.5" /> Student Login
                </button>
                <button type="button" onClick={() => setIsLoginView(false)} className={cn("relative z-10 flex-1 py-2.5 px-4 text-center text-sm font-medium transition-colors duration-300 ease-out rounded-md", !isLoginView ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                    <UserPlus className="inline-block mr-1.5 h-4 w-4 mb-0.5" /> Student Sign Up
                </button>
                <div className={cn("absolute inset-0 m-1.5 h-[calc(100%-0.75rem)] w-[calc(50%-0.375rem)] rounded-md shadow-md transition-all duration-300 ease-out", isLoginView ? "translate-x-0 bg-primary" : "translate-x-full bg-red-600")} />
            </div>
        </div>
        
        <form onSubmit={handleAuthAction}>
            <CardHeader>
                <CardTitle>{isLoginView ? "Welcome Back, Student!" : "Create Your Student Account"}</CardTitle>
                <CardDescription>{isLoginView ? "Sign in to continue your learning journey." : "Join StudyGenie AI to get started."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!isLoginView && (
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" type="text" placeholder="Your Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                        <Input id="login-password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                 <Button type="submit" className={cn("w-full", !isLoginView && 'bg-red-600 hover:bg-red-700')} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mr-2"/> : (isLoginView ? <LogIn className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />)}
                    {isLoading ? (isLoginView ? "Logging in..." : "Creating Account...") : (isLoginView ? "Login" : "Create Account")}
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
