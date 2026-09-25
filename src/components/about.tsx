"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  BrainIcon,
  ClockIcon,
  CodeIcon,
  EmailIcon,
  LinkIcon,
  LocationIcon,
} from "./socials";
import TimeDisplay from "./time-stamp";
import { Copy } from "lucide-react";

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("abhimanyug987@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:abhimanyug987@gmail.com";
    }
  };

  return (
    <section className="font-display border-border/40 grid w-full grid-cols-1 gap-2 border-b px-4 py-6 text-xs tracking-wide sm:grid-cols-2 sm:text-sm">
      <div className="border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 group col-span-1 flex items-center gap-3 rounded-lg border p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs sm:col-span-2">
        <div className="border-border/60 bg-muted/40 text-foreground group-hover:border-foreground/30 flex shrink-0 items-center justify-center rounded-md border p-1.5 transition-all duration-200 group-hover:scale-110">
          <CodeIcon />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase">
            Specialization
          </span>
          <span className="text-foreground text-sm font-semibold">
            Backend Architecture & Distributed Systems
          </span>
        </div>
      </div>

      <div className="border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 group col-span-1 flex items-center gap-3 rounded-lg border p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs sm:col-span-2">
        <div className="border-border/60 bg-muted/40 text-foreground group-hover:border-foreground/30 flex shrink-0 items-center justify-center rounded-md border p-1.5 transition-all duration-200 group-hover:scale-110">
          <BrainIcon />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase">
            Current Project
          </span>
          <span className="text-foreground text-sm font-semibold">
            Building Linkforge · Multi-tenant SaaS & Real-Time Analytics
          </span>
        </div>
      </div>

      <div className="border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 group col-span-1 flex items-center gap-3 rounded-lg border p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
        <div className="border-border/60 bg-muted/40 text-foreground group-hover:border-foreground/30 flex shrink-0 items-center justify-center rounded-md border p-1.5 transition-all duration-200 group-hover:scale-110">
          <LocationIcon />
        </div>
        <div className="min-w-0">
          <span className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase">
            Location
          </span>
          <span className="text-foreground font-medium">Delhi, India</span>
        </div>
      </div>

      <div className="border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 group col-span-1 flex items-center gap-3 rounded-lg border p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
        <div className="border-border/60 bg-muted/40 text-foreground group-hover:border-foreground/30 flex shrink-0 items-center justify-center rounded-md border p-1.5 transition-all duration-200 group-hover:scale-110">
          <ClockIcon />
        </div>
        <div className="min-w-0">
          <span className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase">
            Local Time
          </span>
          <TimeDisplay />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopyEmail}
        className="border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 group relative col-span-1 flex cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-lg border p-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs active:scale-[0.99]"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="border-border/60 bg-muted/40 text-foreground group-hover:border-foreground/30 flex shrink-0 items-center justify-center rounded-md border p-1.5 transition-all duration-200 group-hover:scale-110">
            <EmailIcon />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase">
                Direct Email
              </span>
              <span className="text-muted-foreground/60 group-hover:text-foreground/80 hidden font-mono text-[9px] transition-colors sm:inline">
                (click to copy)
              </span>
            </div>
            <span className="text-foreground block truncate font-medium">
              abhimanyug987@gmail.com
            </span>
          </div>
        </div>

        <div className="shrink-0 pl-2">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8, y: 2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -2 }}
                className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-400"
              >
                <svg
                  className="size-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy-idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-muted-foreground/70 group-hover:text-foreground font-mono text-[11px] transition-colors"
              >
                <Copy className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>

      <div className="border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 group col-span-1 flex items-center gap-3 rounded-lg border p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
        <div className="border-border/60 bg-muted/40 text-foreground group-hover:border-foreground/30 flex shrink-0 items-center justify-center rounded-md border p-1.5 transition-all duration-200 group-hover:scale-110">
          <LinkIcon />
        </div>
        <div className="min-w-0">
          <span className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase">
            Work Preference
          </span>
          <span className="text-foreground block truncate font-medium">
            Remote & High-Impact Backend Roles
          </span>
        </div>
      </div>
    </section>
  );
}
