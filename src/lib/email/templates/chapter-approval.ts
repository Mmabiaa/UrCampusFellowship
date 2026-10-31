import { baseStyles, emailHeader, emailFooter } from './base'

export function createChapterApprovalEmail(
  chapterName: string,
  headName?: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Chapter Approved</title>
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
          ${emailHeader('You are approved! 🎉')}
          
          <div class="body-content">
            <div class="status-badge">
              Chapter is now live
            </div>

            <div class="content">
              <p class="greeting">${headName ? `Hey ${headName},` : 'Hey there,'}</p>

              <p>Good news! <strong>${chapterName}</strong> is now live on UrCampus Fellowship. Students can find your chapter, see when you meet, and join your community.</p>

              <div class="button-wrap">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/heads" class="button">Go to dashboard</a>
              </div>

              <p>From your dashboard, you can manage your roster, update meeting details, and keep your chapter info current. Share your chapter page with students to start building your community.</p>

              <p>Need help with anything? Just reply to this email.</p>

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
