import { createHmac, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} must be configured.`);
  return value;
}

const manifestPath = process.argv[2];
if (!manifestPath) throw new Error('Usage: node scripts/submit-operational-evidence.mjs <manifest.json>');
const body = await readFile(manifestPath, 'utf8');
JSON.parse(body);
const timestamp = String(Date.now());
const nonce = randomUUID().replaceAll('-', '');
const secret = required('OPERATIONS_EVIDENCE_SECRET');
const signature = createHmac('sha256', secret).update(`${timestamp}.${nonce}.${body}`).digest('hex');
const baseUrl = (process.env.SITE_BASE_URL?.trim() || new URL(required('SITE_REFRESH_URL')).origin).replace(/\/$/, '');
const response = await fetch(`${baseUrl}/api/operations/verifications`, {
  method: 'POST', body, signal: AbortSignal.timeout(30_000),
  headers: { 'content-type': 'application/json', 'x-kwin-evidence-timestamp': timestamp, 'x-kwin-evidence-nonce': nonce, 'x-kwin-evidence-signature': signature },
});
const responseBody = await response.text();
if (!response.ok) throw new Error(`Evidence submission failed: HTTP ${response.status}${responseBody ? ` — ${responseBody}` : ''}`);
console.log(`Operational evidence recorded: ${responseBody}`);
