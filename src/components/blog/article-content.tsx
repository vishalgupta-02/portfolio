"use client"

import { useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import { parseViewMode } from "./view-mode-selector"

interface ArticleContentProps {
  panelId: string
  userContent: ReactNode
  developerContent: ReactNode
}

export function ArticleContent({
  panelId,
  userContent,
  developerContent,
}: ArticleContentProps) {
  const searchParams = useSearchParams()
  const activeView = parseViewMode(searchParams.get("view"))

  return (
    <div
      id={panelId}
      role="tabpanel"
      className="prose prose-neutral max-w-3xl dark:prose-invert prose-pre:bg-transparent prose-pre:p-0"
    >
      <div
        data-view="user"
        style={{ display: activeView === "user" ? "block" : "none" }}
      >
        {userContent}
      </div>
      <div
        data-view="developer"
        style={{ display: activeView === "developer" ? "block" : "none" }}
      >
        {developerContent}
      </div>
    </div>
  )
}
