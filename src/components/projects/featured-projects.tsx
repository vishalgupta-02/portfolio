"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import MainLayout from "@/components/main-layout";
import ProjectCard from "./project-card";
import { cn } from "@/lib/utils";
import { getFeaturedProjects, type Project } from "@/lib/projects";

export interface FeaturedProjectsProps {
  projects?: Project[];
  title?: string;
}

export default function FeaturedProjects({
  projects,
  title = "Projects",
}: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const projectsList =
    projects && projects.length > 0 ? projects : getFeaturedProjects();
  const activeProject = projectsList[currentIndex] || projectsList[0];

  if (!activeProject || projectsList.length === 0) {
    return null;
  }

  return (
    <MainLayout>
      <section
        id="projects"
        className="w-full max-w-2xl mx-auto py-6 px-4"
        aria-label="Featured Projects"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[24px] font-semibold tracking-tight">{title}</h2>
          <span className="text-xs font-mono text-foreground/50">
            {activeProject.number} / 0{projectsList.length}
          </span>
        </div>

        {/* Hero Card Container */}
        <div className="relative w-full rounded-lg border border-border/30 bg-card/60 dark:bg-custom-black/60 backdrop-blur-sm p-4 sm:p-7 shadow-sm transition-all duration-300">
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
            >
              <ProjectCard project={activeProject} priorityImage={true} />
            </motion.div>
          </AnimatePresence>

          {/* Project Pagination Navigation (01 02 03) */}
          <div className="mt-7 pt-4 border-t border-border/20 flex items-center justify-center">
            <div
              role="tablist"
              aria-label="Featured projects navigation"
              className="flex items-center gap-4 sm:gap-6"
            >
              {projectsList.map((project, index) => {
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
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
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
