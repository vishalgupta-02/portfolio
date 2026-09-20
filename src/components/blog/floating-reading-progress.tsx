"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUp, ChevronUp, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TableOfContentsItem } from "@/lib/blog/types";

interface FloatingReadingProgressProps {
  title: string;
  tableOfContents?: TableOfContentsItem[];
  threshold?: number;
  className?: string;
}

export function FloatingReadingProgress({
  title,
  tableOfContents = [],
  threshold = 200,
  className,
}: FloatingReadingProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeHeading, setActiveHeading] = React.useState<string>(title);
  const [activeId, setActiveId] = React.useState<string>("");
  const [isTocOpen, setIsTocOpen] = React.useState(false);
  const [items, setItems] = React.useState<TableOfContentsItem[]>(tableOfContents);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const getArticleContainer = React.useCallback(() => {
    const panel = document.getElementById("article-content-panel");
    if (!panel) return null;
    return (
      (panel.querySelector('[data-view="developer"][style*="display: block"]') as HTMLElement) ||
      (panel.querySelector('[data-view="user"]:not([style*="display: none"])') as HTMLElement) ||
      panel
    );
  }, []);

  React.useEffect(() => {
    function syncHeadings() {
      const container = getArticleContainer();
      if (!container) return;

      const elements = Array.from(
        container.querySelectorAll("h1, h2, h3, h4")
      ) as HTMLElement[];

      if (elements.length > 0) {
        const domHeadings: TableOfContentsItem[] = elements
          .map((el) => {
            const text = el.textContent?.trim() || "";
            if (!text) return null;
            const id =
              el.id ||
              text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            if (!el.id) el.id = id;
            const tagName = el.tagName.toLowerCase();
            const match = tagName.match(/^h([1-6])$/);
            const level = match ? parseInt(match[1], 10) : 2;
            return { id, title: text, level };
          })
          .filter(Boolean) as TableOfContentsItem[];

        if (domHeadings.length > 0) {
          setItems(domHeadings);
        }
      }
    }

    syncHeadings();
    const timer = setTimeout(syncHeadings, 400);
    return () => clearTimeout(timer);
  }, [title, getArticleContainer]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsTocOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsTocOpen(false);
      }
    }

    if (isTocOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTocOpen]);

  React.useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const container = getArticleContainer();

      if (!container) {
        setIsVisible(scrollY > threshold);
        return;
      }

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const progressOffset = window.innerHeight * 0.4;
      const scrolledPastTop = -rect.top + progressOffset;
      const totalScrollable = containerHeight;

      const rawProgress =
        totalScrollable > 0 ? (scrolledPastTop / totalScrollable) * 100 : 0;
      const progress = Math.min(100, Math.max(0, rawProgress));

      setScrollProgress(progress);
      setIsVisible(scrollY > threshold);

      const headingElements = Array.from(
        container.querySelectorAll("h1, h2")
      ) as HTMLElement[];

      if (headingElements.length === 0) {
        setActiveHeading(title);
        setActiveId("");
        return;
      }

      const scrollOffset = Math.min(180, window.innerHeight * 0.3);
      let currentActiveHeading = title;
      let currentActiveId = "";

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        const headingRect = el.getBoundingClientRect();

        if (headingRect.top <= scrollOffset) {
          currentActiveHeading = el.textContent?.trim() || title;
          currentActiveId = el.id;
        } else {
          break;
        }
      }

      if (rect.bottom < window.innerHeight * 0.5 && headingElements.length > 0) {
        const lastEl = headingElements[headingElements.length - 1];
        currentActiveHeading = lastEl.textContent?.trim() || title;
        currentActiveId = lastEl.id;
      }

      setActiveHeading(currentActiveHeading);
      setActiveId(currentActiveId);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, title, getArticleContainer]);

  const scrollToHeading = (id: string) => {
    setIsTocOpen(false);
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={popoverRef}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 20, scale: 0.95 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 20, scale: 0.95 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-md",
            className
          )}
        >
          <AnimatePresence>
            {isTocOpen && items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[88vw] max-w-sm max-h-72 overflow-y-auto rounded-2xl border border-border/60 bg-background/95 dark:bg-neutral-900/95 p-3 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/30 px-2 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <ListFilter className="size-3.5" />
                    <span>Table of Contents</span>
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground/80">
                    {Math.round(scrollProgress)}% read
                  </span>
                </div>

                <ul className="space-y-1 text-xs">
                  <li key="article-top">
                    <button
                      type="button"
                      onClick={() => scrollToHeading("")}
                      className={cn(
                        "w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer",
                        !activeId
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      Top · {title}
                    </button>
                  </li>
                  {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => scrollToHeading(item.id)}
                          className={cn(
                            "w-full text-left py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer truncate",
                            item.level === 3 ? "pl-5 text-[11px]" : item.level === 4 ? "pl-7 text-[10px]" : "font-medium",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                          )}
                        >
                          {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            onClick={() => items.length > 0 && setIsTocOpen(!isTocOpen)}
            role={items.length > 0 ? "button" : undefined}
            tabIndex={items.length > 0 ? 0 : undefined}
            aria-expanded={isTocOpen}
            aria-label="Current section and reading progress. Click to view table of contents"
            className={cn(
              "group flex items-center gap-3 px-3.5 py-2 rounded-full",
              "border border-border/70 bg-background/90 dark:bg-neutral-900/90 backdrop-blur-xl",
              "shadow-xl shadow-black/10 dark:shadow-black/50 text-foreground",
              "transition-all duration-200 select-none",
              items.length > 0 &&
                "hover:border-foreground/40 hover:bg-background/95 dark:hover:bg-neutral-900/95 cursor-pointer"
            )}
          >
            <span
              className="size-2 rounded-full bg-emerald-500 shrink-0 transition-transform group-hover:scale-125 shadow-xs shadow-emerald-500/50"
              aria-hidden="true"
            />

            <div className="flex items-center gap-1.5 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeHeading}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="text-xs sm:text-sm font-medium tracking-tight truncate max-w-[170px] sm:max-w-[280px]"
                >
                  {activeHeading}
                </motion.span>
              </AnimatePresence>

              {items.length > 0 && (
                <ChevronUp
                  className={cn(
                    "size-3.5 text-muted-foreground transition-transform duration-200 shrink-0",
                    isTocOpen && "rotate-180 text-foreground"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              title={`Scroll to top (${Math.round(scrollProgress)}% completed)`}
              aria-label={`Scroll to top (${Math.round(scrollProgress)}% completed)`}
              className="relative size-6 flex items-center justify-center shrink-0 cursor-pointer rounded-full hover:scale-110 active:scale-95 transition-transform"
            >
              <svg className="size-6 -rotate-90" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r={radius}
                  fill="none"
                  strokeWidth="2.5"
                  className="stroke-muted/40 dark:stroke-muted/30"
                />
                <circle
                  cx="12"
                  cy="12"
                  r={radius}
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="stroke-foreground transition-[stroke-dashoffset] duration-150 ease-out"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-background/90 dark:bg-neutral-900/90 rounded-full">
                <ArrowUp className="size-3 text-foreground" />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
