#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const SCAN_DIRS = ['app', 'docs'];
const SCAN_GLOB = SCAN_DIRS.join(' ');

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

function hasRipgrep() {
  const probe = spawnSync('rg --version', {
    shell: true,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  });
  return probe.status === 0;
}

function collectFiles(dirPath, files) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue;
    }

    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, files);
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }
}

function runNodeFallback(pattern) {
  const regex = new RegExp(pattern, 'iu');
  const files = [];

  for (const root of SCAN_DIRS) {
    try {
      if (statSync(root).isDirectory()) {
        collectFiles(root, files);
      }
    } catch {
      // Skip roots that do not exist in the current checkout.
    }
  }

  const matches = [];
  for (const file of files) {
    let content;
    try {
      content = readFileSync(file, 'utf8');
    } catch {
      // Ignore unreadable or non-text files.
      continue;
    }

    const lines = content.split(/\r?\n/);
    for (let idx = 0; idx < lines.length; idx += 1) {
      if (regex.test(lines[idx])) {
        matches.push(`${file}:${idx + 1}:${lines[idx]}`);
      }
    }
  }

  return matches.join('\n');
}

function runSearch(pattern) {
  if (hasRipgrep()) {
    return runRg(pattern);
  }
  return runNodeFallback(pattern);
}

function main() {
  const violations = [];

  for (const rule of RULES) {
    const output = runSearch(rule.pattern);
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
