import { baseStyles } from './base'

export function createWelcomeEmail(
    userName: string,
    chapterName: string
): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        ${baseStyles}
        .welcome-badge {
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
        .info-box p {
          margin: 0;
          color: #3a3f38;
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
          <h1>Welcome to UrCampus Fellowship 🎉</h1>
        </div>

        <div class="welcome-badge">
          Account created successfully
        </div>

        <div class="content">
          <p>Dear ${userName},</p>

          <p>Thank you for creating your account and applying to start <strong>${chapterName}</strong> on UrCampus Fellowship!</p>

          <div class="info-box">
            <strong>What happens next</strong>
            <p>Your chapter application is now under review by our admin team. We'll notify you by email once your application has been reviewed. This typically takes 1-2 business days.</p>
          </div>

          <div class="cta-wrap">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/heads" class="cta-button">View your dashboard</a>
          </div>

          <p>In the meantime, you can log in to your dashboard to prepare your chapter details, including meeting times, location, and description. You'll be able to edit these details even while your application is under review.</p>

          <p>If you have any questions, just reply to this email — we're here to help.</p>

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
