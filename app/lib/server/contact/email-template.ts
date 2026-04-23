import { sanitizeHtml } from '@/lib/sanitizer';
import type { ContactSubmission } from './config';

export function buildContactEmailHtml(submission: ContactSubmission): string {
  const safeName = sanitizeHtml(submission.name);
  const safeEmail = sanitizeHtml(submission.email);
  const safePersona = sanitizeHtml(submission.persona);
  const safeMessage = sanitizeHtml(submission.message).replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>New message from ${safeName}</title>
</head>
<body style="margin:0;padding:0;background:#040714;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#040714;padding:40px 20px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;background:linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));border:1px solid rgba(255,255,255,0.10);border-radius:20px;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(90deg,#F5A623,#E8962E);padding:4px 0;"></td>
        </tr>
        <tr>
          <td style="padding:36px 40px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:40px;height:40px;background:linear-gradient(135deg,#F5A623,#E8A020);border-radius:10px;text-align:center;vertical-align:middle;">
                  <span style="color:#040714;font-size:20px;font-weight:900;line-height:40px;">K</span>
                </td>
                <td style="padding-left:12px;vertical-align:middle;">
                  <span style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:-0.02em;">KWIN City</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#F5A623;">New message via kwin-city.com</p>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Message from ${safeName}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 28px;">
            <span style="display:inline-block;padding:5px 14px;border-radius:999px;background:rgba(245,166,35,0.12);border:1px solid rgba(245,166,35,0.3);color:#F5A623;font-size:12px;font-weight:700;margin-right:8px;">${safePersona}</span>
            <span style="display:inline-block;padding:5px 14px;border-radius:999px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);color:#94A3B8;font-size:12px;">${safeEmail}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);"/></td>
        </tr>
        <tr>
          <td style="padding:28px 40px 36px;">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#64748B;">Message</p>
            <p style="margin:0;font-size:16px;color:#CBD5E1;line-height:1.75;">${safeMessage}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:#4F6280;">This message was submitted via the contact form at <a href="https://kwin-city.com/contact" style="color:#F5A623;text-decoration:none;">kwin-city.com/contact</a>. Reply directly to this email to respond to ${safeName}.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function buildContactEmailPayload(
  submission: ContactSubmission,
  recipient: string
) {
  return {
    from: 'KWIN City <contact@kwin-city.com>',
    to: [recipient],
    reply_to: submission.email,
    subject: `[KWIN City] ${submission.name} (${submission.persona}) sent you a message`,
    html: buildContactEmailHtml(submission),
  };
}
