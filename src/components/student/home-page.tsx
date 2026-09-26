"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/common/site-header"
import { WaitlistModal } from "@/components/student/waitlist-modal"

export function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <>
      <SiteHeader />
      <main className="home landing-home">
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-copy">
            <p className="landing-kicker">A home for campus fellowship</p>
            <h1 id="landing-title">
              Find your people.
              <br />
              Grow together.
            </h1>
            <p className="landing-lede">
              Discover fellowships and denominations on your campus, meet your community,
              and take the next step in your faith journey with UrCampusFellowship.
            </p>
            <div className="landing-actions">
              <button
                className="landing-cta"
              >
                <Link href="/student">
                  Explore Fellowships
                </Link>
              </button>
              <Link className="landing-secondary" href="/for-leaders">
                I lead a chapter
              </Link>
            </div>
          </div>
          <div className="landing-art" aria-label="Illustration of a campus gathering">
            <div className="landing-sun" />
            <div className="landing-arch">
              <div className="landing-arch-inner">
                <span className="landing-figure landing-figure-one" />
                <span className="landing-figure landing-figure-two" />
                <span className="landing-figure landing-figure-three" />
                <span className="landing-plant" />
              </div>
            </div>
          </div>
        </section>
        <div className="landing-proof" aria-label="What UrCampusFellowship helps you do">
          <span>Discover</span>
          <span>Connect</span>
          <span>Belong</span>
        </div>
      </main>
      <WaitlistModal open={showWaitlist} onOpenChange={setShowWaitlist} />
    </>
  )
}