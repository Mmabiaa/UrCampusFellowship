import { PageShell } from "@/components/common/site-header"
import Link from "next/link"

export default function AboutPage() {
  return (
    <PageShell>
      <div className="narrow">
        <p className="eyebrow">About us</p>
        <h1>Building community on campus.</h1>
        <p className="intro">
          UrCampusFellowship helps students discover Christian fellowships,
          connect with their campus community, and grow in faith together.
        </p>

        <div style={{ marginTop: "64px" }}>
          <h2>Our mission</h2>
          <p className="intro">
            We believe every student deserves a place to belong. Our platform
            bridges the gap between seeking students and thriving campus
            ministries.
          </p>
        </div>

        <div style={{ marginTop: "64px" }}>
          <h2>For students</h2>
          <p className="intro">
            Find fellowships that match your denomination, meet times, and
            community style. Discover your spiritual home on campus.
          </p>
        </div>

        <div style={{ marginTop: "64px" }}>
          <h2>For leaders</h2>
          <p className="intro">
            Manage your chapter, track attendance, and reach students looking
            for community. Simple tools for meaningful ministry.
          </p>
        </div>

        <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
          <Link className="button button-primary" href="/student">
            Explore fellowships
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
