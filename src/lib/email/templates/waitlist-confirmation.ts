import { baseStyles } from './base'

export function createWaitlistConfirmationEmail(
    chapterName: string,
    email: string
): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        ${baseStyles}
        .confirmation-badge {
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
        .info-box p {
          margin: 0;
          color: #3a3f38;
          font-size: 14px;
          line-height: 1.55;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand-mark">U</div>
          <h1>You're on the waitlist! 🎉</h1>
        </div>

        <div class="confirmation-badge">
          Waitlist confirmed
        </div>

        <div class="content">
          <p>Hi there,</p>

          <p>You've successfully joined the waitlist for <strong>${chapterName}</strong>.</p>

          <div class="info-box">
            <p>We'll send you an email at <strong>${email}</strong> as soon as registration opens and the chapter is ready to welcome new members.</p>
          </div>

          <p>The chapter leaders are working hard to set everything up. In the meantime, you can explore other active chapters on UrCampus Fellowship.</p>

          <p>Looking forward to having you in the fellowship!</p>

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
