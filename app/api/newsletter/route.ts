import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiter: max 3 signups per IP per minute
const rateMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

function sanitise(value: unknown, maxLen = 200): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>"'`]/g, '').trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, interests } = body as Record<string, unknown>;
  const cleanEmail = sanitise(email);
  const cleanName = sanitise(name);
  const cleanInterests = Array.isArray(interests)
    ? interests.map((i) => sanitise(i)).join(', ')
    : '';

  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // ── Try to store in Supabase if configured ──────────────────────────────────
  const supabaseUrl = process.env.KWIN_SUPABASE_URL;
  const supabaseKey = process.env.KWIN_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from('newsletter_signups').insert({
        email: cleanEmail,
        name: cleanName || null,
        interests: cleanInterests || null,
        created_at: new Date().toISOString(),
      });
    } catch {
      // Non-fatal — fall through
    }
  }

  // ── Optional: forward via Resend ────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CONTACT_EMAIL ?? 'hello@kwin-city.com';
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'KWIN City <onboarding@resend.dev>',
          to: [notifyEmail],
          subject: `New newsletter signup: ${cleanEmail}`,
          html: `<p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Name:</strong> ${cleanName || '—'}</p><p><strong>Interests:</strong> ${cleanInterests || '—'}</p>`,
        }),
      });
    } catch {
      // Non-fatal
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
