"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { rosterMembers, type MemberDetails } from "@/data/chapters"

export default function RosterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<MemberDetails | null>(null)

  // Filter members based on search
  const filteredMembers = rosterMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.hall.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRemoveMember = (member: MemberDetails, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to remove ${member.name} from your roster? They will be free to register with another fellowship.`)) {
      // In production, this would call your API to remove the member
      alert(`${member.name} has been removed from the roster.`)
      setSelectedMember(null)
    }
  }

  const handleFlagMember = (member: MemberDetails, e: React.MouseEvent) => {
    e.stopPropagation()
    // In production, this would call your API to flag the member
    alert(`${member.name} has been flagged for follow-up.`)
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
            <span 
              key={member.id}
              onClick={() => setSelectedMember(member)}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedMember(member)
                }
              }}
            >
              <i aria-hidden="true">{member.initials}</i>
              <b>
                {member.name}
                <small>{member.displayInfo}</small>
              </b>
              <button
                type="button"
                className="button button-outline"
                onClick={(e) => handleFlagMember(member, e)}
                style={{ padding: "8px 14px", fontSize: "13px" }}
              >
                Flag
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={(e) => handleRemoveMember(member, e)}
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

      {/* Member Detail Modal */}
      {selectedMember && (
        <>
          <div 
            className="modal-overlay"
            onClick={() => setSelectedMember(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(32, 35, 31, 0.5)",
              zIndex: 999,
              animation: "fadeIn 0.2s ease",
            }}
          />
          <div 
            className="modal-card"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "var(--cream)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              boxShadow: "5px 5px 0 var(--ink)",
              padding: "32px",
              maxWidth: "520px",
              width: "calc(100vw - 48px)",
              zIndex: 1000,
              animation: "slideUp 0.3s ease",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div 
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "50%",
                    background: "var(--sage)",
                    color: "var(--moss)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "Georgia, serif",
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                  aria-hidden="true"
                >
                  {selectedMember.initials}
                </div>
                <div>
                  <h2 style={{ fontSize: "24px", margin: 0, fontFamily: "Georgia, serif" }}>
                    {selectedMember.name}
                  </h2>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "13px", margin: "4px 0 0" }}>
                    Joined {selectedMember.joinedDate}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--muted-foreground)",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "0",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: "20px",
              paddingTop: "24px",
              borderTop: "1px solid var(--border)",
            }}>
              <div>
                <small style={{ 
                  color: "var(--muted-foreground)", 
                  fontSize: "11px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "6px",
                }}>
                  Email
                </small>
                <strong style={{ fontSize: "14px", wordBreak: "break-word" }}>{selectedMember.email}</strong>
              </div>

              <div>
                <small style={{ 
                  color: "var(--muted-foreground)", 
                  fontSize: "11px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "6px",
                }}>
                  Phone
                </small>
                <strong style={{ fontSize: "14px" }}>{selectedMember.phone}</strong>
              </div>

              <div>
                <small style={{ 
                  color: "var(--muted-foreground)", 
                  fontSize: "11px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "6px",
                }}>
                  Program
                </small>
                <strong style={{ fontSize: "14px" }}>{selectedMember.program}</strong>
              </div>

              <div>
                <small style={{ 
                  color: "var(--muted-foreground)", 
                  fontSize: "11px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "6px",
                }}>
                  Level
                </small>
                <strong style={{ fontSize: "14px" }}>Level {selectedMember.level}</strong>
              </div>

              <div>
                <small style={{ 
                  color: "var(--muted-foreground)", 
                  fontSize: "11px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "6px",
                }}>
                  Campus
                </small>
                <strong style={{ fontSize: "14px" }}>{selectedMember.campus}</strong>
              </div>

              <div>
                <small style={{ 
                  color: "var(--muted-foreground)", 
                  fontSize: "11px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "6px",
                }}>
                  Hall/Hostel
                </small>
                <strong style={{ fontSize: "14px" }}>{selectedMember.hall}</strong>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              gap: "12px", 
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid var(--border)",
            }}>
              <button
                type="button"
                className="button button-outline"
                onClick={(e) => handleFlagMember(selectedMember, e)}
                style={{ flex: 1 }}
              >
                Flag member
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={(e) => handleRemoveMember(selectedMember, e)}
                style={{ 
                  flex: 1,
                  borderColor: "var(--destructive)",
                  color: "var(--destructive)",
                }}
              >
                Remove member
              </button>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { 
                opacity: 0;
                transform: translate(-50%, -45%);
              }
              to { 
                opacity: 1;
                transform: translate(-50%, -50%);
              }
            }
          `}</style>
        </>
      )}

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
