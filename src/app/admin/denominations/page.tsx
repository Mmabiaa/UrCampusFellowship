import { DashboardShell } from "@/components/common/dashboard-shell"

export default function DenominationsPage() {
  return (
    <DashboardShell role="admin">
      <p className="eyebrow">Denominations</p>
      <h1>Manage approved denominations.</h1>
      <p className="intro">
        Keep the denomination directory accurate for chapters and students.
      </p>
    </DashboardShell>
  )
}
