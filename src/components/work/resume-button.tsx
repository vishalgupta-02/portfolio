"use client";

import { FileDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics/tracker";

export function ResumeButton() {
  const handleDownload = () => {
    trackEvent("resume_download", { source: "work_page" });
  };

  return (
    <a
      href="/static/resume.pdf"
      onClick={handleDownload}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 active:scale-95 transition-all"
    >
      <FileDown className="size-3.5 text-muted-foreground" />
      <span>Resume / CV</span>
    </a>
  );
}
