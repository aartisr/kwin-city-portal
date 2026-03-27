import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(name: string) {
  return path.join(DATA_DIR, name);
}

export async function readJsonFile<T>(name: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const fullPath = filePath(name);

  try {
    const raw = await fs.readFile(fullPath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    await writeJsonFile(name, fallback);
    return fallback;
  }
}

export async function writeJsonFile<T>(name: string, data: T): Promise<void> {
  await ensureDataDir();
  const fullPath = filePath(name);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
}
