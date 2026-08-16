"use client"

import { useSearchParams } from "next/navigation"
import { parseViewMode } from "./view-mode-selector"
import type { ReadingTime } from "@/lib/blog/types"

interface DualViewReadingTimeProps {
  userReadingTime: ReadingTime
  developerReadingTime: ReadingTime
}

export function DualViewReadingTime({
  userReadingTime,
  developerReadingTime,
}: DualViewReadingTimeProps) {
  const searchParams = useSearchParams()
  const activeView = parseViewMode(searchParams.get("view"))

  const readingTime =
    activeView === "developer" ? developerReadingTime : userReadingTime

  return <span>{readingTime.minutes} min read</span>
}
