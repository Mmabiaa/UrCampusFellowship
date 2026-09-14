"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PageShell } from "@/components/common/site-header"
import { chapters } from "@/data/chapters"

function ChapterDetailContent() {
  const searchParams = useSearchParams()
  const chapterName = searchParams.get("name") || ""
  
  const chapter = chapters.find((c) => c.name === chapterName)

  if (!chapter) {
    return (
      <PageShell>
        <div className="narrow">
          <Link href="/student" className="back-link">
            ← Back to directory
          </Link>
          <h1>Chapter not found</h1>
          <p className="intro">The fellowship you're looking for doesn't exist.</p>
        </div>
      </PageShell>
    )
  }

  const isActive = chapter.status === "active"
  const isComingSoon = chapter.status === "coming soon"

  return (
    <PageShell>
      <div className="narrow">
        <Link href="/student" className="back-link">
          ← Back to directory
        </Link>

        <div className="chapter-hero">
          <div>
            <p className="eyebrow">{chapter.denomination}</p>
            <h1>{chapter.name}</h1>
            <p className="chapter-description">
              {chapter.description || "A vibrant community of students growing together in faith."}
            </p>
          </div>
          <div className="chapter-seal" aria-hidden="true">
            {chapter.name[0]}
          </div>
        </div>

        {isActive && (
          <>
            <div className="details-row">
              <div>
                <small>Meeting day</small>
                <strong>{chapter.day || "—"}</strong>
              </div>
              <div>
                <small>Time</small>
                <strong>{chapter.time || "—"}</strong>
              </div>
              <div>
                <small>Location</small>
                <strong>{chapter.location || "—"}</strong>
              </div>
              <div>
                <small>Campus</small>
                <strong>{chapter.campus}</strong>
              </div>
            </div>

            <Link
              href={`/student/register?chapter=${encodeURIComponent(chapter.name)}`}
              className="button button-primary full"
            >
              Register to join
              <span aria-hidden="true">→</span>
            </Link>

            <p className="small-note" style={{ marginTop: "16px" }}>
              Registration takes one minute. You'll get instant access to the fellowship's
              WhatsApp group.
            </p>
          </>
        )}

        {isComingSoon && (
          <div className="notify-box">
            <h2>Coming soon</h2>
            <p>
              This chapter is still being set up by its leaders. Leave your email and we'll
              notify you as soon as it's ready to join.
            </p>
            <div className="inline-form" style={{ marginTop: "24px" }}>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
              />
              <button type="button" className="button button-primary">
                Notify me
              </button>
            </div>
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
