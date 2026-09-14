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
            Browse fellowships at your campus. Filter by denomination, meeting
            times, and what matters to you.
          </p>
        </div>

        <div style={{ marginTop: "56px" }}>
          <span className="step-number">02</span>
          <h3>Connect</h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
            Get details about meetings, locations, and leadership. Reach out or
            show up to your first gathering.
          </p>
        </div>

        <div style={{ marginTop: "56px" }}>
          <span className="step-number">03</span>
          <h3>Belong</h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
            Join a community, grow in faith, and build lasting friendships.
            Track your involvement and stay connected.
          </p>
        </div>

        <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>For chapter leaders</h2>
          <p className="intro" style={{ marginBottom: "24px" }}>
            Register your chapter, manage your roster, and help students find
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
