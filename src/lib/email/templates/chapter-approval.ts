import { baseStyles } from './base'

export function createChapterApprovalEmail(
    chapterName: string,
    headName?: string
): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        ${baseStyles}
        .success-badge {
          background: #dfe5d7;
          color: #3f4a36;
          border-radius: 10px;
          padding: 18px 20px;
          text-align: center;
          margin: 24px 0;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .info-box {
          background: #f7f4ea;
          border-left: 3px solid #e8c878;
          border-radius: 8px;
          padding: 20px 22px;
          margin: 24px 0;
        }
        .info-box strong {
          display: block;
          color: #3f4a36;
          font-size: 14px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .info-box ul {
          margin: 0;
          padding-left: 18px;
          color: #3a3f38;
        }
        .info-box li {
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 1.55;
        }
        .cta-button {
          display: inline-block;
          background: #3f4a36;
          color: #fffdf7 !important;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: -0.01em;
        }
        .cta-wrap {
          text-align: center;
          margin: 28px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand-mark">U</div>
          <h1>Your chapter is live 🎉</h1>
        </div>

        <div class="success-badge">
          Application approved
        </div>

        <div class="content">
          <p>${headName ? `Dear ${headName},` : 'Hello,'}</p>

          <p>Great news — your application for <strong>${chapterName}</strong> has been approved and is now live on UrCampus Fellowship.</p>

          <div class="info-box">
            <strong>What happens next</strong>
            <ul>
              <li>Your chapter is now discoverable by students on your campus</li>
              <li>You can manage meetings, events, and your roster from your dashboard</li>
              <li>Students can register and join your WhatsApp group instantly</li>
            </ul>
          </div>

          <div class="cta-wrap">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="cta-button">Go to dashboard</a>
          </div>

          <p>We're here to support you as you build a vibrant fellowship community on your campus. If you have any questions, just reply to this email.</p>

          <p>Welcome to the UrCampus Fellowship family.</p>

          <p style="margin-top: 24px;">
            Warmly,<br>
            <strong>The UrCampus Fellowship Team</strong>
          </p>
        </div>

        <div class="footer">
          <p>This is an automated message from the UrCampus Fellowship platform.</p>
        </div>
      </div>
    </body>
    </html>
  `
}