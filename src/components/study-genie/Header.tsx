"use client";

import Link from 'next/link';
import { BrainCircuit, Sun, Moon, LogIn, Menu, BookOpen, HelpCircleIcon, Sparkles, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { href: "/", label: "Study Plan AI", icon: BookOpen },
  { href: "/?section=quiz-maker", label: "Quiz Maker", icon: HelpCircleIcon, sectionId: "quiz-maker" },
  { href: "/?section=key-points", label: "Key Points", icon: Sparkles, sectionId: "key-points"},
  { href: "/dashboard/student", label: "Student Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/parent", label: "Parent Dashboard", icon: UserCircle },
];


export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleDesktopLinkClick = (href: string, sectionId?: string) => {
    if (sectionId && href.startsWith("/?section=")) {
        router.push(href); // This will trigger useEffect in HomePage to scroll
    } else {
        router.push(href);
    }
  };
  
  const handleMobileLinkClick = (href: string, sectionId?: string) => {
      if (sectionId && href.startsWith("/?section=")) {
        router.push(href);
      } else {
        router.push(href);
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
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.slice(0,3).map((link) => (
               <Button key={link.label} variant="ghost" asChild size="sm" onClick={() => handleDesktopLinkClick(link.href, link.sectionId)}>
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
          <Link href="/login" passHref className="hidden md:block">
            <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login / Sign Up
            </Button>
          </Link>

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
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-2 text-primary">
                        <BrainCircuit className="h-7 w-7" />
                        <h2 className="text-xl font-headline font-bold">StudyGenie AI</h2>
                        </Link>
                    </SheetClose>
                  </div>
                  <nav className="flex-grow p-4 space-y-2">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => handleMobileLinkClick(link.href, link.sectionId)}
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors text-base"
                        >
                          <link.icon className="h-5 w-5 text-muted-foreground" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="p-4 border-t">
                     <SheetClose asChild>
                        <Link href="/login" passHref className="w-full">
                            <Button variant="outline" className="w-full">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login / Sign Up
                            </Button>
                        </Link>
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
