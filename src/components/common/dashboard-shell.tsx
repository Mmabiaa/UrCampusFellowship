import Link from "next/link"
import type { ReactNode } from "react"

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

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="UrCampusFellowship home">
      <span className="brand-mark">U</span>
      <span>
        UrCampus<span className="brand-light">Fellowship</span>
      </span>
    </Link>
  )
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  const navigation = dashboardNavigation[role]

  return (
    <div className="dashboard">
      <aside className="dash-side">
        <Brand />
        <div className="side-label">{navigation.label}</div>
        <nav className="dash-nav" aria-label={`${navigation.label} navigation`}>
          <Link className="active" href={navigation.overviewHref}>
            Overview
          </Link>
          {navigation.links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="signout" href="/">
          Sign out
        </Link>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  )
}
