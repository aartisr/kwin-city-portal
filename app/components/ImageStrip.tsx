import Image from 'next/image';
import { LAUNCH_DECK_THEMES } from '@/data/kwin/launch-deck-themes';
import { getServerLocale } from '@/lib/i18n/server';
import { pickLocalizedValue, type LocalizedValue } from '@/lib/i18n/messages';

export default async function ImageStrip() {
  const locale = await getServerLocale();
  const l = <T,>(values: LocalizedValue<T>) => pickLocalizedValue(locale, values);

  return (
    <div className="bg-[#040714] py-2 overflow-hidden">
      <div
        className="flex gap-2 px-2 overflow-x-auto snap-x snap-mandatory scrollbar-none sm:overflow-x-visible kwin-fade-in"
        tabIndex={0}
        role="region"
        aria-label="Launch deck image strip"
        style={{ WebkitOverflowScrolling: 'touch', animationDelay: '180ms' }}
      >
        {LAUNCH_DECK_THEMES.map((img, idx) => (
          <div
            key={img.id}
            className="group relative shrink-0 sm:flex-1 sm:shrink overflow-hidden rounded-xl snap-start"
            style={{ width: 'min(72vw, 260px)', aspectRatio: '16/10' }}
          >
            <Image
              src={img.src}
              alt={l(img.alt)}
              fill
              priority={idx === 0}
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        ))}
      </div>


    </div>
  );
}
