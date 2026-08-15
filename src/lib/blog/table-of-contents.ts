import { createHeadingId } from "./heading"

import type { TableOfContentsItem } from "./types"

function removeCodeBlocks(content: string): string {
  return content.replace(/```[\s\S]*?```/g, "")
}

function cleanHeadingTitle(title: string): string {
  return title.replace(/[*_~`]/g, "").trim()
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = []

  const cleanedContent = removeCodeBlocks(content)

  const headingRegex = /^(##|###)\s+(.+)$/gm

  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(cleanedContent)) !== null) {
    const hashes = match[1]
    const rawTitle = match[2]

    if (!hashes || !rawTitle) {
      continue
    }

    const title = cleanHeadingTitle(rawTitle)

    const level = hashes.length as 2 | 3

    headings.push({
      id: createHeadingId(title),
      title,
      level,
    })
  }

  return headings
}
