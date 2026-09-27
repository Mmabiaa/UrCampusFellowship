"use client"

import { useEffect, useState } from "react"
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

export function HeadOverview() {
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        setIsLoading(true)
        const [chapRes, rosRes] = await Promise.all([
          fetch('/api/heads/chapter'),
          fetch('/api/heads/roster')
        ])

        if (chapRes.ok) {
          const cData = await chapRes.json()
          setChapter(cData.chapter || null)
        }
        if (rosRes.ok) {
          const rData = await rosRes.json()
          setMembers(rData.members || [])
        }
      } catch {
        // network error
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (isLoading) {
    return (
      <DashboardShell role="head">
        <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
          Loading your chapter overview...
        </div>
      </DashboardShell>
    )
  }

  const isActive = chapter?.status === "active"
  const isPending = chapter?.status === "pending_approval"
  const recentMembers = members.slice(0, 3)

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
            alt={chapter.name}
            style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div className="dash-user" aria-hidden="true">
            {chapter?.name ? chapter.name[0] : "C"}
          </div>
        )}
      </div>

      <div className="stat-grid">
        <div>
          <small>Total Members</small>
          <strong>{members.length}</strong>
          <span>Registered students</span>
        </div>
        <div>
          <small>Status</small>
          <strong className={isActive ? "green-text" : isPending ? "gold-text" : ""}>
            {isActive ? "Active" : isPending ? "Pending Admin Approval" : "Setup Required"}
          </strong>
          <span>{isActive ? "Visible in student directory" : "Action required"}</span>
        </div>
        <div>
          <small>Next Meeting</small>
          <strong>{chapter?.meeting_day || "Not set"}</strong>
          <span>{chapter?.meeting_time || "—"}</span>
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
            <em>{chapter?.name}</em>
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

      <div className="dash-section">
        <div className="section-heading">
          <h2>Recent members ({members.length})</h2>
          <Link href="/heads/roster" className="button-text">
            View all →
          </Link>
        </div>

        {recentMembers.length === 0 ? (
          <p style={{ color: "var(--muted-foreground)", fontSize: "14px", padding: "16px 0" }}>
            No registered members yet. Once students join, they will appear here.
          </p>
        ) : (
          <div className="member-list">
            {recentMembers.map((member, idx) => {
              const memberName = member.name || (member as any).full_name || "Member"
              const memberId = member.id || (member as any).membershipId || `mem-${idx}`
              const memberDate = member.created_at || (member as any).joinedAt
              return (
                <span key={memberId}>
                  <i aria-hidden="true">{memberName[0] ? memberName[0].toUpperCase() : "M"}</i>
                  <div>
                    <strong>{memberName}</strong>
                    <small>{member.program || "Student"} • Level {member.level || "N/A"}</small>
                  </div>
                  <small>{memberDate ? new Date(memberDate).toLocaleDateString() : ""}</small>
                  <Link href="/heads/roster" className="button-text">
                    View
                  </Link>
                </span>
              )
            })}
          </div>
        )}
      </div>

      {isPending && (
        <div className="notify-box" style={{ marginTop: "40px", background: "var(--butter)", borderColor: "var(--gold)" }}>
          <h2>Approval Pending</h2>
          <p>
            Your chapter registration has been submitted and is currently being reviewed by the administrator.
            Once approved, you will be able to complete setup and activate your fellowship.
          </p>
        </div>
      )}

      {!isActive && !isPending && (
        <div className="notify-box" style={{ marginTop: "40px" }}>
          <h2>Chapter Setup Incomplete</h2>
          <p>
            Add your meeting schedule (*Wednesday*, *5:30 PM*, *Old Lecture Theatre*) and official WhatsApp group link to activate your chapter for students.
          </p>
          <Link href="/heads/setup" className="button button-primary" style={{ marginTop: "20px" }}>
            Complete Setup Now →
          </Link>
        </div>
      )}
    </DashboardShell>
  )
}
