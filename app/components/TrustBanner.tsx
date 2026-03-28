'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

export default function TrustBanner({ visible }: { visible: boolean }) {
  const { locale, t } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY.current;

      if (currentY < 120) {
        setIsScrollHidden(false);
      } else if (delta > 6) {
        setIsScrollHidden(true);
      } else if (delta < -6) {
        setIsScrollHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className={`transition-all duration-300 ${visible && !isScrollHidden ? 'h-[88px] md:h-[52px]' : 'h-0'}`}
        aria-hidden="true"
      />

      <section
        className={`fixed left-0 right-0 top-[70px] z-40 border-b border-cyan-100 shadow-[0_10px_24px_rgba(15,23,42,0.08)] bg-[linear-gradient(90deg,rgba(236,254,255,0.96)_0%,rgba(248,250,252,0.96)_45%,rgba(255,251,235,0.96)_100%)] backdrop-blur-xl transition-all duration-300 ${
          visible && !isScrollHidden ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs md:text-sm text-slate-700 leading-6">
            <span className="font-bold text-slate-900">{l({ en: 'Trust Protocol:', kn: 'ವಿಶ್ವಾಸ ಪ್ರೋಟೋಕಾಲ್:', hi: 'ट्रस्ट प्रोटोकॉल:', ta: 'நம்பிக்கை நெறிமுறை:' })}</span>{' '}
            {l({
              en: 'every major claim must be source-linked, status-labeled, and reviewable for what it can and cannot prove.',
              kn: 'ಪ್ರತಿಯೊಂದು ಪ್ರಮುಖ ಹೇಳಿಕೆಯೂ ಮೂಲ-ಲಿಂಕ್, ಸ್ಥಿತಿ-ಲೇಬಲ್ ಹೊಂದಿರಬೇಕು ಮತ್ತು ಅದು ಏನು ಸಾಬೀತು ಮಾಡಬಹುದು/ಮಾಡಲಾರದು ಎಂಬುದಕ್ಕೆ ವಿಮರ್ಶಿಸಬಹುದಾಗಿರಬೇಕು.',
              hi: 'हर प्रमुख दावे को स्रोत-लिंक, स्थिति-लेबल के साथ प्रस्तुत किया जाना चाहिए और वह क्या सिद्ध कर सकता है/नहीं कर सकता, इसकी समीक्षा संभव होनी चाहिए।',
              ta: 'ஒவ்வொரு முக்கிய கூற்றும் மூல இணைப்பு, நிலை குறிச்சொல் உடன் இருக்க வேண்டும்; அது எதை நிரூபிக்க முடியும்/முடியாது என்பதை ஆய்வு செய்யக்கூடியதாக இருக்க வேண்டும்.',
            })}
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Link href="/trust" className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50">
              {t('header.items./trust.label')}
            </Link>
            <Link href="/sources" className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50">
              {t('header.items./sources.label')}
            </Link>
            <Link href="/news-intelligence" className="rounded-md bg-slate-900 px-2.5 py-1.5 text-white hover:bg-slate-800">
              {t('header.items./news-intelligence.label')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
