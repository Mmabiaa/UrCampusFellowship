"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brand } from "@/components/common/site-header"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingRight: "44px", width: "100%" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    padding: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "inherit",
                    opacity: 0.6,
                  }}
                >
                  {showPassword ? (
                    // Eye-off icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
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
          </form> <br />
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