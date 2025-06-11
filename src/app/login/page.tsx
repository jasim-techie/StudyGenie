
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, UserCog, LogIn, BrainCircuit } from "lucide-react";
import { useRouter } from 'next/navigation'; // Import useRouter
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for actual login logic
    toast({
      title: "Login Attempt",
      description: `Simulating login as ${role} with email: ${email}. In a real app, this would call an authentication service.`,
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (role === "student") {
        router.push('/dashboard/student'); // Redirect to student dashboard
      } else {
        router.push('/dashboard/parent'); // Redirect to parent dashboard
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
       <div className="flex items-center gap-2 text-primary mb-8">
          <BrainCircuit className="h-10 w-10" />
          <h1 className="text-4xl font-headline font-bold">StudyGenie AI</h1>
        </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>Login to access your StudyGenie dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-base">I am a:</Label>
              <RadioGroup
                defaultValue="student"
                onValueChange={(value: "student" | "parent") => setRole(value)}
                className="flex gap-4"
                id="role"
              >
                <Label
                  htmlFor="student"
                  className="flex items-center space-x-2 p-3 border rounded-md hover:bg-secondary/50 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary flex-1 justify-center"
                >
                  <RadioGroupItem value="student" id="student" />
                  <User className="mr-1 h-5 w-5" /> Student
                </Label>
                <Label
                  htmlFor="parent"
                  className="flex items-center space-x-2 p-3 border rounded-md hover:bg-secondary/50 cursor-pointer transition-colors has-[:checked]:bg-primary/10 has-[:checked]:border-primary flex-1 justify-center"
                >
                  <RadioGroupItem value="parent" id="parent" />
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
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base h-11"
              />
            </div>
            <Button type="submit" className="w-full text-base py-3" disabled={isLoading}>
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" /> Login to {role === 'student' ? 'Student' : 'Parent'} Portal
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center block">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="#" className="text-primary hover:underline">Sign up here</a> (Not implemented)
          </p>
           <p className="text-xs mt-4 text-muted-foreground border-t pt-4">
             This is a placeholder login. No actual authentication is performed.
           </p>
        </CardFooter>
      </Card>
    </div>
  );
}
