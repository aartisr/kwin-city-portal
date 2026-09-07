import { describe, expect, it } from 'vitest';
import { buildContactEmailHtml, buildContactEmailPayload } from '@/lib/server/contact/email-template';

describe('contact/email-template', () => {
  const submission = {
    name: 'Aarti <script>',
    email: 'aarti@example.com',
    persona: 'Researcher',
    message: 'Hello\n<script>alert(1)</script>',
  };

  it('escapes user content in the email HTML', () => {
    const html = buildContactEmailHtml(submission);

    expect(html).toContain('Aarti &lt;script&gt;');
    expect(html).toContain('Hello<br/>&lt;script&gt;alert(1)&lt;&#x2F;script&gt;');
    expect(html).not.toContain('<script>alert(1)</script>');
  });

  it('builds the resend payload consistently', () => {
    const payload = buildContactEmailPayload(submission, 'hello@kwin-city.com');

    expect(payload.to).toEqual(['hello@kwin-city.com']);
    expect(payload.reply_to).toBe('aarti@example.com');
    expect(payload.subject).toContain('Aarti <script>');
    expect(payload.html).toContain('Message from Aarti &lt;script&gt;');
  });
});
