"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/common/dashboard-shell"

interface Chapter {
  id: string
  name: string
  status: 'pending_approval' | 'coming_soon' | 'active'
  meeting_day?: string
  meeting_time?: string
  location?: string
  description?: string
  logo_url?: string
  campuses?: { name: string }
  denominations?: { name: string }
}

interface Member {
  id: string
  name: string
  program: string
  level: string
  created_at: string
}

function getInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "?"
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function HeadOverview() {
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(false)
      const [chapRes, rosRes] = await Promise.all([
        fetch('/api/heads/chapter'),
        fetch('/api/heads/roster')
      ])

      if (!chapRes.ok || !rosRes.ok) throw new Error("Request failed")

      const cData = await chapRes.json()
      const rData = await rosRes.json()
      setChapter(cData.chapter || null)
      setMembers(rData.members || [])
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  if (isLoading) {
    return (
      <DashboardShell role="head">
        <div aria-busy="true" aria-live="polite">
          <div className="dash-header">
            <div>
              <div style={{ height: "11px", width: "150px", background: "var(--muted)", borderRadius: "4px", marginBottom: "16px", opacity: 0.5 }} />
              <div style={{ height: "42px", width: "320px", background: "var(--muted)", borderRadius: "8px", marginBottom: "12px", opacity: 0.5 }} />
            </div>
            <div className="skeleton" style={{ width: 48, height: 48, borderRadius: "50%" }} />
          </div>

          <div className="stat-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton-stat">
                <div className="skeleton" style={{ height: "12px", width: "60%" }} />
                <div className="skeleton" style={{ height: "36px", width: "40%" }} />
                <div className="skeleton" style={{ height: "12px", width: "80%" }} />
              </div>
            ))}
          </div>

          <div className="dash-section">
            <div className="section-heading">
              <div className="skeleton" style={{ height: "30px", width: "200px" }} />
              <div className="skeleton" style={{ height: "14px", width: "100px" }} />
            </div>

            <div className="setup-list">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  <div className="skeleton" style={{ height: "13px", width: "120px" }} />
                  <div className="skeleton" style={{ height: "13px", width: "180px" }} />
                </span>
              ))}
            </div>
          </div>

          <div className="dash-section">
            <div className="section-heading">
              <div className="skeleton" style={{ height: "30px", width: "180px" }} />
              <div className="skeleton" style={{ height: "14px", width: "80px" }} />
            </div>

            <div className="member-list">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i}>
                  <div className="skeleton" style={{ width: 34, height: 34, borderRadius: "50%" }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ height: "14px", width: "60%", marginBottom: "6px" }} />
                    <div className="skeleton" style={{ height: "12px", width: "40%" }} />
                  </div>
                  <div className="skeleton" style={{ height: "12px", width: "80px" }} />
                  <div className="skeleton" style={{ height: "12px", width: "50px" }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell role="head">
        <div className="notify-box" role="alert">
          <h2>Couldn&apos;t load your dashboard</h2>
          <p>Check your connection and try again.</p>
          <button type="button" className="button button-primary" style={{ marginTop: "20px" }} onClick={loadDashboard}>
            Try again
          </button>
        </div>
      </DashboardShell>
    )
  }

  const isActive = chapter?.status === "active"
  const isPending = chapter?.status === "pending_approval"
  const isComingSoon = chapter?.status === "coming_soon"
  const recentMembers = members.slice(0, 3)

  const statusLabel = isActive
    ? "Active"
    : isPending
      ? "Pending approval"
      : isComingSoon
        ? "Coming soon"
        : "Setup required"

  const statusHint = isActive
    ? "Visible in student directory"
    : isPending
      ? "Waiting for admin review"
      : "Action required"

  return (
    <DashboardShell role="head">
      <div className="dash-header">
        <div>
          <p className="eyebrow">{chapter?.denominations?.name || "Chapter Leader"}</p>
          <h1>{chapter?.name || "Your Chapter Dashboard"}</h1>
        </div>
        {chapter?.logo_url ? (
          <img
            src={chapter.logo_url}
            alt={`${chapter.name} logo`}
            style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div className="dash-user" aria-hidden="true">
            {chapter?.name ? getInitials(chapter.name) : "C"}
          </div>
        )}
      </div>

      <div className="stat-grid">
        <div>
          <small>Total Members</small>
          <strong>{members.length}</strong>
          <span>{members.length === 1 ? "Registered student" : "Registered students"}</span>
        </div>
        <div>
          <small>Status</small>
          <strong className={isActive ? "green-text" : isPending || isComingSoon ? "gold-text" : ""}>
            {statusLabel}
          </strong>
          <span>{statusHint}</span>
        </div>
        <div>
          <small>Next Meeting</small>
          <strong>{chapter?.meeting_day || "Not set"}</strong>
          <span>{[chapter?.meeting_time, chapter?.location].filter(Boolean).join(" · ") || "—"}</span>
        </div>
      </div>

      <div className="dash-section">
        <div className="section-heading">
          <h2>Chapter information</h2>
          <Link href="/heads/setup" className="button-text">
            Edit details →
          </Link>
        </div>

        <div className="setup-list">
          <span>
            <strong>Chapter name</strong>
            <em>{chapter?.name || "Not set"}</em>
          </span>
          <span>
            <strong>Campus</strong>
            <em>{chapter?.campuses?.name || "Main Campus"}</em>
          </span>
          <span>
            <strong>Meeting day</strong>
            <em>{chapter?.meeting_day || "Not set"}</em>
          </span>
          <span>
            <strong>Meeting time</strong>
            <em>{chapter?.meeting_time || "Not set"}</em>
          </span>
          <span>
            <strong>Location</strong>
            <em>{chapter?.location || "Not set"}</em>
          </span>
        </div>
      </div>

      {isPending && (
        <div className="notify-box" role="status" style={{ marginTop: "40px", background: "var(--butter)", borderColor: "var(--gold)" }}>
          <h2>Approval Pending</h2>
          <p>
            Your chapter registration has been submitted and is currently being reviewed by the administrator.
            Once approved, you will be able to complete setup and activate your fellowship.
          </p>
        </div>
      )}

      {!isActive && !isPending && (
        <div className="notify-box" role="status" style={{ marginTop: "40px" }}>
          <h2>Chapter Setup Incomplete</h2>
          <p>
            Add your meeting schedule (e.g. Wednesday, 5:30 PM, Old Lecture Theatre) and official WhatsApp group link
            to activate your chapter for students.
          </p>
          <Link href="/heads/setup" className="button button-primary" style={{ marginTop: "20px" }}>
            Complete Setup Now →
          </Link>
        </div>
      )}
    </DashboardShell>
  )
}