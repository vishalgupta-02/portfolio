"use client"

import { useEffect, useState } from "react"

const BASE_TIMEZONE = "Asia/Kolkata"

function getOffsetInHours(timeZone: string) {
  const now = new Date()

  const parts = (tz: string) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "longOffset",
    }).formatToParts(now)

  const getOffset = (tz: string) => {
    const value = parts(tz).find((part) => part.type === "timeZoneName")?.value

    if (!value || value === "GMT") return 0

    const match = value.match(/GMT([+-])(\d{2}):?(\d{2})?/)
    if (!match) return 0

    const [, sign, hours, minutes = "00"] = match

    return (sign === "+" ? 1 : -1) * (Number(hours) + Number(minutes) / 60)
  }

  return getOffset(timeZone) - getOffset(BASE_TIMEZONE)
}

export default function TimeDisplay() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!now) {
    return <span className="font-mono text-muted-foreground">--:--:--</span>
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: userTimezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now)

  const difference = getOffsetInHours(userTimezone)

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono font-medium text-foreground tracking-tight flex items-center gap-1.5">
        <span className="relative flex size-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
        </span>
        {time}
      </span>
      <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 border border-border/40 px-1.5 py-0.5 rounded">
        {difference === 0
          ? "Local (IST)"
          : `${Math.abs(difference)}h ${difference > 0 ? "ahead" : "behind"}`}
      </span>
    </div>
  )
}


