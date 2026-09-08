"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { useCallback } from "react"
import { parseViewMode } from "./view-mode-selector"
import { DeveloperContentUnavailable } from "./developer-content-unavailable"

interface ArticleContentProps {
  panelId: string
  userContent: ReactNode
  developerContent: ReactNode | null
}

export function ArticleContent({
  panelId,
  userContent,
  developerContent,
}: ArticleContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const activeView = parseViewMode(searchParams.get("view"))

  const handleSwitchToUserView = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("view")
    const search = params.toString()
    const url = search ? `${pathname}?${search}` : pathname
    router.replace(url, { scroll: false })
  }, [searchParams, router, pathname])

  return (
    <div
      id={panelId}
      role="tabpanel"
      className="prose prose-neutral max-w-3xl dark:prose-invert prose-pre:bg-transparent prose-pre:p-0"
    >
      <div
        data-view="user"
        data-testid="user-content"
        style={{ display: activeView === "user" ? "block" : "none" }}
      >
        {userContent}
      </div>
      <div
        data-view="developer"
        data-testid="developer-content"
        style={{ display: activeView === "developer" ? "block" : "none" }}
      >
        {developerContent ?? (
          <DeveloperContentUnavailable
            onSwitchToUserView={handleSwitchToUserView}
          />
        )}
      </div>
    </div>
  )
}

