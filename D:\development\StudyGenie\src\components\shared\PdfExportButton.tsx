
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PdfExportButtonProps {
  disabled?: boolean;
}

export function PdfExportButton({ disabled = false }: PdfExportButtonProps) {
  const { toast } = useToast();

  const handleExport = () => {
    // Placeholder for PDF export functionality
    // In a real app, you'd use a library like jsPDF and html2canvas
    // or a server-side PDF generation service.
    toast({
      title: "PDF Export",
      description: "PDF export functionality is not yet implemented.",
      variant: "default",
    });
    console.log("Attempting to export PDF...");
  };

  return (
    <Button onClick={handleExport} disabled={disabled} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Export Plan as PDF
    </Button>
  );
}
