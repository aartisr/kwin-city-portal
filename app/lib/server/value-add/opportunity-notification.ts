import { sanitizeHtml } from '@/lib/sanitizer';
import type { OpportunityLead, OpportunityRequest } from '@/types/value-add';

const DEFAULT_RECIPIENT = 'info@kwin-city.com';

export type OpportunityNotificationResult =
  | { kind: 'sent'; recipient: string }
  | { kind: 'skipped'; recipient: string }
  | { kind: 'failed'; recipient: string; status?: number };

function emailHtml(lead: OpportunityLead, request: OpportunityRequest) {
  const value = (input: string | undefined) => sanitizeHtml(input ?? '—').replace(/\n/g, '<br/>');

  return `<!doctype html>
<html lang="en"><body style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5">
  <h1 style="font-size:20px">New KWIN City partner enquiry</h1>
  <p>A new opportunity request was saved successfully.</p>
  <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
    <tr><th align="left">Reference</th><td>${value(lead.id)}</td></tr>
    <tr><th align="left">Name</th><td>${value(request.name)}</td></tr>
    <tr><th align="left">Email</th><td>${value(request.email)}</td></tr>
    <tr><th align="left">Role</th><td>${value(request.role)}</td></tr>
    <tr><th align="left">Budget</th><td>${value(request.budgetBand)}</td></tr>
    <tr><th align="left">Requirement</th><td>${value(request.requirement)}</td></tr>
  </table>
</body></html>`;
}

/** Sends an internal notification only after the lead has been persisted. */
export async function notifyOpportunityLead(
  lead: OpportunityLead,
  request: OpportunityRequest
): Promise<OpportunityNotificationResult> {
  const recipient = process.env.OPPORTUNITY_LEAD_EMAIL ?? DEFAULT_RECIPIENT;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { kind: 'skipped', recipient };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? 'KWIN City <contact@kwin-city.com>',
        to: [recipient],
        reply_to: request.email,
        subject: `[KWIN City] New ${request.role} enquiry (${lead.id})`,
        html: emailHtml(lead, request),
      }),
    });

    return response.ok
      ? { kind: 'sent', recipient }
      : { kind: 'failed', recipient, status: response.status };
  } catch {
    return { kind: 'failed', recipient };
  }
}
