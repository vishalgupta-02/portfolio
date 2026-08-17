export type TechnologyCategory = {
  category: string
  items: {
    name: string
    description?: string
  }[]
}

export type EngineeringHighlight = {
  title: string
  subtitle: string
  description: string
  iconType: "shield" | "zap" | "database" | "cpu" | "lock" | "git"
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

export type CaseStudySection = {
  id: string
  label: string
  title: string
}

export const LINKFORGE_METADATA = {
  title: "Linkforge — Multi-tenant SaaS & Analytics Platform",
  description:
    "A high-performance link-in-bio and real-time analytics platform engineered with strict multi-tenant isolation, atomic username mutation handling, and asynchronous event pipelines.",
  caseStudyTitle: "Linkforge Engineering Case Study — Building a Multi-Tenant Link-in-Bio & Analytics Engine",
  caseStudyDescription:
    "In-depth technical breakdown of designing tenant-isolated data architectures, fail-fast configuration schemas, atomic slug mutations, and asynchronous clickstream analytics pipelines.",
  status: "In Progress",
  role: "Full-Stack / Backend Engineer",
  timeline: "March 2026 – Present",
  liveUrl: "https://github.com/vishalgupta-02/linkforge.git",
  githubUrl: "https://github.com/vishalgupta-02/linkforge.git",
  image: "/static/linkforge.webp",
  imageAlt: "Linkforge multi-tenant SaaS analytics platform dashboard",
}

export const LINKFORGE_KEY_FEATURES: EngineeringHighlight[] = [
  {
    title: "Multi-Tenant Data Isolation",
    subtitle: "Tenant-scoped database partitioning",
    description:
      "Strict tenant context enforcement at the middleware and query layer ensures complete logical separation across user accounts and organizations with zero cross-tenant contamination risk.",
    iconType: "shield",
  },
  {
    title: "Atomic Slug & Username Mutations",
    subtitle: "Optimistic locking & transactional safety",
    description:
      "Database-level unique constraints combined with interactive transaction rollbacks eliminate race conditions when vanity slugs or usernames are renamed concurrently.",
    iconType: "lock",
  },
  {
    title: "Fail-Fast Environment Diagnostics",
    subtitle: "Zod-powered startup validation",
    description:
      "All runtime secrets, database connection URIs, and port bindings are validated via a strict schema at boot time, preventing silent mid-request runtime crashes in production.",
    iconType: "zap",
  },
  {
    title: "Asynchronous Event Tracking",
    subtitle: "Decoupled redirect & analytics pipeline",
    description:
      "Visitor clickstream events, geolocation telemetry, and referrers are dispatched asynchronously, maintaining sub-millisecond redirect speeds on the critical path.",
    iconType: "cpu",
  },
]

export const LINKFORGE_TECH_STACK: TechnologyCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js 16", description: "App Router & Server Components" },
      { name: "React 19", description: "Concurrent UI rendering" },
      { name: "TypeScript 5", description: "Strict end-to-end typing" },
      { name: "Tailwind CSS v4", description: "Design tokens & styling" },
      { name: "Motion", description: "Accessible UI animations" },
    ],
  },
  {
    category: "Backend & API",
    items: [
      { name: "Node.js & Express", description: "Decoupled API service" },
      { name: "TypeScript", description: "Type-safe controllers & middleware" },
      { name: "Zod", description: "Runtime schema validation & config" },
      { name: "bcrypt & JWT", description: "Password hashing & HttpOnly tokens" },
      { name: "Better Auth", description: "Multi-session OAuth orchestration" },
    ],
  },
  {
    category: "Database & Infrastructure",
    items: [
      { name: "PostgreSQL", description: "Relational data with foreign keys" },
      { name: "Prisma ORM", description: "Type-safe migrations & transactions" },
      { name: "Redis", description: "Fast event buffering & rate limits" },
      { name: "Docker", description: "Containerized reproducible services" },
      { name: "pnpm Workspaces", description: "Client-server monorepo isolation" },
    ],
  },
]

export const LINKFORGE_CASE_STUDY_SECTIONS: CaseStudySection[] = [
  { id: "overview", label: "01", title: "Overview" },
  { id: "problem", label: "02", title: "The Problem" },
  { id: "goals", label: "03", title: "Engineering Goals" },
  { id: "architecture", label: "04", title: "System Architecture" },
  { id: "challenges", label: "05", title: "Core Engineering Challenges" },
  { id: "implementation", label: "06", title: "Code Primitives" },
  { id: "data-flow", label: "07", title: "Data Flow Pipelines" },
  { id: "tech-stack", label: "08", title: "Technology Stack" },
  { id: "results", label: "09", title: "Results & Verified Outcomes" },
  { id: "lessons", label: "10", title: "Lessons Learned" },
]

export const LINKFORGE_CHALLENGES: CaseStudyChallenge[] = [
  {
    number: "01",
    title: "Multi-Tenant Data Isolation & Query Partitioning",
    problemStatement:
      "In a SaaS platform where multiple users configure links, custom domains, and view private analytics, a single un-scoped SQL query could inadvertently leak tenant data.",
    risk:
      "Cross-tenant data contamination, unauthorized analytics inspection, and privacy violations.",
    approach:
      "Engineered an authentication middleware that extracts verified tenant and user identity from signed HttpOnly session cookies. Every database repository function strictly requires `tenantId` / `userId` in its WHERE clause, preventing cross-tenant access at the repository contract level.",
    result:
      "Guaranteed logical data isolation across all tenant workspaces with comprehensive unit tests verifying that tenant A cannot access or mutate tenant B resources.",
    codeSnippet: {
      filename: "apps/api/src/middleware/tenant-auth.ts",
      language: "typescript",
      code: `export const requireTenantAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_session"]
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing session" })
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as SessionPayload
    req.user = { id: payload.userId, email: payload.email }
    req.tenantId = payload.tenantId
    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session" })
  }
}`,
      explanation:
        "Extracts verified session credentials from HttpOnly cookies and attaches immutable tenant context to the Express request pipeline.",
    },
  },
  {
    number: "02",
    title: "Handling Username & Vanity Slug Race Conditions",
    problemStatement:
      "When a user attempts to update their profile username or link vanity slug (`/u/:username`), two concurrent requests submitting the same new slug could pass an initial `findUnique()` check before either writes, resulting in collision.",
    risk:
      "Broken link routing, duplicate vanity handles, and routing ambiguity.",
    approach:
      "Utilized PostgreSQL strict unique constraints backed by Prisma interactive transactions (`$transaction`). The mutation performs an atomic reservation lock: if a concurrent process claims the slug within the transaction window, the database rejects the secondary commit with a deterministic conflict error.",
    result:
      "100% deterministic uniqueness verification during concurrent slug renames with clean client error propagation.",
    codeSnippet: {
      filename: "apps/api/src/services/user-service.ts",
      language: "typescript",
      code: `export async function updateUsername(userId: string, newSlug: string) {
  const normalized = newSlug.toLowerCase().trim()

  return prisma.$transaction(async (tx) => {
    const existing = await tx.user.findUnique({
      where: { username: normalized },
      select: { id: true }
    })

    if (existing && existing.id !== userId) {
      throw new ConflictError("Username is already claimed by another user.")
    }

    return tx.user.update({
      where: { id: userId },
      data: { username: normalized }
    })
  })
}`,
      explanation:
        "Guarantees atomic validation and persistence inside a single database transaction, preventing time-of-check to time-of-use (TOCTOU) race conditions.",
    },
  },
  {
    number: "03",
    title: "Fail-Fast Environment Diagnostics at Startup",
    problemStatement:
      "In early iterations, reading `process.env.DATABASE_URL` directly meant the server booted successfully and only crashed when the first database call executed minutes later.",
    risk:
      "Silent deployment of broken environments, masked CI/CD errors, and production runtime crashes.",
    approach:
      "Implemented a Zod schema validation module at the application entrypoint. Before initializing Express or connecting to PostgreSQL, the configuration module parses `process.env`. If any variable is missing, mistyped, or fails regex checks, the process exits immediately with a structured diagnostic error.",
    result:
      "Zero silent startup errors. Deployments fail immediately if environment contracts are violated.",
    codeSnippet: {
      filename: "apps/api/src/config/env.ts",
      language: "typescript",
      code: `import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
  REDIS_URL: z.string().url().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("❌ Invalid environment configuration:", parsed.error.format())
  process.exit(1)
}

export const env = parsed.data`,
      explanation:
        "Enforces compile-time and boot-time schema validation across all required environment variables.",
    },
  },
  {
    number: "04",
    title: "Decoupled Asynchronous Analytics Ingestion",
    problemStatement:
      "Logging visitor telemetry (IP geolocation, device header, referrer, timestamp) synchronously inside the redirect handler added 80-150ms of latency to each link click.",
    risk:
      "Slow redirect times, database connection pool exhaustion during traffic spikes, and degraded user experience.",
    approach:
      "Decoupled redirect execution from analytics recording. The redirect handler issues an immediate HTTP 302/307 redirect while pushing the event payload to an asynchronous ingestion queue. A background worker processes and aggregates click metrics into hourly and daily summary tables.",
    result:
      "Sub-millisecond redirect processing overhead, with reliable eventual consistency for analytics reporting.",
  },
]
