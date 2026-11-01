import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"

export default function TermsPage() {
  return (
    <PageShell>
      <div className="narrow">
        <p className="eyebrow">Legal</p>
        <h1>Terms of Service</h1>
        <p className="intro">
          Last updated: November 1, 2026
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
            UrCampusFellowship (&quot;the Platform&quot;) is a directory and registration service that helps university 
            students in Ghana discover and connect with campus religious fellowships. Students can browse fellowships 
            by campus and denomination, view meeting details (day, time, location), register with one fellowship, 
            and receive immediate access to that chapter&apos;s WhatsApp group via an invite link.
          </p>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            The Platform serves three distinct user roles: (1) Students who browse and join fellowships, 
            (2) Chapter Heads who manage their chapter&apos;s information and roster, and (3) System Administrators 
            who maintain the directory structure (denominations, campuses, and chapters).
          </p>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            UrCampusFellowship is an independent platform and is not affiliated with, endorsed by, or representative 
            of any denomination, fellowship, or university listed. We provide the technical infrastructure only; 
            chapter content, meeting information, and WhatsApp group management remain the responsibility of 
            individual fellowship leaders.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>3. User Registration and Authentication</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "16px" }}>
            <strong style={{ color: "var(--ink)" }}>Chapter Heads:</strong>  Chapter heads can create their accounts directly 
            through the authentication page using their email and password.
            After registration, they can set up and manage their fellowship cha
            aintaining the confidentiality of their login credentials and ensuring that their chapter information and membership 
            records remain accurate. Access to chapter management and roster data is limited to the chapter(s) assigned to their account.
          </p>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            <strong style={{ color: "var(--ink)" }}>System Administrators:</strong> Administrator accounts are 
            created internally and use email and password authentication. Administrators have access to platform-wide 
            structural data but do not routinely access individual student registration details.
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
            Students can only be registered with one fellowship at a time. You can leave your fellowship whenever
            you choose, which allows you to register with another fellowship.

            Chapter heads can also flag or remove members from their own roster.
            Removing a member from the roster does not remove them from the chapter’s WhatsApp group.
            WhatsApp group membership is managed separately by the chapter head within WhatsApp.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. WhatsApp Group Integration</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            The Platform stores WhatsApp group invite links provided by chapter heads and displays them to students 
            upon successful registration. We do not create, host, moderate, or manage these WhatsApp groups. We 
            have no control over group membership, content, or conduct within WhatsApp. Your use of WhatsApp is 
            governed by WhatsApp&apos;s own Terms of Service and Privacy Policy. UrCampusFellowship is not 
            responsible for any activity, content, or interactions that occur in WhatsApp groups.
          </p>

          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>7. Chapter Information and Content Accuracy</h2>
          <p style={{ color: "var(--muted-foreground)", lineHeight: "1.7", marginBottom: "32px" }}>
            All chapter-specific information (meeting day, time, location, descriptions, and WhatsApp invite links) 
            is provided directly by chapter heads. UrCampusFellowship does not independently verify this information 
            and makes no representations or warranties regarding its accuracy, completeness, or currency. Chapter 
            heads are solely responsible for keeping their chapter information up to date. Students should confirm 
            meeting details directly with fellowship leadership if uncertain.
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
            UrCampusFellowship is provided &quot;as is&quot; and &quot;as available&quot; without warranties 
            of any kind, either express or implied, including but not limited to implied warranties of merchantability, 
            fitness for a particular purpose, or non-infringement. We do not guarantee the accuracy, completeness, 
            reliability, or usefulness of any information on the Platform, including chapter details, meeting times, 
            or WhatsApp links. To the fullest extent permitted by law, UrCampusFellowship shall not be liable for 
            any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, 
            or goodwill, resulting from your use of or inability to use the Platform, even if we have been advised 
            of the possibility of such damages.
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
            <a href="mailto:mmaabiaa@gmail.com" style={{ color: "var(--moss)", textDecoration: "underline" }}>
              mmaabiaa@gmail.com
            </a>
          </p>
        </div>
      </div>
      <SiteFooter />
    </PageShell>
  )
}