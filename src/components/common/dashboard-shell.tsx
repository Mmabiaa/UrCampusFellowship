"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"

const dashboardNavigation = {
  head: {
    label: "Chapter head",
    overviewHref: "/heads",
    links: [
      { href: "/heads/setup", label: "Chapter setup" },
      { href: "/heads/roster", label: "Member roster" },
    ],
  },
  admin: {
    label: "System admin",
    overviewHref: "/admin",
    links: [
      { href: "/admin/denominations", label: "Denominations" },
      {
        href: "/admin/denominations/new",
        label: "Create denomination",
      },
      { href: "/admin/chapter/new", label: "Create chapter" },
    ],
  },
} as const

type DashboardRole = keyof typeof dashboardNavigation

type DashboardShellProps = {
  role: DashboardRole
  children: ReactNode
}

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

export function DashboardShell({ role, children }: DashboardShellProps) {
  const navigation = dashboardNavigation[role]
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const sideRef = useRef<HTMLElement>(null)

  const navLinks = [
    { href: navigation.overviewHref, label: "Overview" },
    ...navigation.links,
  ]

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (sideRef.current && !sideRef.current.contains(event.target as Node)) {
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

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="dashboard">
      <aside ref={sideRef} className="dash-side">
        <div className="dash-side-top">
          <Brand />
          <button
            type="button"
            className={`hamburger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="side-label">{navigation.label}</div>

        <nav
          className={`dash-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label={`${navigation.label} navigation`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}

          <Link className="signout-mobile" href="/" onClick={() => setMenuOpen(false)}>
            Sign out
          </Link>
        </nav>

        <Link className="signout" href="/">
          Sign out
        </Link>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  )
}