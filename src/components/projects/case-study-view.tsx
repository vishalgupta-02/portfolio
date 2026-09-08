"use client"

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
import type { Project } from "@/lib/projects/types"

interface CaseStudyViewProps {
  project: Project
}

export default function CaseStudyView({ project }: CaseStudyViewProps) {
  const caseStudy = project.caseStudy
  if (!caseStudy) {
    return null
  }

  const sections = caseStudy.sections || []
  const techStack = caseStudy.techStack || project.techStack

  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-12">
        {/* Hero & Metadata */}
        <CaseStudyHero project={project} />

        {/* Table of Contents */}
        {sections.length > 0 && <CaseStudyTOC sections={sections} />}

        {/* 01 — Overview */}
        {caseStudy.overview && (
          <CaseStudyOverview
            overview={caseStudy.overview}
            stepNumber="01"
          />
        )}

        {/* 02 — The Problem & Constraints */}
        {caseStudy.problem && (
          <CaseStudyProblem
            problem={caseStudy.problem}
            stepNumber="02"
          />
        )}

        {/* 03 — Engineering Goals */}
        {caseStudy.goals && (
          <CaseStudyGoals
            goals={caseStudy.goals}
            stepNumber="03"
          />
        )}

        {/* 04 — System Architecture */}
        {caseStudy.architecture && (
          <CaseStudyArchitecture
            architecture={caseStudy.architecture}
            stepNumber="04"
          />
        )}

        {/* 05 — Core Engineering Challenges (Deep Dives & Code Snippets) */}
        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <CaseStudyChallenges
            challenges={caseStudy.challenges}
            stepNumber="05"
          />
        )}

        {/* 06 — Code Primitives & Security Implementation */}
        {caseStudy.implementation && (
          <CaseStudyImplementation
            implementation={caseStudy.implementation}
            stepNumber="06"
          />
        )}

        {/* 07 — Data Flow Pipelines */}
        {caseStudy.dataFlow && (
          <CaseStudyDataFlow
            dataFlow={caseStudy.dataFlow}
            stepNumber="07"
          />
        )}

        {/* 08 — Technology Stack */}
        {techStack && techStack.length > 0 && (
          <CaseStudyTechStack
            techStack={techStack}
            stepNumber="08"
          />
        )}

        {/* 09 — Results & Outcomes */}
        {caseStudy.results && (
          <CaseStudyResults
            results={caseStudy.results}
            stepNumber="09"
          />
        )}

        {/* 10 — Lessons Learned & Engineering Reflections */}
        {caseStudy.lessonsLearned && (
          <CaseStudyLessons
            lessonsLearned={caseStudy.lessonsLearned}
            stepNumber="10"
          />
        )}

        {/* Footer Navigation & Actions */}
        <CaseStudyFooter project={project} />
      </div>
    </MainLayout>
  )
}
