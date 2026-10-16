import type { CSSProperties } from "react"

type SkeletonProps = {
  className?: string
  style?: CSSProperties
  /** Renders a serif numeral placeholder instead of a plain bar */
  as?: "bar" | "text" | "circle" | "serif" | "pill"
}

export function Skeleton({ className = "", style = {}, as = "bar" }: SkeletonProps) {
  return (
    <div
      className={`skeleton skeleton-${as} ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export function SkeletonText({
  width = "100%",
  lines = 1,
}: {
  width?: string
  lines?: number
}) {
  return (
    <div className="skeleton-text" style={{ width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          as="text"
          style={{
            width: i === lines - 1 ? `${Math.round(55 + Math.random() * 30)}%` : "100%",
          }}
        />
      ))}
    </div>
  )
}