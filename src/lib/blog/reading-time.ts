import type { ReadingTime } from "./types"

const WORDS_PER_MINUTE = 225

function cleanContent(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim()
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
