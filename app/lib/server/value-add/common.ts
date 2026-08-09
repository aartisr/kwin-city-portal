import { KWIN_SOURCE_REGISTRY } from '@/data/constants';
import type { ValueAddEnvelope, ValueAddEvidenceItem, ValueAddStatus, ValueAddWarning } from '@/types/value-add';

type RegistryEntry = (typeof KWIN_SOURCE_REGISTRY)[keyof typeof KWIN_SOURCE_REGISTRY];

export function buildEvidence(sourceIds: string[]): ValueAddEvidenceItem[] {
  const items: ValueAddEvidenceItem[] = [];

  for (const sourceId of sourceIds) {
    const source = KWIN_SOURCE_REGISTRY[sourceId as keyof typeof KWIN_SOURCE_REGISTRY] as RegistryEntry | undefined;
    if (!source) {
      continue;
    }

    items.push({
      sourceId: source.id,
      label: source.label,
      title: source.title,
      url: source.url,
      trustStatus: source.status,
    });
  }

  return items;
}

export function createEnvelope<T>(params: {
  requestId: string;
  status: ValueAddStatus;
  data: T;
  sourceIds: string[];
  warnings?: ValueAddWarning[];
}): ValueAddEnvelope<T> {
  return {
    requestId: params.requestId,
    status: params.status,
    data: params.data,
    evidence: buildEvidence(params.sourceIds),
    warnings: params.warnings ?? [],
  };
}

export async function parseJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}