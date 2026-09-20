export function cdata(value: string): string {
  const safeValue = value.replace(/]]>/g, "]]]]><![CDATA[>")
  return `<![CDATA[${safeValue}]]>`
}

export function formatRSSDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid RSS date: "${value}"`)
  }

  return date.toUTCString()
}
