"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Link as LinkIcon } from "lucide-react";

interface ResourceSuggestionsProps {
  resources: string[];
}

export function ResourceSuggestions({ resources }: ResourceSuggestionsProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-primary" />
          Suggested Learning Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {resources.map((resource, index) => (
            <li key={index} className="p-3 bg-background rounded-md border text-sm">
              {isValidUrl(resource) ? (
                <a
                  href={resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline flex items-center"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {resource}
                </a>
              ) : (
                <span>{resource}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
