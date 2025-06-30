
"use client";

import Link from 'next/link';
import { BrainCircuit, Sun, Moon, LogIn, Menu, BookOpen, HelpCircleIcon, Sparkles, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: "/?tab=study-plan", label: "Study Plan", icon: BookOpen },
  { href: "/?tab=quiz-maker", label: "Quiz Maker", icon: HelpCircleIcon },
  { href: "/?tab=key-points", label: "Key Points", icon: Sparkles },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully signed out." });
      router.push('/login');
    } catch (error) {
      console.error("Logout Error:", error);
      toast({ title: "Logout Failed", description: "An error occurred while signing out.", variant: "destructive" });
    }
  };

  return (
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-6 border-b shadow-sm bg-card/95 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <BrainCircuit className="h-7 w-7 sm:h-8 sm:w-8" />
          <h1 className="text-xl sm:text-2xl font-headline font-bold">StudyGenie AI</h1>
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
               <Button key={link.label} variant="ghost" asChild size="sm">
                <Link href={link.href} className="flex items-center gap-1.5">
                  <link.icon className="h-4 w-4" /> {link.label}
                </Link>
              </Button>
            ))}
          </nav>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard" passHref>
                <Button variant="ghost" size="sm">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" passHref className="hidden md:block">
              <Button variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Login / Sign Up
              </Button>
            </Link>
          )}


          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <Link href="/" className="flex items-center gap-2 text-primary">
                      <BrainCircuit className="h-7 w-7" />
                      <h2 className="text-xl font-headline font-bold">StudyGenie AI</h2>
                    </Link>
                  </div>
                  <nav className="flex-grow p-4 space-y-2">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors text-base"
                        >
                          <link.icon className="h-5 w-5 text-muted-foreground" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                     <SheetClose asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors text-base"
                      >
                        <UserCircle className="h-5 w-5 text-muted-foreground" />
                        Dashboard
                      </Link>
                    </SheetClose>
                  </nav>
                  <div className="p-4 border-t">
                     <SheetClose asChild>
                       {user ? (
                         <Button onClick={handleLogout} variant="outline" className="w-full">
                           <LogOut className="mr-2 h-4 w-4" />
                           Logout
                         </Button>
                       ) : (
                         <Link href="/login" passHref className="w-full">
                           <Button variant="outline" className="w-full">
                             <LogIn className="mr-2 h-4 w-4" />
                             Login / Sign Up
                           </Button>
                         </Link>
                       )}
                     </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
