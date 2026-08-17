export type IconType =
  | "shield"
  | "zap"
  | "cpu"
  | "lock"
  | "database"
  | "git"
  | "layers"
  | "server"
  | "sparkles"
  | "fileText"

export type TechnologyItem = {
  name: string
  description?: string
}

export type TechnologyCategory = {
  category: string
  items: TechnologyItem[]
}

export type EngineeringHighlight = {
  title: string
  subtitle: string
  description: string
  iconType: IconType
}

export type CaseStudyChallenge = {
  number: string
  title: string
  problemStatement: string
  risk: string
  approach: string
  result: string
  codeSnippet?: {
    filename: string
    language: string
    code: string
    explanation: string
  }
}

export type CaseStudySectionItem = {
  id: string
  label: string
  title: string
}

export type CaseStudyOverview = {
  title?: string
  paragraphs: string[]
}

export type CaseStudyProblem = {
  title?: string
  introduction?: string
  points: {
    title: string
    description: string
  }[]
}

export type CaseStudyGoal = {
  title: string
  description: string
}

export type ArchitectureLayer = {
  title: string
  tech?: string
  description: string
  dotColor?: "emerald" | "blue" | "amber" | "purple" | "rose"
}

export type ArchitectureSubsystem = {
  title: string
  description: string
  iconType?: "database" | "zap" | "server" | "shield"
  iconColor?: "emerald" | "amber" | "blue" | "purple"
}

export type CaseStudyArchitecture = {
  title?: string
  description?: string
  badge?: string
  subBadge?: string
  layers: ArchitectureLayer[]
  bottomGrid?: ArchitectureSubsystem[]
}

export type CaseStudyPipelineStep = {
  step: number
  title: string
  description: string
}

export type CaseStudyDataFlow = {
  title?: string
  description?: string
  steps: CaseStudyPipelineStep[]
}

export type CaseStudyResult = {
  title: string
  description: string
}

export type CaseStudyLesson = {
  number: number
  title: string
  description: string
}

export type ProjectCaseStudy = {
  title: string
  description: string
  role?: string
  status?: string
  timeline?: string
  architectureLabel?: string
  sections?: CaseStudySectionItem[]
  overview?: CaseStudyOverview
  problem?: CaseStudyProblem
  goals?: {
    title?: string
    items: CaseStudyGoal[]
  }
  architecture?: CaseStudyArchitecture
  challenges?: CaseStudyChallenge[]
  implementation?: {
    title?: string
    paragraphs: string[]
  }
  dataFlow?: CaseStudyDataFlow
  techStack?: TechnologyCategory[]
  results?: {
    title?: string
    items: CaseStudyResult[]
  }
  lessonsLearned?: {
    title?: string
    items: CaseStudyLesson[]
  }
}

export type FloatingChip = {
  text: string
  position: "top-left" | "bottom-right"
}

export type Project = {
  id: string
  slug: string
  number: string
  name: string
  title: string
  subtitle: string
  description: string
  longDescription?: string[]
  status: string
  role?: string
  timeline?: string
  tags: string[]
  featured?: boolean
  image: string
  imageAlt: string
  floatingChips?: FloatingChip[]
  liveUrl?: string
  githubUrl: string
  hasCaseStudy?: boolean
  ctaText?: string
  highlights?: EngineeringHighlight[]
  techStack?: TechnologyCategory[]
  caseStudy?: ProjectCaseStudy
}
