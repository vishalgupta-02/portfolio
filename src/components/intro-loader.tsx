"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export const INTRO_SEEN_KEY = "portfolio-intro-seen-v2";

export function replayIntro() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("portfolio:replay-intro"));
  }
}

const statusSteps = [
  { at: 0, text: "Initializing runtime environment" },
  { at: 25, text: "Allocating system primitives" },
  { at: 55, text: "Hydrating architecture & telemetry" },
  { at: 85, text: "Establishing secure pipelines" },
  { at: 100, text: "Ready. System mounted." },
];

export function IntroLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const startBootSequence = useCallback(() => {
    setProgress(0);
    setMounted(true);
    setVisible(true);
  }, []);

  const skipIntro = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
    }, 50);
  }, []);

  // Check on mount whether intro should display
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceIntro =
      params.get("intro") === "1" || params.get("intro") === "true";
    const hasSeenIntro = sessionStorage.getItem(INTRO_SEEN_KEY);

    if (!forceIntro && (hasSeenIntro || shouldReduceMotion)) {
      return;
    }

    sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    startBootSequence();
  }, [shouldReduceMotion, startBootSequence]);

  // Listen for replay trigger
  useEffect(() => {
    const handleReplay = () => {
      startBootSequence();
    };

    window.addEventListener("portfolio:replay-intro", handleReplay);
    return () => window.removeEventListener("portfolio:replay-intro", handleReplay);
  }, [startBootSequence]);

  // Handle ESC key to skip
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, skipIntro]);

  // Animate progress smoothly
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
          }, 350);
          return 100;
        }

        const remaining = 100 - prev;
        // Calibrated increment for ~1.1s total boot time: feels alive, responsive, not sluggish
        const increment = Math.max(1, Math.floor(Math.random() * (remaining * 0.12 + 3)));
        return Math.min(100, prev + increment);
      });
    }, 38);

    return () => clearInterval(interval);
  }, [visible]);

  const currentStatus =
    [...statusSteps].reverse().find((s) => progress >= s.at)?.text ||
    statusSteps[0].text;

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {visible && (
        <motion.div
          key="intro-curtain"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-99999 flex flex-col justify-between bg-background text-foreground p-6 sm:p-12 select-none overflow-hidden"
        >
          {/* Top telemetry bar */}
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground border-b border-border/40 pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
              </span>
              <span className="tracking-wider uppercase font-semibold text-foreground">
                Vishal Gupta
              </span>
            </div>
            <span className="text-[11px] tracking-widest text-muted-foreground hidden sm:inline">
              [ SYSTEMS // RELIABILITY ]
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={skipIntro}
                className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground border border-border/60 rounded px-1.5 py-0.5 transition-colors cursor-pointer"
              >
                ESC to skip
              </button>
              <span className="font-mono text-xs text-foreground">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>

          {/* Center progress counter */}
          <div className="my-auto mx-auto w-full max-w-md space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-2"
            >
              <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter tabular-nums text-foreground">
                {progress.toString().padStart(3, "0")}
                <span className="text-xl sm:text-2xl font-light text-muted-foreground ml-1">
                  %
                </span>
              </div>

              <div className="h-5 flex items-center justify-center">
                <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                  <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {currentStatus}
                </p>
              </div>
            </motion.div>

            <div className="relative h-[2px] w-full max-w-xs mx-auto overflow-hidden rounded-full bg-muted">
              <motion.div
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-border/40 pt-4">
            <span>PORTFOLIO OS // V2.0</span>
            <span className="hidden sm:inline">OPTIMIZED FOR PRODUCTION</span>
            <span>STATUS: {progress === 100 ? "MOUNTED" : "BOOTING"}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

