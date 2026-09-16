"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { chapters } from "@/data/chapters"
import { PageShell } from "@/components/common/site-header"

const campusOptions = ["Main Campus", "Essikado"] as const

export function StudentPage() {
  const [campus, setCampus] = useState<(typeof campusOptions)[number]>("Main Campus")
  const [query, setQuery] = useState("")

  const visibleChapters = useMemo(
    () =>
      chapters.filter(
        (chapter) =>
          chapter.campus === campus &&
          chapter.status !== "draft" &&
          chapter.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [campus, query],
  )

  return (
    <PageShell>
      <h1>Find your fellowship.</h1>
      <p className="intro">Communities meeting around {campus}.</p>

      <div className="choice-list" aria-label="Choose a campus">
        {campusOptions.map((option) => (
          <button
            className={`choice ${campus === option ? "choice-selected" : ""}`}
            key={option}
            onClick={() => setCampus(option)}
            type="button"
          >
            <strong>{option}</strong>
            <span aria-hidden="true">{campus === option ? "●" : "○"}</span>
          </button>
        ))}
      </div>

      <input
        className="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search fellowships"
        aria-label="Search fellowships"
      />

      <div className="chapter-grid">
        {visibleChapters.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            padding: '48px 24px',
            textAlign: 'center',
            background: 'var(--cream)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          }}>
            <p style={{
              fontSize: '16px',
              color: 'var(--muted-foreground)',
              margin: '0 0 8px',
              lineHeight: '1.6'
            }}>
              {query ? `No fellowships found matching "${query}"` : 'No fellowships available on this campus yet.'}
            </p>
            <p style={{
              fontSize: '13px',
              color: 'var(--muted-foreground)',
              margin: 0
            }}>
              {query ? 'Try adjusting your search.' : 'Check back soon or explore other campus options.'}
            </p>
          </div>
        ) : (
          visibleChapters.map((chapter) => (
            <Link
              className="chapter-card"
              href={`/student/chapter?name=${encodeURIComponent(chapter.name)}`}
              key={chapter.name}
            >
              <span className="chapter-initial">{chapter.name[0]}</span>
              <h3>{chapter.name}</h3>
              <p>{chapter.denomination}</p>
              <span className="card-arrow">View chapter →</span>
            </Link>
          ))
        )}
      </div>
    </PageShell>
  )
}
