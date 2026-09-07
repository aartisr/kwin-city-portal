import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSessionFromCookie } from '@/lib/server/auth';
import { hasValidCsrf, isRateLimited, isSameOrigin, CSRF_COOKIE } from '@/lib/server/security';
import { getPreferences, setPreferences } from '@/lib/server/data-layer';
import type { UserPreference } from '@/lib/server/models';

function isValidPreference(input: unknown): input is UserPreference {
  if (!input || typeof input !== 'object') return false;
  const value = input as UserPreference;
  const personaOk = ['investor', 'resident', 'researcher', 'journalist', 'citizen'].includes(value.persona);
  const digestOk = ['daily', 'weekly', 'monthly'].includes(value.digestFrequency);
  const topicsOk = Array.isArray(value.favoriteTopics) && value.favoriteTopics.every((t) => typeof t === 'string');
  return personaOk && digestOk && topicsOk && typeof value.emailUpdates === 'boolean';
}

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prefs = await getPreferences(session.email);
  const defaultPreference: UserPreference = {
    persona: 'resident',
    favoriteTopics: ['timeline'],
    digestFrequency: 'weekly',
    emailUpdates: true,
  };
  return NextResponse.json({ preferences: prefs || defaultPreference });
}

export async function PUT(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  if (isRateLimited(req, { scope: 'preferences-write', limit: 30, windowMs: 60_000 })) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
  if (!hasValidCsrf(req, csrfCookie)) {
    return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
  }

  const session = await getSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!isValidPreference(body)) {
    return NextResponse.json({ error: 'Invalid preference payload.' }, { status: 400 });
  }

  await setPreferences(session.email, body);
  const prefs = await getPreferences(session.email);

  return NextResponse.json({ preferences: prefs });
}
