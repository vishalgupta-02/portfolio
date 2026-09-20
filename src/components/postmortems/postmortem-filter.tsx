"use client"

import React, { useState, useMemo } from "react"
import type {
  Postmortem,
  PostmortemCategory,
  PostmortemSeverity,
  PostmortemStatus,
} from "@/lib/postmortems/types"
import { PostmortemCard } from "./postmortem-card"
import { Search, X, SlidersHorizontal } from "lucide-react"

interface PostmortemFilterProps {
  postmortems: Postmortem[]
}

const CATEGORIES: { label: string; value: PostmortemCategory | "all" }[] = [
  { label: "All Categories", value: "all" },
  { label: "Authentication", value: "authentication" },
  { label: "Database", value: "database" },
  { label: "Infrastructure", value: "infrastructure" },
  { label: "Performance", value: "performance" },
  { label: "Security", value: "security" },
  { label: "Deployment", value: "deployment" },
  { label: "API", value: "api" },
  { label: "Observability", value: "observability" },
]

const SEVERITIES: { label: string; value: PostmortemSeverity | "all" }[] = [
  { label: "All Severities", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
]

const STATUSES: { label: string; value: PostmortemStatus | "all" }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Resolved", value: "resolved" },
  { label: "Monitoring", value: "monitoring" },
  { label: "Investigating", value: "open" },
]

export function PostmortemFilter({ postmortems }: PostmortemFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<
    PostmortemCategory | "all"
  >("all")
  const [selectedSeverity, setSelectedSeverity] = useState<
    PostmortemSeverity | "all"
  >("all")
  const [selectedStatus, setSelectedStatus] = useState<
    PostmortemStatus | "all"
  >("all")

  const filteredPostmortems = useMemo(() => {
    return postmortems.filter((pm) => {
      // Category filter
      if (
        selectedCategory !== "all" &&
        pm.metadata.category !== selectedCategory
      ) {
        return false
      }

      // Severity filter
      if (
        selectedSeverity !== "all" &&
        pm.metadata.severity !== selectedSeverity
      ) {
        return false
      }

      // Status filter
      if (selectedStatus !== "all" && pm.metadata.status !== selectedStatus) {
        return false
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchTitle = pm.metadata.title.toLowerCase().includes(query)
        const matchDesc = pm.metadata.description.toLowerCase().includes(query)
        const matchImpact = (pm.metadata.impact || "")
          .toLowerCase()
          .includes(query)
        const matchRoot = (pm.metadata.rootCause || "")
          .toLowerCase()
          .includes(query)
        const matchTags = pm.metadata.tags.some((t) =>
          t.toLowerCase().includes(query),
        )
        const matchSystems = (pm.metadata.systemsAffected || []).some((s) =>
          s.toLowerCase().includes(query),
        )

        return (
          matchTitle ||
          matchDesc ||
          matchImpact ||
          matchRoot ||
          matchTags ||
          matchSystems
        )
      }

      return true
    })
  }, [
    postmortems,
    searchQuery,
    selectedCategory,
    selectedSeverity,
    selectedStatus,
  ])

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedSeverity !== "all" ||
    selectedStatus !== "all"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedSeverity("all")
    setSelectedStatus("all")
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="space-y-3 rounded-xl border border-border bg-card/40 p-4 sm:p-5 backdrop-blur-xs">
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incidents by keyword, system, tag, root cause..."
            aria-label="Search incidents"
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-10 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px] mr-1">
            <SlidersHorizontal className="size-3" aria-hidden="true" />
            Filter:
          </div>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as PostmortemCategory | "all")
            }
            aria-label="Filter by category"
            className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Severity Select */}
          <select
            value={selectedSeverity}
            onChange={(e) =>
              setSelectedSeverity(e.target.value as PostmortemSeverity | "all")
            }
            aria-label="Filter by severity"
            className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {SEVERITIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as PostmortemStatus | "all")
            }
            aria-label="Filter by status"
            className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {STATUSES.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              <X className="size-3" aria-hidden="true" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results stats */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
        <span>
          Showing {filteredPostmortems.length} of {postmortems.length}{" "}
          {postmortems.length === 1 ? "incident report" : "incident reports"}
        </span>
      </div>

      {/* Postmortems List */}
      {filteredPostmortems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredPostmortems.map((postmortem) => (
            <PostmortemCard key={postmortem.slug} postmortem={postmortem} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="font-mono text-sm font-semibold text-foreground">
            No incident reports found
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search terms or resetting the active filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 inline-flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
