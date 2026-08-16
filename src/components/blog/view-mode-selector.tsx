"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useId } from "react"
import { User, Code2 } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export type ViewMode = "user" | "developer"

interface ViewModeSelectorProps {
  contentPanelId: string
}

function parseViewMode(value: string | null): ViewMode {
  if (value === "developer") return "developer"
  return "user"
}

export function ViewModeSelector({ contentPanelId }: ViewModeSelectorProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const id = useId()

  const activeView = parseViewMode(searchParams.get("view"))

  const handleSelect = useCallback(
    (view: ViewMode) => {
      if (view === activeView) return

      const params = new URLSearchParams(searchParams.toString())

      if (view === "user") {
        params.delete("view")
      } else {
        params.set("view", view)
      }

      const search = params.toString()
      const url = search ? `${pathname}?${search}` : pathname

      router.replace(url, { scroll: false })
    },
    [activeView, searchParams, router, pathname],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault()
        const nextView = activeView === "user" ? "developer" : "user"
        handleSelect(nextView)
      }
    },
    [activeView, handleSelect],
  )

  const tabs = [
    {
      value: "user" as const,
      label: "User View",
      icon: User,
    },
    {
      value: "developer" as const,
      label: "Developer View",
      icon: Code2,
    },
  ]

  return (
    <div className="my-8">
      <div
        role="tablist"
        aria-label="Article view mode"
        onKeyDown={handleKeyDown}
        className={cn(
          "relative inline-flex w-full rounded-lg border p-1",
          "bg-background",
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeView === tab.value
          const tabId = `${id}-tab-${tab.value}`
          const Icon = tab.icon

          return (
            <button
              key={tab.value}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={contentPanelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(tab.value)}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-2",
                "rounded-md px-3 py-2 text-sm font-medium",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.span
                  layoutId="view-mode-indicator"
                  className={cn(
                    "absolute inset-0 rounded-md",
                    "bg-muted/50 dark:bg-muted/20",
                    "border",
                  )}
                  transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.4,
                  }}
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Choose how you want to explore this article.
      </p>
    </div>
  )
}

export { parseViewMode }
