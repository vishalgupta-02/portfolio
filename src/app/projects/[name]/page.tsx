import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import LinkforgeProjectPageView from "@/components/projects/linkforge/project-page-view"
import { LINKFORGE_METADATA } from "@/lib/projects/linkforge-data"

interface ProjectPageProps {
  params: Promise<{
    name: string
  }>
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { name } = await params
  if (name.toLowerCase() === "linkforge") {
    return {
      title: LINKFORGE_METADATA.title,
      description: LINKFORGE_METADATA.description,
    }
  }
  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} | Projects`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { name } = await params
  const normalized = name.toLowerCase()

  if (normalized === "linkforge") {
    return <LinkforgeProjectPageView />
  }

  // Redirect other project slugs to the homepage projects section
  redirect("/#projects")
}
