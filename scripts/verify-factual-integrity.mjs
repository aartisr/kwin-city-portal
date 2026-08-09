#!/usr/bin/env node

import { spawnSync } from 'node:child_process';

const SCAN_GLOB = 'app docs';

const RULES = [
  {
    id: 'stale-465-acre-claims',
    description: 'Blocks stale 465-acre footprint claims in any supported language.',
    pattern: String.raw`\b465\+?\b[^\n]{0,32}(acre|acres|ಏಕರೆ|एकड़|ஏக்கர்)`,
  },
  {
    id: 'invalid-solar-footprint',
    description: 'Blocks accidental claims that a solar subcomponent is 5,800 acres.',
    pattern: String.raw`5,800[^\n]{0,64}(solar|semiconductor)` ,
  },
];

function runRg(pattern) {
  const cmd = `rg -n --pcre2 -i "${pattern}" ${SCAN_GLOB}`;
  const result = spawnSync(cmd, {
    shell: true,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  // rg exits 1 when there are no matches.
  if (result.status === 1) {
    return '';
  }

  if (result.status !== 0) {
    const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
    throw new Error(`rg failed for pattern: ${pattern}\n${output}`);
  }

  return (result.stdout || '').trim();
}

function main() {
  const violations = [];

  for (const rule of RULES) {
    const output = runRg(rule.pattern);
    if (output) {
      violations.push({
        ...rule,
        output,
      });
    }
  }

  if (violations.length > 0) {
    console.error('\n[factual-integrity] Found content violations:\n');
    for (const violation of violations) {
      console.error(`- Rule: ${violation.id}`);
      console.error(`  ${violation.description}`);
      console.error(violation.output.split('\n').map((line) => `  ${line}`).join('\n'));
      console.error('');
    }
    console.error('[factual-integrity] Please correct the above content before merging.');
    process.exit(1);
  }

  console.log('[factual-integrity] Passed: no stale acreage or invalid subcomponent footprint claims found.');
}

main();
