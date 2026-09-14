import Link from "next/link"
import { Brand } from "@/components/common/site-header"

export default function LoginPage() {
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
          <form className="auth-form">
            <label>
              Email
              <input type="email" required />
            </label>
            <label>
              Password
              <input type="password" required />
            </label>
            <button className="button button-primary full">
              Sign in <span>→</span>
            </button>
          </form>
          <div className="form-foot">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}