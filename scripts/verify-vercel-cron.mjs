import { readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
const crons = config.crons ?? [];

if (!Array.isArray(crons) || crons.length === 0) {
  console.error('[vercel-cron] Expected at least one configured Vercel cron job.');
  process.exit(1);
}

for (const cron of crons) {
  // This project deploys on Vercel Hobby. Hobby accepts only a single daily
  // invocation per cron; expressions such as "*/6" cause the entire deploy to fail.
  if (typeof cron?.path !== 'string' || !cron.path.startsWith('/')) {
    console.error('[vercel-cron] Each cron path must be an absolute route.');
    process.exit(1);
  }

  if (typeof cron?.schedule !== 'string' || !/^\d{1,2}\s+\d{1,2}\s+\*\s+\*\s+\*$/.test(cron.schedule)) {
    console.error(`[vercel-cron] ${cron?.path ?? 'Cron'} must run once daily on Vercel Hobby; received: ${cron?.schedule ?? 'missing schedule'}`);
    process.exit(1);
  }
}

console.log(`[vercel-cron] OK: ${crons.length} Vercel Hobby-compatible daily cron job(s).`);
