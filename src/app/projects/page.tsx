import BlurFade from '@/components/magicui/blur-fade'
import React from 'react'
import type { Metadata } from 'next'
import { DATA } from '@/data/resume'

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description:
    'Explore my portfolio of projects showcasing my expertise in full-stack development, web applications, and software engineering.',
  keywords: [
    'projects',
    'portfolio',
    'web development',
    'full-stack',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'software development',
    'software engineer',
  ],
  openGraph: {
    title: 'Projects | Vishal Gupta',
    description:
      'Explore my portfolio of projects showcasing my expertise in full-stack development, web applications, and software engineering.',
    type: 'website',
    url: `${DATA.url}/projects`,
    images: [
      {
        url: `${DATA.url}/og-projects.jpg`,
        width: 1200,
        height: 630,
        alt: 'Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Vishal Gupta',
    description:
      'Explore my portfolio of projects showcasing my expertise in full-stack development, web applications, and software engineering.',
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
          <span className='ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm'>
            4 projects
          </span>
        </h1>
        <p className='text-sm text-muted-foreground mb-8'>
          Something will be added here soon.
        </p>
      </BlurFade>
    </div>
  )
}

export default AllProjects
