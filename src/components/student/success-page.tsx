"use client"
import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { chapters } from "@/data/chapters"

function SuccessContent() {
  const searchParams = useSearchParams()
  const chapterName = searchParams.get("chapter") || ""
  
  const chapter = chapters.find((c) => c.name === chapterName)

  // Mock WhatsApp link - in production, this would come from the chapter data
  const whatsappLink = "https://chat.whatsapp.com"

  if (!chapter) {
    return (
      <div className="success-screen">
        <div className="success-card">
          <h1>Something went wrong</h1>
          <p>We couldn't find that chapter. Please try again.</p>
          <Link href="/student" className="button button-primary">
            Browse fellowships
          </Link>
        </div>
      </div>
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
        <h1>Welcome to {chapter.name}!</h1>
        
        <p>
          You're all set. Tap the button below to join the fellowship's WhatsApp group and
          start connecting with your new community.
        </p><br />

        <a
          href={whatsappLink}
          className="button button-primary"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: "8px" }}
        >
          Open WhatsApp group
        </a>

        <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", marginBottom: "16px" }}>
            Next meeting: {chapter.day} at {chapter.time}
            <br />
            <strong style={{ color: "var(--ink)" }}>{chapter.location}</strong>
          </p>

          <Link href="/student" className="button-text">
            Back to fellowships →
          </Link>
        </div>
      </div><SiteFooter />
    </div></PageShell>
  )
}

export function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="success-screen">
        <div className="success-card">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
