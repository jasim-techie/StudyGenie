
"use client";

import Link from 'next/link';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { BrainCircuit, Sun, Moon, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="py-4 px-6 border-b shadow-sm bg-card">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <BrainCircuit className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">StudyGenie AI</h1>
        </Link>
        
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Link href="/login" passHref>
            <Button variant="outline">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
