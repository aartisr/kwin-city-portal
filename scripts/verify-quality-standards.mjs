#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const qualityFile = path.join(rootDir, 'QUALITY_STANDARDS.md');

function run(command, label) {
  const result = spawnSync(command, {
    shell: true,
    cwd: rootDir,
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 10 * 1024 * 1024,
  });

  const output = `${result.stdout || ''}${result.stderr || ''}`;
  if (result.status !== 0) {
    console.error(`\n[quality-verify] ${label} failed: ${command}`);
    console.error(output.trim());
    process.exit(result.status || 1);
  }
  return output;
}

function mustMatch(regex, input, label) {
  const match = input.match(regex);
  if (!match) {
    console.error(`\n[quality-verify] unable to parse ${label}`);
    process.exit(1);
  }
  return match;
}

if (!fs.existsSync(qualityFile)) {
  console.error(`[quality-verify] missing ${qualityFile}`);
  process.exit(1);
}

const qualityText = fs.readFileSync(qualityFile, 'utf8');

const expectedTest = mustMatch(/`npm test`: pass \((\d+) files, (\d+) tests\)/, qualityText, 'expected test counts');
const expectedRoutes = mustMatch(/`npm run e2e:smoke`: pass \((\d+) routes\)/, qualityText, 'expected e2e route count');

const expected = {
  testFiles: Number(expectedTest[1]),
  tests: Number(expectedTest[2]),
  routes: Number(expectedRoutes[1]),
};

console.log('[quality-verify] running gate commands for documentation verification...');
run('npm run type-check', 'type-check');
run('npm run lint', 'lint');
run('npm run build:ci', 'build');

const testOutput = run('npm test -- --reporter=basic', 'unit tests');
const routeOutput = run('npm run e2e:smoke', 'e2e smoke');

const actualTestFiles = Number(mustMatch(/Test Files\s+(\d+)\s+passed/i, testOutput, 'actual test file count')[1]);
const actualTests = Number(mustMatch(/Tests\s+(\d+)\s+passed/i, testOutput, 'actual test count')[1]);
const actualRoutes = Number(mustMatch(/\b(\d+)\s+passed\s*\(/i, routeOutput, 'actual e2e passed count')[1]);

const mismatches = [];
if (actualTestFiles !== expected.testFiles) {
  mismatches.push(`test files expected ${expected.testFiles} but found ${actualTestFiles}`);
}
if (actualTests !== expected.tests) {
  mismatches.push(`tests expected ${expected.tests} but found ${actualTests}`);
}
if (actualRoutes !== expected.routes) {
  mismatches.push(`e2e routes expected ${expected.routes} but found ${actualRoutes}`);
}

if (mismatches.length > 0) {
  console.error('\n[quality-verify] QUALITY_STANDARDS.md snapshot mismatch:');
  for (const mismatch of mismatches) {
    console.error(`- ${mismatch}`);
  }
  process.exit(1);
}

console.log('[quality-verify] QUALITY_STANDARDS.md is aligned with current gate outputs.');
