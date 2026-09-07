import crypto from 'crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'kwin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret() {
  return process.env.KWIN_AUTH_SECRET || 'dev-only-secret-change-me';
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function sign(input: string) {
  return base64Url(crypto.createHmac('sha256', getSecret()).update(input).digest());
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });

  return { salt, hash };
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  const hash = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });

  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(expectedHash, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

type SessionPayload = {
  uid: string;
  email: string;
  name: string;
  exp: number;
};

export function createSessionToken(uid: string, email: string, name: string) {
  const payload: SessionPayload = {
    uid,
    email,
    name,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encodedPayload = base64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSig = sign(encodedPayload);
  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf8')) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSessionFromCookie() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(raw);
}
