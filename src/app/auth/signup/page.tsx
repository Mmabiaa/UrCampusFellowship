"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brand } from "@/components/common/site-header"

interface Option {
  id: string
  name: string
}

export default function SignupPage() {
  const router = useRouter()
  const [denominations, setDenominations] = useState<Option[]>([])
  const [campuses, setCampuses] = useState<Option[]>([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    denominationId: "",
    chapterName: "",
    campusId: "",
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadOptions() {
      try {
        const [denRes, camRes] = await Promise.all([
          fetch('/api/public/denominations'),
          fetch('/api/public/campuses')
        ])

        if (denRes.ok) {
          const dData = await denRes.json()
          const list = dData.denominations || []
          setDenominations(list)
          if (list.length > 0) setFormData(prev => ({ ...prev, denominationId: list[0].id }))
        }

        if (camRes.ok) {
          const cData = await camRes.json()
          const list = cData.campuses || []
          setCampuses(list)
          if (list.length > 0) setFormData(prev => ({ ...prev, campusId: list[0].id }))
        }
      } catch {
        setError("Failed to load setup options. Please refresh.")
      }
    }

    loadOptions()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.chapterName || !formData.denominationId || !formData.campusId) {
      setError("Please fill in all fields.")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch('/api/auth/head/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Signup failed. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Success — redirect to Chapter Head Dashboard
      router.push('/heads')
    } catch {
      setError("Network error. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Brand />
        <div className="auth-quote">
          <p>&ldquo;Find your people. Grow together.&rdquo;</p>
          <span>Lead your campus fellowship</span>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-content">
          <h1>Register your chapter</h1>
          <p className="intro" style={{ marginBottom: "20px" }}>
            Sign up as a Chapter Head to onboard your fellowship community.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ama Osei"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. leader@gmail.com"
                required
              />
            </label>

            <label>
              Password (min. 8 characters)
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </label>

            <label>
              Denomination
              <select
                name="denominationId"
                value={formData.denominationId}
                onChange={handleChange}
                required
              >
                {denominations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Chapter name
              <input
                type="text"
                name="chapterName"
                value={formData.chapterName}
                onChange={handleChange}
                placeholder="e.g. PENSA UMaT Chapter"
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

            {error && (
              <p style={{ color: "var(--destructive)", fontSize: "14px", marginTop: "12px", fontWeight: "bold" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="button button-primary full"
              disabled={isSubmitting}
              style={{ marginTop: "20px", opacity: isSubmitting ? 0.6 : 1 }}
            >
              {isSubmitting ? "Registering chapter..." : "Sign up as Leader"} <span>→</span>
            </button>
          </form>

          <div className="form-foot" style={{ marginTop: "24px" }}>
            <p>
              Already have an account?{" "}
              <Link href="/auth/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}