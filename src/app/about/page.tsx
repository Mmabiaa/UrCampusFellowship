import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <PageShell>
      <div className="narrow">
        <p className="eyebrow">About us</p>
        <h1>Building community on campus.</h1>
        <p className="intro">
          UrCampusFellowship helps students discover fellowships and
          denominations, connect with their campus community, and grow in
          faith together.
        </p>

        <figure className="about-photo">
          <Image
            src="https://i.pinimg.com/1200x/77/bb/ea/77bbea41d23660c2c51f4acab0495999.jpg"
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
            src="https://i.pinimg.com/736x/82/a2/c8/82a2c8291c1718acbb3964df7c12ac28.jpg"
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