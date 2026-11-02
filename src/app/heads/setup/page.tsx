"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { ChapterInfoModal } from "@/components/heads/chapter-info-modal"

interface ChapterData {
  id: string
  name: string
  status: string
  meeting_day: string
  meeting_time: string
  location: string
  description: string
  whatsapp_link: string
  logo_url: string
  campuses?: { name: string }
  denominations?: { name: string }
}

export default function ChapterSetupPage() {
  const [chapter, setChapter] = useState<ChapterData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const fetchChapter = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/heads/chapter")
      if (res.ok) {
        const data = await res.json()
        setChapter(data.chapter || null)
      }
    } catch {
      setError("Failed to load chapter information.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChapter()
  }, [])

  const handleSuccess = () => {
    setMessage("Chapter setup updated successfully!")
    setTimeout(() => setMessage(""), 4000)
    fetchChapter()
  }

  const isSetupComplete =
    chapter?.meeting_day &&
    chapter?.meeting_time &&
    chapter?.location &&
    chapter?.whatsapp_link

  if (isLoading) {
    return (
      <DashboardShell role="head">
        <div className="dash-header">
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <div
              className="skeleton"
              style={{ height: "11px", width: "110px", marginBottom: "16px" }}
            />
            <div
              className="skeleton"
              style={{ height: "42px", width: "90%", marginBottom: "14px" }}
            />
            <div
              className="skeleton"
              style={{ height: "17px", width: "100%", marginBottom: "8px" }}
            />
            <div className="skeleton" style={{ height: "17px", width: "70%" }} />
          </div>
        </div>

        <div style={{ marginTop: "40px" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="simple-list-row"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div style={{ flex: 1 }}>
                <div
                  className="skeleton"
                  style={{ height: "15px", width: "40%", marginBottom: "6px" }}
                />
                <div className="skeleton" style={{ height: "13px", width: "60%" }} />
              </div>
              <div className="skeleton" style={{ height: "32px", width: "80px", borderRadius: "8px" }} />
            </div>
          ))}
        </div>
      </DashboardShell>
    )
  }

  if (!chapter) {
    return (
      <DashboardShell role="head">
        <div className="dash-header">
          <div>
            <p className="eyebrow">Chapter setup</p>
            <h1>No chapter found</h1>
            <p className="intro">Unable to load your chapter information.</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell role="head">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Chapter Setup</p>
          <h1>Keep your fellowship details current.</h1>
          <p className="intro">
            Update your meeting schedule and WhatsApp link that students receive upon joining.
          </p>
        </div>
        <button
          type="button"
          className="button button-primary"
          onClick={() => setShowModal(true)}
        >
          Edit Setup
        </button>
      </div>

      {message && (
        <p
          style={{
            padding: "12px 16px",
            background: "var(--sage)",
            color: "var(--moss)",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          ✓ {message}
        </p>
      )}

      {error && (
        <p
          style={{
            color: "var(--destructive)",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      {!isSetupComplete && (
        <div
          style={{
            background: "var(--butter)",
            border: "1px solid var(--gold)",
            borderRadius: "10px",
            padding: "16px 20px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "24px" }}>⚠️</span>
          <div>
            <strong style={{ display: "block", marginBottom: "4px", color: "var(--ink)" }}>
              Setup Incomplete
            </strong>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--accent-foreground)" }}>
              Please complete all required fields to activate your chapter.
            </p>
          </div>
        </div>
      )}

      <div className="simple-list">
        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Chapter Name
          </strong>
          <span style={{ fontSize: "15px" }}>{chapter.name}</span>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Denomination
          </strong>
          <span style={{ fontSize: "15px" }}>{chapter.denominations?.name || "—"}</span>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Campus
          </strong>
          <span style={{ fontSize: "15px" }}>{chapter.campuses?.name || "Main Campus"}</span>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Status
          </strong>
          <span
            style={{
              fontSize: "13px",
              padding: "4px 10px",
              borderRadius: "6px",
              background: chapter.status === "active" ? "var(--sage)" : "var(--cream)",
              color: chapter.status === "active" ? "var(--moss)" : "var(--muted-foreground)",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            {chapter.status}
          </span>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Meeting Schedule
          </strong>
          <span style={{ fontSize: "15px" }}>
            {chapter.meeting_day || "—"} {chapter.meeting_time ? `at ${chapter.meeting_time}` : ""}
          </span>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Location
          </strong>
          <span style={{ fontSize: "15px" }}>{chapter.location || "—"}</span>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Logo
          </strong>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {chapter.logo_url ? (
              <img
                src={chapter.logo_url}
                alt="Chapter logo"
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
                {chapter.name[0]}
              </div>
            )}
            <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
              {chapter.logo_url ? "Logo uploaded" : "No logo"}
            </span>
          </div>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "start" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Description
          </strong>
          <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
            {chapter.description || "—"}
          </span>
        </div>

        <div className="simple-list-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "center" }}>
          <strong style={{ fontSize: "14px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            WhatsApp Link
          </strong>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {chapter.whatsapp_link ? (
              <>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--moss)",
                    fontWeight: 600,
                  }}
                >
                  ✓ Configured
                </span>
                <a
                  href={chapter.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "13px",
                    color: "var(--moss)",
                    textDecoration: "underline",
                  }}
                >
                  View
                </a>
              </>
            ) : (
              <span style={{ fontSize: "15px" }}>—</span>
            )}
          </div>
        </div>
      </div>

      <ChapterInfoModal
        open={showModal}
        onOpenChange={setShowModal}
        chapterName={chapter.name}
        initialData={{
          meeting_day: chapter.meeting_day || "",
          meeting_time: chapter.meeting_time || "",
          location: chapter.location || "",
          description: chapter.description || "",
          whatsapp_link: chapter.whatsapp_link || "",
          logo_url: chapter.logo_url || "",
        }}
        onSuccess={handleSuccess}
      />
    </DashboardShell>
  )
}
