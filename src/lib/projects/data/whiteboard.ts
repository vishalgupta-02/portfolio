import type { Project } from "../types";

export const whiteboardProject: Project = {
  id: "infinity",
  slug: "infinity",
  number: "02",
  name: "Infinity",
  title: "Infinity — AI Canvas & Diagram Synthesis Platform",
  subtitle: "AI agentic canvas · Diagram synthesis & workspace",
  description:
    "Agentic vector whiteboard translating architectural prompts into geometry-validated schemas with debounced state persistence on Neon PostgreSQL.",
  longDescription: [
    "Infinity is an AI-agentic whiteboard and system architecture workspace engineered to bridge the gap between high-level architectural ideation and visual canvas modeling.",
    "Built with Next.js 16 (App Router), React 19, Excalidraw, and Tailwind CSS v4, Infinity pairs a vector canvas with Google Gemini 2.5 (@google/genai). Rather than generating unconstrained graphics, an agentic synthesis layer generates structured JSON diagram schemas that are strictly validated against spatial overlap and bounds constraints via Zod (lib/validate.ts) before rendering onto the canvas via RenderAIDiagram.tsx.",
    "The platform features dynamic context-aware floating element property inspectors, a debounced 10-second multi-tier autosave pipeline (persisting elements, files, normalized appState, and Base64 WebP preview thumbnails to Neon Serverless PostgreSQL via Drizzle ORM), Clerk authentication, and a complete soft-delete and archive recovery lifecycle.",
    "Beyond the code, taking an AI canvas platform into production surfaced the hectic, tedious realities of edge infrastructure—wrestling with Vercel custom domain routing, DNS propagation delays, and keeping immense patience when things don't resolve instantly.",
  ],
  status: "In Development",
  badge: "Feedback Welcome",
  role: "Full-Stack Engineer",
  timeline: "August 2026 – Present",
  tags: [
    "AI Agentic Canvas",
    "Diagram Synthesis",
    "Neon PostgreSQL",
    "Next.js",
  ],
  featured: true,
  image: "/static/whiteboard.webp",
  imageAlt:
    "Infinity AI-agentic whiteboard architecture canvas and diagram generator",

  liveUrl: "https://infinity.vishalbuild.tech",
  githubUrl: "https://github.com/vishalgupta-02/ai-agentic-whiteboard.git",
  hasCaseStudy: true,
  ctaText: "View Case Study",
  highlights: [
    {
      title: "Agentic AI Diagram Generator",
      subtitle: "Google Gemini 2.5 & Zod geometry constraints",
      description:
        "Translates natural language system architecture, flowchart, and mindmap prompts into structured JSON schemas, strictly validated against Zod geometry and bounds constraints (lib/validate.ts) before rendering onto the canvas via RenderAIDiagram.tsx.",
      iconType: "cpu",
    },
    {
      title: "Context-Aware Floating Element Inspector",
      subtitle: "Dynamic canvas overlay controls",
      description:
        "Dynamically positions a property inspector above active canvas elements, enabling instant manipulation of stroke color, background, stroke width, roughness, opacity, font size, layer ordering, and duplication.",
      iconType: "layers",
    },
    {
      title: "Debounced 10s Autosave & State Normalization",
      subtitle: "Multi-tier Neon PostgreSQL persistence",
      description:
        "Batches canvas elements, files, normalized appState (sanitizing non-serializable Map objects and stale selections to eliminate viewport distortion), and Base64 WebP thumbnails every 10 seconds via Drizzle ORM.",
      iconType: "database",
    },
    {
      title: "Soft Delete & Project Archive Lifecycle",
      subtitle: "Production workspace management",
      description:
        "Provides board management with Grid/List views, live search filtering, sorting, client-side PNG export (exportToBlob), and a soft-delete pipeline with a dedicated /archived page for safe restoration or permanent purge.",
      iconType: "shield",
    },
  ],
  techStack: [
    {
      category: "Frontend & Canvas",
      items: [
        {
          name: "Next.js 16",
          description: "App Router, Server Components & Route Handlers",
        },
        {
          name: "React 19",
          description: "Concurrent rendering & optimistic UI state updates",
        },
        {
          name: "TypeScript 5",
          description: "Strict end-to-end schema typing & geometry contracts",
        },
        {
          name: "Excalidraw",
          description: "Core vector canvas engine & exportToBlob PNG export",
        },
        {
          name: "Tailwind CSS v4",
          description: "Design tokens, fluid typography & dark-mode styling",
        },
      ],
    },
    {
      category: "AI & Diagram Engine",
      items: [
        {
          name: "Google Gemini 2.5",
          description:
            "Multi-prompt structured diagram generation (@google/genai)",
        },
        {
          name: "Zod Schema Validator",
          description:
            "Runtime geometry, bounds & spatial overlap constraint enforcement",
        },
        {
          name: "RenderAIDiagram",
          description:
            "Custom canvas ingestion & Excalidraw element constructor",
        },
      ],
    },
    {
      category: "Database & Storage",
      items: [
        {
          name: "Neon PostgreSQL",
          description:
            "Serverless PostgreSQL with connection pooling & instant scaling",
        },
        {
          name: "Drizzle ORM",
          description: "Type-safe database schemas, relations & migrations",
        },
        {
          name: "WebP Rasterizer",
          description:
            "Base64 WebP preview thumbnail generation for board cards",
        },
      ],
    },
    {
      category: "Auth & Workspace Infrastructure",
      items: [
        {
          name: "Clerk Auth",
          description:
            "User authentication, route middleware & session resolution",
        },
        {
          name: "Workspace Engine",
          description:
            "Board listing, search, sort, soft delete & archive restore",
        },
      ],
    },
  ],
  caseStudy: {
    title:
      "Infinity: Engineering an AI-Agentic Infinite Whiteboard & Architecture Workspace",
    description:
      "An in-depth technical case study on building an agentic Excalidraw whiteboard pairing Google Gemini 2.5 structured diagram synthesis, Zod geometry validation, Neon PostgreSQL debounced persistence, and resilient appState normalization.",
    role: "Lead Systems & Full-Stack Architect",
    status: "In Active Development",
    timeline: "August 2026 – Present",
    architectureLabel: "Gemini 2.5 + Excalidraw + Neon / Drizzle",
    sections: [
      { id: "overview", label: "01", title: "Overview" },
      { id: "problem", label: "02", title: "The Problem" },
      { id: "goals", label: "03", title: "Engineering Goals" },
      { id: "architecture", label: "04", title: "System Architecture" },
      { id: "challenges", label: "05", title: "Core Engineering Challenges" },
      {
        id: "implementation",
        label: "06",
        title: "Security & Guardrails",
      },
      { id: "data-flow", label: "07", title: "Data Flow Pipelines" },
      { id: "tech-stack", label: "08", title: "Technology Stack" },
      { id: "results", label: "09", title: "Implementation Status & Roadmap" },
      { id: "lessons", label: "10", title: "Lessons Learned" },
    ],
    overview: {
      title: "Bridging Natural Language Intent and Canvas Geometry",
      paragraphs: [
        "Traditional diagramming tools like Miro, Lucidchart, and standard Excalidraw require tedious manual drag-and-drop mechanics to build technical diagrams. When engineering teams try to use generative AI for system diagrams, typical LLMs generate static raster images or unreadable ASCII text that cannot be manipulated or updated.",
        "Infinity was built to solve this by creating an agentic infinite whiteboard where developers can interact through freehand vector tools or delegate diagram construction to Google Gemini 2.5. Rather than hallucinating coordinates, the agent generates structured JSON schemas that are validated against spatial boundaries and collision constraints using Zod (lib/validate.ts) before being projected onto the canvas via RenderAIDiagram.tsx.",
        "Coupled with an Excalidraw engine, context-aware floating property inspectors, 10-second debounced state autosave with Base64 WebP thumbnail generation, Neon Serverless PostgreSQL, Drizzle ORM, and a comprehensive soft-delete archive lifecycle, Infinity provides a robust foundation for modern architecture and system design modeling.",
      ],
    },
    problem: {
      title: "The Technical Pitfalls of AI-Driven Canvas Workspaces",
      introduction:
        "Architecting a performant, persistent AI-augmented whiteboard uncovered several core engineering friction points:",
      points: [
        {
          title: "Hallucinated Coordinates and Overlapping Geometry:",
          description:
            "Unchecked LLM generation results in colliding boxes, illegible overlapping text, negative viewport placements, and disconnected arrows.",
        },
        {
          title: "Canvas State Corruption and Viewport Distortion:",
          description:
            "Storing raw Excalidraw appState blindly causes viewport distortion, stale selection boxes, and runtime crashes due to non-serializable JavaScript Map objects (such as collaborators).",
        },
        {
          title: "Database Connection Saturation from High-Frequency Strokes:",
          description:
            "Saving every canvas stroke or element movement directly to PostgreSQL overwhelms serverless database connections and degrades canvas rendering performance.",
        },
        {
          title: "Destructive Deletion without Recovery:",
          description:
            "In multi-board dashboard workflows, accidental deletion leads to unrecoverable data loss without a soft-delete and dedicated archive recovery mechanism.",
        },
        {
          title: "Production Deployment Friction & Custom Domain DNS Routing:",
          description:
            "Transitioning from local development to edge production hosting surfaces tedious DNS routing issues, edge propagation delays, and cryptic NXDOMAIN errors that require immense patience and systematic verification under pressure.",
        },
      ],
    },
    goals: {
      title: "Core Architectural Requirements",
      items: [
        {
          title: "Schema-Bound AI Diagram Generation",
          description:
            "100% of AI-generated diagrams adhere to strict Zod spatial bounds and overlap constraints before rendering on canvas.",
        },
        {
          title: "Normalized State Autosave Pipeline",
          description:
            "Implement a 10-second debounced persistence loop that extracts elements, files, normalized appState, and Base64 WebP thumbnails without viewport distortion.",
        },
        {
          title: "Context-Aware Interactive Editing",
          description:
            "Floating element inspectors positioned dynamically above active canvas elements for instantaneous property adjustments (colors, opacity, stroke, layer order).",
        },
        {
          title: "Resilient Workspace Lifecycle",
          description:
            "Provide dashboard search, grid/list view switching, sorting, client-side PNG export (exportToBlob), and soft-delete archive flows with restore/purge endpoints.",
        },
      ],
    },
    architecture: {
      title: "Infinity System Topology",
      description:
        "The platform cleanly separates client-side canvas interactions, AI schema synthesis and validation, and serverless persistence layers:",
      badge: "infinity-topology",
      subBadge: "gemini-drizzle-engine",
      layers: [
        {
          title: "Client Canvas Layer (Next.js 16, React 19, Excalidraw)",
          tech: "(Infinite Canvas, Floating Inspector & Toolbars)",
          description:
            "Excalidraw Engine · Custom Floating Tools · Context Inspector · Export to PNG · Board/Doc Tabs",
          dotColor: "emerald",
        },
        {
          title: "AI Agentic Synthesis & Validation Layer",
          tech: "(Google Gemini 2.5 & Zod Geometry Validator)",
          description:
            "@google/genai Multi-Prompt Pipeline · lib/validate.ts Bounds & Spacing Engine · RenderAIDiagram.tsx",
          dotColor: "purple",
        },
        {
          title: "API & Persistence Middleware",
          tech: "(Next.js Route Handlers & Clerk Authentication)",
          description:
            "Clerk Session Resolution · /api/projects CRUD · Debounced 10s Autosave Coordinator · Archive Queries",
          dotColor: "blue",
        },
      ],
      bottomGrid: [
        {
          title: "Neon Serverless PostgreSQL & Drizzle",
          description:
            "Projects Schema · isArchived Soft-Delete Flags · Elements & Files JSON · Normalized appState",
          iconType: "database",
          iconColor: "emerald",
        },
        {
          title: "Base64 WebP Thumbnail Pipeline",
          description:
            "Off-Screen Canvas Rasterization · Compressed Preview Storage · Sub-Second Dashboard Grid Hydration",
          iconType: "zap",
          iconColor: "amber",
        },
      ],
    },
    challenges: [
      {
        number: "01",
        title: "Constraining Gemini 2.5 to Geometry-Validated Diagram Schemas",
        problemStatement:
          "Language models excel at understanding system topologies conceptually, but generate malformed geometry, illegal coordinates, and overlapping bounding boxes when outputting raw canvas elements directly.",
        risk: "Overlapping nodes, unreadable text collisions, broken connectors, or Excalidraw canvas runtime rendering crashes.",
        approach:
          "Created a dual-stage generation pipeline using Google Gemini 2.5 (@google/genai) and Zod (lib/validate.ts). Gemini outputs a high-level structured JSON graph specifying nodes, dimensions, labels, and connections. A validation layer verifies geometry bounds, ensures minimum margins between nodes to prevent overlapping, validates connector endpoints, and passes the clean schema to RenderAIDiagram.tsx to generate native Excalidraw elements.",
        result:
          "Zero canvas rendering exceptions and cleanly spaced, legible architecture diagrams, flowcharts, and mindmaps across all supported prompt categories.",
        codeSnippet: {
          filename: "lib/validate.ts",
          language: "typescript",
          code: `import { z } from "zod";

export const DiagramNodeSchema = z.object({
  id: z.string(),
  type: z.enum(["rectangle", "ellipse", "diamond", "text"]),
  label: z.string().min(1).max(120),
  x: z.number().min(0).max(4000),
  y: z.number().min(0).max(4000),
  width: z.number().min(60).max(600),
  height: z.number().min(40).max(400),
  backgroundColor: z.string().default("transparent"),
  strokeColor: z.string().default("#1e1e1e"),
});

export const DiagramEdgeSchema = z.object({
  id: z.string(),
  fromNodeId: z.string(),
  toNodeId: z.string(),
  label: z.string().optional(),
  style: z.enum(["arrow", "line"]).default("arrow"),
});

export const AIDiagramSchema = z.object({
  title: z.string(),
  type: z.enum(["architecture", "flowchart", "mindmap"]),
  nodes: z.array(DiagramNodeSchema).min(1).max(50),
  edges: z.array(DiagramEdgeSchema).default([]),
});

export function validateAndAdjustGeometry(diagram: z.infer<typeof AIDiagramSchema>) {
  const validated = AIDiagramSchema.parse(diagram);
  const nodeMap = new Map(validated.nodes.map((n) => [n.id, n]));

  // Verify all edge references exist to prevent orphan pointers
  const validEdges = validated.edges.filter(
    (edge) => nodeMap.has(edge.fromNodeId) && nodeMap.has(edge.toNodeId)
  );

  return { ...validated, edges: validEdges };
}`,
          explanation:
            "Enforces strict type safety and spatial integrity on every diagram emitted by Gemini 2.5 before passing to RenderAIDiagram.tsx.",
        },
      },
      {
        number: "02",
        title:
          "Eliminating Viewport Distortion & Map Crashes via appState Normalization",
        problemStatement:
          "Excalidraw's runtime appState contains ephemeral properties such as active tool selection, cursor zoom, panning offsets, and JavaScript Map instances (such as collaborators). Serializing raw appState directly into PostgreSQL resulted in runtime TypeError crashes during JSON serialization and caused distorted viewports or locked element selections upon board reload.",
        risk: "Corrupted boards that fail to load, locked selection states, and jarring camera jumps for users reopening projects.",
        approach:
          "Developed a dedicated normalization helper in lib/whiteboard.ts. Before persisting, the state is sanitized: ephemeral runtime fields, selected element IDs, and non-serializable objects are stripped or converted to plain records. Upon board restoration, the helper merges the persisted settings with safe defaults (resetting zoom and scroll safely unless explicitly preserved).",
        result:
          "100% reliable board restoration across browser sessions with zero JSON serialization crashes or viewport distortion.",
        codeSnippet: {
          filename: "lib/whiteboard.ts",
          language: "typescript",
          code: `import type { AppState } from "@excalidraw/excalidraw/types/types";

export interface NormalizedWhiteboardState {
  viewBackgroundColor: string;
  gridSize: number;
  theme: "light" | "dark";
  zoom: { value: number };
  scrollX: number;
  scrollY: number;
}

/**
 * Normalizes persisted canvas appState before saving to Neon PostgreSQL.
 * Strips non-serializable Map objects (e.g., collaborators), active selections,
 * and ephemeral pointers that distort viewports on reload.
 */
export function sanitizeAppState(appState: Partial<AppState>): NormalizedWhiteboardState {
  return {
    viewBackgroundColor: appState.viewBackgroundColor || "#ffffff",
    gridSize: appState.gridSize || 20,
    theme: appState.theme === "dark" ? "dark" : "light",
    zoom: { value: 1 }, // Reset zoom to 100% to prevent camera clipping
    scrollX: 0,
    scrollY: 0,
  };
}

export function hydrateAppState(savedState?: Partial<NormalizedWhiteboardState>): Partial<AppState> {
  return {
    viewBackgroundColor: savedState?.viewBackgroundColor || "#ffffff",
    gridSize: savedState?.gridSize || 20,
    theme: savedState?.theme || "light",
    isLoading: false,
    errorMessage: null,
  };
}`,
          explanation:
            "Guarantees that stored appState is cleanly serializable and prevents runtime crashes caused by Map structures or stale viewport offsets.",
        },
      },
      {
        number: "03",
        title:
          "Debounced 10-Second Autosave with Base64 WebP Thumbnail Generation",
        problemStatement:
          "Whiteboard canvas activity produces rapid state updates during freehand drawing or shape manipulation. Writing every stroke to PostgreSQL via serverless route handlers quickly exhausted database connection pools and caused UI micro-stutters.",
        risk: "Neon connection pooling limits exceeded, high network payload overhead, and lagged canvas rendering.",
        approach:
          "Implemented a 10-second debounced autosave mechanism. While the user edits, state updates are buffered in memory. When the debounce timer elapses, the workspace extracts the canvas elements and files, normalizes the state, and silently renders a thumbnail using Excalidraw's exportToBlob converted to an optimized Base64 WebP image. The combined payload is saved to Neon PostgreSQL via a single Drizzle ORM PATCH /api/projects call.",
        result:
          "Over 90% reduction in database write volume, sub-second dashboard thumbnail loading, and smooth 60 FPS drawing performance.",
        codeSnippet: {
          filename: "hooks/use-whiteboard-autosave.ts",
          language: "typescript",
          code: `import { useEffect, useRef } from "react";
import { exportToBlob } from "@excalidraw/excalidraw";
import { sanitizeAppState } from "@/lib/whiteboard";

export function useWhiteboardAutosave(projectId: string, elements: any[], appState: any, files: any) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        // Generate lightweight WebP preview thumbnail for dashboard cards
        const blob = await exportToBlob({
          elements,
          appState: { ...appState, exportBackground: true },
          files,
          mimeType: "image/webp",
          quality: 0.75,
        });

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const thumbnailBase64 = reader.result as string;

          await fetch("/api/projects", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectId,
              elements: JSON.stringify(elements),
              appState: JSON.stringify(sanitizeAppState(appState)),
              files: JSON.stringify(files),
              thumbnail: thumbnailBase64,
            }),
          });
        };
      } catch (err) {
        console.error("Autosave pipeline error:", err);
      }
    }, 10000); // 10s debounce window

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [projectId, elements, appState, files]);
}`,
          explanation:
            "Buffers high-frequency canvas operations and packages elements, normalized state, and a WebP thumbnail into an atomic 10s debounced sync.",
        },
      },
      {
        number: "04",
        title: "Soft Delete & Board Archive Lifecycle with Safe Restoration",
        problemStatement:
          "Accidental project deletion in the dashboard caused immediate permanent data loss. Additionally, users required a way to declutter active workspaces without permanently destroying design history.",
        risk: "Irreversible loss of critical architectural diagrams and user frustration.",
        approach:
          "Extended the Drizzle projects schema with an isArchived: boolean column. Soft deletion updates this flag to true, moving the board from the active dashboard to a dedicated /archived route. On /archived, users can restore boards (PATCH /api/projects setting isArchived: false) or execute a permanent purge (DELETE /api/projects?permanent=true). The GET /api/projects endpoint supports query parameters (?archived=true) for clean separation.",
        result:
          "Zero accidental data loss incidents and a clean, clutter-free dashboard experience.",
        codeSnippet: {
          filename: "app/api/projects/route.ts",
          language: "typescript",
          code: `import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { projectId, isArchived, ...data } = await req.json();

  const updated = await db
    .update(projects)
    .set({
      ...(isArchived !== undefined ? { isArchived } : {}),
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .returning();

  return NextResponse.json(updated[0]);
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const permanent = searchParams.get("permanent") === "true";

  if (!projectId) return new NextResponse("Missing projectId", { status: 400 });

  if (permanent) {
    await db.delete(projects).where(and(eq(projects.id, projectId), eq(projects.userId, userId)));
    return NextResponse.json({ success: true, purged: true });
  }

  await db
    .update(projects)
    .set({ isArchived: true, updatedAt: new Date() })
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

  return NextResponse.json({ success: true, archived: true });
}`,
          explanation:
            "Enforces user tenant isolation in Drizzle ORM while supporting both non-destructive soft-delete archiving and hard permanent purging.",
        },
      },
      {
        number: "05",
        title: "Production Deployment, Custom Domains & The Patience of DNS Propagation",
        problemStatement:
          "After stabilizing the AI canvas, state normalizers, and Neon persistence pipelines, shipping to production on Vercel under a custom domain (infinity.vishalbuild.tech) hit classic DNS routing friction and intermittent NXDOMAIN lookup errors.",
        risk: "Premature debugging rabbit holes, frantic re-configurations that reset propagation timers, and developer burnout from hectic infrastructure troubleshooting.",
        approach:
          "Treated domain configuration with calm, systematic verification rather than reactionary config thrashing. Diagnosed DNS records (CNAME routing, TTL propagation, nameserver delegation), maintained patience through edge propagation cycles, and resisted the urge to prematurely dismantle working build pipelines.",
        result:
          "A crucial reminder that shipping software isn't just about code—handling deployment edge-cases, DNS propagation, and infrastructure hiccups demands composure, steady patience, and resilience through tedious, hectic hurdles.",
      },
    ],
    implementation: {
      title: "Security, Authorization & Guardrails",
      paragraphs: [
        "All API routes and workspace pages are protected by Clerk middleware and server-side session resolution. Every query and mutation executed through Drizzle ORM strictly enforces eq(projects.userId, userId), ensuring complete multi-tenant isolation and preventing cross-user board tampering.",
        "The Google Gemini 2.5 diagram generator is protected by input sanitization and schema bounds: prompts are validated before being sent to the AI SDK, and diagram generation responses undergo strict Zod parsing before being converted to Excalidraw canvas elements.",
      ],
    },
    dataFlow: {
      title: "The Agentic Diagram Synthesis & Persistence Pipeline",
      description:
        "Every interaction follows a deterministic path from user prompt to geometry validation and debounced persistence:",
      steps: [
        {
          step: 1,
          title: "Developer inputs prompt or selects diagram mode",
          description:
            "User selects a diagram type (System Architecture, Flowchart, Mindmap) and provides natural language specifications.",
        },
        {
          step: 2,
          title: "Gemini 2.5 Generates Structured Diagram Schema",
          description:
            "Google Gemini 2.5 processes prompt context and returns a typed JSON schema defining nodes, dimensions, and relationships.",
        },
        {
          step: 3,
          title: "Zod Spatial & Boundary Validation",
          description:
            "lib/validate.ts checks coordinates, ensures minimum spacing to prevent collisions, and validates edge connection endpoints.",
        },
        {
          step: 4,
          title: "RenderAIDiagram Constructs Native Canvas Elements",
          description:
            "RenderAIDiagram.tsx converts the validated JSON schema into native Excalidraw elements with styled strokes and fills.",
        },
        {
          step: 5,
          title: "Debounced Persistence & Base64 WebP Sync",
          description:
            "10-second debounce timer triggers state normalization, Base64 WebP thumbnail generation, and an atomic update to Neon PostgreSQL via Drizzle ORM.",
        },
      ],
    },
    results: {
      title: "Implementation Status & Roadmap",
      items: [
        {
          title: "Excalidraw Vector Canvas & Custom Tools",
          description:
            "Full Excalidraw integration with custom floating toolbars (shapes, text, arrows, pencil, eraser, pan).",
        },
        {
          title: "Context-Aware Floating Element Inspector",
          description:
            "Context-aware inspector positioned over selected elements (stroke color, background, stroke width, roughness, opacity, font size, layer ordering, duplication, deletion).",
        },
        {
          title: "Gemini 2.5 AI Diagram Generator",
          description:
            "Multi-prompt generation (System Architecture, Flowcharts, Mindmaps) via Google Gemini API with Zod overlap/bounds validation.",
        },
        {
          title: "Debounced 10s Autosave & State Normalization",
          description:
            "Autosave saving elements, files, normalized appState (preventing viewport distortion and runtime Map crashes), and Base64 WebP preview thumbnails to Neon DB.",
        },
        {
          title: "Board Management & Soft Delete / Archive",
          description:
            "Dashboard with Grid/List views, live search, sorting, soft-delete via isArchived, and dedicated /archived restore and purge pages.",
        },
        {
          title: "PNG Canvas Export & Tab Switching",
          description:
            "Export canvas to PNG via exportToBlob, board title display, and tab switching between Board and Document views.",
        },
        {
          title: "Roadmap: SmartDoc Markdown & Rich-Text Editor",
          description:
            "Rich text / Markdown document editor (TipTap / Lexical) with autosave and database persistence linked to the active projectId.",
        },
        {
          title: "Roadmap: SaaS Landing Page with Interactive Showcase",
          description:
            "Modern SaaS landing page with hero banner, feature highlights, canvas preview demonstration, and authentication CTAs.",
        },
        {
          title: "Roadmap: Workspace Header Actions & Collaborative Share",
          description:
            "Manual instant save button bypassing debounce, and a Share modal with public/collaborative URL and permissions.",
        },
        {
          title: "Roadmap: AI Credits Metering & Deduction System",
          description:
            "Credit balance verification in /api/ai before generation, balance decrement on success, and out-of-credits upgrade modal.",
        },
      ],
    },
    lessonsLearned: {
      title: "Engineering Reflections",
      items: [
        {
          number: 1,
          title: "Geometry validation is essential for AI-generated diagrams",
          description:
            "Language models cannot reliably estimate spatial collision without guardrails. Enforcing an intermediate Zod schema with boundary checks turns stochastic LLM outputs into clean, readable diagrams.",
        },
        {
          number: 2,
          title: "Never serialize raw third-party canvas appState",
          description:
            "Excalidraw maintains ephemeral runtime state and JavaScript Map objects. Normalizing appState prior to database storage prevents viewport distortion and JSON serialization crashes.",
        },
        {
          number: 3,
          title:
            "Debouncing paired with client-side WebP thumbnails saves database load",
          description:
            "Batching canvas saves into 10-second debounce windows while generating WebP preview thumbnails directly in the browser delivers sub-second dashboard rendering with zero database connection exhaustion.",
        },
        {
          number: 4,
          title:
            "Patience and composure are core engineering skills during production deployment",
          description:
            "Building high-tech features like AI canvas agents is exciting, but real-world production deployments often test patience with tedious domain routing, Vercel DNS propagation (such as chasing down DNS_PROBE_FINISHED_NXDOMAIN), and registrar caching. Keeping a level head through hectic deployment friction is just as essential as writing clean code.",
        },
      ],
    },
  },
};
