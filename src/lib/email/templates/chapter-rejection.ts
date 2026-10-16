import { baseStyles } from './base'

export function createChapterRejectionEmail(
    chapterName: string,
    reason: string,
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
        .reason-box {
          background: #faf3e8;
          border-left: 3px solid #a56f59;
          border-radius: 8px;
          padding: 20px 22px;
          margin: 24px 0;
        }
        .reason-box strong {
          display: block;
          color: #8a5a44;
          font-size: 13px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .reason-box p {
          margin: 0;
          color: #3a3f38;
          font-size: 15px;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand-mark">U</div>
          <h1>An update on your chapter</h1>
        </div>

        <div class="content">
          <p>${headName ? `Dear ${headName},` : 'Hello,'}</p>

          <p>Thank you for applying to create a fellowship chapter on UrCampus Fellowship. After careful review, we're unable to approve <strong>${chapterName}</strong> at this time.</p>

          <div class="reason-box">
            <strong>Reason</strong>
            <p>${reason}</p>
          </div>

          <p>You're welcome to update and resubmit your application from your dashboard once you've addressed the concern above. We'd love to see your chapter on the platform.</p>

          <p>If anything is unclear or you'd like to talk it through, just reply to this email — we're here to help.</p>

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