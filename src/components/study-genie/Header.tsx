import Link from 'next/link';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { BrainCircuit } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-6 border-b shadow-sm bg-card">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <BrainCircuit className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">StudyGenie AI</h1>
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
