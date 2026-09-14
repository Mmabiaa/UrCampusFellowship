import { PageShell } from "@/components/common/site-header"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <PageShell>
      <div className="narrow">
        <p className="eyebrow">How it works</p>
        <h1>Three simple steps.</h1>
        <p className="intro">
          Whether you&apos;re seeking community or leading one, getting started
          is straightforward.
        </p>

        <div style={{ marginTop: "72px" }}>
          <span className="step-number">01</span>
          <h3>Discover</h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
            Browse fellowships and denominations at your campus, or search to
            find the one you&apos;re looking for.
          </p>
        </div>

        <div style={{ marginTop: "56px" }}>
          <span className="step-number">02</span>
          <h3>Connect</h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
            See meeting details, location, and leadership for any fellowship
            that catches your eye. When you&apos;re ready, register in a
            minute and get instant access to the fellowship&apos;s WhatsApp
            group — no waiting, no approval process.
          </p>
        </div>

        <div style={{ marginTop: "56px" }}>
          <span className="step-number">03</span>
          <h3>Belong</h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
            Join a community, grow in faith, and build lasting friendships.
          </p>
        </div>

        <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>For chapter leaders</h2>
          <p className="intro" style={{ marginBottom: "24px" }}>
            Set up your chapter, manage your roster, and help students find
            your community. Our dashboard makes ministry management simple.
          </p>
          <Link className="button button-secondary" href="/heads">
            Learn more for leaders
          </Link>
        </div>
      </div>
    </PageShell>
  )
}