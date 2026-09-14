import Link from "next/link"

export default function SignupPage() {
    return (
        <div className="auth-page">
            <div className="auth-left">
                <Link className="brand" href="/">
                    <span className="brand-mark">U</span>
                    <span>
                        UrCampus<span className="brand-light">Fellowship</span>
                    </span>
                </Link>
                <div className="auth-quote">
                    <p>&ldquo;Find your people. Grow together.&rdquo;</p>
                    <span>Join the community</span>
                </div>
            </div>
            <div className="auth-panel">
                <div className="auth-content">
                    <h1>Create account</h1>
                    <form className="auth-form">
                        <label>
                            Name
                            <input type="text" required />
                        </label>
                        <label>
                            Email
                            <input type="email" required />
                        </label>
                        <label>
                            Password
                            <input type="password" required />
                        </label>
                        <button className="button button-primary full">
                            Sign up <span>→</span>
                        </button>
                    </form>
                    <div className="form-foot">
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
