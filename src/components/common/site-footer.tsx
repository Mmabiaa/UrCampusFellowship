import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p className="footer-copy">
                    © {new Date().getFullYear()} UrCampusFellowship. All rights reserved.
                </p>
                <div className="footer-links">
                    <Link href="/terms">Terms of Service</Link>
                    <span className="footer-separator">•</span>
                    <Link href="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
