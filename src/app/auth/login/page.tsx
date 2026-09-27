"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brand } from "@/components/common/site-header"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Invalid email or password.")
        setIsSubmitting(false)
        return
      }

      // Check role and redirect
      if (data.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/heads')
      }
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
          <p>&ldquo;Welcome back home.&rdquo;</p>
          <span>Continue your journey</span>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-content">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
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
              {isSubmitting ? "Signing in..." : "Sign in"} <span>→</span>
            </button>
          </form>
          <div className="form-foot">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">Sign up as Chapter Leader</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}