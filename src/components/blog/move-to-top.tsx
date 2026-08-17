"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface MoveToTopProps {
  className?: string;
  threshold?: number;
}

export function MoveToTop({ className, threshold = 350 }: MoveToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const shouldBeVisible = scrollY > threshold;

    if (visibleRef.current !== shouldBeVisible) {
      visibleRef.current = shouldBeVisible;
      setIsVisible(shouldBeVisible);
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn("fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8", className)}
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={cn(
              "group inline-flex items-center justify-center size-10 sm:size-11 rounded-full",
              "border border-border bg-background/80 hover:bg-muted/80 backdrop-blur-md",
              "text-muted-foreground hover:text-foreground shadow-md transition-all duration-200",
              "hover:border-foreground/40 hover:scale-105 active:scale-95 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none"
            )}
          >
            <ArrowUp className="size-4 sm:size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
