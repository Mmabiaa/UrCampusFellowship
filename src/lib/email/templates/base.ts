/**
 * Base email styles shared across all email templates.
 * Palette mirrors the web app: paper, cream, moss, ink, gold, sage.
 */
export const baseStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.65;
    color: #20231f;
    background: #f5f2ea;
    margin: 0;
    padding: 32px 16px;
    -webkit-font-smoothing: antialiased;
  }
  .container {
    max-width: 560px;
    margin: 0 auto;
    background: #fffdf7;
    border: 1px solid #e5e0d3;
    border-radius: 14px;
    padding: 40px;
    box-shadow: 4px 4px 0 rgba(32, 35, 31, 0.08);
  }
  .header {
    text-align: center;
    margin-bottom: 28px;
    padding-bottom: 24px;
    border-bottom: 1px solid #ece7dc;
  }
  .header h1 {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 26px;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0;
    color: #3f4a36;
  }
  .brand-mark {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #3f4a36;
    color: #fffdf7;
    font-family: Georgia, serif;
    font-size: 22px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 16px;
  }
  .content {
    margin-bottom: 24px;
    color: #3a3f38;
    font-size: 15px;
  }
  .content p {
    margin: 0 0 16px 0;
  }
  .content strong {
    color: #20231f;
    font-weight: 600;
  }
  .footer {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid #ece7dc;
    font-size: 12px;
    color: #8a8a80;
    text-align: center;
    line-height: 1.6;
  }
  .divider {
    height: 1px;
    background: #ece7dc;
    border: 0;
    margin: 24px 0;
  }
`