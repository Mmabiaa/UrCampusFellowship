"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { PageShell } from "@/components/common/site-header"

interface Campus {
  id: string
  name: string
}

interface Chapter {
  id: string
  name: string
  campuses?: { id: string; name: string }
  whatsapp_link?: string
}

function RegisterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const chapterId = searchParams.get("chapterId") || ""
  const chapterName = searchParams.get("chapter") || ""

  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    campusId: "",
    program: "",
    hall: "",
    level: "",
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const [chaptersRes, campusesRes] = await Promise.all([
          fetch('/api/public/chapters'),
          fetch('/api/public/campuses')
        ])

        let foundChapter: Chapter | null = null
        if (chaptersRes.ok) {
          const data = await chaptersRes.json()
          const list: Chapter[] = data.chapters || []
          foundChapter = list.find(
            (c) => c.id === chapterId || (chapterName && c.name.toLowerCase() === chapterName.toLowerCase())
          ) || null
          setChapter(foundChapter)
        }

        if (campusesRes.ok) {
          const data = await campusesRes.json()
          const list: Campus[] = data.campuses || []
          setCampuses(list)

          // Preselect campus from chapter if available, otherwise default to first
          if (foundChapter?.campuses?.id) {
            setFormData((prev) => ({ ...prev, campusId: foundChapter!.campuses!.id }))
          } else if (list.length > 0) {
            setFormData((prev) => ({ ...prev, campusId: list[0].id }))
          }
        }
      } catch {
        setError("Failed to load registration options. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [chapterId, chapterName])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.campusId !== "" &&
    formData.level !== "" &&
    formData.program.trim() !== "" &&
    formData.hall.trim() !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid || !chapter) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch('/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId: chapter.id,
          name: formData.name,
          phone: formData.phone,
          program: formData.program,
          hall: formData.hall,
          level: formData.level,
          campusId: formData.campusId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed. Please check your details.")
        setIsSubmitting(false)
        return
      }

      // Success — redirect to success screen
      const whatsapp = data.whatsapp_link || chapter.whatsapp_link || ""
      router.push(
        `/student/success?chapterId=${chapter.id}&whatsapp=${encodeURIComponent(whatsapp)}`
      )
    } catch {
      setError("Network error. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <PageShell>
        <div className="narrow">
          <p>Loading registration form...</p>
        </div>
      </PageShell>
    )
  }

  if (!chapter) {
    return (
      <PageShell>
        <div className="narrow">
          <h1>Chapter not found</h1>
          <p className="intro">Please select a valid fellowship to register.</p>
          <Link href="/student" className="button button-primary">
            Browse fellowships
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="narrow form-page">
        <Link href={`/student/chapter?id=${chapter.id}`} className="back-link">
          ← Back to chapter
        </Link>

        <h1>Join {chapter.name}</h1>
        <p className="intro">
          Fill in your details below. Once submitted, you'll get instant access to the
          fellowship's official WhatsApp group.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Boateng Prince"
                required
              />
            </label>

            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0241234567"
                required
              />
            </label>

            <label>
              Campus
              <select
                name="campusId"
                value={formData.campusId}
                onChange={handleChange}
                required
              >
                {campuses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Level
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Select level</option>
                <option value="100">Level 100</option>
                <option value="200">Level 200</option>
                <option value="300">Level 300</option>
                <option value="400">Level 400</option>
                <option value="postgrad">Postgraduate</option>
              </select>
            </label>

            <label>
              Program
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="e.g. Computer Science & Eng."
                required
              />
            </label>

            <label>
              Hall / Hostel
              <input
                type="text"
                name="hall"
                value={formData.hall}
                onChange={handleChange}
                placeholder="e.g. Unity Hall"
                required
              />
            </label>
          </div>

          {error && (
            <p style={{ color: "var(--destructive)", fontSize: "14px", marginTop: "16px", fontWeight: "bold" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="button button-primary"
            disabled={!isFormValid || isSubmitting}
            style={{
              marginTop: "24px",
              opacity: !isFormValid || isSubmitting ? 0.5 : 1,
              cursor: !isFormValid || isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Registering..." : "Complete registration"}
          </button>
        </form>

        <p className="small-note" style={{ marginTop: "16px", textAlign: "center" }}>
          By registering, you confirm that you're joining this fellowship on your campus.
        </p>
      </div>
    </PageShell>
  )
}

export function RegisterPage() {
  return (
    <Suspense fallback={
      <PageShell>
        <div className="narrow">
          <p>Loading...</p>
        </div>
      </PageShell>
    }>
      <RegisterContent />
    </Suspense>
  )
}
