/**
 * Base email styles shared across all email templates.
 * Natural, warm design matching UrCampus Fellowship branding
 */
export const baseStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.65;
    color: #20231f;
    background: #f5f2ea;
    margin: 0;
    padding: 40px 20px;
    -webkit-font-smoothing: antialiased;
  }
  .email-wrapper {
    max-width: 600px;
    margin: 0 auto;
  }
  .container {
    background: #fffdf7;
    border: 1px solid #d9d4c8;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 3px 3px 0 rgba(32, 35, 31, 0.08);
  }
  .header {
    background: #3f4a36;
    padding: 32px 40px 28px;
    text-align: center;
  }
  .logo-section {
    margin-bottom: 18px;
  }
  .logo-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e8c878;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: Georgia, serif;
    font-size: 24px;
    color: #3f4a36;
    font-weight: 600;
  }
  .brand-name {
    color: #fffdf7;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin-top: 10px;
    opacity: 0.9;
  }
  .header h1 {
    font-family: Georgia, serif;
    font-size: 26px;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0;
    color: #fffdf7;
  }
  .body-content {
    padding: 40px;
  }
  .content {
    color: #3a3f38;
    font-size: 15px;
    line-height: 1.7;
  }
  .content p {
    margin: 0 0 18px 0;
  }
  .content strong {
    color: #20231f;
    font-weight: 600;
  }
  .greeting {
    font-size: 15px;
    margin-bottom: 18px;
    color: #20231f;
  }
  .signature {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid #ece7dc;
    font-size: 14px;
  }
  .signature-line {
    color: #6b7367;
    margin-bottom: 4px;
  }
  .signature-name {
    color: #3f4a36;
    font-weight: 600;
  }
  .footer {
    background: #f5f2ea;
    padding: 24px 40px;
    text-align: center;
    font-size: 12px;
    color: #8a8a80;
    line-height: 1.6;
  }
  .footer p {
    margin: 6px 0;
  }
  .divider {
    height: 1px;
    background: #ece7dc;
    border: 0;
    margin: 24px 0;
  }
  @media only screen and (max-width: 600px) {
    body { padding: 20px 12px; }
    .header { padding: 24px 24px 20px; }
    .body-content { padding: 28px 24px; }
    .footer { padding: 20px 24px; }
    .header h1 { font-size: 22px; }
  }
`

export const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export function emailHeader(title: string): string {
  return `
    <div class="header">
      <div class="logo-section">
        <div class="logo-image">
            <img src="https://i.pinimg.com/736x/59/a5/0a/59a50aa4fcda0cc8409b793810442756.jpg" alt="Logo">
        </div>
        <div class="brand-name">URCAMPUS FELLOWSHIP</div>
      </div>
      <h1>${title}</h1>
    </div>
  `
}

export function emailFooter(): string {
  return `
    <div class="footer">
      <pre>
          UrCampus Fellowship 
          Discover Connect Belong
      </pre>
      <p style="margin-top: 12px; color: #a0a099;">
        This is an automated message. For support, reply to this email.
      </p>
    </div>
  `
}