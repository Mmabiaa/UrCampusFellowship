import { DashboardShell } from "@/components/common/dashboard-shell"

export function HeadOverview() {
  return (
    <DashboardShell role="head">
      <p className="eyebrow">Your chapter</p>
      <h1>Good morning, Ama.</h1>
      <div className="stat-grid">
        <div>
          <small>Members</small>
          <strong>128</strong>
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
