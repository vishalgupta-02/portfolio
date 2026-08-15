// lib/rss/xml.ts

/**
 * Wraps text inside a CDATA section so characters such as
 * &, <, and > don't break the RSS XML.
 */
export function cdata(value: string): string {
  // CDATA cannot contain "]]>" directly.
  // Split it safely if it ever occurs in content.
  const safeValue = value.replace(/]]>/g, "]]]]><![CDATA[>")

  return `<![CDATA[${safeValue}]]>`
}

/**
 * Converts an ISO/date string into the RFC-style date
 * expected by RSS.
 *
 * Example:
 * "2026-08-03"
 *
 * becomes:
 * "Mon, 03 Aug 2026 00:00:00 GMT"
 */
export function formatRSSDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid RSS date: "${value}"`)
  }

  return date.toUTCString()
}
