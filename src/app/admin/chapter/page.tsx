"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { chapters, type Chapter, campuses, denominationRows, invitations } from "@/data/chapters"

type FormState = "none" | "create" | "invite"

type CreateChapterForm = {
  name: string
  denominationId: string
  campus: string
  status: "draft" | "coming soon"
}

type InviteHeadForm = {
  email: string
  chapterId: string
}

export default function AdminChapterPage() {
  const [formState, setFormState] = useState<FormState>("none")
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "coming soon" | "draft">("all")
  const [filterCampus, setFilterCampus] = useState<"all" | typeof campuses[number]>("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  const [createForm, setCreateForm] = useState<CreateChapterForm>({
    name: "",
    denominationId: "",
    campus: campuses[0],
    status: "draft",
  })

  const [inviteForm, setInviteForm] = useState<InviteHeadForm>({
    email: "",
    chapterId: "",
  })

  const filteredChapters = chapters.filter((chapter) => {
    const matchesStatus = filterStatus === "all" || chapter.status === filterStatus
    const matchesCampus = filterCampus === "all" || chapter.campus === filterCampus
    const matchesSearch =
      chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.denomination.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesCampus && matchesSearch
  })

  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!createForm.name.trim() || !createForm.denominationId) return

    const statusLabel = createForm.status === "draft" ? "draft" : "coming soon"
    alert(
      `Chapter "${createForm.name}" created successfully with status "${statusLabel}".\n\n` +
      `Campus: ${createForm.campus}\n` +
      `Next step: Invite a chapter head to complete the setup and activate this chapter.`
    )
    
    setCreateForm({ name: "", denominationId: "", campus: campuses[0], status: "draft" })
    setFormState("none")
  }

  const handleInviteHead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteForm.email.trim() || !inviteForm.chapterId) return

    const chapter = chapters.find(c => c.name === inviteForm.chapterId)
    alert(
      `Invitation sent to ${inviteForm.email} for "${chapter?.name}".\n\n` +
      `They will receive an email with login credentials and instructions to complete the chapter setup.`
    )
    
    setInviteForm({ email: "", chapterId: "" })
    setFormState("none")
  }

  const resetForm = () => {
    setFormState("none")
    setCreateForm({ name: "", denominationId: "", campus: campuses[0], status: "draft" })
    setInviteForm({ email: "", chapterId: "" })
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Chapter management</p>
          <h1>Chapters & assignments.</h1>
          <p className="intro">
            Create chapter shells, assign chapter heads, and oversee the chapter lifecycle.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="button button-outline"
            onClick={() => setFormState(formState === "invite" ? "none" : "invite")}
            style={{ whiteSpace: "nowrap" }}
          >
            {formState === "invite" ? "Cancel" : "Invite chapter head"}
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setFormState(formState === "create" ? "none" : "create")}
            style={{ whiteSpace: "nowrap" }}
          >
            {formState === "create" ? "Cancel" : "+ New chapter"}
          </button>
        </div>
      </div>

      {/* Create Chapter Form */}
      {formState === "create" && (
        <div style={{
          background: "var(--cream)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "24px",
          marginBottom: "32px",
          animation: "fadeIn 0.2s ease",
        }}>
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Create chapter shell</h3>
          <form onSubmit={handleCreateChapter}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label htmlFor="chapter-name" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "6px",
                  color: "var(--ink)",
                }}>
                  Chapter name *
                </label>
                <input
                  id="chapter-name"
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g. Campus Christian Fellowship"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="denomination" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "6px",
                  color: "var(--ink)",
                }}>
                  Denomination *
                </label>
                <select
                  id="denomination"
                  value={createForm.denominationId}
                  onChange={(e) => setCreateForm({ ...createForm, denominationId: e.target.value })}
                  required
                >
                  <option value="">Select denomination</option>
                  {denominationRows.map(([name], idx) => (
                    <option key={idx} value={String(idx + 1)}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label htmlFor="campus" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "6px",
                  color: "var(--ink)",
                }}>
                  Campus *
                </label>
                <select
                  id="campus"
                  value={createForm.campus}
                  onChange={(e) => setCreateForm({ ...createForm, campus: e.target.value })}
                  required
                >
                  {campuses.map((campus) => (
                    <option key={campus} value={campus}>
                      {campus}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="initial-status" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "6px",
                  color: "var(--ink)",
                }}>
                  Initial status
                </label>
                <select
                  id="initial-status"
                  value={createForm.status}
                  onChange={(e) => setCreateForm({ ...createForm, status: e.target.value as "draft" | "coming soon" })}
                >
                  <option value="draft">Draft (not visible)</option>
                  <option value="coming soon">Coming soon (placeholder visible)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                className="button button-primary"
                disabled={!createForm.name.trim() || !createForm.denominationId}
              >
                Create chapter
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Invite Chapter Head Form */}
      {formState === "invite" && (
        <div style={{
          background: "var(--sage)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "24px",
          marginBottom: "32px",
          animation: "fadeIn 0.2s ease",
        }}>
          <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--ink)" }}>
            Invite chapter head
          </h3>
          <form onSubmit={handleInviteHead}>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="head-email" style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "var(--ink)",
              }}>
                Email address *
              </label>
              <input
                id="head-email"
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                placeholder="chapterhead@example.com"
                required
                autoFocus
                style={{ background: "white" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="assign-chapter" style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "var(--ink)",
              }}>
                Assign to chapter *
              </label>
              <select
                id="assign-chapter"
                value={inviteForm.chapterId}
                onChange={(e) => setInviteForm({ ...inviteForm, chapterId: e.target.value })}
                required
                style={{ background: "white" }}
              >
                <option value="">Select a chapter</option>
                {chapters
                  .filter(c => c.status === "draft" || c.status === "coming soon")
                  .map((chapter) => (
                    <option key={chapter.name} value={chapter.name}>
                      {chapter.name} ({chapter.campus})
                    </option>
                  ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                className="button button-primary"
                disabled={!inviteForm.email.trim() || !inviteForm.chapterId}
              >
                Send invitation
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters — compact toolbar */}
      <div className="admin-filters">
        <input
          type="search"
          placeholder="Search chapters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="admin-filters-search"
          aria-label="Search chapters"
        />
        <select
          value={filterCampus}
          onChange={(e) => setFilterCampus(e.target.value as any)}
          className="admin-filters-select"
          aria-label="Filter by campus"
        >
          <option value="all">All campuses</option>
          {campuses.map((campus) => (
            <option key={campus} value={campus}>
              {campus}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="admin-filters-select"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="coming soon">Coming soon</option>
          <option value="draft">Draft</option>
        </select>
        <span className="admin-filters-count">
          {filteredChapters.length} {filteredChapters.length === 1 ? "chapter" : "chapters"}
        </span>
      </div>

      {/* Chapters List */}
      {filteredChapters.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "var(--muted-foreground)",
        }}>
          <p style={{ fontSize: "15px", marginBottom: "8px" }}>
            {searchQuery || filterStatus !== "all" || filterCampus !== "all"
              ? "No chapters found matching your filters"
              : "No chapters yet"}
          </p>
          <p style={{ fontSize: "13px" }}>
            {searchQuery || filterStatus !== "all" || filterCampus !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first chapter to get started"}
          </p>
        </div>
      ) : (
        <div className="simple-list">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.name}
              className="simple-list-row"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedChapter(chapter)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedChapter(chapter)
                }
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ display: "block", marginBottom: "4px" }}>
                  {chapter.name}
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                  {chapter.denomination} · {chapter.campus}
                </span>
              </div>
              <span style={{
                fontSize: "12px",
                padding: "4px 10px",
                borderRadius: "6px",
                background: chapter.status === "active"
                  ? "var(--sage)"
                  : chapter.status === "coming soon"
                  ? "color-mix(in srgb, var(--moss) 15%, var(--cream))"
                  : "var(--cream)",
                color: chapter.status === "active"
                  ? "var(--moss)"
                  : "var(--muted-foreground)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}>
                {chapter.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontSize: "22px", fontFamily: "Georgia, serif", marginBottom: "16px" }}>
            Pending invitations
          </h2>
          <div className="simple-list">
            {invitations.map(([email, chapter, status]) => (
              <div key={email} className="simple-list-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", marginBottom: "4px", wordBreak: "break-all" }}>
                    {email}
                  </strong>
                  <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                    {chapter}
                  </span>
                </div>
                <span style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: status === "Accepted" ? "var(--sage)" : "var(--cream)",
                  color: status === "Accepted" ? "var(--moss)" : "var(--muted-foreground)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chapter Detail Modal */}
      {selectedChapter && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedChapter(null)} />
          <div className="modal-card" role="dialog" aria-modal="true">
            <div className="modal-head">
              <div className="modal-head-info">
                <div className="modal-head-text">
                  <h2>{selectedChapter.name}</h2>
                  <p>{selectedChapter.denomination}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChapter(null)}
                className="modal-close"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-grid">
              <div className="modal-field">
                <small>Campus</small>
                <strong>{selectedChapter.campus}</strong>
              </div>
              <div className="modal-field">
                <small>Status</small>
                <strong style={{
                  color: selectedChapter.status === "active" ? "var(--moss)" : "inherit",
                }}>
                  {selectedChapter.status}
                </strong>
              </div>
              {selectedChapter.day && (
                <div className="modal-field">
                  <small>Meeting day</small>
                  <strong>{selectedChapter.day}</strong>
                </div>
              )}
              {selectedChapter.time && (
                <div className="modal-field">
                  <small>Meeting time</small>
                  <strong>{selectedChapter.time}</strong>
                </div>
              )}
              {selectedChapter.location && (
                <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
                  <small>Location</small>
                  <strong>{selectedChapter.location}</strong>
                </div>
              )}
            </div>

            {selectedChapter.description && (
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                <small style={{
                  color: "var(--muted-foreground)",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "block",
                  marginBottom: "8px",
                }}>
                  Description
                </small>
                <p style={{ fontSize: "13px", lineHeight: "1.5", margin: 0 }}>
                  {selectedChapter.description}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <div style={{
        marginTop: "48px",
        paddingTop: "32px",
        borderTop: "1px solid var(--border)",
      }}>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.65" }}>
          <strong style={{ color: "var(--ink)", display: "block", marginBottom: "8px" }}>
            Chapter lifecycle
          </strong>
          Chapters start as <strong>draft</strong> (not visible) or <strong>coming soon</strong> (placeholder 
          visible to students). Once you invite and assign a chapter head, they complete the meeting details 
          and WhatsApp link to make the chapter <strong>active</strong> and fully joinable. Draft chapters 
          exist purely for administrative planning.
        </p>
      </div>

      <style jsx>{`
        .admin-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .admin-filters-search {
          flex: 1 1 180px;
          min-width: 160px;
          padding: 9px 12px !important;
          font-size: 13px !important;
        }
        .admin-filters-select {
          flex: 0 0 auto;
          min-width: 118px;
          padding: 9px 10px !important;
          font-size: 13px !important;
        }
        .admin-filters-count {
          margin-left: auto;
          font-size: 12px;
          color: var(--muted-foreground);
          white-space: nowrap;
          padding-left: 4px;
        }

        @media (max-width: 760px) {
          .admin-filters {
            gap: 8px;
          }
          .admin-filters-search {
            flex: 1 1 100%;
          }
          .admin-filters-select {
            flex: 1 1 calc(50% - 4px);
          }
          .admin-filters-count {
            margin-left: 0;
            width: 100%;
            padding-left: 0;
          }
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(32, 35, 31, 0.5);
          z-index: 999;
          animation: fadeIn 0.2s ease;
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
          width: min(500px, calc(100vw - 32px));
          max-height: calc(100vh - 64px);
          overflow-y: auto;
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
        .modal-head-text { min-width: 0; }
        .modal-head-text h2 {
          font-size: 20px;
          margin: 0;
          font-family: Georgia, serif;
          overflow-wrap: anywhere;
          line-height: 1.2;
        }
        .modal-head-text p {
          color: var(--muted-foreground);
          font-size: 13px;
          margin: 4px 0 0;
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

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 16px;
          padding: 14px 0;
          border-top: 1px solid var(--border);
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
      `}</style>
    </DashboardShell>
  )
}