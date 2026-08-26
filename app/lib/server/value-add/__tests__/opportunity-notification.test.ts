import { afterEach, describe, expect, it, vi } from 'vitest';
import { notifyOpportunityLead } from '@/lib/server/value-add/opportunity-notification';

describe('opportunity notification', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('emails the internal recipient after a lead is available', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    const result = await notifyOpportunityLead(
      {
        id: 'lead-123',
        role: 'landowner',
        requirement: 'One acre near the airport corridor',
        budgetBand: '25 crore',
        createdAt: '2026-08-25T00:00:00.000Z',
        status: 'new',
      },
      {
        name: 'Ravi',
        email: 'ravi@example.com',
        role: 'landowner',
        requirement: 'One acre near the airport corridor',
        budgetBand: '25 crore',
      }
    );

    expect(result).toEqual({ kind: 'sent', recipient: 'info@kwin-city.com' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({ method: 'POST' })
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      to: ['info@kwin-city.com'],
      reply_to: 'ravi@example.com',
      subject: expect.stringContaining('lead-123'),
    });
  });

  it('does not attempt delivery when Resend is not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const result = await notifyOpportunityLead(
      {
        id: 'lead-123',
        role: 'investor',
        requirement: 'Investment mandate',
        createdAt: '2026-08-25T00:00:00.000Z',
        status: 'new',
      },
      {
        name: 'Aarti',
        email: 'aarti@example.com',
        role: 'investor',
        requirement: 'Investment mandate',
      }
    );

    expect(result).toEqual({ kind: 'skipped', recipient: 'info@kwin-city.com' });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
