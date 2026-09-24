"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type GithubGraphVariant = "github" | "graphite" | "ocean" | "violet";
export type GithubGraphAnimation = "wave" | "scan" | "cascade";
export type GithubGraphAmbientEffect = "none" | "tide" | "drift" | "twinkle";

export type GithubContribution = {
  date: string;
  count: number;
  level?: number;
};

export type GithubContributionCell = GithubContribution & {
  level: number;
};

export type GithubContributionWeek = GithubContributionCell[];

export interface GithubGraphProps {
  account?: string;
  months?: number;
  variant?: GithubGraphVariant;
  animation?: GithubGraphAnimation;
  animationSpeed?: number;
  cellSize?: number;
  cellGap?: number;
  cellRadius?: number;
  showLegend?: boolean;
  showAccount?: boolean;
  showStats?: boolean;
  ambientEffect?: GithubGraphAmbientEffect;
  ambientIntensity?: number;
  data?: GithubContribution[];
  className?: string;
}

type ResourceState =
  | { status: "loading" }
  | {
      status: "ready";
      contributions: GithubContribution[];
      totalContributions: number;
    }
  | { status: "error"; message: string };

const CONTRIBUTIONS_ENDPOINT = "/api/github/contributions";

const THEMED_VARIANTS: Record<
  GithubGraphVariant,
  {
    dark: [string, string, string, string, string];
    light: [string, string, string, string, string];
  }
> = {
  github: {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  },
  graphite: {
    dark: ["#18181b", "#27272a", "#52525b", "#a1a1aa", "#f4f4f5"],
    light: ["#f4f4f5", "#e4e4e7", "#a1a1aa", "#52525b", "#18181b"],
  },
  ocean: {
    dark: ["#0f172a", "#075985", "#0284c7", "#38bdf8", "#7dd3fc"],
    light: ["#f0f9ff", "#bae6fd", "#38bdf8", "#0284c7", "#0369a1"],
  },
  violet: {
    dark: ["#1e1b4b", "#4c1d95", "#7c3aed", "#a855f7", "#c084fc"],
    light: ["#faf5ff", "#e9d5ff", "#c084fc", "#9333ea", "#6b21a8"],
  },
};

function dateFromISO(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function fallbackLevel(count: number, maxCount: number): number {
  if (!Number.isFinite(count) || count <= 0 || maxCount <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / maxCount) * 4)));
}

export function normalizeGithubAccount(account: string): string | null {
  const normalized = account.trim().replace(/^@+/, "");
  return /^(?!-)[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(normalized)
    ? normalized
    : null;
}

export function buildContributionWeeks(
  contributions: GithubContribution[],
): GithubContributionWeek[] {
  const valid = contributions
    .map((item) => ({ ...item, parsedDate: dateFromISO(item.date) }))
    .filter(
      (item): item is GithubContribution & { parsedDate: Date } =>
        item.parsedDate !== null && Number.isFinite(item.count),
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  if (valid.length === 0) return [];

  const maxCount = Math.max(0, ...valid.map((item) => item.count));
  const byDate = new Map(valid.map((item) => [item.date, item]));
  const firstDate = valid[0]!.parsedDate;
  const lastDate = valid[valid.length - 1]!.parsedDate;
  const startDate = addDays(firstDate, -firstDate.getUTCDay());
  const endDate = addDays(lastDate, 6 - lastDate.getUTCDay());
  const cells: GithubContributionCell[] = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const key = isoDate(date);
    const contribution = byDate.get(key);
    const count = Math.max(0, contribution?.count ?? 0);
    const explicitLevel = contribution?.level;
    const level =
      Number.isInteger(explicitLevel) &&
      explicitLevel! >= 0 &&
      explicitLevel! <= 4
        ? count === 0
          ? 0
          : explicitLevel!
        : fallbackLevel(count, maxCount);

    cells.push({ date: key, count, level });
  }

  return Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7),
  );
}

function selectRecentContributions(
  contributions: GithubContribution[],
  months: number,
): GithubContribution[] {
  const parsed = contributions
    .map((contribution) => ({
      contribution,
      date: dateFromISO(contribution.date),
    }))
    .filter(
      (item): item is { contribution: GithubContribution; date: Date } =>
        item.date !== null,
    )
    .sort((a, b) => a.contribution.date.localeCompare(b.contribution.date));

  if (parsed.length === 0) return [];

  if (months >= 12) {
    return parsed.map((item) => item.contribution);
  }

  const daysToKeep = Math.round(months * 30.5);
  return parsed.slice(-daysToKeep).map((item) => item.contribution);
}

function formatContributionLabel(contribution: GithubContributionCell): string {
  const parsed = dateFromISO(contribution.date) ?? new Date();
  const dateStr = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
  const label = contribution.count === 1 ? "contribution" : "contributions";
  return `${contribution.count} ${label} on ${dateStr}`;
}

function calculateContributionStats(contributions: GithubContribution[]) {
  let total = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  const sorted = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  sorted.forEach((item) => {
    total += item.count;
    if (item.count > 0) {
      activeDays++;
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  });

  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i]!.count > 0) {
      currentStreak++;
    } else if (i === sorted.length - 1) {
      continue;
    } else {
      break;
    }
  }

  return { total, activeDays, longestStreak, currentStreak };
}

function getCellDelay(
  animation: GithubGraphAnimation,
  weekIndex: number,
  dayIndex: number,
  speed: number,
): number {
  const step =
    animation === "wave"
      ? weekIndex * 0.015 + dayIndex * 0.01
      : animation === "scan"
        ? weekIndex * 0.02
        : (weekIndex + dayIndex * 2) * 0.012;
  return step / Math.max(speed, 0.1);
}

function getAmbientCellMotion(
  effect: GithubGraphAmbientEffect,
  intensity: number,
  weekIndex: number,
  dayIndex: number,
  entranceDelay: number,
  reducedMotion: boolean | null,
) {
  if (reducedMotion || effect === "none") {
    return {
      animate: { opacity: 1, scale: 1 },
      transition: {
        opacity: { duration: 0.14, delay: entranceDelay },
        scale: { type: "spring" as const, stiffness: 900, damping: 32 },
      },
    };
  }

  const strength = Math.min(1, Math.max(0, intensity));
  const seed = ((weekIndex * 17 + dayIndex * 31) % 11) / 10;
  const isTide = effect === "tide";
  const isDrift = effect === "drift";
  const duration = isTide ? 3.2 : isDrift ? 3.8 + seed : 2 + seed * 1.4;
  const delay =
    entranceDelay +
    (isTide ? (weekIndex + dayIndex * 1.8) * 0.055 : seed * 0.85);
  const lowOpacity = 1 - (isTide ? 0.24 : isDrift ? 0.16 : 0.34) * strength;
  const smallScale = 1 - (isTide ? 0.07 : isDrift ? 0.04 : 0.08) * strength;

  return {
    animate: {
      opacity: isDrift
        ? [1, lowOpacity, 1 - 0.06 * strength, 1]
        : [1, lowOpacity, 1],
      scale: isDrift
        ? [1, smallScale, 1 + 0.025 * strength, 1]
        : [1, smallScale, 1],
    },
    transition: {
      opacity: {
        duration,
        delay,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
      scale: { duration, delay, ease: "easeInOut" as const, repeat: Infinity },
    },
  };
}

function LoadingSkeleton({
  cellGap,
  cellRadius,
}: {
  cellSize?: number;
  cellGap: number;
  cellRadius: number;
}) {
  const weekCount = 52;

  return (
    <div className="w-full animate-pulse">
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))`,
          gap: cellGap,
        }}
      >
        {Array.from({ length: weekCount }, (_, week) => (
          <div
            key={week}
            className="grid w-full grid-rows-7"
            style={{ gap: cellGap }}
          >
            {Array.from({ length: 7 }, (_, day) => (
              <span
                key={day}
                className="bg-muted/40 aspect-square w-full"
                style={{
                  borderRadius: cellRadius,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GithubGraph({
  account = "vishalgupta-02",
  months = 12,
  variant = "github",
  animation = "wave",
  animationSpeed = 1.2,
  cellSize = 9,
  cellGap = 2.5,
  cellRadius = 2,
  showLegend = true,
  showAccount = true,
  showStats = true,
  ambientEffect = "none",
  ambientIntensity = 0.5,
  data,
  className,
}: GithubGraphProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const normalizedAccount = React.useMemo(
    () => normalizeGithubAccount(account) ?? "vishalgupta-02",
    [account],
  );

  const [resource, setResource] = React.useState<ResourceState>({
    status: "loading",
  });

  const [hoveredContribution, setHoveredContribution] = React.useState<{
    contribution: GithubContributionCell;
    left: number;
    top: number;
    originLeft: number;
    originTop: number;
    placement: "above" | "below";
    weekIndex: number;
    dayIndex: number;
  } | null>(null);

  const palette = React.useMemo(() => {
    const variantColors = THEMED_VARIANTS[variant] || THEMED_VARIANTS.github;
    return isDark ? variantColors.dark : variantColors.light;
  }, [variant, isDark]);

  const resolvedCellRadius = Math.max(
    0,
    Math.min(cellRadius, Math.max(0, cellSize) / 2),
  );

  React.useEffect(() => {
    if (data) {
      const stats = calculateContributionStats(data);
      setResource({
        status: "ready",
        contributions: data,
        totalContributions: stats.total,
      });
      return;
    }

    if (!normalizedAccount) {
      setResource({
        status: "error",
        message: "Enter a valid GitHub username.",
      });
      return;
    }

    const controller = new AbortController();
    setResource({ status: "loading" });

    fetch(
      `${CONTRIBUTIONS_ENDPOINT}?username=${encodeURIComponent(normalizedAccount)}`,
      {
        signal: controller.signal,
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          let errorMessage = `Failed to fetch contributions (${response.status})`;
          try {
            const errorPayload = await response.json();
            if (errorPayload?.error) errorMessage = errorPayload.error;
          } catch {
            // Server returned non-JSON error (e.g. HTML 404/500 page)
          }
          throw new Error(errorMessage);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Contributions API returned a non-JSON response.");
        }

        const payload = await response.json();
        if (!Array.isArray(payload.contributions)) {
          throw new Error("No contributions were returned.");
        }
        const total =
          payload.total?.lastYear ??
          payload.contributions.reduce(
            (acc: number, c: GithubContribution) => acc + c.count,
            0,
          );
        return { contributions: payload.contributions, total };
      })
      .then(({ contributions, total }) => {
        if (!controller.signal.aborted) {
          setResource({
            status: "ready",
            contributions,
            totalContributions: total,
          });
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResource({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Could not load GitHub contributions.",
        });
      });

    return () => controller.abort();
  }, [data, normalizedAccount]);

  const filteredContributions = React.useMemo(() => {
    if (resource.status !== "ready") return [];
    return selectRecentContributions(resource.contributions, months);
  }, [months, resource]);

  const weeks = React.useMemo(() => {
    if (filteredContributions.length === 0) return [];
    return buildContributionWeeks(filteredContributions);
  }, [filteredContributions]);

  const stats = React.useMemo(() => {
    if (filteredContributions.length === 0) {
      return { total: 0, activeDays: 0, longestStreak: 0, currentStreak: 0 };
    }
    return calculateContributionStats(filteredContributions);
  }, [filteredContributions]);

  const animationKey = `${normalizedAccount}-${months}-${variant}-${animation}-${cellSize}-${cellGap}`;

  const showTooltip = React.useCallback(
    (
      element: HTMLButtonElement,
      contribution: GithubContributionCell,
      weekIndex: number,
      dayIndex: number,
    ) => {
      const cellRect = element.getBoundingClientRect();
      const placement = cellRect.top > 60 ? "above" : "below";
      const centerX = cellRect.left + cellRect.width / 2;
      const safePadding = 140;
      const screenWidth =
        typeof window !== "undefined" ? window.innerWidth : 1000;
      const clampedLeft = Math.max(
        safePadding,
        Math.min(screenWidth - safePadding, centerX),
      );

      setHoveredContribution({
        contribution,
        left: clampedLeft,
        top: placement === "above" ? cellRect.top - 8 : cellRect.bottom + 8,
        originLeft: clampedLeft,
        originTop: cellRect.top + cellRect.height / 2,
        placement,
        weekIndex,
        dayIndex,
      });
    },
    [],
  );

  return (
    <div
      className={cn(
        "bg-card w-full overflow-hidden rounded-sm transition-all",
        className,
      )}
      aria-busy={resource.status === "loading"}
    >
      {resource.status === "loading" && (
        <LoadingSkeleton
          cellSize={cellSize}
          cellGap={cellGap}
          cellRadius={resolvedCellRadius}
        />
      )}

      {resource.status === "error" && (
        <div className="text-muted-foreground flex flex-col items-center justify-center p-6 text-center text-sm">
          <p>{resource.message}</p>
          <button
            type="button"
            onClick={() => setResource({ status: "loading" })}
            className="text-foreground hover:text-primary mt-2 text-xs underline underline-offset-4"
          >
            Retry loading
          </button>
        </div>
      )}

      {resource.status === "ready" && weeks.length > 0 && (
        <div className="relative w-full">
          <div
            className="grid w-full"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
              gap: cellGap,
            }}
            role="grid"
            aria-label={`GitHub contributions for ${normalizedAccount}`}
            onMouseLeave={() => setHoveredContribution(null)}
          >
            {weeks.map((week, weekIndex) => (
              <div
                key={`${animationKey}-${weekIndex}`}
                className="grid w-full grid-rows-7"
                style={{ gap: cellGap }}
                role="row"
              >
                {week.map((contribution, dayIndex) => {
                  const label = formatContributionLabel(contribution);
                  const distance = hoveredContribution
                    ? Math.hypot(
                        weekIndex - hoveredContribution.weekIndex,
                        dayIndex - hoveredContribution.dayIndex,
                      )
                    : Infinity;
                  const waveStrength = Math.max(0, 1 - distance / 3);
                  const filter = `brightness(${1 + waveStrength * 0.4}) saturate(${1 + waveStrength * 0.2})`;

                  return (
                    <button
                      key={`${animationKey}-${contribution.date}`}
                      type="button"
                      role="gridcell"
                      aria-label={label}
                      className="ring-offset-background focus-visible:ring-foreground/60 relative aspect-square w-full cursor-pointer ring-offset-1 transition-all duration-150 outline-none hover:z-10 hover:scale-110 focus-visible:ring-2 active:scale-95"
                      style={{
                        borderRadius: resolvedCellRadius,
                        filter: hoveredContribution ? filter : undefined,
                      }}
                      onMouseEnter={(event) =>
                        showTooltip(
                          event.currentTarget,
                          contribution,
                          weekIndex,
                          dayIndex,
                        )
                      }
                      onFocus={(event) =>
                        showTooltip(
                          event.currentTarget,
                          contribution,
                          weekIndex,
                          dayIndex,
                        )
                      }
                      onBlur={() => setHoveredContribution(null)}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 transition-colors duration-150"
                        style={{
                          backgroundColor: palette[contribution.level],
                          borderRadius: resolvedCellRadius,
                          border:
                            contribution.level === 0
                              ? isDark
                                ? "1px solid rgba(255,255,255,0.05)"
                                : "1px solid rgba(0,0,0,0.05)"
                              : "none",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hoveredContribution && (
              <motion.div
                key="github-graph-tooltip"
                role="tooltip"
                className="border-border/80 bg-popover text-popover-foreground pointer-events-none fixed z-[99999] max-w-[calc(100vw-32px)] rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-xl backdrop-blur-md"
                style={{
                  left: hoveredContribution.left,
                  top: hoveredContribution.top,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  x: "-50%",
                  y: hoveredContribution.placement === "above" ? "-100%" : "0%",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: "-50%",
                  y: hoveredContribution.placement === "above" ? "-100%" : "0%",
                }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  opacity: { duration: 0.08 },
                  scale: { duration: 0.08 },
                }}
              >
                {formatContributionLabel(hoveredContribution.contribution)}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {showLegend && resource.status === "ready" && (
        <div className="border-border/40 text-muted-foreground mt-3 flex items-center justify-between gap-2 border-t pt-3 text-xs">
          <span className="text-muted-foreground font-mono text-[11px]">
            {stats.total.toLocaleString()} contributions in the last year
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Less</span>
            <div
              className="flex gap-1"
              aria-label="Contribution activity scale"
            >
              {palette.map((color, level) => (
                <span
                  key={color}
                  className="size-2.5"
                  style={{
                    backgroundColor: color,
                    borderRadius: resolvedCellRadius,
                    border:
                      level === 0
                        ? isDark
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid rgba(0,0,0,0.06)"
                        : "none",
                  }}
                  aria-label={`Contribution Level ${level}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-[11px]">More</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default GithubGraph;
