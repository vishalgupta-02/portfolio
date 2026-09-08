import type { CaseStudyLesson } from "@/lib/projects/types"

interface CaseStudyLessonsProps {
  lessonsLearned?: {
    title?: string
    items: CaseStudyLesson[]
  }
  stepNumber?: string
}

export default function CaseStudyLessons({
  lessonsLearned,
  stepNumber = "10",
}: CaseStudyLessonsProps) {
  if (!lessonsLearned || !lessonsLearned.items || lessonsLearned.items.length === 0) {
    return null
  }

  return (
    <section id="lessons" className="space-y-3 pt-4 border-t border-border/20">
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>LESSONS LEARNED</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {lessonsLearned.title || "Engineering Reflections"}
      </h2>
      <div className="space-y-3 font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
        {lessonsLearned.items.map((lesson) => (
          <p key={lesson.number}>
            <strong className="text-foreground font-medium">
              {lesson.number}. {lesson.title}:
            </strong>{" "}
            {lesson.description}
          </p>
        ))}
      </div>
    </section>
  )
}
