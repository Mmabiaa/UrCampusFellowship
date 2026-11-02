"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { ChapterForm } from "@/components/admin/chapter-form"

interface Option {
  id: string
  name: string
}

interface Chapter {
  id: string
  name: string
  status: string
  denomination_id?: string
  campus_id?: string
  meeting_day?: string
  meeting_time?: string
  location?: string
  description?: string
  logo_url?: string
  whatsapp_link?: string
  campuses?: { id?: string; name: string }
  denominations?: { id?: string; name: string }
}

export default function AdminChapterPage() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [denominations, setDenominations] = useState<Option[]>([])
  const [campuses, setCampuses] = useState<Option[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [chapRes, denRes, camRes] = await Promise.all([
        fetch("/api/admin/chapters"),
        fetch("/api/public/denominations"),
        fetch("/api/public/campuses"),
      ])

      if (chapRes.ok) {
        const cData = await chapRes.json()
        setChapters(cData.chapters || [])
      }
      if (denRes.ok) {
        const dData = await denRes.json()
        setDenominations(dData.denominations || [])
      }
      if (camRes.ok) {
        const caData = await camRes.json()
        setCampuses(caData.campuses || [])
      }
    } catch {
      setError("Failed to load chapter management data.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSuccess = () => {
    const action = editingChapter ? "updated" : "created"
    setMessage(`Chapter ${action} successfully!`)
    setTimeout(() => setMessage(""), 4000)
    setEditingChapter(null)
    loadData()
  }

  const openCreateModal = () => {
    setEditingChapter(null)
    setShowModal(true)
  }

  const openEditModal = (chap: Chapter) => {
    setEditingChapter(chap)
    setShowModal(true)
  }

  const filteredChapters =
    statusFilter === "all" ? chapters : chapters.filter((c) => c.status === statusFilter)

  const pendingCount = chapters.filter((c) => c.status === "pending_approval").length

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Chapter Management</p>
          <h1>Manage Chapters</h1>
          <p className="intro">Create and edit chapters with logos and meeting details.</p>
        </div>
        <button type="button" className="button button-primary" onClick={openCreateModal}>
          + New Chapter
        </button>
      </div>

      {message && (
        <p
          style={{
            padding: "12px 16px",
            background: "var(--sage)",
            color: "var(--moss)",
            borderRadius: "8px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          ✓ {message}
        </p>
      )}

      {error && (
        <p style={{ color: "var(--destructive)", fontWeight: "bold", marginBottom: "20px" }}>
          {error}
        </p>
      )}

      {/* Status Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "8px",
        }}
      >
        {[
          { key: "all", label: "All", count: chapters.length },
          { key: "pending_approval", label: "Pending Approval", count: pendingCount },
          { key: "active", label: "Active" },
          { key: "coming_soon", label: "Coming Soon" },
          { key: "draft", label: "Draft" },
        ].map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setStatusFilter(filter.key)}
            style={{
              background: statusFilter === filter.key ? "var(--moss)" : "transparent",
              color: statusFilter === filter.key ? "white" : "var(--muted-foreground)",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              position: "relative",
            }}
          >
            {filter.label}{" "}
            {filter.count !== undefined && filter.count > 0 && filter.key === "pending_approval" && (
              <span
                style={{
                  background: "var(--destructive)",
                  color: "white",
                  borderRadius: "10px",
                  padding: "2px 6px",
                  fontSize: "11px",
                  marginLeft: "6px",
                  fontWeight: "bold",
                }}
              >
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Chapters list */}
      {isLoading ? (
        <div className="simple-list">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="simple-list-row" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                <div
                  className="skeleton"
                  style={{ width: 44, height: 44, borderRadius: "50%" }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    className="skeleton"
                    style={{ height: "15px", width: "60%", marginBottom: "6px" }}
                  />
                  <div className="skeleton" style={{ height: "13px", width: "45%" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div
                  className="skeleton"
                  style={{ height: "24px", width: "60px", borderRadius: "6px" }}
                />
                <div
                  className="skeleton"
                  style={{ height: "32px", width: "80px", borderRadius: "12px" }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="simple-list">
          {filteredChapters.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--muted-foreground)" }}>
              No chapters found with status "{statusFilter}"
            </div>
          ) : (
            filteredChapters.map((chap) => (
              <div
                key={chap.id}
                className="simple-list-row"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                  onClick={() => setSelectedChapter(chap)}
                >
                  {chap.logo_url ? (
                    <img
                      src={chap.logo_url}
                      alt={chap.name}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid var(--border)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "var(--sage)",
                        color: "var(--moss)",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {chap.name[0]}
                    </div>
                  )}
                  <div>
                    <strong style={{ display: "block", fontSize: "15px" }}>{chap.name}</strong>
                    <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                      {chap.denominations?.name || "Fellowship"} •{" "}
                      {chap.campuses?.name || "Main Campus"}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: chap.status === "active" ? "var(--sage)" : "var(--cream)",
                      color:
                        chap.status === "active" ? "var(--moss)" : "var(--muted-foreground)",
                      fontWeight: 500,
                    }}
                  >
                    {chap.status}
                  </span>

                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => openEditModal(chap)}
                    style={{ padding: "6px 12px", fontSize: "13px" }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Chapter Details Modal */}
      {selectedChapter && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setSelectedChapter(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(32, 35, 31, 0.6)",
              zIndex: 999,
              backdropFilter: "blur(2px)",
            }}
          />
          <div
            className="modal-card"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              border: "2px solid var(--ink)",
              borderRadius: "10px",
              boxShadow: "4px 4px 0 var(--ink)",
              width: "min(480px, calc(100vw - 32px))",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "18px 20px",
                borderBottom: "1px solid var(--line)",
                background: "var(--sage)",
              }}
            >
              {selectedChapter.logo_url ? (
                <img
                  src={selectedChapter.logo_url}
                  alt={selectedChapter.name}
                  style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--moss)",
                    color: "var(--cream)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {selectedChapter.name[0]}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "18px", margin: 0 }}>{selectedChapter.name}</h2>
                <p style={{ margin: 0, color: "var(--muted-foreground)", fontSize: "13px" }}>
                  {selectedChapter.denominations?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChapter(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <small
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "11px",
                    display: "block",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  Campus
                </small>
                <strong style={{ fontSize: "14px" }}>
                  {selectedChapter.campuses?.name || "Main Campus"}
                </strong>
              </div>
              <div>
                <small
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "11px",
                    display: "block",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  Status
                </small>
                <strong
                  style={{
                    fontSize: "14px",
                    color: selectedChapter.status === "active" ? "var(--moss)" : "inherit",
                  }}
                >
                  {selectedChapter.status}
                </strong>
              </div>
              <div>
                <small
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "11px",
                    display: "block",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  Meeting Schedule
                </small>
                <strong style={{ fontSize: "14px" }}>
                  {selectedChapter.meeting_day || "N/A"}{" "}
                  {selectedChapter.meeting_time ? `at ${selectedChapter.meeting_time}` : ""}
                </strong>
              </div>
              <div>
                <small
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "11px",
                    display: "block",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  Location
                </small>
                <strong style={{ fontSize: "14px" }}>{selectedChapter.location || "N/A"}</strong>
              </div>
            </div>
          </div>
        </>
      )}

      <ChapterForm
        open={showModal}
        onOpenChange={setShowModal}
        chapter={editingChapter}
        denominations={denominations}
        campuses={campuses}
        onSuccess={handleSuccess}
      />
    </DashboardShell>
  )
}
