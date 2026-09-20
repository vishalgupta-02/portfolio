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
    <section className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 py-6 px-4 font-display tracking-wide border-b border-border/40 text-xs sm:text-sm">
      <div className="col-span-1 sm:col-span-2 flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group">
        <div className="border border-border/60 bg-muted/40 p-1.5 rounded-md shrink-0 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-foreground/30 transition-all duration-200">
          <CodeIcon />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
            Specialization
          </span>
          <span className="text-foreground font-semibold text-sm">
            Backend Architecture & Distributed Systems
          </span>
        </div>
      </div>

      <div className="col-span-1 sm:col-span-2 flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group">
        <div className="border border-border/60 bg-muted/40 p-1.5 rounded-md shrink-0 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-foreground/30 transition-all duration-200">
          <BrainIcon />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
            Current Project
          </span>
          <span className="text-foreground font-semibold text-sm">
            Building Linkforge · Multi-tenant SaaS & Real-Time Analytics
          </span>
        </div>
      </div>

      <div className="col-span-1 flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group">
        <div className="border border-border/60 bg-muted/40 p-1.5 rounded-md shrink-0 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-foreground/30 transition-all duration-200">
          <LocationIcon />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
            Location
          </span>
          <span className="text-foreground font-medium">Delhi, India</span>
        </div>
      </div>

      <div className="col-span-1 flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group">
        <div className="border border-border/60 bg-muted/40 p-1.5 rounded-md shrink-0 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-foreground/30 transition-all duration-200">
          <ClockIcon />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
            Local Time
          </span>
          <TimeDisplay />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopyEmail}
        className="col-span-1 text-left flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs active:scale-[0.99] transition-all duration-200 cursor-pointer group relative overflow-hidden"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="border border-border/60 bg-muted/40 p-1.5 rounded-md shrink-0 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-foreground/30 transition-all duration-200">
            <EmailIcon />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Direct Email
              </span>
              <span className="text-[9px] font-mono text-muted-foreground/60 hidden sm:inline group-hover:text-foreground/80 transition-colors">
                (click to copy)
              </span>
            </div>
            <span className="text-foreground font-medium truncate block">
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
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400"
              >
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                className="text-[11px] font-mono text-muted-foreground/70 group-hover:text-foreground transition-colors"
              >
                📋
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>

      <div className="col-span-1 flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group">
        <div className="border border-border/60 bg-muted/40 p-1.5 rounded-md shrink-0 flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-foreground/30 transition-all duration-200">
          <LinkIcon />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
            Work Preference
          </span>
          <span className="text-foreground font-medium truncate block">
            Remote & High-Impact Backend Roles
          </span>
        </div>
      </div>
    </section>
  );
}




