"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand" href={href} aria-label="UrCampusFellowship home">
      <span className="brand-mark" aria-hidden="true">
        <Image
          src="https://i.pinimg.com/736x/59/a5/0a/59a50aa4fcda0cc8409b793810442756.jpg"
          alt=""
          width={30}
          height={30}
          className="brand-mark-img"
        />
      </span>
      <span>
        UrCampus<span className="brand-light">Fellowship</span>
      </span>
    </Link>
  )
}

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
      <Brand />
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