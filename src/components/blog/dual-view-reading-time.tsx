"use client"

import { useSearchParams } from "next/navigation"
import { parseViewMode } from "./view-mode-selector"
import type { ReadingTime } from "@/lib/blog/types"

interface DualViewReadingTimeProps {
  userReadingTime: ReadingTime
  developerReadingTime: ReadingTime | null
}

export function DualViewReadingTime({
  userReadingTime,
  developerReadingTime,
}: DualViewReadingTimeProps) {
  const searchParams = useSearchParams()
  const activeView = parseViewMode(searchParams.get("view"))

  if (activeView === "developer" && !developerReadingTime) {
    return null
  }

  const readingTime =
    activeView === "developer" && developerReadingTime
      ? developerReadingTime
      : userReadingTime

  return <span>{readingTime.minutes} min read</span>
}
