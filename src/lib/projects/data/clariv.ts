import type { Project } from "../types"

export const clarivProject: Project = {
  id: "clariv",
  slug: "clariv",
  number: "02",
  name: "Clariv",
  title: "Clariv — Document Context Extractor & AI Reader",
  subtitle: "Document context extractor & AI reader",
  description:
    "Ever uploaded a 40-page PDF and wished something would just... read it for you? That's Clariv.",
  longDescription: [
    "Clariv is a smart AI-powered document intelligence tool designed to parse, analyze, and synthesize large unstructured documents quickly.",
    "Built using Google GenAI and high-performance parsing pipelines, it converts dense PDF documents into structured insights and conversational query interfaces.",
  ],
  status: "MVP Complete",
  role: "Full-Stack Engineer",
  timeline: "January 2026 – February 2026",
  tags: ["AI Document Extraction", "Google GenAI", "MongoDB", "Next.js"],
  featured: true,
  image: "/static/clariv.webp",
  imageAlt: "Clariv AI document extractor screenshot",
  floatingChips: [
    { text: "Smart Extraction", position: "top-left" },
    { text: "Google GenAI", position: "bottom-right" },
  ],
  liveUrl: "https://clariv.vercel.app",
  githubUrl: "https://github.com/vishalgupta-02/Clariv.git",
  hasCaseStudy: false,
  ctaText: "View Project",
  highlights: [
    {
      title: "Context-Aware Document Parsing",
      subtitle: "High-density token chunking",
      description:
        "Extracts structured tables, headers, and semantic sections from complex PDF layouts before passing context to LLM embedding pipelines.",
      iconType: "sparkles",
    },
    {
      title: "Google GenAI Integration",
      subtitle: "Low-latency streaming responses",
      description:
        "Utilizes Gemini 1.5 Flash models to generate fast, accurate citations and contextual answers against uploaded source texts.",
      iconType: "zap",
    },
  ],
  techStack: [
    {
      category: "Frontend & Full-Stack",
      items: [
        { name: "Next.js", description: "React Framework" },
        { name: "TypeScript", description: "Type Safety" },
        { name: "Tailwind CSS", description: "UI Styling" },
      ],
    },
    {
      category: "AI & Backend",
      items: [
        { name: "Google GenAI SDK", description: "LLM Orchestration" },
        { name: "MongoDB", description: "Document Store" },
      ],
    },
  ],
}
