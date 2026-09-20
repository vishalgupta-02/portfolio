"use client"

import React, { useMemo } from "react"
import MainLayout from "@/components/main-layout"
import CaseStudyHero from "./case-study/case-study-hero"
import CaseStudyTOC from "./case-study/case-study-toc"
import CaseStudyOverview from "./case-study/case-study-overview"
import CaseStudyProblem from "./case-study/case-study-problem"
import CaseStudyGoals from "./case-study/case-study-goals"
import CaseStudyArchitecture from "./case-study/case-study-architecture"
import CaseStudyChallenges from "./case-study/case-study-challenges"
import CaseStudyImplementation from "./case-study/case-study-implementation"
import CaseStudyDataFlow from "./case-study/case-study-data-flow"
import CaseStudyTechStack from "./case-study/case-study-tech-stack"
import CaseStudyResults from "./case-study/case-study-results"
import CaseStudyLessons from "./case-study/case-study-lessons"
import CaseStudyFooter from "./case-study/case-study-footer"
import type { Project, CaseStudySectionItem } from "@/lib/projects/types"

interface CaseStudyViewProps {
  project: Project
}

export default function CaseStudyView({ project }: CaseStudyViewProps) {
  const caseStudy = project.caseStudy
  const techStack = caseStudy?.techStack || project.techStack

  const { activeSections, stepMap } = useMemo(() => {
    if (!caseStudy) return { activeSections: [], stepMap: new Map<string, string>() }

    const candidates: { id: string; title: string; present: boolean }[] = [
      {
        id: "overview",
        title: caseStudy.overview?.title || "Overview",
        present: Boolean(caseStudy.overview?.paragraphs?.length),
      },
      {
        id: "problem",
        title: caseStudy.problem?.title || "The Problem",
        present: Boolean(caseStudy.problem),
      },
      {
        id: "goals",
        title: caseStudy.goals?.title || "Engineering Goals",
        present: Boolean(caseStudy.goals?.items?.length),
      },
      {
        id: "architecture",
        title: caseStudy.architecture?.title || "System Architecture",
        present: Boolean(caseStudy.architecture),
      },
      {
        id: "challenges",
        title: "Engineering Challenges",
        present: Boolean(caseStudy.challenges && caseStudy.challenges.length > 0),
      },
      {
        id: "implementation",
        title: caseStudy.implementation?.title || "Core Primitives",
        present: Boolean(caseStudy.implementation),
      },
      {
        id: "data-flow",
        title: caseStudy.dataFlow?.title || "Data Flow & Pipelines",
        present: Boolean(caseStudy.dataFlow),
      },
      {
        id: "tech-stack",
        title: "Tech Stack",
        present: Boolean(techStack && techStack.length > 0),
      },
      {
        id: "results",
        title: caseStudy.results?.title || "Results & Outcomes",
        present: Boolean(caseStudy.results),
      },
      {
        id: "lessons",
        title: caseStudy.lessonsLearned?.title || "Lessons Learned",
        present: Boolean(caseStudy.lessonsLearned?.items?.length),
      },
    ]

    const filtered = candidates.filter((c) => c.present)
    const steps = new Map<string, string>()
    const sections: CaseStudySectionItem[] = filtered.map((c, index) => {
      const stepStr = String(index + 1).padStart(2, "0")
      steps.set(c.id, stepStr)
      return {
        id: c.id,
        label: c.title,
        title: c.title,
      }
    })

    return {
      activeSections: sections,
      stepMap: steps,
    }
  }, [caseStudy, techStack])

  if (!caseStudy) {
    return null
  }

  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-12">
        <CaseStudyHero project={project} />

        {activeSections.length > 0 && <CaseStudyTOC sections={activeSections} />}

        {caseStudy.overview && (
          <CaseStudyOverview
            overview={caseStudy.overview}
            stepNumber={stepMap.get("overview") || "01"}
          />
        )}

        {caseStudy.problem && (
          <CaseStudyProblem
            problem={caseStudy.problem}
            stepNumber={stepMap.get("problem") || "02"}
          />
        )}

        {caseStudy.goals && (
          <CaseStudyGoals
            goals={caseStudy.goals}
            stepNumber={stepMap.get("goals") || "03"}
          />
        )}

        {caseStudy.architecture && (
          <CaseStudyArchitecture
            architecture={caseStudy.architecture}
            stepNumber={stepMap.get("architecture") || "04"}
          />
        )}

        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <CaseStudyChallenges
            challenges={caseStudy.challenges}
            stepNumber={stepMap.get("challenges") || "05"}
          />
        )}

        {caseStudy.implementation && (
          <CaseStudyImplementation
            implementation={caseStudy.implementation}
            stepNumber={stepMap.get("implementation") || "06"}
          />
        )}

        {caseStudy.dataFlow && (
          <CaseStudyDataFlow
            dataFlow={caseStudy.dataFlow}
            stepNumber={stepMap.get("data-flow") || "07"}
          />
        )}

        {techStack && techStack.length > 0 && (
          <CaseStudyTechStack
            techStack={techStack}
            stepNumber={stepMap.get("tech-stack") || "08"}
          />
        )}

        {caseStudy.results && (
          <CaseStudyResults
            results={caseStudy.results}
            stepNumber={stepMap.get("results") || "09"}
          />
        )}

        {caseStudy.lessonsLearned && (
          <CaseStudyLessons
            lessonsLearned={caseStudy.lessonsLearned}
            stepNumber={stepMap.get("lessons") || "10"}
          />
        )}

        <CaseStudyFooter project={project} />
      </div>
    </MainLayout>
  )
}
