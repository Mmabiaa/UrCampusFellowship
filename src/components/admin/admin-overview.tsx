"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { RejectChapterModal } from "@/components/admin/reject-chapter-modal"

interface AdminStats {
  totalChapters: number
  activeChapters: number
  pendingApprovals: number
  totalMembers: number
}

interface PendingChapter {
  id: string
  name: string
  created_at: string
  campuses?: { name: string }
  denominations?: { name: string }
  heads?: { name: string; email: string }
}

export function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [pendingChapters, setPendingChapters] = useState<PendingChapter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionMessage, setActionMessage] = useState("")
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<PendingChapter | null>(null)

  const loadAdminData = async () => {
    try {
      setIsLoading(true)
      const [statsRes, pendingRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/chapters/pending')
      ])

      if (statsRes.ok) {
        const sData = await statsRes.json()
        setStats(sData)
      }
      if (pendingRes.ok) {
        const pData = await pendingRes.json()
        setPendingChapters(pData.pending || [])
      }
    } catch {
      // network error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const handleApprove = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/admin/chapters/${id}/approve`, { method: 'POST' })
      if (res.ok) {
        setActionMessage(`Chapter "${name}" approved successfully!`)
        loadAdminData()
        setTimeout(() => setActionMessage(""), 4000)
      } else {
        alert("Failed to approve chapter.")
      }
    } catch {
      alert("Network error.")
    }
  }

  const handleReject = (chapter: PendingChapter) => {
    setSelectedChapter(chapter)
    setRejectModalOpen(true)
  }

  const handleRejectSuccess = () => {
    if (selectedChapter) {
      setActionMessage(`Chapter "${selectedChapter.name}" rejected.`)
    }
    loadAdminData()
    setTimeout(() => setActionMessage(""), 4000)
  }

  if (isLoading) {
    return (
      <DashboardShell role="admin">
        <div className="dash-header">
          <div>
            <div style={{ height: "11px", width: "200px", background: "var(--muted)", borderRadius: "4px", marginBottom: "16px", opacity: 0.5 }} />
            <div style={{ height: "42px", width: "280px", background: "var(--muted)", borderRadius: "8px", marginBottom: "12px", opacity: 0.5 }} />
            <div style={{ height: "17px", width: "400px", background: "var(--muted)", borderRadius: "4px", opacity: 0.5 }} />
          </div>
        </div>

        <div className="stat-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-stat">
              <div className="skeleton" style={{ height: "12px", width: "60%" }} />
              <div className="skeleton" style={{ height: "36px", width: "40%" }} />
              <div className="skeleton" style={{ height: "12px", width: "80%" }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: "48px" }}>
          <div style={{ height: "22px", width: "280px", background: "var(--muted)", borderRadius: "8px", marginBottom: "20px", opacity: 0.5 }} />
          <div style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "24px", background: "var(--cream)" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton-list-item" style={{ justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: "16px", width: "50%", marginBottom: "6px" }} />
                  <div className="skeleton" style={{ height: "13px", width: "70%", marginBottom: "4px" }} />
                  <div className="skeleton" style={{ height: "12px", width: "60%" }} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="skeleton" style={{ height: "32px", width: "80px", borderRadius: "12px" }} />
                  <div className="skeleton" style={{ height: "32px", width: "80px", borderRadius: "12px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Platform administration</p>
          <h1>System Overview</h1>
          <p className="intro">
            Overview of campus fellowship chapters, pending registrations, and platform activity.
          </p>
        </div>
      </div>

      {actionMessage && (
        <p style={{ padding: "12px 16px", background: "var(--sage)", color: "var(--moss)", borderRadius: "8px", fontWeight: "bold", marginBottom: "20px" }}>
          ✓ {actionMessage}
        </p>
      )}

      <div className="stat-grid">
        <div>
          <small>Total Chapters</small>
          <strong>{stats?.totalChapters ?? 0}</strong>
          <span>Across all campuses</span>
        </div>
        <div>
          <small>Active Chapters</small>
          <strong className="green-text">{stats?.activeChapters ?? 0}</strong>
          <span>Visible to students</span>
        </div>
        <div>
          <small>Pending Approvals</small>
          <strong className="gold-text">{stats?.pendingApprovals ?? pendingChapters.length}</strong>
          <span>Require admin review</span>
        </div>
        <div>
          <small>Registered Students</small>
          <strong>{stats?.totalMembers ?? 0}</strong>
          <span>Total platform members</span>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div style={{ marginTop: "48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", fontFamily: "Georgia, serif", margin: 0 }}>
            Pending Chapter Approvals ({pendingChapters.length})
          </h2>
        </div>

        {pendingChapters.length === 0 ? (
          <div style={{ background: "var(--cream)", padding: "24px", borderRadius: "10px", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
            No chapters currently pending approval.
          </div>
        ) : (
          <div className="simple-list">
            {pendingChapters.map((chap) => (
              <div key={chap.id} className="simple-list-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ display: "block", fontSize: "16px" }}>{chap.name}</strong>
                  <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                    {chap.denominations?.name || "Fellowship"} • {chap.campuses?.name || "Main Campus"}
                  </span>
                  <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>
                    Leader: {chap.heads?.name || "N/A"} ({chap.heads?.email || "N/A"})
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => handleApprove(chap.id, chap.name)}
                    style={{ padding: "6px 14px", fontSize: "13px" }}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => handleReject(chap)}
                    style={{ padding: "6px 14px", fontSize: "13px", borderColor: "var(--destructive)", color: "var(--destructive)" }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: "48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", fontFamily: "Georgia, serif", margin: 0 }}>
            Quick Links
          </h2>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link href="/admin/denominations" className="button button-outline">
            Manage Denominations →
          </Link>
          <Link href="/admin/chapter" className="button button-outline">
            Manage All Chapters →
          </Link>
          <Link href="/admin/campuses" className="button button-outline">
            Manage Campuses →
          </Link>
        </div>
      </div>

      {/* Reject Chapter Modal */}
      {selectedChapter && (
        <RejectChapterModal
          open={rejectModalOpen}
          onOpenChange={setRejectModalOpen}
          chapterId={selectedChapter.id}
          chapterName={selectedChapter.name}
          headEmail={selectedChapter.heads?.email || ""}
          onSuccess={handleRejectSuccess}
        />
      )}
    </DashboardShell>
  )
}
