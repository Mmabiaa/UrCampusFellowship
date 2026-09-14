import { DashboardShell } from "@/components/common/dashboard-shell"
import { chapters } from "@/data/chapters"

export function AdminOverview() {
  return (
    <DashboardShell role="admin">
      <p className="eyebrow">Platform overview</p>
      <h1>A clear view of community.</h1>
      <div className="stat-grid">
        <div>
          <small>Chapters</small>
          <strong>{chapters.length}</strong>
          <span>Active community spaces</span>
        </div>
        <div>
          <small>Status</small>
          <strong className="green-text">Active</strong>
          <span>Visible to students</span>
        </div>
      </div>
    </DashboardShell>
  )
}
