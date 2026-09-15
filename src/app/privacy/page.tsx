import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="narrow">
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="intro">
          Last updated: September 15, 2026
        </p>

        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>1. Introduction</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship ("we," "us," or "our") is committed to protecting your privacy. This 
            Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
            you use our Platform.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>2. Information We Collect</h2>
          
          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            Student Information
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            When you register as a student, we collect:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "24px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Email address</li>
            <li style={{ marginBottom: "8px" }}>Full name</li>
            <li style={{ marginBottom: "8px" }}>Phone number</li>
            <li style={{ marginBottom: "8px" }}>Campus location</li>
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
            <li style={{ marginBottom: "8px" }}>Email address and password</li>
            <li style={{ marginBottom: "8px" }}>Chapter details (meeting times, locations, descriptions)</li>
            <li style={{ marginBottom: "8px" }}>WhatsApp group links</li>
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
            <li style={{ marginBottom: "8px" }}>Enable chapter heads to view and manage their roster</li>
            <li style={{ marginBottom: "8px" }}>Prevent students from joining multiple fellowships simultaneously</li>
            <li style={{ marginBottom: "8px" }}>Send email verification codes and account notifications</li>
            <li style={{ marginBottom: "8px" }}>Improve and maintain the Platform</li>
            <li style={{ marginBottom: "8px" }}>Respond to user inquiries and support requests</li>
          </ul>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>4. Information Sharing and Disclosure</h2>
          
          <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "24px" }}>
            With Chapter Heads
          </h3>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "24px" }}>
            When you register with a fellowship, your profile information (name, email, phone, program, 
            hall, level) is shared with that chapter's head. This enables them to manage their community 
            and follow up with members.
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
            We use third-party services for authentication (Supabase) and email delivery (Google SMTP). 
            WhatsApp links direct you to external WhatsApp groups, which are governed by WhatsApp's 
            privacy policy.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>5. Data Security</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We implement appropriate technical and organizational measures to protect your personal 
            information. However, no method of transmission over the internet or electronic storage is 
            100% secure. While we strive to protect your data, we cannot guarantee absolute security.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. Your Rights and Choices</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            You have the right to:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Access and update your profile information</li>
            <li style={{ marginBottom: "8px" }}>Leave your current fellowship at any time</li>
            <li style={{ marginBottom: "8px" }}>Request deletion of your account and data</li>
            <li style={{ marginBottom: "8px" }}>Opt out of non-essential communications</li>
          </ul>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>7. Data Retention</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We retain your information for as long as your account is active or as needed to provide 
            services. When you leave a fellowship or delete your account, your data is removed from 
            active rosters, though we may retain certain information for legal or operational purposes.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>8. Children's Privacy</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            The Platform is intended for university students. We do not knowingly collect information 
            from individuals under 16 years of age. If we learn that we have collected personal 
            information from someone under 16, we will delete that information.
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
