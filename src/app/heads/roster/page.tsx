"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  program: string
  level: string
  hall: string
  status: string
  created_at: string
  campuses?: { name: string }
}

export default function RosterPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [actionMessage, setActionMessage] = useState("")

  useEffect(() => {
    async function loadRoster() {
      try {
        setIsLoading(true)
        const res = await fetch('/api/heads/roster')
        if (res.ok) {
          const data = await res.json()
          setMembers(data.members || [])
        }
      } catch {
        // network error
      } finally {
        setIsLoading(false)
      }
    }

    loadRoster()
  }, [])

  const filteredMembers = members.filter((member) => {
    const name = member.name || (member as any).full_name || ""
    const program = member.program || ""
    const hall = member.hall || ""
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hall.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleRemoveMember = async (member: Member, e: React.MouseEvent) => {
    e.stopPropagation()
    if (
      !confirm(
        `Are you sure you want to remove ${member.name} from your roster? They will be free to register with another fellowship.`
      )
    ) {
      return
    }

    try {
      const res = await fetch(`/api/heads/members/${member.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove' }),
      })

      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== member.id))
        setSelectedMember(null)
        setActionMessage(`${member.name} has been removed from the roster.`)
        setTimeout(() => setActionMessage(""), 4000)
      } else {
        alert("Failed to remove member. Please try again.")
      }
    } catch {
      alert("Network error.")
    }
  }

  const handleFlagMember = async (member: Member, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const res = await fetch(`/api/heads/members/${member.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'flag' }),
      })

      if (res.ok) {
        setActionMessage(`${member.name} has been flagged for follow-up.`)
        setTimeout(() => setActionMessage(""), 4000)
      }
    } catch {
      alert("Network error.")
    }
  }

  return (
    <DashboardShell role="head">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Member roster</p>
          <h1>Your chapter community.</h1>
          <p className="intro">
            Manage members who have registered with your fellowship.
          </p>
        </div>
      </div>

      {actionMessage && (
        <p
          style={{
            padding: "12px 16px",
            background: "var(--sage)",
            color: "var(--moss)",
            borderRadius: "8px",
            fontSize: "14px",
            marginBottom: "16px",
            fontWeight: "bold",
          }}
        >
          ✓ {actionMessage}
        </p>
      )}

      <div className="roster-toolbar">
        <input
          type="search"
          placeholder="Search members by name, program, or hall..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search members"
        />
        <span>{filteredMembers.length} members</span>
      </div>

      <p
        style={{
          fontSize: "13px",
          color: "var(--muted-foreground)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span aria-hidden="true">👆</span> Tap any member to view their full registration details
      </p>

      {isLoading ? (
        <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
          Loading chapter roster...
        </div>
      ) : (
        <div className="roster-list">
          {filteredMembers.length === 0 ? (
            <p style={{ padding: "40px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
              {searchQuery
                ? `No members found matching "${searchQuery}"`
                : "No registered members in your fellowship yet."}
            </p>
          ) : (
            filteredMembers.map((member) => (
              <div
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
                className="member-row"
                role="button"
                tabIndex={0}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <i
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--sage)",
                      color: "var(--moss)",
                      display: "grid",
                      placeItems: "center",
                      fontStyle: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    {(member.name || (member as any).full_name || 'M')[0]?.toUpperCase()}
                  </i>
                  <div>
                    <strong style={{ display: "block", fontSize: "15px" }}>{member.name || (member as any).full_name}</strong>
                    <small style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>
                      {member.program} • Level {member.level}
                    </small>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={(e) => handleFlagMember(member, e)}
                    style={{ padding: "6px 12px", fontSize: "13px" }}
                  >
                    Flag
                  </button>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={(e) => handleRemoveMember(member, e)}
                    style={{
                      padding: "6px 12px",
                      fontSize: "13px",
                      borderColor: "var(--destructive)",
                      color: "var(--destructive)",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Member Detail Modal */}
      {selectedMember && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedMember(null)} />
          <div className="modal-card" role="dialog" aria-modal="true">
            <div className="modal-head">
              <div className="modal-head-info">
                <div className="modal-avatar">{selectedMember.name[0]}</div>
                <div className="modal-head-text">
                  <h2>{selectedMember.name}</h2>
                  <p>Joined {new Date(selectedMember.created_at).toLocaleDateString()}</p>
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
                <strong className="modal-field-break">{selectedMember.email || "—"}</strong>
              </div>
              <div className="modal-field">
                <small>Phone</small>
                <strong>{selectedMember.phone || "—"}</strong>
              </div>
              <div className="modal-field">
                <small>Program</small>
                <strong>{selectedMember.program || "—"}</strong>
              </div>
              <div className="modal-field">
                <small>Level</small>
                <strong>Level {selectedMember.level}</strong>
              </div>
              <div className="modal-field">
                <small>Campus</small>
                <strong>{selectedMember.campuses?.name || "Main Campus"}</strong>
              </div>
              <div className="modal-field">
                <small>Hall/Hostel</small>
                <strong>{selectedMember.hall || "—"}</strong>
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

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(32, 35, 31, 0.5);
          z-index: 999;
        }
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
          z-index: 1000;
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
        }
        .modal-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--sage);
          color: var(--moss);
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 18px;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 14px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .modal-field small {
          color: var(--muted-foreground);
          font-size: 10px;
          text-transform: uppercase;
          display: block;
        }
        .modal-field strong {
          font-size: 13px;
        }
        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }
        .modal-actions .button {
          flex: 1;
        }
      `}</style>
    </DashboardShell>
  )
}