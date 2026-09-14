import { DashboardShell } from "@/components/common/dashboard-shell"

export default function RosterPage() {
  return (
    <DashboardShell role="head">
      <p className="eyebrow">Member roster</p>
      <h1>Your chapter community.</h1>
      <p className="intro">Review the members connected to your chapter.</p>
      <div className="profile-card">
        <h2>128 active members</h2>
        <p>Member details are available to chapter heads.</p>
      </div>
    </DashboardShell>
  )
}
