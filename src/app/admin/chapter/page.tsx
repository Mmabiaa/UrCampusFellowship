import { DashboardShell } from "@/components/common/dashboard-shell"

export default function AdminChapterPage() {
  return (
    <DashboardShell role="admin">
      <p className="eyebrow">Chapter administration</p>
      <h1>Review registered chapters.</h1>
      <p className="intro">Manage chapter records across the platform.</p>
    </DashboardShell>
  )
}
