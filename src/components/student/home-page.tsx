"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
              <Link href="/student" className="landing-cta">
                Explore Fellowships
              </Link>
              <Link className="landing-secondary" href="/for-leaders">
                I lead a chapter
              </Link>
            </div>
          </div>

          <Image
            src="https://i.pinimg.com/736x/eb/c7/55/ebc755cc412d9ee54bdc4d2b314fc0c8.jpg"
            alt="Students gathered together at a campus fellowship"
            width={580}
            height={580}
            priority
            sizes="(max-width: 760px) 88vw, 580px"
            style={{
              width: "100%",
              height: "auto",
              marginTop: "70px",
              borderRadius: "16px",
            }}
          />
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