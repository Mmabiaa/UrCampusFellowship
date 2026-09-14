import Link from "next/link"
import type { ReactNode } from "react"

export function SiteHeader() {
  return (
    <header className="site-header landing-header">
      <Link className="brand" href="/" aria-label="UrCampusFellowship home">
        <span className="brand-mark" aria-hidden="true">U</span>
        <span>
          UrCampus<span className="brand-light">Fellowship</span>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/about">About us</Link>
        <Link className="header-pill" href="/how-it-works">
          How it works
        </Link>
      </nav>
    </header>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="page-space">{children}</main>
    </>
  )
}
