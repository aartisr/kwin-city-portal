export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'hello@kwin-city.com';
export const CONTACT_ROUTE = '/api/contact';
export const CONTACT_RATE_LIMIT = {
  scope: 'contact-form',
  limit: 3,
  windowMs: 60_000,
} as const;

export const CONTACT_FIELD_LIMITS = {
  name: 120,
  email: 200,
  persona: 60,
  message: 1000,
  minMessage: 20,
} as const;

export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  persona?: unknown;
  message?: unknown;
  website?: unknown;
};

export type ContactSubmission = {
  name: string;
  email: string;
  persona: string;
  message: string;
};
