export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: "Project" | "Case Study" | "Postmortem" | "Article" | "Technology" | "Navigation";
  url: string;
  keywords: string[];
  badge?: string;
  external?: boolean;
}

export interface TechnologyEvidence {
  name: string;
  category: "Languages & Runtimes" | "Backend & Systems" | "Frontend & UI" | "Infrastructure & Tooling";
  description: string;
  projects: { name: string; url: string; note: string }[];
  postmortems: { title: string; url: string }[];
  articles: { title: string; url: string }[];
  productionUse: string;
}

export interface BuildLogEntry {
  date: string;
  title: string;
  category: "Investigation" | "System Architecture" | "Deployment" | "Milestone";
  summary: string;
  relatedUrl?: string;
  relatedLabel?: string;
}

// Verified evidence-based tech stack mapping (100% verified against repository data)
export const TECH_EVIDENCE_MAP: Record<string, TechnologyEvidence> = {
  PostgreSQL: {
    name: "PostgreSQL",
    category: "Backend & Systems",
    description: "Primary relational storage with transactional isolation and index optimization.",
    projects: [
      {
        name: "Linkforge",
        url: "/projects/linkforge",
        note: "Tenant-partitioned schema with atomic username mutation rollbacks.",
      },
      {
        name: "Infinity",
        url: "/projects/infinity",
        note: "Neon Serverless PostgreSQL storing debounced canvas state & JSON diagrams.",
      },
      {
        name: "Careerly",
        url: "/projects/careerly",
        note: "Relational user assessment schemas & interview question persistence via Prisma.",
      },
    ],
    postmortems: [
      {
        title: "Node.js Server Warnings & Database Performance Investigation",
        url: "/postmortems/nodejs-server-warnings-and-database-performance-investigation",
      },
      {
        title: "Authentication Incident: OAuth State Mismatch & Session Reliability",
        url: "/postmortems/authentication-oauth-state-mismatch",
      },
    ],
    articles: [
      {
        title: "What Happens When You Click Buy Twice? Concurrency & Idempotency",
        url: "/blog/what-happens-when-you-click-buy-twice",
      },
    ],
    productionUse: "Multi-tenant logical partitioning, ACID transactions, and index tuning.",
  },
  "Node.js": {
    name: "Node.js",
    category: "Languages & Runtimes",
    description: "Asynchronous runtime for decoupled API gateways and streaming microservices.",
    projects: [
      {
        name: "Linkforge",
        url: "/projects/linkforge",
        note: "Express API service handling async event tracking and auth workflows.",
      },
    ],
    postmortems: [
      {
        title: "Node.js Server Warnings & Database Performance Investigation",
        url: "/postmortems/nodejs-server-warnings-and-database-performance-investigation",
      },
    ],
    articles: [
      {
        title: "How Web Routes Know Where to Send Your Request",
        url: "/blog/how-web-routes-know-where-to-send-your-request",
      },
      {
        title: "Controllers, Services, Repositories: Layered Backend Architecture",
        url: "/blog/controllers-services-repositories-requests-responses",
      },
    ],
    productionUse: "Event loop instrumentation, listener leak mitigation, and REST controllers.",
  },
  TypeScript: {
    name: "TypeScript",
    category: "Languages & Runtimes",
    description: "Strict end-to-end typing spanning database schemas, APIs, and client boundaries.",
    projects: [
      {
        name: "Linkforge",
        url: "/projects/linkforge",
        note: "End-to-end contract typing with Zod schema validation.",
      },
      {
        name: "Infinity",
        url: "/projects/infinity",
        note: "Strict geometry schema validation for agentic diagram generation.",
      },
      {
        name: "Clariv",
        url: "/projects/clariv",
        note: "Type-safe document extraction and streaming pipelines.",
      },
    ],
    postmortems: [],
    articles: [
      {
        title: "Validation & Transformations in Modern APIs",
        url: "/blog/validation-and-transformations",
      },
    ],
    productionUse: "Zod runtime guards, strict compile flags, and shared contracts.",
  },
  "Next.js": {
    name: "Next.js",
    category: "Frontend & UI",
    description: "React 19 App Router architecture with server components and streaming.",
    projects: [
      {
        name: "Linkforge",
        url: "/projects/linkforge",
        note: "Next.js 16 App Router dashboard with server-side tenant checks.",
      },
      {
        name: "Infinity",
        url: "/projects/infinity",
        note: "Next.js 16 vector whiteboard paired with Google Gemini 2.5 SDK.",
      },
      {
        name: "Careerly",
        url: "/projects/careerly",
        note: "Full-stack App Router interview preparation platform.",
      },
      {
        name: "Clariv",
        url: "/projects/clariv",
        note: "AI document extraction interface with streaming responses.",
      },
    ],
    postmortems: [
      {
        title: "Authentication Incident: OAuth State Mismatch & Session Reliability",
        url: "/postmortems/authentication-oauth-state-mismatch",
      },
    ],
    articles: [
      {
        title: "Breaking the useEffect Infinite Loop in Next.js",
        url: "/blog/useeffect-nextjs-performance-loop",
      },
    ],
    productionUse: "Server Components, Route Handlers, and cache validation.",
  },
  Docker: {
    name: "Docker",
    category: "Infrastructure & Tooling",
    description: "Containerized environments ensuring reproducible multi-service local testing.",
    projects: [
      {
        name: "Linkforge",
        url: "/projects/linkforge",
        note: "Multi-container setup running Express API, PostgreSQL, and Redis.",
      },
    ],
    postmortems: [],
    articles: [],
    productionUse: "Container isolation for database, caching, and background workers.",
  },
  Redis: {
    name: "Redis",
    category: "Backend & Systems",
    description: "In-memory cache for sliding-window rate limiting and session validation.",
    projects: [
      {
        name: "Linkforge",
        url: "/projects/linkforge",
        note: "Sliding-window IP rate limiting and low-latency clickstream caching.",
      },
    ],
    postmortems: [
      {
        title: "Node.js Server Warnings & Database Performance Investigation",
        url: "/postmortems/nodejs-server-warnings-and-database-performance-investigation",
      },
    ],
    articles: [
      {
        title: "What Happens When You Click Buy Twice? Concurrency & Idempotency",
        url: "/blog/what-happens-when-you-click-buy-twice",
      },
    ],
    productionUse: "Rate-limiting middleware and transactional token store.",
  },
  MongoDB: {
    name: "MongoDB",
    category: "Backend & Systems",
    description: "Document storage optimized for unstructured PDF chunk schemas.",
    projects: [
      {
        name: "Clariv",
        url: "/projects/clariv",
        note: "Stores hierarchical document structures, token chunks, and search indices.",
      },
    ],
    postmortems: [],
    articles: [],
    productionUse: "Unstructured document payload storage and metadata querying.",
  },
  "Google GenAI": {
    name: "Google GenAI",
    category: "Backend & Systems",
    description: "Gemini 2.5 SDK integration for structured JSON generation and document QA.",
    projects: [
      {
        name: "Infinity",
        url: "/projects/infinity",
        note: "Translates natural language into geometry-validated JSON diagram schemas.",
      },
      {
        name: "Clariv",
        url: "/projects/clariv",
        note: "Gemini 1.5 Flash streaming citations and semantic document context.",
      },
    ],
    postmortems: [],
    articles: [],
    productionUse: "Schema-constrained JSON synthesis and vector context retrieval.",
  },
};

// Verified Build Log / Activity History (derived from actual repository commits & incidents)
export const BUILD_LOG_ENTRIES: BuildLogEntry[] = [
  {
    date: "April 2026",
    title: "LinkForge Database & Node.js Warning Diagnosis",
    category: "Investigation",
    summary:
      "Investigated MaxListenersExceededWarning on ServerResponse and tuned pg-connection-string SSL parameters to mitigate 700ms+ database latency spikes.",
    relatedUrl: "/postmortems/nodejs-server-warnings-and-database-performance-investigation",
    relatedLabel: "Read Postmortem",
  },
  {
    date: "March 2026",
    title: "OAuth Cross-Origin State Incident Resolution",
    category: "Investigation",
    summary:
      "Resolved cross-origin OAuth state verification failures and cookie scoping boundaries between Express auth service and Next.js client.",
    relatedUrl: "/postmortems/authentication-oauth-state-mismatch",
    relatedLabel: "Read Postmortem",
  },
  {
    date: "March 2026",
    title: "LinkForge Multi-Tenant Architecture Milestone",
    category: "System Architecture",
    summary:
      "Implemented tenant-isolated PostgreSQL partitioning, transactional handle renames, and decoupled async clickstream telemetry pipeline.",
    relatedUrl: "/projects/linkforge/case-study",
    relatedLabel: "LinkForge Case Study",
  },
  {
    date: "February 2026",
    title: "Infinity Debounced Persistence Engine",
    category: "Milestone",
    summary:
      "Constructed 10-second debounced state normalization pipeline syncing Excalidraw vector elements to Neon PostgreSQL via Drizzle ORM.",
    relatedUrl: "/projects/infinity/case-study",
    relatedLabel: "Infinity Case Study",
  },
  {
    date: "January 2026",
    title: "Clariv Semantic Document Pipeline",
    category: "Milestone",
    summary:
      "Shipped document chunking pipeline using Google GenAI SDK to synthesize structured tables and summaries from dense 40-page PDFs.",
    relatedUrl: "/projects/clariv",
    relatedLabel: "View Project",
  },
];

// Unified global search items catalog
export const GLOBAL_SEARCH_ITEMS: SearchItem[] = [
  // Navigation
  {
    id: "nav-home",
    title: "Home",
    description: "Portfolio overview, flagship projects, investigations, and technical stack.",
    category: "Navigation",
    url: "/",
    keywords: ["home", "overview", "start", "main"],
  },
  {
    id: "nav-projects",
    title: "Projects & Systems Directory",
    description: "Complete catalog of production platforms, distributed systems, and case studies.",
    category: "Navigation",
    url: "/projects",
    keywords: ["projects", "systems", "code", "portfolio"],
  },
  {
    id: "nav-engineering",
    title: "Engineering Postmortems",
    description: "Production incident investigations, root cause analyses, and system retrospectives.",
    category: "Navigation",
    url: "/postmortems",
    keywords: ["postmortems", "incidents", "engineering", "investigations", "bugs", "failures"],
  },
  {
    id: "nav-writing",
    title: "Engineering Blog",
    description: "Technical writing on concurrency, idempotency, API design, and system architecture.",
    category: "Navigation",
    url: "/blog",
    keywords: ["blog", "writing", "articles", "concurrency", "architecture"],
  },
  {
    id: "nav-experience",
    title: "Work Experience",
    description: "Professional software engineering history at Reospark Technologies and Vomyra AI.",
    category: "Navigation",
    url: "/work",
    keywords: ["work", "experience", "resume", "career", "reospark", "vomyra"],
  },
  {
    id: "nav-now",
    title: "/now — Current Focus",
    description: "Real-time log of what Vishal is currently building, learning, exploring, and reading.",
    category: "Navigation",
    url: "/now",
    keywords: ["now", "current", "status", "focus", "today"],
  },
  {
    id: "nav-contact",
    title: "Contact & Collaboration",
    description: "Direct channel for distributed systems, backend engineering roles, and technical discussions.",
    category: "Navigation",
    url: "/#contact",
    keywords: ["contact", "email", "hire", "message", "collaborate"],
  },

  // Projects
  {
    id: "project-linkforge",
    title: "Linkforge — Multi-Tenant SaaS & Analytics",
    description: "Tenant-isolated PostgreSQL data, atomic handle mutations, and low-latency analytics aggregation.",
    category: "Project",
    url: "/projects/linkforge",
    keywords: ["linkforge", "saas", "multi-tenancy", "analytics", "postgres", "express", "prisma", "redis"],
    badge: "Testing Phase",
  },
  {
    id: "case-linkforge",
    title: "Linkforge Engineering Case Study",
    description: "Deep dive into multi-tenant database partitioning, race condition resolution, and telemetry.",
    category: "Case Study",
    url: "/projects/linkforge/case-study",
    keywords: ["linkforge", "case study", "architecture", "multi-tenancy", "race condition"],
    badge: "Case Study",
  },
  {
    id: "project-infinity",
    title: "Infinity — AI Canvas & Diagram Synthesis",
    description: "Agentic vector whiteboard translating prompts into geometry schemas with debounced state persistence.",
    category: "Project",
    url: "/projects/infinity",
    keywords: ["infinity", "whiteboard", "canvas", "ai agent", "gemini", "neon postgres", "drizzle"],
    badge: "In Development",
  },
  {
    id: "case-infinity",
    title: "Infinity Engineering Case Study",
    description: "Zod geometry validation engine, floating property inspectors, and 10s debounced autosave pipeline.",
    category: "Case Study",
    url: "/projects/infinity/case-study",
    keywords: ["infinity", "case study", "canvas", "architecture", "excalidraw", "autosave"],
    badge: "Case Study",
  },
  {
    id: "project-careerly",
    title: "Careerly — Full-Stack AI Career Intelligence",
    description: "Adaptive technical assessment engines, automated resume parsing, and personalized feedback pipelines.",
    category: "Project",
    url: "/projects/careerly",
    keywords: ["careerly", "ai", "interview", "mcq", "resume", "prisma", "postgres"],
    badge: "Past Work",
  },
  {
    id: "project-clariv",
    title: "Clariv — Document Intelligence & AI Reader",
    description: "Document pipeline converting dense PDFs into structured semantic contexts and streaming queries.",
    category: "Project",
    url: "/projects/clariv",
    keywords: ["clariv", "document", "pdf", "extraction", "google genai", "mongodb"],
    badge: "MVP Complete",
  },

  // Postmortems
  {
    id: "postmortem-node-db",
    title: "Postmortem: Node.js Server Warnings & DB Latency",
    category: "Postmortem",
    description: "Investigation of ServerResponse listener accumulation, PostgreSQL SSL warnings, and query latency.",
    url: "/postmortems/nodejs-server-warnings-and-database-performance-investigation",
    keywords: ["postmortem", "nodejs", "serverresponse", "postgres", "ssl", "prisma", "performance", "listeners"],
    badge: "Incident Report",
  },
  {
    id: "postmortem-oauth",
    title: "Postmortem: OAuth State Mismatch & Session Reliability",
    category: "Postmortem",
    description: "Cross-origin OAuth state verification failures, cookie scoping mismatches, and session lifecycle boundaries.",
    url: "/postmortems/authentication-oauth-state-mismatch",
    keywords: ["postmortem", "oauth", "auth", "session", "cors", "cookie", "express", "better auth"],
    badge: "Incident Report",
  },

  // Technical Articles
  {
    id: "article-buy-twice",
    title: "What Happens When You Click Buy Twice? Concurrency & Idempotency",
    category: "Article",
    description: "Deep dive into race conditions, idempotency keys, database isolation levels, and transactional rollbacks.",
    url: "/blog/what-happens-when-you-click-buy-twice",
    keywords: ["concurrency", "idempotency", "transactions", "race condition", "distributed systems", "database"],
  },
  {
    id: "article-auth",
    title: "Authentication & Authorization in Distributed Systems",
    category: "Article",
    description: "Session tokens, JWT trade-offs, HttpOnly cookie security, and middleware authorization boundaries.",
    url: "/blog/authentication-and-authorization",
    keywords: ["authentication", "authorization", "jwt", "tokens", "security", "cookies"],
  },
  {
    id: "article-routes",
    title: "How Web Routes Know Where to Send Your Request",
    category: "Article",
    description: "Under the hood of HTTP multiplexers, trie-based routing trees, and reverse proxy dispatching.",
    url: "/blog/how-web-routes-know-where-to-send-your-request",
    keywords: ["routing", "http", "mux", "network", "proxy", "dispatch"],
  },
  {
    id: "article-controllers",
    title: "Controllers, Services, Repositories: Layered Backend Architecture",
    category: "Article",
    description: "Decoupling business logic from transport protocols using clean layered architecture.",
    url: "/blog/controllers-services-repositories-requests-responses",
    keywords: ["controllers", "services", "repositories", "architecture", "patterns", "backend"],
  },
  {
    id: "article-useeffect",
    title: "Breaking the useEffect Infinite Loop in Next.js",
    category: "Article",
    description: "Diagnosing state synchronization loops, memoization traps, and server component rendering lifecycles.",
    url: "/blog/useeffect-nextjs-performance-loop",
    keywords: ["useeffect", "performance", "react", "nextjs", "infinite loop", "hooks"],
  },
  {
    id: "article-validation",
    title: "Validation & Transformations in Modern APIs",
    category: "Article",
    description: "Enforcing runtime contract boundaries at API ingress points using schema parsing.",
    url: "/blog/validation-and-transformations",
    keywords: ["validation", "zod", "schemas", "contracts", "api"],
  },

  // Technologies
  {
    id: "tech-postgres",
    title: "Technology: PostgreSQL",
    category: "Technology",
    description: "Relational storage used in Linkforge, Infinity, and Careerly for partitioned tenant data.",
    url: "/#tech-stack",
    keywords: ["postgres", "postgresql", "sql", "database", "rdbms", "prisma", "drizzle"],
  },
  {
    id: "tech-nodejs",
    title: "Technology: Node.js & Express",
    category: "Technology",
    description: "Backend API runtime powering decoupled services, asynchronous event logging, and WebSocket streams.",
    url: "/#tech-stack",
    keywords: ["node", "nodejs", "express", "backend", "runtime", "javascript"],
  },
  {
    id: "tech-redis",
    title: "Technology: Redis",
    category: "Technology",
    description: "In-memory caching and sliding-window rate limiting deployed in Linkforge.",
    url: "/#tech-stack",
    keywords: ["redis", "cache", "rate limiting", "in-memory"],
  },
  {
    id: "tech-nextjs",
    title: "Technology: Next.js & React 19",
    category: "Technology",
    description: "Server components, streaming hydration, and App Router interfaces.",
    url: "/#tech-stack",
    keywords: ["nextjs", "react", "frontend", "server components", "typescript"],
  },
  {
    id: "tech-gemini",
    title: "Technology: Google Gemini 2.5 SDK",
    category: "Technology",
    description: "Constrained JSON schema generation and semantic context streaming in Infinity and Clariv.",
    url: "/#tech-stack",
    keywords: ["gemini", "ai", "genai", "google", "llm", "canvas"],
  },
];

// Curated list for the "Give me something interesting →" random discovery feature
export const CURATED_INTERESTING_ITEMS = [
  {
    title: "Postmortem: Node.js Server Warnings & DB Performance",
    type: "Production Incident Report",
    url: "/postmortems/nodejs-server-warnings-and-database-performance-investigation",
    tagline: "How an accumulation of close event listeners caused unexpected warnings and 700ms query latency.",
  },
  {
    title: "What Happens When You Click Buy Twice?",
    type: "Distributed Systems Article",
    url: "/blog/what-happens-when-you-click-buy-twice",
    tagline: "Concurrency, idempotency keys, race conditions, and transactional safety under high contention.",
  },
  {
    title: "Linkforge Engineering Case Study",
    type: "Architecture Case Study",
    url: "/projects/linkforge/case-study",
    tagline: "Tenant isolation, optimistic locking for vanity slug renames, and decoupled async telemetry.",
  },
  {
    title: "Postmortem: OAuth State Mismatch Incident",
    type: "Security & Auth Incident",
    url: "/postmortems/authentication-oauth-state-mismatch",
    tagline: "Diagnosing dual-origin cookie boundary failures during social sign-in handshakes.",
  },
  {
    title: "Infinity AI Canvas Architecture",
    type: "AI & Vector Workspace Case Study",
    url: "/projects/infinity/case-study",
    tagline: "Zod geometry validation engine preventing overlapping vector nodes on Excalidraw.",
  },
];

export function getRandomInterestingItem() {
  const index = Math.floor(Math.random() * CURATED_INTERESTING_ITEMS.length);
  return CURATED_INTERESTING_ITEMS[index];
}
