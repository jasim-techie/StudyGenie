
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, UserCog, LogIn, BrainCircuit, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true); // true for login, false for signup
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const actionText = isLoginView ? "Login" : "Signup";

    toast({
      title: `${actionText} Attempt`,
      description: `Simulating ${actionText.toLowerCase()} as ${role} with email: ${email}. In a real app, this would call an authentication service.`,
    });
    
    setTimeout(() => {
      setIsLoading(false);
      if (role === "student") {
        router.push('/dashboard/student');
      } else {
        router.push('/dashboard/parent');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
       <Link href="/" className="flex items-center gap-2 text-primary mb-6 sm:mb-8 hover:opacity-90 transition-opacity">
          <BrainCircuit className="h-10 w-10 sm:h-12 sm:w-12" />
          <h1 className="text-3xl sm:text-4xl font-headline font-bold">StudyGenie AI</h1>
        </Link>
      <Card className="w-full max-w-md shadow-2xl border-border/60">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-headline">{isLoginView ? "Welcome Back!" : "Create Account"}</CardTitle>
          <CardDescription>{isLoginView ? "Login to access your dashboard." : "Sign up to get started."}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role-group" className="text-base">I am a:</Label>
              <RadioGroup
                id="role-group"
                value={role}
                onValueChange={(value: "student" | "parent") => setRole(value)}
                className="grid grid-cols-2 gap-3"
              >
                <Label
                  htmlFor="student-role"
                  className="flex items-center justify-center space-x-2 p-3 border rounded-md hover:bg-muted/30 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
                >
                  <RadioGroupItem value="student" id="student-role" />
                  <User className="mr-1 h-5 w-5" /> Student
                </Label>
                <Label
                  htmlFor="parent-role"
                  className="flex items-center justify-center space-x-2 p-3 border rounded-md hover:bg-muted/30 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
                >
                  <RadioGroupItem value="parent" id="parent-role" />
                  <UserCog className="mr-1 h-5 w-5" /> Parent
                </Label>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base h-11 pr-10"
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
            <Button type="submit" className="w-full text-base py-3 h-11" disabled={isLoading}>
              {isLoading ? (
                `${isLoginView ? "Logging in" : "Signing up"}...`
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" /> {isLoginView ? "Login" : "Sign Up"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4 pt-4">
          <Button variant="link" onClick={() => setIsLoginView(!isLoginView)} className="text-sm">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
           <p className="text-xs text-center text-muted-foreground border-t pt-4 w-full">
             This is a placeholder {isLoginView ? 'login' : 'signup'}. No actual authentication is performed.
           </p>
        </CardFooter>
      </Card>
    </div>
  );
}
