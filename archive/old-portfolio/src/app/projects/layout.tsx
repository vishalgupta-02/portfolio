import type { Metadata } from "next"
import { ReactNode } from "react"
import { DATA } from "@/data/resume"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description:
    "Explore my portfolio of projects showcasing my expertise in full-stack development, web applications, and software engineering.",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "full-stack",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "software development",
    "software engineer",
  ],
  openGraph: {
    title: "Projects | Vishal Gupta",
    description:
      "Explore my portfolio of projects showcasing my expertise in full-stack development, web applications, and software engineering.",
    type: "website",
    url: `${DATA.url}/projects`,
    images: [
      {
        url: `${DATA.url}/og-projects.jpg`,
        width: 1200,
        height: 630,
        alt: "Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Vishal Gupta",
    description:
      "Explore my portfolio of projects showcasing my expertise in full-stack development, web applications, and software engineering.",
    images: [`${DATA.url}/og-projects.jpg`],
  },
  alternates: {
    canonical: `${DATA.url}/projects`,
  },
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <section className='flex flex-col gap-8'>{children}</section>
}
