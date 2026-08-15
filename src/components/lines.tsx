// components/ui/line.tsx

type LineProps = {
  type?: "horizontal" | "vertical" | "elbow-right" | "elbow-left"
  width?: number
  height?: number
  className?: string
}

export function Line({
  type = "horizontal",
  width = 100,
  height = 50,
  className = "",
}: LineProps) {
  if (type === "horizontal") {
    return <div style={{ width }} className={`h-px bg-zinc-700 ${className}`} />
  }

  if (type === "vertical") {
    return (
      <div style={{ height }} className={`w-px bg-zinc-700 ${className}`} />
    )
  }

  // Similar to your uploaded image: │
  //                                  └────
  if (type === "elbow-right") {
    return (
      <div
        style={{ width, height }}
        className={`rounded-bl-lg border-b border-l border-zinc-700 ${className}`}
      />
    )
  }

  // ────┐
  //     │
  if (type === "elbow-left") {
    return (
      <div
        style={{ width, height }}
        className={`rounded-br-lg border-b border-r border-zinc-700 ${className}`}
      />
    )
  }

  return null
}
