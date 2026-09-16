import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <PageShell>
      <div className="narrow">
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
            See the meeting details, location, and leadership of any fellowship that catches your eye.
            When you are ready, register in just a minute and get instant access to the fellowship’s 
            WhatsApp group without waiting for approval.

          </p>
        </div>

        <div style={{ marginTop: "56px" }}>
          <span className="step-number">03</span>
          <h3>Belong</h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
            Join a community, grow in faith, and build lasting friendships.
          </p>
        </div> <br />

        <div style={{
            background: "var(--sage)",
            padding: "24px",
            borderRadius: "12px",
            marginBottom: "32px",
            display: "inline-block",
            maxWidth: "100%",
        }}>
            <h1 style={{ fontSize: "30px", marginBottom: "12px" }}>For chapter leaders</h1>
            <p className="intro" style={{
                color: "black",
                fontSize: "15px",
                lineHeight: "1.65",
                margin: 0,
                maxWidth: "360px",
            }}>
                Set up your chapter, manage your roster, and help students find
                your community. Our dashboard makes ministry management simple.
            </p>
        </div>
      </div>

      <Link className="button button-primary" href="/for-leaders">
            Learn more for leaders
          </Link>
      <SiteFooter />
    </PageShell>
  )
}