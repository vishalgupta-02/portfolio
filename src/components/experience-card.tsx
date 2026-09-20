"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ExperienceCardProps {
  companyName: string;
  timeline: string;
  role: string;
  locations: string;
}

export default function ExperienceCard({
  companyName,
  timeline,
  role,
  locations,
}: ExperienceCardProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const content = (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
      <h3 className="text-base sm:text-lg font-bold font-sans text-foreground flex items-center gap-1.5 group-hover:text-primary transition-colors">
        {companyName}
        {isHomePage && (
          <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        )}
      </h3>

      <span className="font-mono text-xs text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md border border-border/50 self-start sm:self-auto">
        {timeline}
      </span>
    </div>
  );

  const details = (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1.5 text-xs sm:text-sm">
      <p className="font-display font-medium text-foreground/80">
        {role}
      </p>

      <p className="font-display text-muted-foreground text-xs">
        {locations}
      </p>
    </div>
  );

  if (isHomePage) {
    return (
      <Link
        href="/work"
        className="group w-full rounded-xl border border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 p-3.5 sm:p-4 transition-all duration-200 active:scale-[0.99] block"
      >
        {content}
        {details}
      </Link>
    );
  }

  return (
    <div className="w-full rounded-xl border border-border/40 bg-card/30 p-3.5 sm:p-4">
      {content}
      {details}
    </div>
  );
}

