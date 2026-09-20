export type PostmortemSeverity = "low" | "medium" | "high" | "critical"

export type PostmortemStatus = "resolved" | "monitoring" | "open"

export type PostmortemCategory =
  | "authentication"
  | "database"
  | "infrastructure"
  | "performance"
  | "security"
  | "deployment"
  | "api"
  | "observability"
  | "other"

export interface PostmortemMetadata {
  slug: string
  title: string
  description: string
  date: string
  updatedAt?: string
  status: PostmortemStatus
  severity: PostmortemSeverity
  category: PostmortemCategory
  tags: string[]
  duration?: string
  systemsAffected?: string[]
  impact: string
  rootCause: string
  resolution: string
  lessonsLearned?: string[]
  author?: string
  featured?: boolean
  published?: boolean
}

export interface PostmortemTimelineEvent {
  time: string
  title: string
  description?: string
  status?: "detected" | "investigating" | "identified" | "mitigated" | "resolved"
}

export interface Postmortem {
  slug: string
  metadata: PostmortemMetadata
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export interface PostmortemNavigationItem {
  slug: string
  title: string
  description: string
  severity: PostmortemSeverity
  status: PostmortemStatus
  date: string
}

export interface PostmortemNavigation {
  previous: PostmortemNavigationItem | null
  next: PostmortemNavigationItem | null
}

export interface RelatedPostmortem {
  slug: string
  title: string
  description: string
  date: string
  category: PostmortemCategory
  severity: PostmortemSeverity
  status: PostmortemStatus
  tags: string[]
}
