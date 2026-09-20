"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import type {
  Postmortem,
  PostmortemCategory,
  PostmortemSeverity,
  PostmortemStatus,
} from "@/lib/postmortems/types"
import { PostmortemCard } from "./postmortem-card"
import { Search, X, SlidersHorizontal, ChevronDown, RotateCcw, Tag, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const [isFilterOpen, setIsFilterOpen] = useState(false)
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
      if (
        selectedCategory !== "all" &&
        pm.metadata.category !== selectedCategory
      ) {
        return false
      }

      if (
        selectedSeverity !== "all" &&
        pm.metadata.severity !== selectedSeverity
      ) {
        return false
      }

      if (selectedStatus !== "all" && pm.metadata.status !== selectedStatus) {
        return false
      }

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

  const activeDropdownFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedSeverity !== "all" ? 1 : 0) +
    (selectedStatus !== "all" ? 1 : 0)

  const hasActiveFilters =
    searchQuery !== "" || activeDropdownFilterCount > 0

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedSeverity("all")
    setSelectedStatus("all")
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/40 p-3 sm:p-4 backdrop-blur-xs space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search incidents by keyword, system, tag, root cause..."
              aria-label="Search incidents"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            aria-expanded={isFilterOpen}
            aria-controls="postmortem-filters-tray"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all cursor-pointer shrink-0 select-none",
              isFilterOpen
                ? "border-foreground/30 bg-muted text-foreground shadow-xs"
                : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-muted/40",
            )}
          >
            <SlidersHorizontal className="size-3.5" aria-hidden="true" />
            <span>Filters</span>
            {activeDropdownFilterCount > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] font-mono font-bold text-background">
                {activeDropdownFilterCount}
              </span>
            )}
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-200 text-muted-foreground",
                isFilterOpen && "rotate-180 text-foreground",
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[11px] font-mono text-muted-foreground mr-1">Active:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-foreground">
                <Search className="size-2.5 text-muted-foreground" />
                <span className="truncate max-w-[120px]">&ldquo;{searchQuery}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Remove search filter"
                >
                  <X className="size-2.5" />
                </button>
              </span>
            )}

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-foreground">
                <Tag className="size-2.5 text-muted-foreground" />
                <span className="capitalize">{selectedCategory}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Remove category filter"
                >
                  <X className="size-2.5" />
                </button>
              </span>
            )}

            {selectedSeverity !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-foreground">
                <AlertCircle className="size-2.5 text-rose-500" />
                <span className="capitalize">{selectedSeverity}</span>
                <button
                  type="button"
                  onClick={() => setSelectedSeverity("all")}
                  className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Remove severity filter"
                >
                  <X className="size-2.5" />
                </button>
              </span>
            )}

            {selectedStatus !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-foreground">
                <CheckCircle2 className="size-2.5 text-emerald-500" />
                <span className="capitalize">{selectedStatus}</span>
                <button
                  type="button"
                  onClick={() => setSelectedStatus("all")}
                  className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Remove status filter"
                >
                  <X className="size-2.5" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:underline cursor-pointer transition-colors ml-auto"
            >
              <RotateCcw className="size-2.5" />
              Reset all
            </button>
          </div>
        )}

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              id="postmortem-filters-tray"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-border/50 pt-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Domain Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value as PostmortemCategory | "all",
                      )
                    }
                    aria-label="Filter by category"
                    className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Incident Severity
                  </label>
                  <select
                    value={selectedSeverity}
                    onChange={(e) =>
                      setSelectedSeverity(
                        e.target.value as PostmortemSeverity | "all",
                      )
                    }
                    aria-label="Filter by severity"
                    className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    {SEVERITIES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Lifecycle Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value as PostmortemStatus | "all",
                      )
                    }
                    aria-label="Filter by status"
                    className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                  >
                    {STATUSES.map((st) => (
                      <option key={st.value} value={st.value}>
                        {st.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
        <span>
          Showing {filteredPostmortems.length} of {postmortems.length}{" "}
          {postmortems.length === 1 ? "incident report" : "incident reports"}
        </span>
      </div>

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
            type="button"
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3" />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
