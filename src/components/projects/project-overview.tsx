import type { Project } from "@/lib/projects/types"

interface ProjectOverviewProps {
  project: Project
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const hasMultipleParagraphs =
    project.longDescription && project.longDescription.length > 1

  return (
    <section className="space-y-3 pt-2">
      <h2 className="text-xl font-sans font-semibold text-foreground">
        What is {project.name}?
      </h2>
      <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
        {hasMultipleParagraphs ? (
          project.longDescription
            ?.slice(1)
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)
        ) : (
          <p>{project.description}</p>
        )}
      </div>
    </section>
  )
}
