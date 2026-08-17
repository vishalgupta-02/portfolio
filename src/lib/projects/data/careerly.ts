import type { Project } from "../types"

export const careerlyProject: Project = {
  id: "careerly",
  slug: "careerly",
  number: "03",
  name: "Careerly",
  title: "Careerly — Full-Stack AI Career Coach & Interview Prep",
  subtitle: "Full-stack AI career coach & interview prep",
  description:
    "Job hunting is stressful. Most people don't fail interviews because they're unqualified — they fail because they weren't prepared the right way.",
  longDescription: [
    "Careerly is an end-to-end career acceleration and interactive interview preparation platform.",
    "Engineered with dynamic MCQ testing, personalized feedback loops, and resume analysis tooling to help developers ace technical interviews.",
  ],
  status: "Live Demo",
  role: "Full-Stack Engineer",
  timeline: "November 2025 – December 2025",
  tags: ["MCQ Testing Live", "Full-Stack AI", "PostgreSQL", "Next.js"],
  featured: true,
  image: "/static/careerly.webp",
  imageAlt: "Careerly AI career coach platform screenshot",
  floatingChips: [
    { text: "MCQ Testing", position: "top-left" },
    { text: "Resume Tooling", position: "bottom-right" },
  ],
  liveUrl: "https://careerly-nu.vercel.app",
  githubUrl: "https://github.com/vishalgupta-02/Careerly.git",
  hasCaseStudy: false,
  ctaText: "View Project",
  highlights: [
    {
      title: "Dynamic MCQ Assessment Engine",
      subtitle: "Adaptive difficulty scaling",
      description:
        "Generates targeted multiple-choice question sets customized to specific engineering domains and difficulty levels.",
      iconType: "shield",
    },
    {
      title: "Automated Resume Parsing",
      subtitle: "Structured ATS compliance scoring",
      description:
        "Analyzes resume structure and keyword density against target job descriptions to highlight actionable improvement areas.",
      iconType: "fileText",
    },
  ],
  techStack: [
    {
      category: "Frontend & Full-Stack",
      items: [
        { name: "Next.js", description: "App Router" },
        { name: "React", description: "UI Components" },
        { name: "TypeScript", description: "Strict Typing" },
      ],
    },
    {
      category: "Database & Backend",
      items: [
        { name: "PostgreSQL", description: "Relational Storage" },
        { name: "Prisma", description: "Database ORM" },
      ],
    },
  ],
}
