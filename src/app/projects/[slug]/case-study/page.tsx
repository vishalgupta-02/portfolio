import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CaseStudyView from "@/components/projects/case-study-view"
import { getCaseStudyProjects, getProjectBySlug } from "@/lib/projects"

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const caseStudyProjects = getCaseStudyProjects()
  return caseStudyProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project || !project.caseStudy) {
    return {
      title: "Case Study Not Found",
    }
  }

  return {
    title: project.caseStudy.title,
    description: project.caseStudy.description,
    openGraph: {
      title: project.caseStudy.title,
      description: project.caseStudy.description,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.caseStudy.title,
      description: project.caseStudy.description,
      images: [project.image],
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project || !project.caseStudy) {
    notFound()
  }

  return <CaseStudyView project={project} />
}
