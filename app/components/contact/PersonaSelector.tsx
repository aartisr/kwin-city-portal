import { PERSONAS, type PersonaId, type ContactText } from './config';

type PersonaSelectorProps = {
  l: ContactText;
  selectedPersona: PersonaId | null;
  onSelect: (personaId: PersonaId) => void;
};

export function PersonaSelector({ l, selectedPersona, onSelect }: PersonaSelectorProps) {
  return (
    <fieldset>
      <legend className="block text-xs font-bold tracking-[0.14em] uppercase text-slate-600 mb-3">
        {l({ en: 'Choose a context (optional)', kn: 'ಸಂದರ್ಭವನ್ನು ಆಯ್ಕೆಮಾಡಿ (ಐಚ್ಛಿಕ)', hi: 'संदर्भ चुनें (वैकल्पिक)', ta: 'சூழலைத் தேர்ந்தெடுக்கவும் (விருப்பம்)' })}
      </legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select your persona">
        {PERSONAS.map((persona) => (
          <button
            key={persona.id}
            type="button"
            onClick={() => onSelect(persona.id)}
            aria-pressed={selectedPersona === persona.id}
            className={[
              'flex min-h-11 items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600',
              selectedPersona === persona.id
                ? 'bg-amber-400 border-amber-400 text-[#040714] shadow-[0_0_18px_rgba(245,166,35,0.20)]'
                : 'bg-white border-slate-300 text-slate-700 hover:border-amber-400 hover:text-slate-950',
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
