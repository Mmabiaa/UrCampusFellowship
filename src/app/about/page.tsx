import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <PageShell>
      <div className="narrow">
        <h1>Building community on campus.</h1>
        <p className="intro">
          UrCampusFellowship helps students discover fellowships and
          denominations, connect with their campus community, and grow in
          faith together.
        </p>

        <figure className="about-photo">
          <Image
            src="https://i.pinimg.com/736x/76/72/df/7672df959fb82190d37af04c0d31fa44.jpg"
            alt="Students gathered together outdoors on campus, talking and laughing"
            width={1200}
            height={720}
            className="about-photo-img"
            priority
          />
          <figcaption>Students finding their people, one gathering at a time.</figcaption>
        </figure>

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
            Find fellowships that match your denomination and campus, 
            view meeting details upfront, and join instantly without waiting for approval.
          </p>
        </div>

        <div style={{ marginTop: "64px" }}>
          <h2>For leaders</h2>
          <p className="intro">
            Manage your chapter, keep your roster up to date, and reach
            students looking for community. Simple tools for meaningful
            ministry.
          </p>
        </div>

        <figure className="about-photo about-photo-wide">
          <Image
            src="https://i.pinimg.com/1200x/dd/72/90/dd7290a239c4cde38459056e7571dc2b.jpg"
            alt="A small group sitting in a circle, deep in conversation"
            width={1200}
            height={640}
            className="about-photo-img"
          />
          <figcaption>Real conversations, not just check-in sheets.</figcaption>
        </figure>

        <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
          <Link className="button button-primary" href="/student">
            Explore fellowships
          </Link>
        </div>
      </div>
      <SiteFooter />
    </PageShell>
  )
}