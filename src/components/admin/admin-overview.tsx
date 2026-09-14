"use client"

import { DashboardShell } from "@/components/common/dashboard-shell"
import { chapters, denominationRows } from "@/data/chapters"
import Link from "next/link"

export function AdminOverview() {
  const activeChapters = chapters.filter(c => c.status === "active").length
  const comingSoonChapters = chapters.filter(c => c.status === "coming soon").length
  const draftChapters = chapters.filter(c => c.status === "draft").length
  const mainCampusChapters = chapters.filter(c => c.campus === "Main Campus").length
  const essikadoChapters = chapters.filter(c => c.campus === "Essikado").length

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Platform administration</p>
          <h1>A clear view of community.</h1>
          <p className="intro">
            Structural overview of denominations and chapters. Manage the platform
            without seeing individual student data.
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <div>
          <small>Total chapters</small>
          <strong>{chapters.length}</strong>
          <span>Across all campuses</span>
        </div>
        <div>
          <small>Active</small>
          <strong className="green-text">{activeChapters}</strong>
          <span>Visible to students</span>
        </div>
        <div>
          <small>Coming soon</small>
          <strong style={{ color: "var(--moss)" }}>{comingSoonChapters}</strong>
          <span>Head assigned, setup pending</span>
        </div>
        <div>
          <small>Draft</small>
          <strong style={{ color: "var(--muted-foreground)" }}>{draftChapters}</strong>
          <span>Not yet assigned</span>
        </div>
      </div>

      <div style={{ marginTop: "48px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "20px",
        }}>
          <h2 style={{ fontSize: "22px", fontFamily: "Georgia, serif", margin: 0 }}>
            Campus distribution
          </h2>
        </div>
        
        <div style={{
          background: "var(--cream)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "20px",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}>
            <div>
              <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Main Campus</h3>
              <p style={{ 
                fontSize: "32px", 
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                margin: "0 0 4px",
                color: "var(--moss)",
              }}>
                {mainCampusChapters}
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
                chapters
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Essikado</h3>
              <p style={{ 
                fontSize: "32px", 
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                margin: "0 0 4px",
                color: "var(--moss)",
              }}>
                {essikadoChapters}
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
                chapters
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "20px",
        }}>
          <h2 style={{ fontSize: "22px", fontFamily: "Georgia, serif", margin: 0 }}>
            Denominations
          </h2>
          <Link href="/admin/denominations" className="button button-outline" style={{
            padding: "8px 16px",
            fontSize: "13px",
          }}>
            Manage denominations
          </Link>
        </div>

        <div className="simple-list">
          {denominationRows.map(([name, info]) => (
            <div key={name} className="simple-list-row">
              <strong>{name}</strong>
              <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                {info}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "48px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "20px",
        }}>
          <h2 style={{ fontSize: "22px", fontFamily: "Georgia, serif", margin: 0 }}>
            Recent chapters
          </h2>
          <Link href="/admin/chapter" className="button button-outline" style={{
            padding: "8px 16px",
            fontSize: "13px",
          }}>
            View all chapters
          </Link>
        </div>

        <div className="simple-list">
          {chapters.slice(0, 5).map((chapter) => (
            <div key={chapter.name} className="simple-list-row">
              <div>
                <strong>{chapter.name}</strong>
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
              }}>
                {chapter.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: "56px",
        paddingTop: "32px",
        borderTop: "1px solid var(--border)",
      }}>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.65" }}>
          <strong style={{ color: "var(--ink)", display: "block", marginBottom: "8px" }}>
            About platform administration
          </strong>
          As the System Admin, you manage the structural components of UrCampusFellowship:
          denominations, chapter shells, and chapter head accounts. Individual student roster
          data belongs to chapter heads and is not visible from this dashboard by default.
        </p>
      </div>
    </DashboardShell>
  )
}
