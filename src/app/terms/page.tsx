import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"

export default function TermsPage() {
  return (
    <PageShell>
      <div className="narrow">
        <p className="eyebrow">Legal</p>
        <h1>Terms of Service</h1>
        <p className="intro">
          Last updated: September 15, 2026
        </p>

        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>1. Acceptance of Terms</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            By accessing and using UrCampusFellowship ("the Platform"), you accept and agree to be bound 
            by the terms and provisions of this agreement. If you do not agree to these terms, please do 
            not use the Platform.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>2. Description of Service</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship is a platform designed to help students discover and connect with campus 
            fellowships and religious organizations. The Platform facilitates registration and provides 
            information about meeting times, locations, and community details.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>3. User Registration</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            <strong style={{ color: "var(--ink)" }}>Students:</strong> Registration requires a valid 
            email address and basic profile information. You agree to provide accurate and complete 
            information.
          </p>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            <strong style={{ color: "var(--ink)" }}>Chapter Heads:</strong> Chapter head accounts are 
            created by system administrators. You are responsible for maintaining the confidentiality 
            of your login credentials.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>4. User Conduct</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            You agree to use the Platform only for lawful purposes and in a way that does not infringe 
            the rights of others or restrict their use of the Platform. Prohibited behavior includes but 
            is not limited to:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Providing false or misleading information</li>
            <li style={{ marginBottom: "8px" }}>Registering for multiple fellowships simultaneously</li>
            <li style={{ marginBottom: "8px" }}>Harassing or threatening other users</li>
            <li style={{ marginBottom: "8px" }}>Attempting to gain unauthorized access to the Platform</li>
          </ul>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>5. Chapter Membership</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            Students may only be registered with one fellowship at a time. Chapter heads have the right 
            to moderate their roster and may remove members at their discretion. Removed members are free 
            to register with another fellowship.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. WhatsApp Integration</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            The Platform provides WhatsApp group links for fellowship communities. We are not responsible 
            for the content or moderation of these external WhatsApp groups. Your use of WhatsApp is 
            subject to WhatsApp's own terms of service.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>7. Data and Privacy</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            Your use of the Platform is also governed by our Privacy Policy. By using the Platform, you 
            consent to the collection and use of information as described in the Privacy Policy.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>8. Modifications to Service</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship reserves the right to modify or discontinue, temporarily or permanently, 
            the Platform (or any part thereof) with or without notice. We shall not be liable to you or 
            any third party for any modification, suspension, or discontinuance of the Platform.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>9. Limitation of Liability</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship is provided "as is" without warranties of any kind. We do not guarantee 
            the accuracy, completeness, or usefulness of any information on the Platform. We shall not be 
            liable for any indirect, incidental, special, consequential, or punitive damages resulting 
            from your use of the Platform.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>10. Changes to Terms</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We reserve the right to update these Terms of Service at any time. Changes will be effective 
            immediately upon posting to the Platform. Your continued use of the Platform after changes 
            are posted constitutes acceptance of the modified terms.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>11. Contact Information</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:support@urcampusfellowship.org" style={{ color: "var(--moss)", textDecoration: "underline" }}>
              support@urcampusfellowship.org
            </a>
          </p>
        </div>
      </div>
      <SiteFooter />
    </PageShell>
  )
}
