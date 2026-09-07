import type { DeepPartial } from './types';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function mergeUnknownDeep(base: unknown, overrides?: unknown): unknown {
  if (overrides === undefined) {
    return base;
  }

  if (Array.isArray(base)) {
    return overrides ?? base;
  }

  if (!isRecord(base) || !isRecord(overrides)) {
    return overrides ?? base;
  }

  const result: Record<string, unknown> = { ...base };
  const overrideRecord = overrides;

  for (const key of Object.keys(overrideRecord)) {
    const overrideValue = overrideRecord[key];
    if (overrideValue === undefined) {
      continue;
    }

    const baseValue = result[key];
    result[key] = isRecord(baseValue) && isRecord(overrideValue)
      ? mergeUnknownDeep(baseValue, overrideValue)
      : overrideValue;
  }

  return result;
}

export function mergeDeep<T>(base: T, overrides?: DeepPartial<T>): T {
  return mergeUnknownDeep(base, overrides) as T;
}

export function resolvePath(obj: unknown, key: string): string | undefined {
  const parts = key.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (!isRecord(current)) {
      return undefined;
    }
    current = current[part];
  }

  return typeof current === 'string' ? current : undefined;
}
