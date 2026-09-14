"use client"

import Link from "next/link"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { rosterMembers } from "@/data/chapters"

export function HeadOverview() {
  // Mock chapter data - in production, this would come from your database
  const chapter = {
    name: "Campus Christian Fellowship",
    status: "active",
    memberCount: 128,
    day: "Friday",
    time: "6:00 PM",
    location: "Fellowship Hall, Block C",
    campus: "Main Campus",
  }

  const recentMembers = rosterMembers.slice(0, 3)
  const isActive = chapter.status === "active"

  return (
    <DashboardShell role="head">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Your chapter</p>
          <h1>Good morning, Ama.</h1>
        </div>
        <div className="dash-user" aria-hidden="true">
          A
        </div>
      </div>

      <div className="stat-grid">
        <div>
          <small>Members</small>
          <strong>{chapter.memberCount}</strong>
          <span>Active community</span>
        </div>
        <div>
          <small>Status</small>
          <strong className={isActive ? "green-text" : ""}>{isActive ? "Active" : "Draft"}</strong>
          <span>{isActive ? "Visible to students" : "Not yet published"}</span>
        </div>
        <div>
          <small>Next meeting</small>
          <strong>{chapter.day}</strong>
          <span>{chapter.time}</span>
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
            <em>{chapter.name}</em>
          </span>
          <span>
            <strong>Campus</strong>
            <em>{chapter.campus}</em>
          </span>
          <span>
            <strong>Meeting day</strong>
            <em>{chapter.day}</em>
          </span>
          <span>
            <strong>Meeting time</strong>
            <em>{chapter.time}</em>
          </span>
          <span>
            <strong>Location</strong>
            <em>{chapter.location}</em>
          </span>
        </div>
      </div>

      <div className="dash-section">
        <div className="section-heading">
          <h2>Recent members</h2>
          <Link href="/heads/roster" className="button-text">
            View all →
          </Link>
        </div>

        <div className="member-list">
          {recentMembers.map((member) => (
            <span key={member[1]}>
              <i aria-hidden="true">{member[0]}</i>
              <div>
                <strong>{member[1]}</strong>
                <small>{member[2]}</small>
              </div>
              <small>2 days ago</small>
              <Link href="/heads/roster" className="button-text">
                View
              </Link>
            </span>
          ))}
        </div>
      </div>

      {!isActive && (
        <div className="notify-box" style={{ marginTop: "40px" }}>
          <h2>Chapter not yet active</h2>
          <p>
            Complete your chapter setup to make it visible to students. Add your meeting details
            and WhatsApp link to get started.
          </p>
          <Link href="/heads/setup" className="button button-primary" style={{ marginTop: "20px" }}>
            Complete setup
          </Link>
        </div>
      )}
    </DashboardShell>
  )
}
