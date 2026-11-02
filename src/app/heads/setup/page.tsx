"use client"

import { useCallback, useEffect, useState } from "react"
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

/* ---------- Inline icons ---------- */
const Svg = ({ children, size = 18 }: { children: React.ReactNode; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)
const CalendarIcon = () => (
  <Svg>
    <rect x="3" y="4" width="18" height="17" rx="3" />
    <path d="M3 9h18M8 2v4M16 2v4" />
  </Svg>
)
const PinIcon = () => (
  <Svg>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
)
const ChatIcon = () => (
  <Svg>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
  </Svg>
)
const TextIcon = () => (
  <Svg>
    <path d="M4 6h16M4 12h16M4 18h10" />
  </Svg>
)
const ImageIcon = () => (
  <Svg>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m21 16-5-5-8 8" />
  </Svg>
)
const PencilIcon = () => (
  <Svg>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
  </Svg>
)
const ChevronIcon = () => (
  <Svg size={16}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
)

export default function ChapterSetupPage() {
  const [chapter, setChapter] = useState<ChapterData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [descOpen, setDescOpen] = useState(false)

  const fetchChapter = useCallback(async () => {
    try {
      setIsLoading(true)
      setError("")
      const res = await fetch("/api/heads/chapter")
      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()
      setChapter(data.chapter || null)
    } catch {
      setError("Failed to load chapter information. Check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchChapter()
  }, [fetchChapter])

  const handleSuccess = () => {
    setMessage("Chapter setup updated")
    setTimeout(() => setMessage(""), 4000)
    fetchChapter()
  }

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  /* ---------- Loading ---------- */
  if (isLoading && !chapter) {
    return (
      <DashboardShell role="head">
        <div className="page">
          <div className="sk-head">
            <div className="sk sk-avatar" />
            <div className="sk-lines">
              <div className="sk" style={{ height: 18, width: "50%" }} />
              <div className="sk" style={{ height: 13, width: "32%" }} />
            </div>
          </div>
          <div className="sk" style={{ height: 300, borderRadius: 12 }} />
        </div>
        <style jsx>{`
          .page { max-width: 760px; margin: 0 auto; display: grid; gap: 20px; }
          .sk { background: var(--cream); border-radius: 8px; animation: pulse 1.4s ease-in-out infinite; }
          .sk-head { display: flex; align-items: center; gap: 12px; }
          .sk-avatar { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; }
          .sk-lines { flex: 1; display: grid; gap: 8px; }
          @keyframes pulse { 50% { opacity: 0.55; } }
          @media (prefers-reduced-motion: reduce) { .sk { animation: none; } }
        `}</style>
      </DashboardShell>
    )
  }

  /* ---------- Error / empty ---------- */
  if (!chapter) {
    return (
      <DashboardShell role="head">
        <div className="empty">
          <h1>{error ? "Couldn't load chapter" : "No chapter found"}</h1>
          <p>{error || "Your account isn't linked to a chapter yet. Contact your campus admin to get assigned."}</p>
          <button type="button" className="button button-primary" onClick={fetchChapter}>
            Try again
          </button>
        </div>
        <style jsx>{`
          .empty { max-width: 380px; margin: 72px auto; text-align: center; display: grid; gap: 10px; justify-items: center; padding: 0 16px; }
          h1 { margin: 0; font-size: 20px; color: var(--ink); }
          p { margin: 0 0 6px; font-size: 14px; line-height: 1.6; color: var(--muted-foreground); }
        `}</style>
      </DashboardShell>
    )
  }

  /* ---------- Derived ---------- */
  const required = [
    { label: "meeting day", done: !!chapter.meeting_day },
    { label: "meeting time", done: !!chapter.meeting_time },
    { label: "location", done: !!chapter.location },
    { label: "WhatsApp link", done: !!chapter.whatsapp_link },
  ]
  const doneCount = required.filter((r) => r.done).length
  const missing = required.filter((r) => !r.done).map((r) => r.label)
  const isSetupComplete = missing.length === 0
  const isActive = chapter.status === "active"
  const schedule = [chapter.meeting_day, chapter.meeting_time].filter(Boolean).join(" at ")
  const open = () => setShowModal(true)

  return (
    <DashboardShell role="head">
      <div className="page">
        {/* Compact header */}
        <header className="head">
          {chapter.logo_url ? (
            <img src={chapter.logo_url} alt="" className="avatar" />
          ) : (
            <div className="avatar avatar-fallback" aria-hidden="true">
              {chapter.name?.[0] || "C"}
            </div>
          )}
          <div className="head-text">
            <div className="title-row">
              <h1>{chapter.name}</h1>
              <span className={`badge ${isActive ? "badge-on" : "badge-off"}`}>{chapter.status}</span>
            </div>
            <p className="sub">
              {chapter.denominations?.name && <span>{chapter.denominations.name}</span>}
              {chapter.denominations?.name && <span className="sep" aria-hidden="true" />}
              <span>{chapter.campuses?.name || "Main Campus"}</span>
            </p>
          </div>
          <button type="button" className="button button-primary edit-btn" onClick={open}>
            <PencilIcon />
            <span className="edit-label-full">Edit setup</span>
            <span className="edit-label-short">Edit</span>
          </button>
        </header>

        {message && (
          <p className="notice notice-ok" role="status">
            {message}
          </p>
        )}
        {error && (
          <p className="notice notice-err" role="alert">
            {error}
          </p>
        )}

        {/* Slim setup banner */}
        {!isSetupComplete && (
          <div className="banner">
            <div className="banner-text">
              <strong>
                {doneCount} of {required.length} details added
              </strong>
              <span>Still needed: {missing.join(", ")}.</span>
              <div className="bar" aria-hidden="true">
                <div className="bar-fill" style={{ width: `${(doneCount / required.length) * 100}%` }} />
              </div>
            </div>
            <button type="button" className="banner-btn" onClick={open}>
              Continue
            </button>
          </div>
        )}

        {/* Grouped list */}
        <section className="group" aria-label="Chapter details">
          <div className="row">
            <button type="button" className="row-main" onClick={open}>
              <span className="row-icon"><CalendarIcon /></span>
              <span className="row-text">
                <span className="row-label">Meeting schedule</span>
                <span className={`row-value ${schedule ? "" : "empty"}`}>{schedule || "Not set"}</span>
              </span>
              {schedule ? <span className="chev"><ChevronIcon /></span> : <span className="add">Add</span>}
            </button>
          </div>

          <div className="row">
            <button type="button" className="row-main" onClick={open}>
              <span className="row-icon"><PinIcon /></span>
              <span className="row-text">
                <span className="row-label">Location</span>
                <span className={`row-value ${chapter.location ? "" : "empty"}`}>{chapter.location || "Not set"}</span>
              </span>
              {chapter.location ? <span className="chev"><ChevronIcon /></span> : <span className="add">Add</span>}
            </button>
          </div>

          <div className="row">
            <button type="button" className="row-main" onClick={open}>
              <span className="row-icon"><ChatIcon /></span>
              <span className="row-text">
                <span className="row-label">WhatsApp group</span>
                <span className={`row-value ${chapter.whatsapp_link ? "ok" : "empty"}`}>
                  {chapter.whatsapp_link ? "Link added" : "Not set"}
                </span>
              </span>
              {!chapter.whatsapp_link && <span className="add">Add</span>}
            </button>
            {chapter.whatsapp_link && (
              <div className="row-actions">
                <a href={chapter.whatsapp_link} target="_blank" rel="noopener noreferrer" className="link-btn">
                  Open
                </a>
                <button type="button" className="link-btn" onClick={() => copyLink(chapter.whatsapp_link)}>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>

          <div className="row">
            <button type="button" className="row-main" onClick={open}>
              <span className="row-icon"><TextIcon /></span>
              <span className="row-text">
                <span className="row-label">Description</span>
                <span className={`row-value clamp ${descOpen ? "open" : ""} ${chapter.description ? "" : "empty"}`}>
                  {chapter.description || "Not set"}
                </span>
              </span>
              {chapter.description ? <span className="chev"><ChevronIcon /></span> : <span className="add">Add</span>}
            </button>
            {chapter.description && chapter.description.length > 110 && (
              <div className="row-actions">
                <button
                  type="button"
                  className="link-btn link-btn-quiet"
                  aria-expanded={descOpen}
                  onClick={() => setDescOpen((v) => !v)}
                >
                  {descOpen ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </div>

          <div className="row">
            <button type="button" className="row-main" onClick={open}>
              <span className="row-icon"><ImageIcon /></span>
              <span className="row-text">
                <span className="row-label">Logo</span>
                <span className={`row-value ${chapter.logo_url ? "" : "empty"}`}>
                  {chapter.logo_url ? "Uploaded" : "Not uploaded"}
                </span>
              </span>
              {chapter.logo_url ? <span className="chev"><ChevronIcon /></span> : <span className="add">Add</span>}
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .page {
          max-width: 760px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
          min-width: 0;
          padding-left: env(safe-area-inset-left, 0px);
          padding-right: env(safe-area-inset-right, 0px);
          padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
        }
        h1, p { margin: 0; }
        .row-main, .link-btn, .banner-btn, .edit-btn { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }

        /* Header */
        .head { display: flex; align-items: center; gap: 12px; padding-bottom: 4px; }
        .avatar { width: 40px; height: 40px; border-radius: 10px; object-fit: cover; border: 1px solid var(--border); flex-shrink: 0; }
        .avatar-fallback { display: grid; place-items: center; background: var(--sage); color: var(--moss); font-weight: 700; border: none; }
        .head-text { flex: 1; min-width: 0; }
        .title-row { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 8px; }
        h1 { font-size: 18px; line-height: 1.3; font-weight: 700; color: var(--ink); overflow-wrap: anywhere; min-width: 0; }
        .badge { font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 6px; text-transform: capitalize; flex-shrink: 0; }
        .badge-on { background: var(--sage); color: var(--moss); }
        .badge-off { background: var(--cream); color: var(--muted-foreground); }
        .sub { display: flex; align-items: center; flex-wrap: wrap; gap: 2px 8px; font-size: 13px; line-height: 1.4; color: var(--muted-foreground); margin-top: 2px; min-width: 0; }
        .sub span:not(.sep) { overflow-wrap: anywhere; }
        .sep { width: 1px; height: 12px; background: var(--border); flex-shrink: 0; }
        .edit-btn { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .edit-label-short { display: none; }

        /* Notices */
        .notice { padding: 10px 14px; border-radius: 10px; font-size: 14px; font-weight: 600; }
        .notice-ok { background: var(--sage); color: var(--moss); }
        .notice-err { border: 1px solid var(--destructive); color: var(--destructive); }

        /* Banner */
        .banner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: var(--butter);
          border: 1px solid var(--gold);
          border-radius: 12px;
        }
        .banner-text { flex: 1; min-width: 0; display: grid; gap: 2px; font-size: 13px; color: var(--ink); }
        .banner-text strong { font-size: 14px; }
        .banner-text span { opacity: 0.75; }
        .bar { height: 4px; border-radius: 4px; background: rgba(0, 0, 0, 0.08); margin-top: 8px; overflow: hidden; }
        .bar-fill { height: 100%; background: var(--moss); border-radius: 4px; transition: width 500ms ease; }
        .banner-btn {
          font: inherit; font-size: 14px; font-weight: 600;
          min-height: 40px; padding: 0 14px; border-radius: 10px;
          border: 1px solid var(--gold); background: #fff; color: var(--ink); cursor: pointer; flex-shrink: 0;
        }

        /* Grouped list */
        .group { background: #fff; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .row { border-bottom: 1px solid var(--border); display: flex; align-items: center; }
        .row:last-child { border-bottom: none; }
        .row-main {
          flex: 1; min-width: 0;
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; min-height: 60px;
          background: none; border: none; font: inherit; color: inherit; text-align: left; cursor: pointer;
        }
        .row-main:hover { background: rgba(0, 0, 0, 0.02); }
        .row-main:active { background: rgba(0, 0, 0, 0.04); }
        .row-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: grid; place-items: center; flex-shrink: 0;
          background: var(--sage); color: var(--moss);
        }
        .row-text { flex: 1; min-width: 0; display: grid; gap: 1px; }
        .row-label { font-size: 13px; color: var(--muted-foreground); }
        .row-value { font-size: 15px; color: var(--ink); font-weight: 500; overflow-wrap: anywhere; }
        .row-value.empty { color: var(--muted-foreground); font-weight: 400; }
        .row-value.ok { color: var(--moss); }
        .row-value.clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-weight: 400; line-height: 1.5; }
        .row-value.clamp.open { display: block; overflow: visible; }
        .chev { color: var(--muted-foreground); display: flex; flex-shrink: 0; }
        .add { font-size: 14px; font-weight: 600; color: var(--moss); flex-shrink: 0; }
        .row-actions { display: flex; gap: 4px; padding-right: 12px; flex-shrink: 0; }
        .link-btn {
          font: inherit; font-size: 14px; font-weight: 600; color: var(--moss);
          background: none; border: none; cursor: pointer; text-decoration: none;
          min-height: 40px; padding: 0 10px; border-radius: 8px; display: inline-flex; align-items: center;
        }
        .link-btn:hover { background: var(--sage); }
        .link-btn-quiet { font-weight: 500; color: var(--muted-foreground); }

        :global(.button:focus-visible), .row-main:focus-visible, .link-btn:focus-visible, .banner-btn:focus-visible {
          outline: 2px solid var(--moss);
          outline-offset: -2px;
        }

        @media (max-width: 640px) {
          .page { gap: 12px; }
          .head { align-items: flex-start; gap: 10px; }
          .avatar { margin-top: 2px; }
          .edit-label-full { display: none; }
          .edit-label-short { display: inline; }
          .edit-btn { min-height: 44px; padding: 0 14px; }

          .banner { flex-direction: column; align-items: stretch; gap: 10px; }
          .banner-btn { width: 100%; min-height: 44px; }

          /* Put row actions on their own line so text never gets squeezed */
          .row { flex-wrap: wrap; }
          .row-main { flex: 1 1 100%; padding: 12px 14px; }
          .row-actions { flex: 1 1 100%; gap: 8px; padding: 0 14px 12px 58px; }
          .link-btn { flex: 1; justify-content: center; min-height: 44px; border: 1px solid var(--border); }
          .link-btn-quiet { flex: 0 0 auto; justify-content: flex-start; min-height: 36px; padding: 0; border: none; }
          .link-btn-quiet:hover { background: none; }
        }

        @media (max-width: 360px) {
          h1 { font-size: 17px; }
          .row-main { gap: 10px; padding: 12px; }
          .row-icon { width: 28px; height: 28px; }
          .row-actions { padding-left: 50px; padding-right: 12px; }
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