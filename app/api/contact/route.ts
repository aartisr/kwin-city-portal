import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';
import { CONTACT_ROUTE, CONTACT_RATE_LIMIT, type ContactPayload } from '@/lib/server/contact/config';
import { createContactResponse } from '@/lib/server/contact/response';
import { ContactDeliveryError, deliverContactSubmission } from '@/lib/server/contact/service';
import { validateContactPayload } from '@/lib/server/contact/validation';
import { checkRateLimit, getClientIp, isSameOrigin } from '@/lib/server/security';

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();
  logger.logRequest('POST', CONTACT_ROUTE, requestId);

  const rateLimit = checkRateLimit(req, CONTACT_RATE_LIMIT);
  const clientIp = getClientIp(req);

  if (!isSameOrigin(req)) {
    logger.logSecurity('csrf-fail', { requestId, endpoint: CONTACT_ROUTE, reason: 'invalid-origin', clientIp });
    return createContactResponse(
      { error: 'Invalid request origin.' },
      requestId,
      rateLimit,
      { status: 403 }
    );
  }

  if (rateLimit.limited) {
    logger.logSecurity('rate-limit', { requestId, endpoint: CONTACT_ROUTE, clientIp });
    return createContactResponse(
      { error: 'Too many requests. Please wait a minute before trying again.' },
      requestId,
      rateLimit,
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    logger.warn('Invalid contact request body', { requestId, endpoint: CONTACT_ROUTE, clientIp });
    return createContactResponse({ error: 'Invalid request.' }, requestId, rateLimit, { status: 400 });
  }

  const validation = validateContactPayload(body);

  if (validation.kind === 'spam') {
    logger.logSecurity('xss-attempt', {
      requestId,
      endpoint: CONTACT_ROUTE,
      clientIp,
      reason: 'honeypot-filled',
    });
    return createContactResponse({ success: true }, requestId, rateLimit);
  }

  if (validation.kind === 'invalid') {
    logger.warn('Invalid contact submission', {
      requestId,
      endpoint: CONTACT_ROUTE,
      clientIp,
      reason: validation.error,
    });
    return createContactResponse(
      { error: validation.error },
      requestId,
      rateLimit,
      { status: 400 }
    );
  }

  try {
    const delivery = await deliverContactSubmission(validation.submission);

    if (delivery.kind === 'logged') {
      logger.info(
        'Contact form submitted without RESEND_API_KEY; logging only',
        {
          to: delivery.recipient,
          from: delivery.submission.email,
          name: delivery.submission.name,
          persona: delivery.submission.persona,
          message: delivery.submission.message,
        },
        requestId
      );
    }

    logger.logResponse('POST', CONTACT_ROUTE, 200, 0, requestId);
    return createContactResponse({ success: true }, requestId, rateLimit);
  } catch (error) {
    if (error instanceof ContactDeliveryError) {
      logger.error(
        'Resend API rejected contact submission',
        error,
        { endpoint: CONTACT_ROUTE, responseBody: error.responseBody, statusCode: error.statusCode },
        requestId
      );
      return createContactResponse(
        { error: 'Could not send message right now. Please try again shortly.' },
        requestId,
        rateLimit,
        { status: 502 }
      );
    }

    const normalizedError = error instanceof Error ? error : new Error('Unknown contact delivery failure');

    logger.error('Contact route fetch error', normalizedError, { endpoint: CONTACT_ROUTE }, requestId);
    return createContactResponse(
      { error: 'Network error. Please try again.' },
      requestId,
      rateLimit,
      { status: 500 }
    );
  }
}
