import { CONTACT_EMAIL } from './config';
import { buildContactEmailPayload } from './email-template';
import type { ContactSubmission } from './config';

export class ContactDeliveryError extends Error {
  statusCode?: number;
  responseBody?: string;

  constructor(message: string, options?: { statusCode?: number; responseBody?: string }) {
    super(message);
    this.name = 'ContactDeliveryError';
    this.statusCode = options?.statusCode;
    this.responseBody = options?.responseBody;
  }
}

export type ContactDeliveryResult =
  | {
      kind: 'logged';
      recipient: string;
      submission: ContactSubmission;
    }
  | {
      kind: 'sent';
      recipient: string;
    };

export async function deliverContactSubmission(
  submission: ContactSubmission
): Promise<ContactDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      kind: 'logged',
      recipient: CONTACT_EMAIL,
      submission,
    };
  }

  const payload = buildContactEmailPayload(submission, CONTACT_EMAIL);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new ContactDeliveryError('Resend rejected contact submission', {
      statusCode: response.status,
      responseBody: await response.text(),
    });
  }

  return {
    kind: 'sent',
    recipient: CONTACT_EMAIL,
  };
}
