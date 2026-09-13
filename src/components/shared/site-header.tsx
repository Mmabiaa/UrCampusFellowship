"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="UrCampusFellowship home">
      <span className="grid size-9 place-items-center border border-primary/25 bg-primary text-primary-foreground">
        <Leaf className="size-4" />
      </span>
      <span className={compact ? "hidden sm:block" : "block"}>
        <strong className="block font-display text-[1.04rem] leading-none text-foreground">
          UrCampus
        </strong>
        <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Fellowship
        </span>
      </span>
    </Link>
  );
}

const studentLinks = [
  { to: "/directory", label: "Find a fellowship" },
  { to: "/profile", label: "My profile" },
] as const;

const headLinks = [
  { to: "/head/chapter", label: "Chapter details" },
  { to: "/head/members", label: "Members" },
] as const;

const adminLinks = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/denominations", label: "Denominations" },
  { to: "/admin/chapters/new", label: "New chapter" },
] as const;

export function SiteHeader({ mode = "public" }: { mode?: "public" | "student" | "head" | "admin" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = mode === "admin" ? adminLinks : mode === "head" ? headLinks : studentLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {mode !== "public" &&
              links.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`px-3 py-2 text-sm font-semibold transition-colors ${
                    pathname === item.to
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          {mode === "public" ? (
            <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
              Chapter head / Admin
            </Link>
          ) : (
            <span className="hidden border-l border-border pl-4 text-xs font-bold uppercase tracking-[0.12em] text-clay md:block">
              {mode === "head" ? "Chapter head" : mode}
            </span>
          )}
          {mode !== "public" && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
            >
              {open ? <X /> : <Menu />}
            </Button>
          )}
        </div>
      </div>
      {open && mode !== "public" && (
        <nav className="border-t border-border bg-card px-5 py-3 md:hidden">
          {links.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 text-sm font-semibold last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
