import { Skeleton } from "./skeleton"

export function ChapterCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Skeleton style={{ width: 44, height: 44, borderRadius: "50%" }} />
        <div style={{ flex: 1 }}>
          <Skeleton style={{ height: "18px", width: "70%", marginBottom: "6px" }} />
          <Skeleton style={{ height: "13px", width: "50%" }} />
        </div>
      </div>
      <Skeleton style={{ height: "12px", width: "40%", marginTop: "8px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px" }}>
        <Skeleton style={{ height: "20px", width: "70px", borderRadius: "12px" }} />
        <Skeleton style={{ height: "12px", width: "80px" }} />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="skeleton-stat">
      <Skeleton style={{ height: "12px", width: "60%" }} />
      <Skeleton style={{ height: "36px", width: "40%" }} />
      <Skeleton style={{ height: "12px", width: "80%" }} />
    </div>
  )
}

export function MemberListItemSkeleton() {
  return (
    <div className="skeleton-list-item">
      <Skeleton style={{ width: 40, height: 40, borderRadius: "50%" }} />
      <div style={{ flex: 1 }}>
        <Skeleton style={{ height: "14px", width: "60%", marginBottom: "6px" }} />
        <Skeleton style={{ height: "12px", width: "40%" }} />
      </div>
      <Skeleton style={{ height: "12px", width: "80px" }} />
      <Skeleton style={{ height: "12px", width: "50px" }} />
    </div>
  )
}

export function PendingApprovalSkeleton() {
  return (
    <div className="skeleton-list-item" style={{ justifyContent: "space-between" }}>
      <div style={{ flex: 1 }}>
        <Skeleton style={{ height: "16px", width: "50%", marginBottom: "6px" }} />
        <Skeleton style={{ height: "13px", width: "70%", marginBottom: "4px" }} />
        <Skeleton style={{ height: "12px", width: "60%" }} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Skeleton style={{ height: "32px", width: "80px", borderRadius: "12px" }} />
        <Skeleton style={{ height: "32px", width: "80px", borderRadius: "12px" }} />
      </div>
    </div>
  )
}

export function DashboardHeaderSkeleton() {
  return (
    <div className="dash-header">
      <div>
        <Skeleton style={{ height: "11px", width: "150px", marginBottom: "16px" }} />
        <Skeleton style={{ height: "42px", width: "300px", marginBottom: "12px" }} />
        <Skeleton style={{ height: "17px", width: "400px" }} />
      </div>
      <Skeleton style={{ width: 48, height: 48, borderRadius: "50%" }} />
    </div>
  )
}
