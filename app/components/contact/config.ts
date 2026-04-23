import type { LocalizedValue } from '@/lib/i18n/messages';

export const PERSONAS = [
  {
    id: 'investor',
    label: 'Investor',
    icon: '📈',
    placeholder:
      "Tell us about your investment focus — sector, scale, timeline — or ask a specific question about KWIN's opportunity landscape...",
  },
  {
    id: 'resident',
    label: 'Resident',
    icon: '🏡',
    placeholder:
      'Ask us about livability, location, connectivity, or what everyday life at KWIN City might look like for you and your family...',
  },
  {
    id: 'researcher',
    label: 'Researcher',
    icon: '🔬',
    placeholder:
      "Tell us what you are researching and how KWIN's data or evidence system might be useful for your work...",
  },
  {
    id: 'journalist',
    label: 'Journalist',
    icon: '📰',
    placeholder:
      'Describe your story angle, publication, or request for additional primary source material and expert access...',
  },
  {
    id: 'other',
    label: 'Other',
    icon: '💬',
    placeholder:
      'Tell us about yourself and how we can help. There is no wrong question — we read everything...',
  },
] as const;

export type PersonaId = (typeof PERSONAS)[number]['id'];
export type FormState = 'idle' | 'submitting' | 'success' | 'error';
export type ContactPersona = (typeof PERSONAS)[number];
export type ContactText = (values: LocalizedValue<string>) => string;

export function getSelectedPersona(personaId: PersonaId | null) {
  return PERSONAS.find((persona) => persona.id === personaId);
}

export function getMessagePlaceholder(selectedPersona?: ContactPersona) {
  return selectedPersona?.placeholder ?? 'Tell us what you have in mind. We read every message personally...';
}
