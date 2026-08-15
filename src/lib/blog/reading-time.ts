import type { ReadingTime } from "./types"

const WORDS_PER_MINUTE = 225

function cleanContent(content: string): string {
  return (
    content
      // Remove fenced code blocks
      .replace(/```[\s\S]*?```/g, "")

      // Remove inline code markers but keep text
      .replace(/`([^`]+)`/g, "$1")

      // Remove MDX/HTML tags
      .replace(/<[^>]+>/g, "")

      // Remove Markdown images
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "")

      // Keep link text, remove URL
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // Remove Markdown heading markers
      .replace(/^#{1,6}\s+/gm, "")

      // Normalize whitespace
      .replace(/\s+/g, " ")
      .trim()
  )
}

export function calculateReadingTime(content: string): ReadingTime {
  const cleanedContent = cleanContent(content)

  if (!cleanedContent) {
    return {
      minutes: 1,
      words: 0,
    }
  }

  const words = cleanedContent.split(/\s+/).length

  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

  return {
    minutes,
    words,
  }
}
