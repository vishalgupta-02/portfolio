import type { Metadata } from "next"
import LinkforgeCaseStudyView from "@/components/projects/linkforge/case-study-view"
import { LINKFORGE_METADATA } from "@/lib/projects/linkforge-data"

export const metadata: Metadata = {
  title: LINKFORGE_METADATA.caseStudyTitle,
  description: LINKFORGE_METADATA.caseStudyDescription,
  openGraph: {
    title: LINKFORGE_METADATA.caseStudyTitle,
    description: LINKFORGE_METADATA.caseStudyDescription,
    images: [{ url: LINKFORGE_METADATA.image }],
  },
}

export default function LinkforgeCaseStudyPage() {
  return <LinkforgeCaseStudyView />
}
