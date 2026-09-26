"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PageShell } from "@/components/common/site-header"

interface ChapterDetail {
  id: string
  name: string
  status: 'active' | 'coming_soon' | 'pending_approval' | 'draft'
  logo_url?: string
  meeting_day?: string
  meeting_time?: string
  location?: string
  description?: string
  denominations?: {
    id: string
    name: string
    logo_url?: string
  }
  campuses?: {
    id: string
    name: string
    logo_url?: string
  }
}

function ChapterDetailContent() {
  const searchParams = useSearchParams()
  const chapterId = searchParams.get("id") || ""
  const chapterName = searchParams.get("name") || ""

  const [chapter, setChapter] = useState<ChapterDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)
  const [waitlistSuccess, setWaitlistSuccess] = useState(false)
  const [waitlistError, setWaitlistError] = useState("")

  useEffect(() => {
    async function loadChapter() {
      try {
        setIsLoading(true)
        const res = await fetch('/api/public/chapters')
        if (res.ok) {
          const data = await res.json()
          const list: ChapterDetail[] = data.chapters || []
          const found = list.find(
            (c) => c.id === chapterId || (chapterName && c.name.toLowerCase() === chapterName.toLowerCase())
          )
          setChapter(found || null)
        }
      } catch {
        // Handle network error
      } finally {
        setIsLoading(false)
      }
    }

    loadChapter()
  }, [chapterId, chapterName])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chapter || !waitlistEmail) return

    setWaitlistSubmitting(true)
    setWaitlistError("")

    try {
      const res = await fetch('/api/student/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId: chapter.id, email: waitlistEmail }),
      })

      const data = await res.json()

      if (res.ok) {
        setWaitlistSuccess(true)
      } else {
        setWaitlistError(data.error || 'Failed to join waitlist')
      }
    } catch {
      setWaitlistError('Network error. Please try again.')
    } finally {
      setWaitlistSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <PageShell>
        <div className="narrow">
          <p>Loading chapter details...</p>
        </div>
      </PageShell>
    )
  }

  if (!chapter) {
    return (
      <PageShell>
        <div className="narrow">
          <Link href="/student" className="back-link">
            ← Back to directory
          </Link>
          <h1>Chapter not found</h1>
          <p className="intro">The fellowship you're looking for doesn't exist or is not available.</p>
        </div>
      </PageShell>
    )
  }

  const isActive = chapter.status === "active"
  const isComingSoon = chapter.status === "coming_soon" || chapter.status === "pending_approval"
  const logo = chapter.logo_url || chapter.denominations?.logo_url

  return (
    <PageShell>
      <div className="narrow">
        <Link href="/student" className="back-link">
          ← Back to directory
        </Link>

        <div className="chapter-hero" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="eyebrow">{chapter.denominations?.name || "Fellowship"}</p>
            <h1>{chapter.name}</h1>
            <p className="chapter-description">
              {chapter.description || "A vibrant community of students growing together in faith."}
            </p>
          </div>
          {logo ? (
            <img
              src={logo}
              alt={chapter.name}
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }}
            />
          ) : (
            <div className="chapter-seal" aria-hidden="true">
              {chapter.name[0]}
            </div>
          )}
        </div>

        {isActive && (
          <>
            <div className="details-row" style={{ marginTop: "24px" }}>
              <div>
                <small>Meeting day</small>
                <strong>{chapter.meeting_day || "—"}</strong>
              </div>
              <div>
                <small>Time</small>
                <strong>{chapter.meeting_time || "—"}</strong>
              </div>
              <div>
                <small>Location</small>
                <strong>{chapter.location || "—"}</strong>
              </div>
              <div>
                <small>Campus</small>
                <strong>{chapter.campuses?.name || "Main Campus"}</strong>
              </div>
            </div>

            <Link
              href={`/student/register?chapterId=${chapter.id}`}
              className="button button-primary"
              style={{ marginTop: "24px", display: "inline-block" }}
            >
              Register to join
            </Link>

            <p className="small-note" style={{ marginTop: "16px" }}>
              Registration takes less than a minute. You'll get instant access to the fellowship's
              WhatsApp group.
            </p>
          </>
        )}

        {isComingSoon && (
          <div className="notify-box" style={{ marginTop: "24px", padding: "32px", background: "var(--cream)", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <h2>Coming soon</h2>
            <p>
              This chapter is currently being set up by its leaders. Leave your email and we'll
              notify you as soon as registration opens.
            </p>

            {waitlistSuccess ? (
              <div style={{ marginTop: "20px", color: "var(--moss)", fontWeight: "bold" }}>
                ✓ You're on the list! We'll email you when registration opens.
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="inline-form" style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                  required
                  disabled={waitlistSubmitting}
                  style={{ flex: 1, padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)" }}
                />
                <button
                  type="submit"
                  className="button button-primary"
                  disabled={waitlistSubmitting}
                >
                  {waitlistSubmitting ? "Joining..." : "Notify me"}
                </button>
              </form>
            )}

            {waitlistError && (
              <p style={{ color: "var(--destructive)", fontSize: "14px", marginTop: "12px" }}>
                {waitlistError}
              </p>
            )}
          </div>
        )}
      </div>
    </PageShell>
  )
}

export function ChapterDetailPage() {
  return (
    <Suspense fallback={
      <PageShell>
        <div className="narrow">
          <p>Loading...</p>
        </div>
      </PageShell>
    }>
      <ChapterDetailContent />
    </Suspense>
  )
}
