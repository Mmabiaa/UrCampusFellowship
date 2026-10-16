"use client"

import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface Chapter {
  id: string
  name: string
  meeting_day?: string
  meeting_time?: string
  location?: string
  whatsapp_link?: string
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const chapterId = searchParams.get("chapterId") || ""
  const paramWhatsapp = searchParams.get("whatsapp") || ""

  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadChapter() {
      try {
        const res = await fetch('/api/public/chapters')
        if (res.ok) {
          const data = await res.json()
          const list: Chapter[] = data.chapters || []
          const found = list.find((c) => c.id === chapterId)
          if (found) setChapter(found)
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    }

    if (chapterId) {
      loadChapter()
    } else {
      setIsLoading(false)
    }
  }, [chapterId])

  const whatsappLink = paramWhatsapp || chapter?.whatsapp_link || "https://chat.whatsapp.com"

  if (isLoading) {
  return (
    <PageShell>
      <div className="success-screen">
        <div className="success-card">
          <div
            className="skeleton"
            style={{ width: 70, height: 70, borderRadius: "50%", margin: "0 auto 28px" }}
          />

          <div
            className="skeleton"
            style={{ height: 11, width: 140, margin: "0 auto 16px" }}
          />

          <div
            className="skeleton"
            style={{ height: 52, width: "85%", margin: "0 auto 24px" }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            <div className="skeleton" style={{ height: 17, width: "100%" }} />
            <div className="skeleton" style={{ height: 17, width: "95%" }} />
            <div className="skeleton" style={{ height: 17, width: "70%", margin: "0 auto" }} />
          </div>

          <div
            className="skeleton"
            style={{ height: 48, width: 220, margin: "0 auto", borderRadius: 12 }}
          />

          <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              <div className="skeleton" style={{ height: 14, width: "80%", margin: "0 auto" }} />
              <div className="skeleton" style={{ height: 14, width: "60%", margin: "0 auto" }} />
            </div>
            <div
              className="skeleton"
              style={{ height: 14, width: 180, margin: "0 auto" }}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}

  return (
    <PageShell>
      <div className="success-screen">
        <div className="success-card">
          <div className="success-mark" aria-label="Success">
            ✓
          </div>

          <p className="eyebrow">Registration complete</p>
          <h1>Welcome to {chapter?.name || "the Fellowship"}!</h1>

          <p>
            You're all set! Tap the button below to join the fellowship's official WhatsApp group
            and start connecting with your new community on campus.
          </p>
          <br />

          <a
            href={whatsappLink}
            className="button button-primary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: "8px" }}
          >
            Open WhatsApp Group →
          </a>

          <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontSize: "14px", color: "var(--muted-foreground)", marginBottom: "16px" }}>
              Next meeting: {chapter?.meeting_day || "Wednesday"} at {chapter?.meeting_time || "5:30 PM"}
              <br />
              <strong style={{ color: "var(--ink)" }}>{chapter?.location || "Old Lecture Theatre"}</strong>
            </p>

            <Link href="/student" className="button-text">
              Browse all fellowships →
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    </PageShell>
  )
}

export function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="success-screen">
          <div className="success-card">
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
