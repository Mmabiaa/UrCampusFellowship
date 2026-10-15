import { Skeleton, SkeletonText } from "./skeleton"

export function ChapterCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="card-top">
        <Skeleton as="circle" style={{ width: 40, height: 40 }} />
        <Skeleton as="serif" style={{ width: 56, height: 20 }} />
      </div>

      <Skeleton as="serif" style={{ width: "65%", height: 22, marginTop: 24 }} />

      <SkeletonText lines={2} width="100%" />

      <div className="meeting">
        <Skeleton as="text" style={{ width: "70%" }} />
        <Skeleton as="text" style={{ width: "45%" }} />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="skeleton-stat">
      <Skeleton as="text" style={{ width: "55%" }} />
      <Skeleton as="serif" style={{ width: "40%", height: 36, margin: "12px 0 5px" }} />
      <Skeleton as="text" style={{ width: "75%" }} />
    </div>
  )
}

export function MemberListItemSkeleton() {
  return (
    <div className="skeleton-list-item">
      <Skeleton as="circle" style={{ width: 40, height: 40 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Skeleton as="text" style={{ width: "55%", marginBottom: 8 }} />
        <Skeleton as="text" style={{ width: "35%" }} />
      </div>
      <Skeleton as="text" style={{ width: 72 }} />
      <Skeleton as="text" style={{ width: 52 }} />
    </div>
  )
}

export function PendingApprovalSkeleton() {
  return (
    <div className="skeleton-list-item skeleton-approval">
      <div style={{ flex: 1, minWidth: 0 }}>
        <Skeleton as="serif" style={{ width: "45%", height: 18, marginBottom: 10 }} />
        <Skeleton as="text" style={{ width: "70%", marginBottom: 6 }} />
        <Skeleton as="text" style={{ width: "55%" }} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Skeleton as="pill" style={{ width: 84, height: 34 }} />
        <Skeleton as="pill" style={{ width: 84, height: 34 }} />
      </div>
    </div>
  )
}

export function DashboardHeaderSkeleton() {
  return (
    <div className="dash-header">
      <div style={{ width: "100%", maxWidth: 480 }}>
        <Skeleton as="text" style={{ width: 150, marginBottom: 16 }} />
        <Skeleton as="serif" style={{ width: "80%", height: 42, marginBottom: 14 }} />
        <Skeleton as="text" style={{ width: "90%" }} />
      </div>
      <Skeleton as="circle" style={{ width: 48, height: 48 }} />
    </div>
  )
}