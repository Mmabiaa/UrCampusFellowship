"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { rosterMembers } from "@/data/chapters"

export default function RosterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  // Filter members based on search
  const filteredMembers = rosterMembers.filter((member) =>
    member[1].toLowerCase().includes(searchQuery.toLowerCase()) ||
    member[2].toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRemoveMember = (memberName: string) => {
    if (confirm(`Are you sure you want to remove ${memberName} from your roster? They will be free to register with another fellowship.`)) {
      // In production, this would call your API to remove the member
      alert(`${memberName} has been removed from the roster.`)
    }
  }

  const handleFlagMember = (memberName: string) => {
    // In production, this would call your API to flag the member
    alert(`${memberName} has been flagged for follow-up.`)
  }

  return (
    <DashboardShell role="head">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Member roster</p>
          <h1>Your chapter community.</h1>
          <p className="intro">
            Manage members who have registered with your fellowship. Students join instantly —
            you can remove or flag them after the fact if needed.
          </p>
        </div>
      </div>

      <div className="roster-toolbar">
        <input
          type="search"
          placeholder="Search members by name or program..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search members"
        />
        <span>{filteredMembers.length} members</span>
      </div>

      <div className="roster-list">
        {filteredMembers.length === 0 ? (
          <p style={{ padding: "40px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
            No members found matching "{searchQuery}"
          </p>
        ) : (
          filteredMembers.map((member) => (
            <span key={member[1]}>
              <i aria-hidden="true">{member[0]}</i>
              <b>
                {member[1]}
                <small>{member[2]}</small>
              </b>
              <button
                type="button"
                className="button button-outline"
                onClick={() => handleFlagMember(member[1])}
                style={{ padding: "8px 14px", fontSize: "13px" }}
              >
                Flag
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={() => handleRemoveMember(member[1])}
                style={{ 
                  padding: "8px 14px", 
                  fontSize: "13px",
                  borderColor: "var(--destructive)",
                  color: "var(--destructive)",
                }}
              >
                Remove
              </button>
            </span>
          ))
        )}
      </div>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.65" }}>
          <strong style={{ color: "var(--ink)", display: "block", marginBottom: "8px" }}>
            About roster management
          </strong>
          Students join your fellowship instantly without requiring approval. You can remove
          members from your roster at any time, which frees them to register elsewhere. Flagging
          a member keeps them on the roster but marks them for your follow-up.
          <br /><br />
          Note: Removing a member here does not remove them from your WhatsApp group — you'll
          need to handle that separately in WhatsApp.
        </p>
      </div>
    </DashboardShell>
  )
}
