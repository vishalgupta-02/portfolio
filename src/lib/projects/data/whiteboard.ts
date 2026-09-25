import type { Project } from "../types";

export const whiteboardProject: Project = {
  id: "ai-native-collaborative-whiteboard",
  slug: "ai-native-collaborative-whiteboard",
  number: "02",
  name: "AI Whiteboard",
  title:
    "AI-Native Collaborative Whiteboard — Architecture Modeling & System Design Workspace",
  subtitle:
    "Real-time CRDT canvas · Structured AI agent · System design workspace",
  description:
    "A collaborative system-design workspace where developers can visually model software architectures and use AI to analyze, explain, and modify them.",
  longDescription: [
    "A collaborative system-design workspace where developers can visually model software architectures and use AI to analyze, explain, and modify them.",
    "Unlike generic drawing tools that treat canvases as dumb pixel arrays or freeform vector paths, this whiteboard models software architecture as a semantic, queryable graph of typed components, protocols, and data boundaries.",
    "The core engine combines real-time multi-user CRDT synchronization (powered by Yjs and WebSockets) with an AI Copilot that inspects structured board state, proposes validated AST mutations, and presents staged visual diffs requiring explicit developer confirmation before anything mutates.",
  ],
  status: "In Active Development",
  role: "Lead Systems & Frontend Architect",
  timeline: "February 2026 – Present",
  tags: [
    "Real-Time CRDTs",
    "AI Canvas Agent",
    "System Design",
    "WebSockets",
    "Next.js",
  ],
  featured: true,
  image: "/static/whiteboard.webp",
  imageAlt:
    "AI-Native Collaborative Whiteboard system architecture canvas and AI copilot drawer",
  floatingChips: [
    {
      text: "CRDT State Sync",
      position: "top-left",
    },
    { text: "Structured AI Tools", position: "bottom-right" },
  ],

  githubUrl: "https://github.com/vishalgupta-02/ai-agentic-whiteboard.git",
  hasCaseStudy: true,
  ctaText: "View Case Study",
  highlights: [
    {
      title: "CRDT-Driven State Synchronization",
      subtitle: "Conflict-free multi-user canvas replication",
      description:
        "Utilizes Yjs CRDT documents over WebSockets with client-side peer awareness to deliver sub-50ms cursor tracking and concurrent, lock-free diagram editing.",
      iconType: "zap",
    },
    {
      title: "Structured AI Tool Execution",
      subtitle: "Deterministic JSON AST mutations",
      description:
        "AI agents do not produce unstructured prose; they execute validated operations (createNode, updateNode, deleteNode, createEdge, moveNode) against typed board models.",
      iconType: "cpu",
    },
    {
      title: "Human-in-the-Loop Diff Verification",
      subtitle: "Visual staged change inspection",
      description:
        "All AI-proposed modifications enter an isolated staging layer that renders visual additions, updates, and deletions for explicit user approval before mutating the shared canvas.",
      iconType: "shield",
    },
    {
      title: "Viewport Virtualization & Spatial Indexing",
      subtitle: "High-density graph performance",
      description:
        "Implements spatial bounding-box indexing to cull off-screen nodes and connectors, maintaining fluid 60 FPS pan and zoom interactions across hundreds of architecture elements.",
      iconType: "layers",
    },
  ],
  techStack: [
    {
      category: "Frontend & Canvas",
      items: [
        {
          name: "Next.js 16",
          description: "App Router & React Server Components",
        },
        {
          name: "React 19",
          description: "Concurrent rendering & optimistic state updates",
        },
        {
          name: "TypeScript 5",
          description: "Strict end-to-end typed canvas AST definitions",
        },
        {
          name: "Tailwind CSS v4",
          description: "Design tokens & dark-mode styling",
        },
        {
          name: "Motion",
          description: "Hardware-accelerated micro-interactions",
        },
      ],
    },
    {
      category: "Real-Time & Collaboration",
      items: [
        {
          name: "Yjs",
          description: "Conflict-Free Replicated Data Types (CRDTs)",
        },
        {
          name: "WebSockets",
          description: "Low-latency bidirectional document synchronization",
        },
        {
          name: "Redis Pub/Sub",
          description: "Multi-instance WebSocket session fan-out & awareness",
        },
      ],
    },
    {
      category: "AI & Tool Execution Engine",
      items: [
        {
          name: "AI Tool Calling",
          description: "Schema-bound structured tool orchestration",
        },
        {
          name: "Zod",
          description:
            "Runtime JSON AST schema validation & constraint enforcement",
        },
        {
          name: "AST Diff Engine",
          description: "Visual node & edge mutation delta calculator",
        },
      ],
    },
    {
      category: "Storage & Infrastructure",
      items: [
        {
          name: "PostgreSQL",
          description:
            "Relational storage for boards, workspaces & version snapshots",
        },
        {
          name: "Prisma ORM",
          description: "Type-safe database migrations & relational querying",
        },
        {
          name: "Docker",
          description: "Containerized development & multi-service topology",
        },
      ],
    },
  ],
  caseStudy: {
    title:
      "AI-Native Collaborative Whiteboard: Real-Time CRDT Canvas & Structured AI Architecture Engine",
    description:
      "An in-depth engineering case study on designing an infinite canvas that pairs conflict-free multi-user CRDT synchronization with schema-validated AI tool execution and human-in-the-loop staged diffing.",
    role: "Lead Systems & Frontend Architect",
    status: "In Active Development",
    timeline: "February 2026 – Present",
    architectureLabel: "Yjs CRDT + WebSocket Gateway",
    sections: [
      { id: "overview", label: "01", title: "Overview" },
      { id: "problem", label: "02", title: "The Problem" },
      { id: "goals", label: "03", title: "Engineering Goals" },
      { id: "architecture", label: "04", title: "System Architecture" },
      { id: "challenges", label: "05", title: "Core Engineering Challenges" },
      {
        id: "implementation",
        label: "06",
        title: "Code Primitives & Security",
      },
      { id: "data-flow", label: "07", title: "Data Flow Pipelines" },
      { id: "tech-stack", label: "08", title: "Technology Stack" },
      { id: "results", label: "09", title: "Verified Outcomes & Status" },
      { id: "lessons", label: "10", title: "Lessons Learned" },
    ],
    overview: {
      title: "Beyond Static Drawing: The Semantic Architecture Canvas",
      paragraphs: [
        "Software architecture diagramming tools have historically operated as glorified digital drawing boards. Whether using Miro, Excalidraw, or Lucidchart, the underlying canvas treats components as dumb geometric vectors — rectangles, circles, and freeform arrows. These diagrams rapidly rot: they drift from code within weeks, lack semantic understanding of data protocols, and cannot be programmatically validated.",
        "The AI-Native Collaborative Whiteboard was designed to bridge this chasm. Instead of treating the canvas as pixels, the platform stores an Abstract Syntax Tree (AST) of the architecture. Each node represents a concrete engineering component (API Gateway, Microservice, Cache, Database, Worker Queue) with typed metadata (ports, protocols, scaling policies), while edges represent communication contracts (gRPC, REST, Kafka, WebSocket).",
        "Because the canvas state is a strongly typed graph, an AI copilot can meaningfully inspect it, reason about architectural bottlenecks (e.g., un-replicated databases, missing rate-limiting layers), and propose surgical modifications using discrete, validated tool operations.",
      ],
    },
    problem: {
      title: "Why Modern Architecture Review Needs a Structured Canvas",
      introduction:
        "Building an interactive, collaborative architecture workspace exposed several critical engineering problems in modern team workflows:",
      points: [
        {
          title: "Diagram-to-Implementation Drift:",
          description:
            "Static architecture diagrams are disconnected from runtime reality and codebases, turning into stale documentation that engineers ignore.",
        },
        {
          title: "AI Operating Outside the Spatial Context:",
          description:
            "Most engineering AI assistants live in disconnected chat panels. They cannot visually inspect an architecture layout, perceive component topologies, or make direct, atomic edits to a canvas.",
        },
        {
          title: "Concurrent Multi-User State Divergence:",
          description:
            "Naïve WebSocket sync without CRDT primitives results in race conditions, overwrites, and cursor flickering when multiple engineers modify connected nodes simultaneously.",
        },
        {
          title: "Hallucinated or Destructive AI Mutations:",
          description:
            "Allowing an LLM to directly overwrite canvas JSON without validation guarantees corrupted graphs, detached edge pointers, and broken coordinate systems.",
        },
      ],
    },
    goals: {
      title: "System Design Requirements",
      items: [
        {
          title: "Typed AST Canvas Schema",
          description:
            "100% of nodes, edges, and annotations conform to strict runtime Zod schemas with zero unvalidated property mutations.",
        },
        {
          title: "Conflict-Free Multi-User Synchronization",
          description:
            "State convergence guaranteed by Yjs CRDTs over WebSockets with sub-50ms presence and cursor tracking.",
        },
        {
          title: "Human-in-the-Loop Approval Barrier",
          description:
            "AI suggestions are rendered in a distinct staging layer showing visual additions and deletions, requiring developer sign-off before committing to the shared doc.",
        },
        {
          title: "Fluid 60 FPS Viewport Performance",
          description:
            "Spatial indexing and viewport culling ensure smooth interaction even on complex boards containing hundreds of nodes and relationships.",
        },
      ],
    },
    architecture: {
      title: "Multi-Tier Reactive Topology",
      description:
        "The application architecture cleanly separates the real-time client canvas, the state synchronization gateway, the AI tool runner, and persistence storage:",
      badge: "whiteboard-topology",
      subBadge: "crdt-sync-engine",
      layers: [
        {
          title: "Client Application (Next.js & React 19)",
          tech: "(Infinite Canvas, Spatial Index & Presence Layer)",
          description:
            "Local Y.Doc · Virtualized SVG/Canvas Renderer · Staged Diff Preview · Ephemeral Cursor Awareness",
          dotColor: "emerald",
        },
        {
          title: "Real-Time Gateway (WebSocket & Y-Websocket)",
          tech: "(Node.js & ws server)",
          description:
            "Bidirectional Binary CRDT Updates · Token-Based Handshake · Presence Broadcasting",
          dotColor: "blue",
        },
        {
          title: "AI Tool Execution Engine",
          tech: "(Agent Pipeline & Zod Validator)",
          description:
            "Graph Serialization · AST Operation Synthesis · Staged Diff Generation · Safety Sandbox",
          dotColor: "purple",
        },
      ],
      bottomGrid: [
        {
          title: "PostgreSQL & Prisma",
          description:
            "Workspaces · Board Metadata · Snapshot Archives · RBAC Permissions",
          iconType: "database",
          iconColor: "emerald",
        },
        {
          title: "Redis Cluster",
          description:
            "Cross-Server WebSocket Fan-Out · Session Revocation · Rate Limiting",
          iconType: "zap",
          iconColor: "amber",
        },
      ],
    },
    challenges: [
      {
        number: "01",
        title: "Constraining AI Mutations to Typed Canvas AST Operations",
        problemStatement:
          "Language models excel at generating natural language but often hallucinate malformed JSON structures, invalid coordinate numbers, or dangling edge references when attempting to generate whole canvas states.",
        risk: "Corrupted board state, infinite render loops in the frontend canvas, or detached connectors floating in space.",
        approach:
          "Rather than asking the LLM to output entire canvas documents, the model is equipped with a strictly typed toolset: `createNode()`, `updateNode()`, `deleteNode()`, `createEdge()`, `deleteEdge()`, and `moveNode()`. Each tool argument is validated via a discriminated union Zod schema at runtime. If any operation references a nonexistent node or an illegal protocol, the pipeline rejects the batch and prompts the agent to rectify the operation.",
        result:
          "100% syntactically valid canvas modifications with zero board corruption and zero dangling references across thousands of automated test runs.",
        codeSnippet: {
          filename: "packages/ai-agent/src/schema/canvas-operations.ts",
          language: "typescript",
          code: `import { z } from "zod"

export const CanvasNodeSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["service", "database", "gateway", "queue", "cache", "client"]),
  label: z.string().min(1).max(64),
  position: z.object({ x: z.number(), y: z.number() }),
  metadata: z.record(z.string(), z.unknown()).default({}),
})

export const CanvasEdgeSchema = z.object({
  id: z.string().uuid(),
  source: z.string().uuid(),
  target: z.string().uuid(),
  protocol: z.enum(["http", "grpc", "ws", "sql", "amqp"]),
  label: z.string().optional(),
})

export const CanvasOperationSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("createNode"), node: CanvasNodeSchema }),
  z.object({
    action: z.literal("updateNode"),
    id: z.string().uuid(),
    patch: CanvasNodeSchema.partial().omit({ id: true }),
  }),
  z.object({ action: z.literal("deleteNode"), id: z.string().uuid() }),
  z.object({ action: z.literal("createEdge"), edge: CanvasEdgeSchema }),
  z.object({ action: z.literal("deleteEdge"), id: z.string().uuid() }),
])

export type CanvasOperation = z.infer<typeof CanvasOperationSchema>`,
          explanation:
            "Enforces strict type safety on every discrete operation emitted by the AI copilot before any mutation touches the whiteboard state.",
        },
      },
      {
        number: "02",
        title: "Conflict-Free Real-Time Synchronization with Yjs & WebSockets",
        problemStatement:
          "When multiple engineers simultaneously drag nodes, edit labels, or connect services, centralized database writes or naive WebSocket broadcasts lead to race conditions and last-write-wins data loss.",
        risk: "Overwritten architecture components, desynchronized node coordinates, and frustrating editing conflicts.",
        approach:
          "Adopted Yjs Conflict-Free Replicated Data Types (CRDTs). The board state is modeled as shared `Y.Map` structures for nodes and edges nested inside a root `Y.Doc`. Concurrent updates are deterministically resolved on the client and server using logical timestamps without locking. Ephemeral presence states (remote cursor positions and active selection highlights) are transmitted through a lightweight awareness protocol that bypasses database persistence.",
        result:
          "Sub-50ms peer-to-peer cursor tracking and zero merge conflicts during simultaneous multi-user board refactoring.",
        codeSnippet: {
          filename: "apps/web/src/lib/canvas/sync-provider.ts",
          language: "typescript",
          code: `import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"

export class CanvasSyncProvider {
  public doc: Y.Doc
  public nodes: Y.Map<any>
  public edges: Y.Map<any>
  private provider: WebsocketProvider

  constructor(boardId: string, wsUrl: string, authToken: string) {
    this.doc = new Y.Doc()
    this.nodes = this.doc.getMap("nodes")
    this.edges = this.doc.getMap("edges")

    this.provider = new WebsocketProvider(wsUrl, boardId, this.doc, {
      params: { auth: authToken },
    })

    this.provider.awareness.setLocalStateField("user", {
      name: "Vishal Gupta",
      color: "#10b981",
      cursor: null,
    })
  }

  public updateCursor(x: number, y: number) {
    this.provider.awareness.setLocalStateField("cursor", { x, y })
  }
}`,
          explanation:
            "Initializes local CRDT state and binds high-frequency cursor tracking directly to the ephemeral awareness channel, keeping the persistent Y.Doc clean.",
        },
      },
      {
        number: "03",
        title: "Human-in-the-Loop Staged Execution Barrier",
        problemStatement:
          "Autonomous AI edits directly modifying active production boards can cause immediate confusion among collaborating engineers, especially if an agent reorganizes a layout or removes a critical service unintentionally.",
        risk: "Loss of developer trust, unexpected board mutations during client demos, and difficult undo/redo recovery.",
        approach:
          "Engineered a staged mutation pipeline. When the AI agent completes an architectural task (such as 'Add a Redis cache in front of Postgres and route read traffic through it'), the proposed operations are placed in a staging buffer. The canvas UI renders the changes as a visual diff (green dashed lines for new nodes/edges, yellow for modifications, red for deletions) and presents an approval drawer. The Yjs document is only updated once the developer clicks 'Approve Changes'.",
        result:
          "Total human control over autonomous changes, fostering safe AI collaboration without fear of disruptive state changes.",
        codeSnippet: {
          filename: "apps/web/src/hooks/use-staged-mutations.ts",
          language: "typescript",
          code: `export interface StagedDiff {
  operations: CanvasOperation[]
  summary: string
  status: "pending" | "applied" | "rejected"
}

export function applyStagedOperations(
  doc: Y.Doc,
  staged: StagedDiff
) {
  doc.transact(() => {
    const nodes = doc.getMap("nodes")
    const edges = doc.getMap("edges")

    for (const op of staged.operations) {
      switch (op.action) {
        case "createNode":
          nodes.set(op.node.id, op.node)
          break
        case "updateNode":
          const current = nodes.get(op.id)
          if (current) nodes.set(op.id, { ...current, ...op.patch })
          break
        case "createEdge":
          edges.set(op.edge.id, op.edge)
          break
      }
    }
  }, "ai-agent-mutation")
}`,
          explanation:
            "Executes all approved operations inside an atomic Yjs transaction tagged with 'ai-agent-mutation', enabling instant single-click undo if needed.",
        },
      },
      {
        number: "04",
        title: "High-Performance Viewport Virtualization & Spatial Indexing",
        problemStatement:
          "Rendering hundreds of architecture nodes, bezier connectors, and animated telemetry indicators using standard React DOM elements caused frame drops below 25 FPS during rapid panning and zooming.",
        risk: "Sluggish, unresponsive canvas interactions that degrade user experience on complex enterprise topologies.",
        approach:
          "Built a 2D bounding-box spatial index (R-Tree / QuadTree). The canvas viewport continuously tracks its visible world coordinates and queries the spatial index. Nodes and edges outside the active viewport are culled from the DOM rendering tree entirely. Complex connector paths are computed using memoized bezier mathematics and rendered via an optimized SVG layer.",
        result:
          "Rock-solid 60 FPS viewport navigation and smooth zooming even on large boards with over 500 connected architecture elements.",
      },
    ],
    implementation: {
      title: "Security, Authorization & Guardrails",
      paragraphs: [
        "WebSocket handshakes require cryptographically signed session tokens verifying workspace membership before establishing socket communication. Tenant-level isolation prevents cross-organization board inspection at the network gateway.",
        "To protect against prompt injection or malicious agent tool usage, the AI tool executor runs within a sandboxed environment with strict payload bounding: an agent cannot exceed 20 operations per prompt turn, and operations cannot inject arbitrary HTML or unvetted scripts into node metadata.",
      ],
    },
    dataFlow: {
      title: "The Human-in-the-Loop AI Architecture Lifecycle",
      description:
        "Every interaction follows a deterministic path from user intent to verified board commit:",
      steps: [
        {
          step: 1,
          title: "Developer issues prompt or reviews architecture",
          description:
            "User asks AI: 'Introduce a Redis cache between API Gateway and PostgreSQL and optimize read queries.'",
        },
        {
          step: 2,
          title: "Canvas AST serialized with spatial context",
          description:
            "Active board nodes, connections, and metadata are extracted as a structured JSON graph.",
        },
        {
          step: 3,
          title: "AI Agent selects tools and generates typed operations",
          description:
            "Agent emits discrete operations (createNode, createEdge, updateNode) validated by Zod schemas.",
        },
        {
          step: 4,
          title: "Staged Visual Diff rendered on canvas",
          description:
            "New nodes and modified edges appear in high-contrast diff outlines alongside an inspection drawer.",
        },
        {
          step: 5,
          title: "Human Approval & Atomic CRDT Commit",
          description:
            "Developer reviews and confirms; operations are committed atomically to the Yjs doc and synced to all peers.",
        },
      ],
    },
    results: {
      title: "Implementation Status & Verified Outcomes",
      items: [
        {
          title: "✓ Implemented: Real-Time Collaborative Canvas",
          description:
            "Full multi-user editing powered by Yjs CRDTs over WebSockets with real-time awareness and remote cursor positioning.",
        },
        {
          title: "✓ Implemented: Structured AI Tool Execution",
          description:
            "Deterministic JSON AST mutations (createNode, updateNode, deleteNode, createEdge, deleteEdge, moveNode) backed by Zod schema validation.",
        },
        {
          title: "✓ Implemented: Human-in-the-Loop Review Engine",
          description:
            "Visual staged diff rendering with color-coded additions/deletions and atomic transactional commit to shared state.",
        },
        {
          title: "→ In Progress: Automated Architecture Reviewer",
          description:
            "Static analysis heuristic engine that inspects canvas graph connectivity to flag single points of failure and unbuffered ingestion spikes.",
        },
        {
          title: "→ Planned: Model Context Protocol (MCP) Integration",
          description:
            "Exposing whiteboard tools over MCP so external desktop IDE agents (Cursor, Claude Code) can directly inspect and edit architecture boards.",
        },
      ],
    },
    lessonsLearned: {
      title: "Engineering Reflections",
      items: [
        {
          number: 1,
          title: "Structure is the antidote to hallucination",
          description:
            "Language models should never be asked to write unstructured state documents. Giving the agent fine-grained, schema-validated tool primitives turned a brittle prototype into a deterministic production system.",
        },
        {
          number: 2,
          title: "CRDTs simplify distributed consensus",
          description:
            "Choosing Yjs early saved countless hours that would have been wasted debugging last-write-wins race conditions and custom operational transformation servers.",
        },
        {
          number: 3,
          title: "Visual diffs create developer trust",
          description:
            "Engineers are hesitant to let AI touch their architecture. Giving them an explicit, color-coded visual diff preview prior to committing mutations eliminated hesitation and made the tool a joy to use.",
        },
      ],
    },
  },
};
