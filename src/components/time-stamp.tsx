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
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: userTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now)

  const difference = getOffsetInHours(userTimezone)

  return (
    <p className='space-x-1'>
      {time} //
      <span className='text-foreground/60 ml-1'>
        {difference === 0
          ? "same time"
          : `${Math.abs(difference)}h ${difference > 0 ? "ahead" : "behind"}`}
      </span>
    </p>
  )
}
