import { promises as fs } from 'fs';
import path from 'path';

function resolveDataDir() {
  const explicitDir = process.env.KWIN_DATA_DIR;
  if (explicitDir) return explicitDir;

  // Netlify functions can write only to /tmp at runtime.
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join('/tmp', 'kwin-city-portal', '.data');
  }

  return path.join(process.cwd(), '.data');
}

const DATA_DIR = resolveDataDir();

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(name: string) {
  return path.join(DATA_DIR, name);
}

export async function readJsonFile<T>(name: string, fallback: T): Promise<T> {
  const fullPath = filePath(name);

  try {
    await ensureDataDir();
    const raw = await fs.readFile(fullPath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    // Best-effort seed for first run; ignore write failures on locked filesystems.
    try {
      await writeJsonFile(name, fallback);
    } catch {
      // no-op
    }
    return fallback;
  }
}

export async function writeJsonFile<T>(name: string, data: T): Promise<void> {
  await ensureDataDir();
  const fullPath = filePath(name);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
}
