"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header ref={headerRef} className="site-header landing-header">
      <Link className="brand" href="/" aria-label="UrCampusFellowship home">
        <span className="brand-mark" aria-hidden="true">
          U
        </span>
        <span>
          UrCampus<span className="brand-light">Fellowship</span>
        </span>
      </Link>
      <button
        className={`hamburger ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        className={`header-nav ${menuOpen ? "nav-open" : ""}`}
        aria-label="Primary navigation"
      >
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          About us
        </Link>
        <Link
          className="header-pill"
          href="/how-it-works"
          onClick={() => setMenuOpen(false)}
        >
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