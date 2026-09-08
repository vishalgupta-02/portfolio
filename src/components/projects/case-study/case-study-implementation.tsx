interface CaseStudyImplementationProps {
  implementation?: {
    title?: string
    paragraphs: string[]
  }
  stepNumber?: string
}

export default function CaseStudyImplementation({
  implementation,
  stepNumber = "06",
}: CaseStudyImplementationProps) {
  if (!implementation || !implementation.paragraphs || implementation.paragraphs.length === 0) {
    return null
  }

  return (
    <section
      id="implementation"
      className="space-y-3 pt-4 border-t border-border/20"
    >
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>CODE PRIMITIVES & SECURITY</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {implementation.title || "Security & Authentication Primitives"}
      </h2>
      <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
        {implementation.paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </section>
  )
}
