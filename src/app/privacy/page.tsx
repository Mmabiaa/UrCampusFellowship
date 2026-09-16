import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="narrow">
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="intro">
          Last updated: September 16, 2026
        </p>

        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>1. Introduction</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our Platform. We handle personal data in line with
            Ghana&apos;s Data Protection Act, 2012 (Act 843).
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>2. Information We Collect</h2>

          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            Student Information
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            When you register as a student, we collect:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "24px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Email address (used to sign in and to identify your account)</li>
            <li style={{ marginBottom: "8px" }}>Full name</li>
            <li style={{ marginBottom: "8px" }}>Phone number (contact only, not used to sign in)</li>
            <li style={{ marginBottom: "8px" }}>Campus</li>
            <li style={{ marginBottom: "8px" }}>Academic program</li>
            <li style={{ marginBottom: "8px" }}>Hall/hostel</li>
            <li style={{ marginBottom: "8px" }}>Academic level</li>
            <li style={{ marginBottom: "8px" }}>Current chapter membership</li>
          </ul>

          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            Chapter Head Information
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            Chapter heads provide:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "24px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Name, email address, and a password</li>
            <li style={{ marginBottom: "8px" }}>Optional contact phone number</li>
            <li style={{ marginBottom: "8px" }}>Chapter details (meeting day, time, location, description)</li>
            <li style={{ marginBottom: "8px" }}>A WhatsApp group invite link for their chapter</li>
          </ul>

          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            Automatically Collected Information
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We may automatically collect certain information about your device, including IP address,
            browser type, and usage patterns through cookies and similar technologies.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>3. How We Use Your Information</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            We use the information we collect to:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Facilitate fellowship registration and membership management</li>
            <li style={{ marginBottom: "8px" }}>Enable chapter heads to view and manage their own roster</li>
            <li style={{ marginBottom: "8px" }}>Ensure a student is registered with only one fellowship at a time</li>
            <li style={{ marginBottom: "8px" }}>Send one-time sign-in codes and account notifications by email</li>
            <li style={{ marginBottom: "8px" }}>Improve and maintain the Platform</li>
            <li style={{ marginBottom: "8px" }}>Respond to user inquiries and support requests</li>
          </ul>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>4. Information Sharing and Disclosure</h2>

          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            With Chapter Heads
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "24px" }}>
            When you register with a fellowship, your profile information, including your name, email,
            phone number, program, hall, and level, is shared with that chapter’s head. This helps them manage
            their community and stay in touch with members.

            Chapter heads can only see members registered with their own chapter. They cannot access members
            from another chapter, even if both chapters belong to the same denomination.

          </p>

          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            With System Administrators
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "24px" }}>
            System administrators can view structural data (denominations, chapter counts, campus
            distribution) but do not have routine access to individual student roster information.
          </p>

          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            Third-Party Services
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We use third party services for authentication and data storage, including Supabase,
            and for email delivery through Google SMTP. We may also use an SMS provider in the future to deliver sign in codes.

            WhatsApp links take you to external WhatsApp groups. These groups are governed by WhatsApp’s
            own privacy policy. We do not create, manage, or monitor these groups.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>5. Data Security</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We implement appropriate technical and organizational measures to protect your personal
            information, including access controls that restrict each chapter head to their own
            chapter&apos;s data. However, no method of transmission over the internet or electronic
            storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute
            security.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. Your Rights and Choices</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            You have the right to:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Access and update your profile information</li>
            <li style={{ marginBottom: "8px" }}>Leave your current fellowship at any time, without needing approval</li>
            <li style={{ marginBottom: "8px" }}>Request deletion of your account and data</li>
            <li style={{ marginBottom: "8px" }}>Opt out of non-essential communications</li>
          </ul>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>7. Data Retention</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We retain your information for as long as your account is active or as needed to provide
            services. Because the Platform serves current students, accounts belonging to students who
            have completed their final year are removed periodically after graduation. When you leave a
            fellowship or delete your account, your data is removed from active rosters, though we may
            retain limited information where required for legal or operational purposes.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>8. Age Requirement</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            The Platform is intended for university students aged 18 and over. We do not knowingly
            collect information from anyone under 18. If we learn that we have collected personal
            information from someone under 18, we will delete that information.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>9. Changes to This Privacy Policy</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date. Your continued use of the Platform after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>10. Contact Us</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            If you have questions or concerns about this Privacy Policy or our data practices, please
            contact us at{" "}
            <a href="mailto:privacy@urcampusfellowship.org" style={{ color: "var(--moss)", textDecoration: "underline" }}>
              privacy@urcampusfellowship.org
            </a>
          </p>
        </div>
      </div>
      <SiteFooter />
    </PageShell>
  )
}