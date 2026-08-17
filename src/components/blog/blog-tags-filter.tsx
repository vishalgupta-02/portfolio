"use client"

import { useMemo, useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Search,
  X,
  ArrowDownWideNarrow,
  ArrowDownAZ,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import type { BlogTag } from "@/lib/blog/types"
import { cn } from "@/lib/utils"

interface BlogTagsFilterProps {
  tags: BlogTag[]
  selectedTag: string | null
  onSelectTag: (slug: string | null) => void
  onClearAll?: () => void
  hasFilters?: boolean
}

const TOP_TAGS_COUNT = 3

type SortMode = "popular" | "alphabetical"

export function BlogTagsFilter({
  tags,
  selectedTag,
  onSelectTag,
  onClearAll,
  hasFilters,
}: BlogTagsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [tagSearchQuery, setTagSearchQuery] = useState("")
  const [sortMode, setSortMode] = useState<SortMode>("popular")

  // Sorted by popularity (post count descending)
  const popularTags = useMemo(() => {
    return [...tags].sort(
      (a, b) => b.count - a.count || a.name.localeCompare(b.name),
    )
  }, [tags])

  // Primary top tags shown in compact view
  const topTags = useMemo(() => {
    return popularTags.slice(0, TOP_TAGS_COUNT)
  }, [popularTags])

  // If selected tag is not among the topTags, find it so we can show it in the quick bar
  const activeExtraTag = useMemo(() => {
    if (!selectedTag) return null
    const isAlreadyInTop = topTags.some((t) => t.slug === selectedTag)
    if (isAlreadyInTop) return null
    return tags.find((t) => t.slug === selectedTag) ?? null
  }, [selectedTag, topTags, tags])

  // Filtered and sorted tags for expanded tray
  const displayedExpandedTags = useMemo(() => {
    let result = [...tags]

    if (tagSearchQuery.trim()) {
      const q = tagSearchQuery.trim().toLowerCase()
      result = result.filter((t) => t.name.toLowerCase().includes(q))
    }

    if (sortMode === "popular") {
      result.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [tags, tagSearchQuery, sortMode])

  const remainingCount = Math.max(0, tags.length - TOP_TAGS_COUNT)

  return (
    <div className='space-y-3'>
      {/* Quick Tag Bar */}
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-1.5'>
          {/* All Button */}
          <button
            type='button'
            onClick={() => onSelectTag(null)}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all",
              selectedTag === null
                ? "bg-foreground text-background shadow-xs"
                : "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-muted/40",
            )}>
            All
          </button>

          {/* Top Most Popular Tags */}
          {topTags.map((tag) => {
            const isSelected = selectedTag === tag.slug
            return (
              <button
                key={tag.slug}
                type='button'
                onClick={() => onSelectTag(isSelected ? null : tag.slug)}
                className={cn(
                  "group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all",
                  isSelected
                    ? "bg-foreground font-medium text-background shadow-xs"
                    : "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-muted/40",
                )}>
                <span>{tag.name}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                    isSelected
                      ? "bg-background/20 text-background"
                      : "bg-muted text-muted-foreground group-hover:text-foreground",
                  )}>
                  {tag.count}
                </span>
                {isSelected && (
                  <X className='size-3 ml-0.5 opacity-70 hover:opacity-100' />
                )}
              </button>
            )
          })}

          {/* Active tag if not in top 5 */}
          {activeExtraTag && (
            <button
              type='button'
              onClick={() => onSelectTag(null)}
              className='inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background shadow-xs transition-all'>
              <span>{activeExtraTag.name}</span>
              <span className='rounded-full bg-background/20 px-1.5 py-0.2 text-[10px] font-mono'>
                {activeExtraTag.count}
              </span>
              <X className='size-3 ml-0.5 opacity-70 hover:opacity-100' />
            </button>
          )}

          {/* Expand / Collapse Button */}
          {remainingCount > 0 && (
            <button
              type='button'
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-controls='all-topics-tray'
              className={cn(
                "inline-flex cursor-pointer items-center gap-1 rounded-full border border-dashed px-2.5 py-1 text-xs font-medium transition-colors",
                isExpanded
                  ? "border-foreground/40 bg-muted text-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}>
              <span>
                {isExpanded ? "Fewer topics" : `+${remainingCount} more`}
              </span>
              {isExpanded ? (
                <ChevronUp className='size-3.5' />
              ) : (
                <ChevronDown className='size-3.5' />
              )}
            </button>
          )}
        </div>

        {/* Clear filter action */}
        {hasFilters && onClearAll && (
          <button
            type='button'
            onClick={onClearAll}
            className='cursor-pointer text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline'>
            Clear filters
          </button>
        )}
      </div>

      {/* Expandable Topic Browser Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id='all-topics-tray'
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className='overflow-hidden'>
            <div className='rounded-xl border border-border bg-muted/30 p-3.5 space-y-3'>
              {/* Filter controls row */}
              <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-b border-border/50 pb-2.5'>
                {/* Mini Search */}
                <div className='relative flex-1 max-w-xs'>
                  <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground' />
                  <input
                    type='text'
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                    placeholder='Filter topics...'
                    className='w-full rounded-md border border-border bg-background pl-8 pr-7 py-1 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40'
                  />
                  {tagSearchQuery && (
                    <button
                      type='button'
                      onClick={() => setTagSearchQuery("")}
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer'>
                      <X className='size-3' />
                    </button>
                  )}
                </div>

                {/* Sort Toggle and Counter */}
                <div className='flex items-center justify-between sm:justify-end gap-2 text-xs text-muted-foreground'>
                  <span className='text-[11px]'>
                    {displayedExpandedTags.length}{" "}
                    {displayedExpandedTags.length === 1 ? "topic" : "topics"}
                  </span>

                  <div className='inline-flex rounded-md border border-border p-0.5 bg-background text-[11px]'>
                    <button
                      type='button'
                      onClick={() => setSortMode("popular")}
                      title='Sort by article count'
                      className={cn(
                        "inline-flex items-center gap-1 rounded px-2 py-0.5 cursor-pointer transition-colors",
                        sortMode === "popular"
                          ? "bg-foreground text-background font-medium"
                          : "text-muted-foreground hover:text-foreground",
                      )}>
                      <ArrowDownWideNarrow className='size-3' />
                      Popular
                    </button>
                    <button
                      type='button'
                      onClick={() => setSortMode("alphabetical")}
                      title='Sort alphabetically'
                      className={cn(
                        "inline-flex items-center gap-1 rounded px-2 py-0.5 cursor-pointer transition-colors",
                        sortMode === "alphabetical"
                          ? "bg-foreground text-background font-medium"
                          : "text-muted-foreground hover:text-foreground",
                      )}>
                      <ArrowDownAZ className='size-3' />
                      A-Z
                    </button>
                  </div>
                </div>
              </div>

              {/* Tag Chips Grid */}
              {displayedExpandedTags.length > 0 ? (
                <div className='flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1'>
                  {displayedExpandedTags.map((tag) => {
                    const isSelected = selectedTag === tag.slug
                    return (
                      <button
                        key={tag.slug}
                        type='button'
                        onClick={() =>
                          onSelectTag(isSelected ? null : tag.slug)
                        }
                        className={cn(
                          "group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all",
                          isSelected
                            ? "bg-foreground font-medium text-background shadow-xs"
                            : "border border-border bg-background/80 text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-muted/40",
                        )}>
                        <span>{tag.name}</span>
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                            isSelected
                              ? "bg-background/20 text-background"
                              : "bg-muted text-muted-foreground group-hover:text-foreground",
                          )}>
                          {tag.count}
                        </span>
                        {isSelected && (
                          <X className='size-3 ml-0.5 opacity-70 hover:opacity-100' />
                        )}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className='py-4 text-center text-xs text-muted-foreground'>
                  No topics matching &ldquo;{tagSearchQuery}&rdquo;
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
