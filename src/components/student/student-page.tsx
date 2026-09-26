"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { PageShell } from "@/components/common/site-header"

interface Campus {
  id: string
  name: string
  logo_url?: string
}

interface Chapter {
  id: string
  name: string
  status: 'active' | 'coming_soon' | 'pending_approval' | 'draft'
  logo_url?: string
  meeting_day?: string
  meeting_time?: string
  location?: string
  description?: string
  denominations?: {
    id: string
    name: string
    logo_url?: string
  }
  campuses?: {
    id: string
    name: string
    logo_url?: string
  }
}

export function StudentPage() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [selectedCampusId, setSelectedCampusId] = useState<string>("all")
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [chaptersRes, campusesRes] = await Promise.all([
          fetch('/api/public/chapters'),
          fetch('/api/public/campuses')
        ])

        if (chaptersRes.ok) {
          const data = await chaptersRes.json()
          setChapters(data.chapters || [])
        }
        if (campusesRes.ok) {
          const data = await campusesRes.json()
          setCampuses(data.campuses || [])
        }
      } catch (err) {
        setError('Failed to load fellowships. Please try refreshing.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const visibleChapters = useMemo(() => {
    return chapters.filter((chapter) => {
      const matchesCampus =
        selectedCampusId === "all" || chapter.campuses?.id === selectedCampusId
      const matchesSearch =
        chapter.name.toLowerCase().includes(query.toLowerCase()) ||
        (chapter.denominations?.name || "").toLowerCase().includes(query.toLowerCase()) ||
        (chapter.campuses?.name || "").toLowerCase().includes(query.toLowerCase())

      return matchesCampus && matchesSearch
    })
  }, [chapters, selectedCampusId, query])

  return (
    <PageShell>
      <h1>Find your fellowship.</h1>
      <p className="intro">
        Communities meeting on campus to worship, grow, and serve together.
      </p>

      {/* Campus Selector Tabs */}
      <div className="choice-list" aria-label="Choose a campus" style={{ marginBottom: "24px" }}>
        <button
          className={`choice ${selectedCampusId === "all" ? "choice-selected" : ""}`}
          onClick={() => setSelectedCampusId("all")}
          type="button"
        >
          <strong>All Campuses</strong>
          <span aria-hidden="true">{selectedCampusId === "all" ? "●" : "○"}</span>
        </button>

        {campuses.map((c) => (
          <button
            className={`choice ${selectedCampusId === c.id ? "choice-selected" : ""}`}
            key={c.id}
            onClick={() => setSelectedCampusId(c.id)}
            type="button"
          >
            <strong>{c.name}</strong>
            <span aria-hidden="true">{selectedCampusId === c.id ? "●" : "○"}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        className="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search fellowships, denominations, or locations..."
        aria-label="Search fellowships"
      />

      {/* Chapter Grid */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "64px 0", color: "var(--muted-foreground)" }}>
          Loading campus fellowships...
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "48px", background: "var(--cream)", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--destructive)" }}>{error}</p>
        </div>
      ) : (
        <div className="chapter-grid">
          {visibleChapters.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                padding: "48px 24px",
                textAlign: "center",
                background: "var(--cream)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--muted-foreground)",
                  margin: "0 0 8px",
                  lineHeight: "1.6",
                }}
              >
                {query
                  ? `No fellowships found matching "${query}"`
                  : "No fellowships available under this selection yet."}
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
                {query ? "Try adjusting your search query." : "Check back soon or select another campus."}
              </p>
            </div>
          ) : (
            visibleChapters.map((chapter) => {
              const logo = chapter.logo_url || chapter.denominations?.logo_url
              return (
                <Link
                  className="chapter-card"
                  href={`/student/chapter?id=${chapter.id}`}
                  key={chapter.id}
                  style={{ position: 'relative' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    {logo ? (
                      <img
                        src={logo}
                        alt={chapter.name}
                        style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }}
                      />
                    ) : (
                      <span className="chapter-initial">{chapter.name[0]}</span>
                    )}
                    <div>
                      <h3 style={{ margin: 0 }}>{chapter.name}</h3>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted-foreground)' }}>
                        {chapter.denominations?.name || 'Fellowship'}
                      </p>
                    </div>
                  </div>

                  {chapter.campuses?.name && (
                    <span style={{ fontSize: '12px', color: 'var(--muted-foreground)', display: 'block', marginBottom: '8px' }}>
                      📍 {chapter.campuses.name}
                    </span>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto',
                      paddingTop: '12px',
                      width: '100%',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: chapter.status === 'active' ? 'var(--sage)' : '#FEF3C7',
                        color: chapter.status === 'active' ? 'var(--moss)' : '#92400E',
                      }}
                    >
                      {chapter.status === 'active' ? 'Active' : 'Coming Soon'}
                    </span>
                    <span className="card-arrow" style={{ marginTop: 0 }}>
                      View details →
                    </span>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      )}
    </PageShell>
  )
}