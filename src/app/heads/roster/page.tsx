"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { rosterMembers, type MemberDetails } from "@/data/chapters"

export default function RosterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<MemberDetails | null>(null)

  const filteredMembers = rosterMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.hall.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRemoveMember = (member: MemberDetails, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to remove ${member.name} from your roster? They will be free to register with another fellowship.`)) {
      alert(`${member.name} has been removed from the roster.`)
      setSelectedMember(null)
    }
  }

  const handleFlagMember = (member: MemberDetails, e: React.MouseEvent) => {
    e.stopPropagation()
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

      <p style={{
        fontSize: "13px",
        color: "var(--muted-foreground)",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span aria-hidden="true">👆</span> Tap any member to view their full details
      </p>

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
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: "var(--cream)",
                borderRadius: "10px",
                padding: "16px",
                margin: "0 0 12px",
                border: "1px solid var(--border)",
                position: "relative",
              }}
              className="member-row"
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
              <span
                style={{
                  color: "var(--moss)",
                  fontSize: "18px",
                  display: "none",
                }}
                className="tap-indicator"
                aria-hidden="true"
              >
                →
              </span>
              <button
                type="button"
                className="button button-outline member-action-btn"
                onClick={(e) => handleFlagMember(member, e)}
                style={{ padding: "8px 14px", fontSize: "13px" }}
              >
                Flag
              </button>
              <button
                type="button"
                className="button button-outline member-action-btn"
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
          <div className="modal-overlay" onClick={() => setSelectedMember(null)} />
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="member-modal-name">
            <div className="modal-head">
              <div className="modal-head-info">
                <div className="modal-avatar" aria-hidden="true">
                  {selectedMember.initials}
                </div>
                <div className="modal-head-text">
                  <h2 id="member-modal-name">{selectedMember.name}</h2>
                  <p>Joined {selectedMember.joinedDate}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="modal-close"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-grid">
              <div className="modal-field">
                <small>Email</small>
                <strong className="modal-field-break">{selectedMember.email}</strong>
              </div>
              <div className="modal-field">
                <small>Phone</small>
                <strong>{selectedMember.phone}</strong>
              </div>
              <div className="modal-field">
                <small>Program</small>
                <strong>{selectedMember.program}</strong>
              </div>
              <div className="modal-field">
                <small>Level</small>
                <strong>Level {selectedMember.level}</strong>
              </div>
              <div className="modal-field">
                <small>Campus</small>
                <strong>{selectedMember.campus}</strong>
              </div>
              <div className="modal-field">
                <small>Hall/Hostel</small>
                <strong>{selectedMember.hall}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={(e) => handleFlagMember(selectedMember, e)}
              >
                Flag member
              </button>
              <button
                type="button"
                className="button button-outline modal-remove-btn"
                onClick={(e) => handleRemoveMember(selectedMember, e)}
              >
                Remove member
              </button>
            </div>
          </div>
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

      <style jsx>{`
        .member-row:hover {
          border-color: var(--moss) !important;
          box-shadow: 3px 3px 0 color-mix(in srgb, var(--moss) 20%, transparent) !important;
          transform: translateY(-2px);
        }
        .member-row:active {
          transform: translateY(0px);
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(32, 35, 31, 0.5);
          z-index: 999;
          animation: fadeIn 0.2s ease;
        }

        /* Compact by design — sized to always fit in one screen, never scroll */
        .modal-card {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--cream);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: 5px 5px 0 var(--ink);
          padding: 22px;
          width: min(400px, calc(100vw - 32px));
          max-height: calc(100vh - 32px);
          overflow: hidden;
          z-index: 1000;
          animation: slideUp 0.25s ease;
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .modal-head-info {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .modal-avatar {
          width: 42px;
          height: 42px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: var(--sage);
          color: var(--moss);
          display: grid;
          place-items: center;
          font-family: Georgia, serif;
          font-size: 18px;
          font-weight: 700;
        }
        .modal-head-text { min-width: 0; }
        .modal-head-text h2 {
          font-size: 18px;
          margin: 0;
          font-family: Georgia, serif;
          overflow-wrap: anywhere;
          line-height: 1.2;
        }
        .modal-head-text p {
          color: var(--muted-foreground);
          font-size: 11px;
          margin: 3px 0 0;
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--muted-foreground);
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          border-radius: 50%;
          display: grid;
          place-items: center;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .modal-close:hover {
          background: var(--sage);
          color: var(--ink);
        }

        /* Fixed 2-column x 3-row matrix, always — never collapses to 1 column */
        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 16px;
          padding: 14px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .modal-field small {
          color: var(--muted-foreground);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 4px;
        }
        .modal-field strong {
          font-size: 13px;
          line-height: 1.3;
          display: block;
        }
        .modal-field-break {
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }
        .modal-actions .button {
          flex: 1;
          padding: 10px 12px;
          font-size: 13px;
        }
        .modal-remove-btn {
          border-color: var(--destructive);
          color: var(--destructive);
        }

        @media (max-width: 380px) {
          .modal-card { padding: 18px; }
          .modal-head-text h2 { font-size: 16px; }
          .modal-field strong { font-size: 12px; }
          .modal-actions .button { font-size: 12px; padding: 9px 8px; }
        }
      `}</style>
    </DashboardShell>
  )
}