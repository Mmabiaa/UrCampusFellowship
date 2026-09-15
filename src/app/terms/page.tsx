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
            By accessing and using UrCampusFellowship (&quot;the Platform&quot;), you accept and agree to
            be bound by the terms and provisions of this agreement. If you do not agree to these terms,
            please do not use the Platform.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>2. Description of Service</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship is a platform designed to help students discover and connect with campus
            fellowships and denominations. The Platform lists meeting times, locations, and community
            details, handles registration, and passes registered students the WhatsApp group invite link
            provided by their chapter. The Platform is a directory and registration tool — it is not
            affiliated with, and does not speak for, any denomination or fellowship listed on it.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>3. User Registration</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            <strong style={{ color: "var(--ink)" }}>Students:</strong> Registration requires a valid
            email address, which is verified by a one-time code, and basic profile information. You
            agree to provide accurate and complete information.
          </p>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            <strong style={{ color: "var(--ink)" }}>Chapter Heads:</strong> Chapter head accounts are
            created by system administrators and cannot be self-registered. You are responsible for
            maintaining the confidentiality of your login credentials and for the member data you can
            access through your account.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>4. User Conduct</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            You agree to use the Platform only for lawful purposes and in a way that does not infringe
            the rights of others or restrict their use of the Platform. Prohibited behavior includes but
            is not limited to:
          </p>
          <ul style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px", paddingLeft: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Providing false or misleading information</li>
            <li style={{ marginBottom: "8px" }}>Creating multiple accounts to register with more than one fellowship at a time</li>
            <li style={{ marginBottom: "8px" }}>Misusing member contact details obtained through a chapter head account</li>
            <li style={{ marginBottom: "8px" }}>Harassing or threatening other users</li>
            <li style={{ marginBottom: "8px" }}>Attempting to gain unauthorized access to the Platform or to another chapter&apos;s data</li>
          </ul>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>5. Chapter Membership</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            Students may only be registered with one fellowship at a time. You may leave your fellowship
            yourself at any time, which frees you to register with another. Chapter heads may also flag
            or remove members from their own roster. Removing a member from a roster does not remove them
            from the chapter&apos;s WhatsApp group — that is managed separately by the chapter head
            within WhatsApp.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. WhatsApp Groups</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            The Platform stores and passes on WhatsApp group invite links supplied by chapter heads. We
            do not create, host, or moderate these groups, and we are not responsible for their content
            or conduct. Your use of WhatsApp is subject to WhatsApp&apos;s own terms of service.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>7. Content and Chapter Information</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            Meeting times, locations, descriptions, and WhatsApp links are provided by chapter heads, not
            by us. We do not verify this information and cannot guarantee that it is current or accurate.
            Chapter heads are responsible for keeping their own chapter details up to date.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>8. Data and Privacy</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            Your use of the Platform is also governed by our Privacy Policy. By using the Platform, you
            consent to the collection and use of information as described in the Privacy Policy.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>9. Modifications to Service</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship reserves the right to modify or discontinue, temporarily or permanently,
            the Platform (or any part thereof) with or without notice. We shall not be liable to you or
            any third party for any modification, suspension, or discontinuance of the Platform.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>10. Limitation of Liability</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship is provided &quot;as is&quot; without warranties of any kind. We do not
            guarantee the accuracy, completeness, or usefulness of any information on the Platform. We
            shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use of the Platform.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>11. Governing Law</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            These Terms are governed by the laws of the Republic of Ghana. Any dispute arising from your
            use of the Platform shall be subject to the jurisdiction of the courts of Ghana.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>12. Changes to Terms</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            We reserve the right to update these Terms of Service at any time. Changes will be effective
            immediately upon posting to the Platform. Your continued use of the Platform after changes
            are posted constitutes acceptance of the modified terms.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>13. Contact Information</h2>
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