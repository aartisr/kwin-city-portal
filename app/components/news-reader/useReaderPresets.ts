'use client';

import { useEffect, useState } from 'react';
import { PRESET_STORAGE_KEY } from './constants';
import type { ReaderPreset } from './types';

export function useReaderPresets() {
  const [presets, setPresets] = useState<ReaderPreset[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRESET_STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as ReaderPreset[];
      if (Array.isArray(parsed)) {
        setPresets(parsed);
      }
    } catch {
      // Ignore invalid storage payloads
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
    } catch {
      // Ignore storage write failures
    }
  }, [presets]);

  return { presets, setPresets };
}
