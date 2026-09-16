"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { PageShell } from "@/components/common/site-header"
import { chapters } from "@/data/chapters"

function RegisterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const chapterName = searchParams.get("chapter") || ""
  
  const chapter = chapters.find((c) => c.name === chapterName)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    campus: chapter?.campus || "Main Campus",
    program: "",
    hall: "",
    level: "",
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid) {
      setError("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call - checking for existing membership
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock: Check if already registered (in real app, this would be a server check)
    const existingMembership = false // This would come from your database

    if (existingMembership) {
      setError("You're already registered with Campus Christian Fellowship. Please leave that chapter first.")
      setIsSubmitting(false)
      return
    }

    // Success - redirect to success page with chapter info
    router.push(`/student/success?chapter=${encodeURIComponent(chapterName)}`)
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
        <Link href={`/student/chapter?name=${encodeURIComponent(chapterName)}`} className="back-link">
          ← Back to chapter
        </Link>

        <p className="eyebrow">Register</p>
        <h1>Join {chapter.name}</h1>
        <p className="intro">
          Fill in your details below. Once submitted, you'll get instant access to the
          fellowship's WhatsApp group.
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
                placeholder="e.g. Kwame Asante"
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
              <select name="campus" value={formData.campus} onChange={handleChange} required>
                <option value="Main Campus">Main Campus</option>
                <option value="Essikado">Essikado</option>
              </select>
            </label>

            <label>
              Level
              <select name="level" value={formData.level} onChange={handleChange} required>
                <option value="">Select level</option>
                <option value="100">Level 100</option>
                <option value="200">Level 200</option>
                <option value="300">Level 300</option>
                <option value="400">Level 400</option>
              </select>
            </label>

            <label>
              Program
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                required
              />
            </label>

            <label>
              Hall/Hostel
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
            <p style={{ color: "var(--destructive)", fontSize: "14px", marginTop: "16px" }}>
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
            {isSubmitting ? "Submitting..." : "Complete registration"}
          </button>
        </form>

        <p className="small-note" style={{ marginTop: "16px", textAlign: "center" }}>
          By registering, you confirm that you're not currently a member of another fellowship
          on this platform.
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
