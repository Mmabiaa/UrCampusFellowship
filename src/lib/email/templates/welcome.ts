import { baseStyles, emailHeader, emailFooter } from './base'

export function createWelcomeEmail(
    userName: string,
    chapterName: string
): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome to UrCampus Fellowship</title>
      <style>
        ${baseStyles}
        .status-badge {
          background: #dfe5d7;
          color: #3f4a36;
          border-radius: 8px;
          padding: 14px 18px;
          margin: 24px 0;
          font-size: 14px;
          font-weight: 600;
        }
        .note-box {
          background: #f7f4ea;
          border-left: 3px solid #e8c878;
          border-radius: 6px;
          padding: 18px 20px;
          margin: 24px 0;
          font-size: 14px;
          line-height: 1.6;
        }
        .note-box p {
          margin: 0;
          color: #3a3f38;
        }
        .button {
          display: inline-block;
          background: #3f4a36;
          color: #fffdf7 !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          margin: 20px 0;
        }
        .button-wrap {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="container">
          ${emailHeader('Welcome! 👋')}
          
          <div class="body-content">
            <div class="status-badge">
              Account created successfully
            </div>

            <div class="content">
              <p class="greeting">Hey ${userName},</p>

              <p>Thanks for signing up! Your account is ready and we've received your application for <strong>${chapterName}</strong>.</p>

              <div class="note-box">
                <p>Our team is reviewing your application now. We will send you an email once it has been approved — usually within a day or two.</p>
              </div>

              <div class="button-wrap">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/heads" class="button">Go to dashboard</a>
              </div>

              <p>While you wait, feel free to start setting up your chapter details. You can add meeting times, location info, and everything else from your dashboard.</p>

              <p>Questions? Just reply to this email.</p>

              <div class="signature">
                <p class="signature-line">Cheers,</p>
                <p class="signature-name">The UrCampus Fellowship Team</p>
              </div>
            </div>
          </div>

          ${emailFooter()}
        </div>
      </div>
    </body>
    </html>
  `
}
