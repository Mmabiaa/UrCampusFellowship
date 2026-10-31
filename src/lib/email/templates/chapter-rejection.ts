import { baseStyles, emailHeader, emailFooter } from './base'

export function createChapterRejectionEmail(
    chapterName: string,
    reason: string,
    headName?: string
): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Chapter Application Update</title>
      <style>
        ${baseStyles}
        .note-box {
          background: #faf8f3;
          border-left: 3px solid #a56f59;
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
          ${emailHeader('About your application')}
          
          <div class="body-content">
            <div class="content">
              <p class="greeting">${headName ? `Hey ${headName},` : 'Hey there,'}</p>

              <p>We have reviewed your application for <strong>${chapterName}</strong> and unfortunately cannot approve it just yet.</p>

              <div class="note-box">
                <p><strong>Here's why:</strong> ${reason}</p>
              </div>

              <p>You can update your application and resubmit it anytime from your dashboard. Once you've made the changes, we'll take another look.</p>

              <div class="button-wrap">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/heads" class="button">Update application</a>
              </div>

              <p>Questions? Just reply to this email and we'll help you out.</p>

              <div class="signature">
                <p class="signature-line">Thanks,</p>
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