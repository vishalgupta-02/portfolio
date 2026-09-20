export interface TechStackItem {
  name: string
  iconKey?: string
}

export interface WorkExperience {
  id: string
  company: string
  companyUrl?: string
  role: string
  period: string
  startDate: string
  endDate: string
  type: "Full-time" | "Internship" | "Contract" | "Part-time"
  location: string
  locationType: "On-site" | "Remote" | "Hybrid"
  summary: string
  highlights: string[]
  impactMetrics: string[]
  technologies: TechStackItem[]
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: "reospark",
    company: "Reospark Technologies Pvt. Ltd.",
    role: "Software Engineer",
    period: "July 2025 — August 2026",
    startDate: "2025-07",
    endDate: "2026-08",
    type: "Full-time",
    location: "Noida, India",
    locationType: "On-site",
    summary:
      "Engineered centralized operational dashboards and scalable multi-client backend infrastructure powering production client workloads.",
    highlights: [
      "Architected and deployed responsive admin dashboards using Django, Django REST Framework (DRF), and Next.js for unified operations and real-time KPI tracking.",
      "Designed and optimized relational MySQL database schemas with strict multi-client tenant data isolation and index tuning for production query throughput.",
      "Spearheaded 3 enterprise client engagements end-to-end across Python/Django and Next.js, steering systems from architectural requirements through production delivery and iterative optimization.",
      "Implemented modular REST APIs with robust token authentication, pagination, and audit logging to maintain high platform security and reliability.",
    ],
    impactMetrics: [
      "3 Client Deliveries",
      "Multi-Tenant Isolation",
      "Production KPI Dashboards",
    ],
    technologies: [
      { name: "Next.js", iconKey: "NextJS" },
      { name: "Python", iconKey: "Python" },
      { name: "JavaScript", iconKey: "JavaScript" },
      { name: "Git", iconKey: "Git" },
      { name: "GitHub", iconKey: "Github" },
      { name: "Django" },
      { name: "MySQL" },
      { name: "REST APIs" },
    ],
  },
  {
    id: "vomyra-ai",
    company: "Vomyra AI",
    role: "Software Engineer Intern",
    period: "January 2025 — June 2025",
    startDate: "2025-01",
    endDate: "2025-06",
    type: "Internship",
    location: "Noida, India",
    locationType: "On-site",
    summary:
      "Developed high-throughput, low-latency conversational voice AI pipelines and optimized customer-facing web performance.",
    highlights: [
      "Built and optimized real-time voice AI agents leveraging Node.js, WebSockets, and FFmpeg for low-latency bidirectional audio streaming and live transcription.",
      "Integrated third-party voice APIs and reduced streaming pipeline latency through concurrent audio buffer processing and socket heartbeat tuning.",
      "Engineered SEO-optimized, highly responsive frontend interfaces with Next.js and TypeScript, significantly improving discoverability and user conversion.",
      "Collaborated closely across engineering, AI research, and product teams in high-velocity agile sprints to prototype and deploy core voice features.",
    ],
    impactMetrics: [
      "Real-Time Voice AI",
      "Low-Latency Streaming",
      "SEO & Core Web Vitals",
    ],
    technologies: [
      { name: "TypeScript", iconKey: "TypeScript" },
      { name: "Next.js", iconKey: "NextJS" },
      { name: "Node.js", iconKey: "NodeJS" },
      { name: "Git", iconKey: "Git" },
      { name: "GitHub", iconKey: "Github" },
      { name: "WebSockets" },
      { name: "FFmpeg" },
    ],
  },
]
