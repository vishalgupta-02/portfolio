import type { Metadata } from "next"
import LinkforgeProjectPageView from "@/components/projects/linkforge/project-page-view"
import { LINKFORGE_METADATA } from "@/lib/projects/linkforge-data"

export const metadata: Metadata = {
  title: LINKFORGE_METADATA.title,
  description: LINKFORGE_METADATA.description,
  openGraph: {
    title: LINKFORGE_METADATA.title,
    description: LINKFORGE_METADATA.description,
    images: [{ url: LINKFORGE_METADATA.image }],
  },
}

export default function LinkforgePage() {
  return <LinkforgeProjectPageView />
}
