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

  // Dynamically detect which sections exist on this project and assign sequential step numbers
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
        present: Boolean(caseStudy.architecture?.layers?.length),
      },
      {
        id: "challenges",
        title: "Core Engineering Challenges",
        present: Boolean(caseStudy.challenges?.length),
      },
      {
        id: "implementation",
        title: caseStudy.implementation?.title || "Code Primitives",
        present: Boolean(caseStudy.implementation?.paragraphs?.length),
      },
      {
        id: "data-flow",
        title: caseStudy.dataFlow?.title || "Data Flow Pipelines",
        present: Boolean(caseStudy.dataFlow?.steps?.length),
      },
      {
        id: "tech-stack",
        title: "Technology Stack",
        present: Boolean(techStack?.length),
      },
      {
        id: "results",
        title: caseStudy.results?.title || "Results & Outcomes",
        present: Boolean(caseStudy.results?.items?.length),
      },
      {
        id: "lessons",
        title: caseStudy.lessonsLearned?.title || "Lessons Learned",
        present: Boolean(caseStudy.lessonsLearned?.items?.length),
      },
    ]

    const presentItems = candidates.filter((c) => c.present)
    const steps = new Map<string, string>()

    const sectionsList: CaseStudySectionItem[] = presentItems.map((item, idx) => {
      const numStr = (idx + 1).toString().padStart(2, "0")
      steps.set(item.id, numStr)
      return {
        id: item.id,
        label: numStr,
        title: item.title,
      }
    })

    return {
      activeSections: caseStudy.sections && caseStudy.sections.length > 0 ? caseStudy.sections : sectionsList,
      stepMap: steps,
    }
  }, [caseStudy, techStack])

  if (!caseStudy) {
    return null
  }

  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-12">
        {/* Hero & Metadata */}
        <CaseStudyHero project={project} />

        {/* Table of Contents */}
        {activeSections.length > 0 && <CaseStudyTOC sections={activeSections} />}

        {/* Overview */}
        {caseStudy.overview && (
          <CaseStudyOverview
            overview={caseStudy.overview}
            stepNumber={stepMap.get("overview") || "01"}
          />
        )}

        {/* Problem & Constraints */}
        {caseStudy.problem && (
          <CaseStudyProblem
            problem={caseStudy.problem}
            stepNumber={stepMap.get("problem") || "02"}
          />
        )}

        {/* Engineering Goals */}
        {caseStudy.goals && (
          <CaseStudyGoals
            goals={caseStudy.goals}
            stepNumber={stepMap.get("goals") || "03"}
          />
        )}

        {/* System Architecture */}
        {caseStudy.architecture && (
          <CaseStudyArchitecture
            architecture={caseStudy.architecture}
            stepNumber={stepMap.get("architecture") || "04"}
          />
        )}

        {/* Core Engineering Challenges */}
        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <CaseStudyChallenges
            challenges={caseStudy.challenges}
            stepNumber={stepMap.get("challenges") || "05"}
          />
        )}

        {/* Code Primitives */}
        {caseStudy.implementation && (
          <CaseStudyImplementation
            implementation={caseStudy.implementation}
            stepNumber={stepMap.get("implementation") || "06"}
          />
        )}

        {/* Data Flow Pipelines */}
        {caseStudy.dataFlow && (
          <CaseStudyDataFlow
            dataFlow={caseStudy.dataFlow}
            stepNumber={stepMap.get("data-flow") || "07"}
          />
        )}

        {/* Technology Stack */}
        {techStack && techStack.length > 0 && (
          <CaseStudyTechStack
            techStack={techStack}
            stepNumber={stepMap.get("tech-stack") || "08"}
          />
        )}

        {/* Results & Outcomes */}
        {caseStudy.results && (
          <CaseStudyResults
            results={caseStudy.results}
            stepNumber={stepMap.get("results") || "09"}
          />
        )}

        {/* Lessons Learned */}
        {caseStudy.lessonsLearned && (
          <CaseStudyLessons
            lessonsLearned={caseStudy.lessonsLearned}
            stepNumber={stepMap.get("lessons") || "10"}
          />
        )}

        {/* Footer Navigation & Actions */}
        <CaseStudyFooter project={project} />
      </div>
    </MainLayout>
  )
}
