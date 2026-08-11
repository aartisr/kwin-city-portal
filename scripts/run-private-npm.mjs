import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const privateConfig = resolve('.npmrc.private');
const args = process.argv.slice(2);

if (!existsSync(privateConfig)) {
  console.error('Missing .npmrc.private. Copy .npmrc.private.example, set KWIN_PRIVATE_NPM_REGISTRY, then authenticate with npm login using that config.');
  process.exit(1);
}

if (args.length === 0) {
  console.error('Usage: npm run npm:private -- <npm command>');
  process.exit(1);
}

const registry = readFileSync(privateConfig, 'utf8')
  .split(/\r?\n/)
  .find((line) => line.startsWith('registry='))
  ?.slice('registry='.length)
  .trim();

if (!registry?.startsWith('https://')) {
  console.error('.npmrc.private must declare an HTTPS registry URL.');
  process.exit(1);
}

const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
  stdio: 'inherit',
  env: {
    ...process.env,
    NPM_CONFIG_USERCONFIG: privateConfig,
    NPM_CONFIG_REGISTRY: registry,
  },
});

process.exit(result.status ?? 1);
