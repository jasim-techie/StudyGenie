
"use client";

import { Header } from "@/components/study-genie/Header";
import { KeyPointGenerator } from "@/components/study-genie/KeyPointGenerator";
import { handleGenerateKeyPoints } from "../actions";

export default function KeyPointsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-8 max-w-3xl mx-auto">
          <KeyPointGenerator generateKeyPointsAction={handleGenerateKeyPoints} />
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} StudyGenie AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
