import { NextRequest, NextResponse } from 'next/server';

// ─── Destination — server-side only, never sent to the browser ──────────────
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'ravikumar.raman@gmail.com';

// ─── Simple in-memory rate limiter (3 submissions per IP per minute) ─────────
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false; // not limited
  }
  if (entry.count >= 3) return true; // limited
  entry.count++;
  return false;
}

// ─── Sanitise input — strip HTML/script tags, enforce length ─────────────────
function sanitise(value: unknown, maxLen = 500): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>"'`]/g, '').trim().slice(0, maxLen);
}

// ─── HTML email template ──────────────────────────────────────────────────────
function buildEmailHtml(opts: {
  name: string;
  email: string;
  persona: string;
  message: string;
}): string {
  const { name, email, persona, message } = opts;
  const safeMessage = message.replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>New message from ${name}</title>
</head>
<body style="margin:0;padding:0;background:#040714;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#040714;padding:40px 20px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;background:linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));border:1px solid rgba(255,255,255,0.10);border-radius:20px;overflow:hidden;">

        <!-- Header bar -->
        <tr>
          <td style="background:linear-gradient(90deg,#F5A623,#E8962E);padding:4px 0;"></td>
        </tr>

        <!-- Logo / brand -->
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

        <!-- Title -->
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#F5A623;">New message via kwin-city.com</p>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Message from ${name}</h1>
          </td>
        </tr>

        <!-- Meta chips -->
        <tr>
          <td style="padding:0 40px 28px;">
            <span style="display:inline-block;padding:5px 14px;border-radius:999px;background:rgba(245,166,35,0.12);border:1px solid rgba(245,166,35,0.3);color:#F5A623;font-size:12px;font-weight:700;margin-right:8px;">${persona}</span>
            <span style="display:inline-block;padding:5px 14px;border-radius:999px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);color:#94A3B8;font-size:12px;">${email}</span>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);"/></td>
        </tr>

        <!-- Message body -->
        <tr>
          <td style="padding:28px 40px 36px;">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#64748B;">Message</p>
            <p style="margin:0;font-size:16px;color:#CBD5E1;line-height:1.75;">${safeMessage}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:#4F6280;">This message was submitted via the contact form at <a href="https://kwin-city.com/contact" style="color:#F5A623;text-decoration:none;">kwin-city.com/contact</a>. Reply directly to this email to respond to ${name}.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute before trying again.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field; humans never see it
  if (body.website) {
    return NextResponse.json({ success: true }); // silently drop bot
  }

  const name = sanitise(body.name, 120);
  const email = sanitise(body.email, 200);
  const message = sanitise(body.message, 2000);
  const persona = sanitise(body.persona, 60) || 'Visitor';

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are all required.' },
      { status: 400 },
    );
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Dev mode: no API key — log and succeed
  if (!apiKey) {
    console.log('[Contact Form — dev mode, no RESEND_API_KEY]', {
      to: CONTACT_EMAIL,
      from: email,
      name,
      persona,
      message,
    });
    return NextResponse.json({ success: true });
  }

  // Send via Resend REST API (no extra package required)
  const payload = {
    from: 'KWIN City <contact@kwin-city.com>',
    to: [CONTACT_EMAIL],
    reply_to: email,
    subject: `[KWIN City] ${name} (${persona}) sent you a message`,
    html: buildEmailHtml({ name, email, persona, message }),
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Resend API error]', response.status, errText);
      return NextResponse.json(
        { error: 'Could not send message right now. Please try again shortly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact route fetch error]', err);
    return NextResponse.json(
      { error: 'Network error. Please try again.' },
      { status: 500 },
    );
  }
}
