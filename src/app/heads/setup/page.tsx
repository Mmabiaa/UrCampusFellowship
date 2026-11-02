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
        <div className="info-row">
          <strong className="info-label">Chapter Name</strong>
          <span className="info-value">{chapter.name}</span>
        </div>

        <div className="info-row">
          <strong className="info-label">Denomination</strong>
          <span className="info-value">{chapter.denominations?.name || "—"}</span>
        </div>

        <div className="info-row">
          <strong className="info-label">Campus</strong>
          <span className="info-value">{chapter.campuses?.name || "Main Campus"}</span>
        </div>

        <div className="info-row">
          <strong className="info-label">Status</strong>
          <span
            className="status-badge"
            style={{
              background: chapter.status === "active" ? "var(--sage)" : "var(--cream)",
              color: chapter.status === "active" ? "var(--moss)" : "var(--muted-foreground)",
            }}
          >
            {chapter.status}
          </span>
        </div>

        <div className="info-row">
          <strong className="info-label">Meeting Schedule</strong>
          <span className="info-value">
            {chapter.meeting_day || "—"} {chapter.meeting_time ? `at ${chapter.meeting_time}` : ""}
          </span>
        </div>

        <div className="info-row">
          <strong className="info-label">Location</strong>
          <span className="info-value">{chapter.location || "—"}</span>
        </div>

        <div className="info-row">
          <strong className="info-label">Logo</strong>
          <div className="logo-display">
            {chapter.logo_url ? (
              <img
                src={chapter.logo_url}
                alt="Chapter logo"
                className="logo-image"
              />
            ) : (
              <div className="logo-placeholder">
                {chapter.name[0]}
              </div>
            )}
            <span className="logo-status">
              {chapter.logo_url ? "Logo uploaded" : "No logo"}
            </span>
          </div>
        </div>

        <div className="info-row">
          <strong className="info-label">Description</strong>
          <span className="info-value description-text">
            {chapter.description || "—"}
          </span>
        </div>

        <div className="info-row">
          <strong className="info-label">WhatsApp Link</strong>
          <div className="whatsapp-display">
            {chapter.whatsapp_link ? (
              <>
                <span className="whatsapp-status">✓ Configured</span>
                <a
                  href={chapter.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link"
                >
                  View
                </a>
              </>
            ) : (
              <span className="info-value">—</span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .info-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 24px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }

        .info-label {
          font-size: 14px;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .info-value {
          font-size: 15px;
          color: var(--ink);
        }

        .description-text {
          line-height: 1.6;
        }

        .status-badge {
          font-size: 13px;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 600;
          display: inline-block;
        }

        .logo-display {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-image {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border);
        }

        .logo-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--sage);
          color: var(--moss);
          display: grid;
          place-items: center;
          font-weight: bold;
        }

        .logo-status {
          font-size: 13px;
          color: var(--muted-foreground);
        }

        .whatsapp-display {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .whatsapp-status {
          font-size: 13px;
          color: var(--moss);
          font-weight: 600;
        }

        .whatsapp-link {
          font-size: 13px;
          color: var(--moss);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .info-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 14px 0;
          }

          .info-label {
            font-size: 12px;
          }

          .info-value {
            font-size: 14px;
          }

          .status-badge {
            font-size: 12px;
            padding: 3px 8px;
          }
        }

        @media (max-width: 480px) {
          .info-row {
            padding: 12px 0;
          }

          .logo-display {
            flex-direction: column;
            align-items: flex-start;
          }

          .whatsapp-display {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

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
