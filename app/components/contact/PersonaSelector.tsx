import { PERSONAS, type PersonaId, type ContactText } from './config';

type PersonaSelectorProps = {
  l: ContactText;
  selectedPersona: PersonaId | null;
  onSelect: (personaId: PersonaId) => void;
};

export function PersonaSelector({ l, selectedPersona, onSelect }: PersonaSelectorProps) {
  return (
    <fieldset>
      <legend className="block text-xs font-bold tracking-[0.14em] uppercase text-[#64748B] mb-3">
        {l({ en: 'Who are you?', kn: 'ನೀವು ಯಾರು?', hi: 'आप कौन हैं?', ta: 'நீங்கள் யார்?' })}
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select your persona">
        {PERSONAS.map((persona) => (
          <button
            key={persona.id}
            type="button"
            onClick={() => onSelect(persona.id)}
            aria-pressed={selectedPersona === persona.id}
            className={[
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600',
              selectedPersona === persona.id
                ? 'bg-[#F5A623] border-[#F5A623] text-[#040714] shadow-[0_0_18px_rgba(245,166,35,0.25)]'
                : 'bg-white/[0.03] border-white/10 text-[#94A3B8] hover:border-[#F5A623]/40 hover:text-white',
            ].join(' ')}
          >
            <span className="text-base leading-none" aria-hidden="true">{persona.icon}</span>
            {persona.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
