import type { Project } from "../types"

export const linkforgeProject: Project = {
  id: "linkforge",
  slug: "linkforge",
  number: "01",
  name: "Linkforge",
  title: "Linkforge — Multi-tenant SaaS & Analytics Platform",
  subtitle: "Multi-tenant SaaS · Link-in-bio & Real-Time Analytics",
  description:
    "Built the parts that don't show up in a demo: tenant-isolated data, username-change race conditions, and scalable event analytics.",
  longDescription: [
    "I built the core backend and analytics infrastructure that powers Linkforge. From tenant isolation and event tracking to analytics aggregation and secure username management.",
    "Linkforge is a developer-centric link-in-bio and real-time analytics platform built from scratch with an emphasis on resilient backend fundamentals before applying abstractions.",
    "While surface-level bio tools present simple lists of links, the underlying architecture must support multi-tenant database partitioning, race-condition-free vanity slug changes, fail-fast configuration checks, and high-throughput async event logging.",
  ],
  status: "In Progress",
  role: "Full-Stack / Backend Engineer",
  timeline: "March 2026 – Present",
  tags: ["Analytics", "Advance Backend", "Production-Ready"],
  featured: true,
  image: "/static/linkforge.webp",
  imageAlt: "Linkforge multi-tenant SaaS analytics platform dashboard",
  floatingChips: [
    { text: "Multi-Tenant Isolation", position: "top-left" },
    { text: "Real-time Analytics", position: "bottom-right" },
  ],
  liveUrl: "https://github.com/vishalgupta-02/linkforge.git",
  githubUrl: "https://github.com/vishalgupta-02/linkforge.git",
  hasCaseStudy: true,
  ctaText: "View Overview",
  highlights: [
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
  ],
  techStack: [
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
  ],
  caseStudy: {
    title: "Linkforge: Multi-Tenant Link-in-Bio & Analytics Engine",
    description:
      "An in-depth breakdown of designing tenant-isolated data architectures, fail-fast configuration schemas, atomic slug mutations, and asynchronous clickstream analytics pipelines.",
    role: "Full-Stack / Backend Engineer",
    status: "In Progress",
    timeline: "March 2026 – Present",
    architectureLabel: "pnpm workspaces",
    sections: [
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
    ],
    overview: {
      title: "Building the Primitives First",
      paragraphs: [
        "When building modern SaaS products, developers frequently reach for batteries-included auth frameworks, hosted databases, and black-box cloud analytics before understanding the fundamental primitives.",
        "Linkforge was built with a deliberate rule: understand the primitives before allowing abstractions to hide them. Before integrating higher-level orchestration, the application was architected with raw JWT validation, manual session cookies, raw PostgreSQL schemas, and custom Express middleware.",
      ],
    },
    problem: {
      title: "What Makes Link-in-Bio Technically Non-Trivial?",
      introduction:
        "On the surface, a link-in-bio app seems like a basic CRUD list of URLs. However, supporting multi-tenant isolation with real-time telemetry presents complex backend engineering requirements:",
      points: [
        {
          title: "Multi-Tenant Boundary Enforcement:",
          description:
            "Preventing accidental data leakage between user accounts without bloating every query with boilerplate.",
        },
        {
          title: "Concurrent Slug Collisions:",
          description:
            "Preventing race conditions when users modify their vanity URL handles at the exact same moment.",
        },
        {
          title: "High-Volume Telemetry Logging:",
          description:
            "Capturing clickstream events, geolocation, and referrer headers without slowing down visitor HTTP 302 redirects.",
        },
        {
          title: "Fail-Fast Startup Integrity:",
          description:
            "Guaranteeing the API cannot boot in an invalid state due to missing environment configurations.",
        },
      ],
    },
    goals: {
      title: "Design Requirements",
      items: [
        {
          title: "Zero Tenant Leakage",
          description:
            "100% of read/write queries must be scoped to verified tenant identifiers.",
        },
        {
          title: "Sub-Millisecond Redirects",
          description:
            "Critical path link forwarding decoupled from analytics event persistence.",
        },
        {
          title: "Fail-Fast Configuration",
          description:
            "Zod validation at boot time prevents runtime config crashes in production.",
        },
        {
          title: "Atomic Slug Safety",
          description:
            "Interactive database transactions eliminate vanity handle race conditions.",
        },
      ],
    },
    architecture: {
      title: "Monorepo & Multi-Tier Topology",
      description:
        "Linkforge is organized as a pnpm workspace monorepo isolating client presentation from API and worker services:",
      badge: "linkforge-monorepo topology",
      subBadge: "pnpm-workspace",
      layers: [
        {
          title: "apps/web",
          tech: "(Next.js App Router)",
          description: "Public Bio Pages · Authenticated Analytics Dashboard",
          dotColor: "emerald",
        },
        {
          title: "apps/api",
          tech: "(Express & Node.js)",
          description: "Tenant Middleware · Zod Schema · Auth Pipeline",
          dotColor: "blue",
        },
      ],
      bottomGrid: [
        {
          title: "PostgreSQL",
          description: "Users · Links · Tenant Workspaces · Daily Aggregates",
          iconType: "database",
          iconColor: "emerald",
        },
        {
          title: "Redis & Workers",
          description:
            "Async Event Queue · Rate Limiter · Fast Session Revocation",
          iconType: "zap",
          iconColor: "amber",
        },
      ],
    },
    challenges: [
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
    ],
    implementation: {
      title: "Security & Authentication Primitives",
      paragraphs: [
        "Authentication state is persisted exclusively via HttpOnly, Secure, SameSite cookies with signed JWT payloads containing user and tenant identifiers.",
        "This prevents cross-site scripting (XSS) attacks from accessing session tokens in `localStorage`, while CSRF protection is enforced on all mutating REST endpoints via custom header validation.",
      ],
    },
    dataFlow: {
      title: "Asynchronous Click Ingestion Pipeline",
      description:
        "The redirect and telemetry lifecycle is split across fast and slow paths:",
      steps: [
        {
          step: 1,
          title: "Visitor clicks vanity link",
          description: "Request hits `/r/:slug` endpoint on Express API.",
        },
        {
          step: 2,
          title: "Instant HTTP 302/307 Redirect dispatched",
          description:
            "Destination URL retrieved from cache/database; visitor redirected immediately (<5ms).",
        },
        {
          step: 3,
          title: "Telemetry pushed to background worker",
          description:
            "Referrer, user agent, IP hash, and timestamp dispatched to Redis queue without blocking client.",
        },
        {
          step: 4,
          title: "Aggregation & Dashboard Updates",
          description:
            "Worker processes batches into hourly/daily summary tables in PostgreSQL for instant dashboard queries.",
        },
      ],
    },
    results: {
      title: "Verified Outcomes",
      items: [
        {
          title: "Reliable Multi-Tenant Partitioning",
          description:
            "Strict query scoping and session-bound tenant IDs eliminate the possibility of cross-account data leakage.",
        },
        {
          title: "Deterministic Slug Rename Safety",
          description:
            "Interactive transactions and unique constraint reservations handle concurrent vanity URL changes without conflict.",
        },
        {
          title: "100% Fail-Fast Startup Validation",
          description:
            "Schema-enforced boot diagnostics guarantee zero silent mid-request crashes from unconfigured environment variables.",
        },
      ],
    },
    lessonsLearned: {
      title: "Engineering Reflections",
      items: [
        {
          number: 1,
          title: "Earn your abstractions",
          description:
            "Implementing manual JWT cookies, bcrypt hashing, and raw SQL queries before introducing Better Auth and Prisma gave me deep clarity into session lifetimes, cookie flags, and database index costs.",
        },
        {
          number: 2,
          title: "Configuration errors should be startup errors",
          description:
            "Validating the environment schema before launching HTTP listeners saves hours of production debugging and makes CI/CD deployments foolproof.",
        },
        {
          number: 3,
          title: "Protect the critical path",
          description:
            "Separating high-frequency redirects from telemetry persistence is vital for maintaining snappy user experiences at scale.",
        },
      ],
    },
  },
}
