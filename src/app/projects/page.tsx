import BlurFade from "@/components/magicui/blur-fade"
import React from "react"
import type { Metadata } from "next"
import { DATA } from "@/data/resume"
import { ProjectCard } from "@/components/project-card"

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

const BLUR_FADE_DELAY = 0.04

const AllProjects = () => {
  return (
    <div>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className='text-2xl font-semibold tracking-tight mb-2'>
          Projects
          <span className='ml-2 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm'>
            {DATA.projects.length} projects
          </span>
        </h1>
        <p className='text-sm text-muted-foreground mb-8'>
          Learning by doing is my approach, and each project here reflects a
          unique lesson learned and a new skill mastered.
        </p>
      </BlurFade>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-200 mx-auto auto-rows-fr'>
        {DATA.projects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            className='h-full'>
            <ProjectCard
              href={project.href}
              key={project.title}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default AllProjects
