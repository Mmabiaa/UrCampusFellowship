export function Skeleton({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export function SkeletonText({ width = "100%", lines = 1 }: { width?: string; lines?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          style={{
            height: "14px",
            width: i === lines - 1 ? `${Math.random() * 30 + 60}%` : width,
            borderRadius: "4px"
          }}
        />
      ))}
    </div>
  )
}
