import { baseStyles, emailHeader, emailFooter } from './base'

export function createWaitlistConfirmationEmail(
    chapterName: string,
    email: string
): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>You are on the Waitlist</title>
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
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="container">
          ${emailHeader('You are in! 👍')}
          
          <div class="body-content">
            <div class="status-badge">
              Added to waitlist
            </div>

            <div class="content">
              <p class="greeting">Hey there,</p>

              <p>You are on the waitlist for <strong>${chapterName}</strong>. We will email you at <strong>${email}</strong> as soon as they are ready for new members.</p>

              <div class="note-box">
                <p>The chapter leaders are still getting things set up. Once they open registration, you'll be one of the first to know.</p>
              </div>

              <p>While you wait, check out other chapters on campus that might be a good fit.</p>

              <div class="signature">
                <p class="signature-line">Talk soon,</p>
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
