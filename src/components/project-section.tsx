"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import MainLayout from "./main-layout";
import { Github } from "./socials";
import { cn } from "@/lib/utils";

export type Project = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  status: string;
  tags: string[];
  image: string;
  imageAlt: string;
  floatingChips: {
    text: string;
    position: "top-left" | "bottom-right";
  }[];
  liveUrl: string;
  githubUrl: string;
  projectPageUrl?: string;
  caseStudyUrl?: string;
  ctaText: string;
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "linkforge",
    number: "01",
    name: "Linkforge",
    subtitle: "Multi-tenant SaaS · Link-in-bio & analytics",
    description:
      "Built the parts that don't show up in a demo: tenant-isolated data, username-change race conditions, and scalable event analytics.",
    status: "In Progress",
    tags: ["Analytics", "Advance Backend", "Production-Ready"],
    image: "/static/linkforge.webp",
    imageAlt: "Linkforge multi-tenant SaaS analytics platform screenshot",
    floatingChips: [
      { text: "Multi-Tenant Isolation", position: "top-left" },
      { text: "Real-time Analytics", position: "bottom-right" },
    ],
    liveUrl: "https://github.com/vishalgupta-02/linkforge.git",
    githubUrl: "https://github.com/vishalgupta-02/linkforge.git",
    projectPageUrl: "/projects/linkforge",
    caseStudyUrl: "/projects/linkforge/case-study",
    ctaText: "View Overview",
  },
  {
    id: "clariv",
    number: "02",
    name: "Clariv",
    subtitle: "Document context extractor & AI reader",
    description:
      "Ever uploaded a 40-page PDF and wished something would just... read it for you? That's Clariv.",
    status: "MVP Complete",
    tags: ["AI Document Extraction", "Google GenAI", "MongoDB", "Next.js"],
    image: "/static/clariv.webp",
    imageAlt: "Clariv AI document extractor screenshot",
    floatingChips: [
      { text: "Smart Extraction", position: "top-left" },
      { text: "Google GenAI", position: "bottom-right" },
    ],
    liveUrl: "https://clariv.vercel.app",
    githubUrl: "https://github.com/vishalgupta-02/Clariv.git",
    ctaText: "View Project",
  },
  {
    id: "careerly",
    number: "03",
    name: "Careerly",
    subtitle: "Full-stack AI career coach & interview prep",
    description:
      "Job hunting is stressful. Most people don't fail interviews because they're unqualified — they fail because they weren't prepared the right way.",
    status: "Live Demo",
    tags: ["MCQ Testing Live", "Full-Stack AI", "PostgreSQL", "Next.js"],
    image: "/static/careerly.webp",
    imageAlt: "Careerly AI career coach platform screenshot",
    floatingChips: [
      { text: "MCQ Testing", position: "top-left" },
      { text: "Resume Tooling", position: "bottom-right" },
    ],
    liveUrl: "https://careerly-nu.vercel.app",
    githubUrl: "https://github.com/vishalgupta-02/Careerly.git",
    ctaText: "View Project",
  },
];

export default function ProjectSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeProject = PROJECTS_DATA[currentIndex];

  return (
    <MainLayout>
      <section
        id="projects"
        className="w-full max-w-2xl mx-auto py-6 px-4"
        aria-label="Featured Projects"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[24px] font-semibold tracking-tight">Projects</h2>
          <span className="text-xs font-mono text-foreground/50">
            {activeProject.number} / 0{PROJECTS_DATA.length}
          </span>
        </div>

        {/* Hero Card Container */}
        <div className="relative w-full rounded-2xl border border-border/30 bg-card/60 dark:bg-custom-black/60 backdrop-blur-sm p-5 sm:p-7 shadow-sm transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 8, scale: 1.02 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, scale: 0.98 }
              }
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center space-y-5"
            >
              {/* 1. Featured Project Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/30 bg-background/80 dark:bg-custom-black/80 text-[11px] font-mono uppercase tracking-wider text-foreground/80 shadow-xs">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Featured Project</span>
              </div>

              {/* 2. Visual Stage: Floating Project Screenshot */}
              <div className="relative w-full max-w-lg mx-auto my-1 group">
                {/* Ambient glow behind card */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"
                />

                {/* Main Screenshot Wrapper */}
                <div className="relative rounded-xl border border-border/40 bg-background overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* Floating Chip 1 (Top Left) */}
                {activeProject.floatingChips[0] && (
                  <motion.div
                    initial={shouldReduceMotion ? undefined : { y: 0 }}
                    animate={
                      shouldReduceMotion ? undefined : { y: [-3, 3, -3] }
                    }
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="hidden sm:inline-flex absolute -top-3 -left-2 z-10 items-center gap-1 px-2.5 py-1 rounded-full border border-border/40 bg-background/90 dark:bg-custom-black/90 text-[11px] font-display text-foreground/90 shadow-md backdrop-blur-md"
                  >
                    <Sparkles className="size-3 text-emerald-500" />
                    <span>{activeProject.floatingChips[0].text}</span>
                  </motion.div>
                )}

                {/* Floating Chip 2 (Bottom Right) */}
                {activeProject.floatingChips[1] && (
                  <motion.div
                    initial={shouldReduceMotion ? undefined : { y: 0 }}
                    animate={shouldReduceMotion ? undefined : { y: [3, -3, 3] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="hidden sm:inline-flex absolute -bottom-3 -right-2 z-10 items-center gap-1 px-2.5 py-1 rounded-full border border-border/40 bg-background/90 dark:bg-custom-black/90 text-[11px] font-display text-foreground/90 shadow-md backdrop-blur-md"
                  >
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>{activeProject.floatingChips[1].text}</span>
                  </motion.div>
                )}
              </div>

              {/* 3. Project Content */}
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
                  {activeProject.name}
                </h3>
                <p className="font-display font-medium text-xs sm:text-sm text-foreground/80">
                  {activeProject.subtitle}
                </p>
                <p className="font-display text-xs sm:text-sm text-foreground/60 leading-relaxed pt-1">
                  {activeProject.description}
                </p>
              </div>

              {/* 4. Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border/25 bg-background/50 dark:bg-custom-black/50 px-2.5 py-0.5 rounded-full text-[11px] font-display text-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 5. CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <Link
                  href={activeProject.projectPageUrl || activeProject.liveUrl}
                  target={activeProject.projectPageUrl ? undefined : "_blank"}
                  rel={activeProject.projectPageUrl ? undefined : "noopener noreferrer"}
                  className="group/cta inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 hover:shadow-xs active:scale-[0.98]"
                >
                  <span>{activeProject.ctaText}</span>
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Link>

                {activeProject.caseStudyUrl && (
                  <Link
                    href={activeProject.caseStudyUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="size-3 text-emerald-500" />
                  </Link>
                )}

                <Link
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${activeProject.name}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 bg-background/60 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]"
                >
                  <Github />
                  <span className="hidden sm:inline">Source</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 6. Project Pagination Navigation (01 02 03) */}
          <div className="mt-7 pt-4 border-t border-border/20 flex items-center justify-center">
            <div
              role="tablist"
              aria-label="Featured projects navigation"
              className="flex items-center gap-4 sm:gap-6"
            >
              {PROJECTS_DATA.map((project, index) => {
                const isActive = currentIndex === index;
                return (
                  <button
                    key={project.id}
                    role="tab"
                    id={`project-tab-${project.number}`}
                    aria-selected={isActive}
                    aria-controls={`project-panel-${project.id}`}
                    aria-label={`Select project ${project.number}: ${project.name}`}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "group relative flex flex-col items-center py-1 px-2 text-xs sm:text-sm font-mono tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm cursor-pointer",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-foreground/40 hover:text-foreground/80",
                    )}
                  >
                    <span>{project.number}</span>
                    <span className="text-[10px] font-sans opacity-0 group-hover:opacity-60 transition-opacity hidden sm:block">
                      {project.name}
                    </span>

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
