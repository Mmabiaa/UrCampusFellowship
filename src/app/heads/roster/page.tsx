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
        <div className="roster-table-skeleton">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton" style={{ width: 40, height: 40, borderRadius: "50%" }} />
              <div className="skeleton" style={{ height: "14px", width: "120px" }} />
              <div className="skeleton" style={{ height: "14px", width: "100px" }} />
              <div className="skeleton" style={{ height: "14px", width: "80px" }} />
              <div className="skeleton" style={{ height: "14px", width: "90px" }} />
              <div style={{ display: "flex", gap: "8px" }}>
                <div className="skeleton" style={{ height: "32px", width: "60px", borderRadius: "6px" }} />
                <div className="skeleton" style={{ height: "32px", width: "70px", borderRadius: "6px" }} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="roster-empty-state">
          <p>
            {searchQuery
              ? `No members found matching "${searchQuery}"`
              : "No registered members in your fellowship yet."}
          </p>
        </div>
      ) : (
        <div className="roster-table-container">
          <div className="roster-table-wrapper">
            <table className="roster-table">
              <thead>
                <tr>
                  <th className="th-name">Name</th>
                  <th className="th-phone">Phone</th>
                  <th className="th-program">Program</th>
                  <th className="th-level">Level</th>
                  <th className="th-hall">Hall</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr 
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="member-row"
                  >
                    <td className="td-name" data-label="Name">
                      <strong>{member.name || (member as any).full_name}</strong>
                    </td>
                    <td className="td-phone" data-label="Phone">
                      <span className="phone-text">{member.phone || "—"}</span>
                    </td>
                    <td className="td-program" data-label="Program">{member.program || "—"}</td>
                    <td className="td-level" data-label="Level">Level {member.level || "—"}</td>
                    <td className="td-hall" data-label="Hall">{member.hall || "—"}</td>
                    <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="action-btn btn-flag"
                          onClick={(e) => handleFlagMember(member, e)}
                          title="Flag this member"
                        >
                          <span className="btn-icon">🚩</span>
                          <span className="btn-text">Flag</span>
                        </button>
                        <button
                          type="button"
                          className="action-btn btn-remove"
                          onClick={(e) => handleRemoveMember(member, e)}
                          title="Remove this member"
                        >
                          <span className="btn-icon">✕</span>
                          <span className="btn-text">Remove</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Compact Member Detail Modal */}
      {selectedMember && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedMember(null)} />
          <div className="modal-card" role="dialog" aria-modal="true">
            <div className="modal-header">
              <h3>{selectedMember.name}</h3>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="modal-close"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{selectedMember.email || "—"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone</span>
                <span className="info-value">{selectedMember.phone || "—"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Program</span>
                <span className="info-value">{selectedMember.program || "—"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Level</span>
                <span className="info-value">Level {selectedMember.level}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Hall</span>
                <span className="info-value">{selectedMember.hall || "—"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Campus</span>
                <span className="info-value">{selectedMember.campuses?.name || "Main Campus"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Joined</span>
                <span className="info-value">{new Date(selectedMember.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-btn btn-flag-modal"
                onClick={(e) => handleFlagMember(selectedMember, e)}
              >
                🚩 Flag
              </button>
              <button
                type="button"
                className="modal-btn btn-remove-modal"
                onClick={(e) => handleRemoveMember(selectedMember, e)}
              >
                ✕ Remove
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        /* Compact Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(32, 35, 31, 0.6);
          z-index: 999;
          backdrop-filter: blur(2px);
        }

        .modal-card {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: 2px solid var(--ink);
          border-radius: 10px;
          box-shadow: 4px 4px 0 var(--ink);
          width: min(460px, calc(100vw - 32px));
          max-height: calc(100vh - 80px);
          overflow-y: auto;
          z-index: 1000;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid var(--line);
          background: var(--sage);
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--ink);
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: var(--muted-foreground);
          padding: 4px 8px;
          line-height: 1;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: var(--line);
          color: var(--ink);
        }

        .modal-body {
          padding: 8px 20px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--line);
          gap: 16px;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .info-value {
          font-size: 14px;
          color: var(--ink);
          text-align: right;
          word-break: break-word;
        }

        .modal-footer {
          display: flex;
          gap: 10px;
          padding: 16px 20px;
          border-top: 1px solid var(--line);
          background: var(--cream);
        }

        .modal-btn {
          flex: 1;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: 2px solid;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-flag-modal {
          border-color: var(--gold);
          color: var(--accent-foreground);
          background: var(--butter);
        }

        .btn-flag-modal:hover {
          background: var(--gold);
          transform: translateY(-1px);
        }

        .btn-remove-modal {
          border-color: var(--destructive);
          color: var(--destructive);
          background: white;
        }

        .btn-remove-modal:hover {
          background: var(--destructive);
          color: white;
          transform: translateY(-1px);
        }

        /* Professional Table Styles */
        .roster-table-container {
          margin-top: 20px;
          background: var(--cream);
          border: 2px solid var(--ink);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 4px 4px 0 var(--ink);
        }

        .roster-table-wrapper {
          overflow-x: auto;
          background: white;
        }

        .roster-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: white;
        }

        .roster-table thead {
          background: linear-gradient(135deg, var(--moss) 0%, #4d5744 100%);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .roster-table th {
          padding: 16px 20px;
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--cream);
          border-right: 1px solid rgba(255, 253, 247, 0.15);
          white-space: nowrap;
        }

        .roster-table th:last-child {
          border-right: none;
        }

        .roster-table tbody tr {
          border-bottom: 1px solid var(--line);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .roster-table tbody tr:hover {
          background: var(--sage);
          transform: scale(1.002);
        }

        .roster-table tbody tr:last-child {
          border-bottom: none;
        }

        .roster-table td {
          padding: 16px 20px;
          font-size: 14px;
          color: var(--ink);
          border-right: 1px solid var(--line);
          vertical-align: middle;
          transition: all 0.2s ease;
        }

        .roster-table td:last-child {
          border-right: none;
        }

        .td-name {
          min-width: 180px;
        }

        .td-name strong {
          font-weight: 600;
          color: var(--ink);
          font-size: 15px;
        }

        .td-email {
          min-width: 200px;
        }

        .email-text {
          color: var(--muted-foreground);
          font-size: 13px;
        }

        .td-program {
          min-width: 160px;
        }

        .td-level {
          min-width: 90px;
          font-weight: 600;
          color: var(--moss);
        }

        .td-hall {
          min-width: 120px;
        }

        .td-actions {
          min-width: 190px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 7px;
          border: 2px solid;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .btn-flag {
          border-color: var(--gold);
          color: var(--accent-foreground);
          background: var(--butter);
        }

        .btn-flag:hover {
          background: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(232, 200, 120, 0.3);
        }

        .btn-remove {
          border-color: var(--destructive);
          color: var(--destructive);
        }

        .btn-remove:hover {
          background: var(--destructive);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(165, 111, 89, 0.3);
        }

        .btn-icon {
          font-size: 13px;
        }

        /* Responsive Design - Tablet */
        @media (max-width: 1024px) {
          .td-hall,
          .th-hall {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .td-email,
          .th-email {
            display: none;
          }
        }

        /* Responsive Design - Mobile List */
        @media (max-width: 768px) {
          .roster-table-container {
            border: 1px solid var(--line);
            box-shadow: none;
          }

          .roster-table-wrapper {
            border-radius: 0;
            background: transparent;
          }

          .roster-table,
          .roster-table thead,
          .roster-table tbody,
          .roster-table th,
          .roster-table td,
          .roster-table tr {
            display: block;
          }

          .roster-table thead {
            display: none;
          }

          .roster-table tbody tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 16px;
            margin-bottom: 0;
            border: none;
            border-bottom: 1px solid var(--line);
            border-radius: 0;
            background: white;
            box-shadow: none;
            cursor: pointer;
          }

          .roster-table tbody tr:hover {
            background: var(--sage);
            transform: none;
          }

          .roster-table tbody tr:last-child {
            border-bottom: none;
          }

          .roster-table td {
            padding: 0;
            border: none;
          }

          .roster-table td:before {
            display: none;
          }

          .td-name {
            flex: 1;
            min-width: 0;
          }

          .td-name strong {
            font-size: 15px;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .td-email,
          .td-program,
          .td-level,
          .td-hall {
            display: none;
          }

          .td-actions {
            width: auto;
            flex-shrink: 0;
          }

          .action-buttons {
            flex-direction: row;
            gap: 6px;
            margin: 0;
          }

          .action-btn {
            padding: 8px;
            font-size: 14px;
            border-width: 1px;
            min-width: 36px;
            justify-content: center;
          }

          .btn-text {
            display: none;
          }

          .btn-icon {
            font-size: 16px;
          }

          /* Modal adjustments for mobile */
          .modal-card {
            width: calc(100vw - 24px);
            max-height: calc(100vh - 40px);
          }

          .modal-header {
            padding: 14px 16px;
          }

          .modal-header h3 {
            font-size: 16px;
          }

          .modal-body {
            padding: 6px 16px;
          }

          .info-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            padding: 10px 0;
          }

          .info-value {
            text-align: left;
          }

          .modal-footer {
            padding: 12px 16px;
            flex-direction: column;
          }

          .modal-btn {
            width: 100%;
          }
        }
      `}</style>
    </DashboardShell>
  )
}