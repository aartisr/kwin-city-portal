'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

const images = [
  {
    id: 'vidhana-soudha',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Vidhana_Soudha%2C_front_%2801%29.jpg/1920px-Vidhana_Soudha%2C_front_%2801%29.jpg',
    alt: {
      en: 'Vidhana Soudha in Bengaluru, Karnataka',
      kn: 'ಕರ್ನಾಟಕ, ಬೆಂಗಳೂರಿನ ವಿಧಾನಸೌಧ',
      hi: 'बेंगलुरु, कर्नाटक में विधान सौधा',
      ta: 'கர்நாடகா, பெங்களூருவில் விதான சௌதா',
    },
    label: { en: 'Vidhana Soudha', kn: 'ವಿಧಾನಸೌಧ', hi: 'विधान सौधा', ta: 'விதான சௌதா' },
    credit: 'Moheen Reeyad',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Vidhana_Soudha,_front_(01).jpg',
  },
  {
    id: 'airport-corridor',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg/1920px-Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg',
    alt: {
      en: 'Kempegowda International Airport in Bengaluru',
      kn: 'ಬೆಂಗಳೂರು ಕೆಂಪೇಗೌಡ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ',
      hi: 'बेंगलुरु में केम्पेगौड़ा अंतरराष्ट्रीय हवाई अड्डा',
      ta: 'பெங்களூருவில் கெம்பேகவுடா சர்வதேச விமானநிலையம்',
    },
    label: { en: 'Airport Corridor', kn: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಕಾರಿಡಾರ್', hi: 'एयरपोर्ट कॉरिडोर', ta: 'விமானநிலைய வழித்தடம்' },
    credit: 'Ank Kumar',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Kempegowda_International_Airport,_Bengaluru_(Ank_Kumar,_Infosys)_01.jpg',
  },
  {
    id: 'electronic-city',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/InfosysHQFrontView.jpg',
    alt: {
      en: 'Infosys headquarters front view in Electronic City, Bengaluru',
      kn: 'ಬೆಂಗಳೂರು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿಯ ಇನ್ಫೋಸಿಸ್ ಮುಖ್ಯ ಕಚೇರಿ ಮುಂಭಾಗ',
      hi: 'बेंगलुरु के इलेक्ट्रॉनिक सिटी में इंफोसिस मुख्यालय का दृश्य',
      ta: 'பெங்களூரு எலக்ட்ரானிக் சிட்டியில் உள்ள இன்போசிஸ் தலைமையக முன்புறம்',
    },
    label: { en: 'Electronic City', kn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ', hi: 'इलेक्ट्रॉनिक सिटी', ta: 'எலக்ட்ரானிக் சிட்டி' },
    credit: 'Sundar',
    license: 'CC BY-SA 3.0',
    source:
      'https://commons.wikimedia.org/wiki/File:InfosysHQFrontView.jpg',
  },
  {
    id: 'knowledge-infra',
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Main_Building%2C_Indian_Institute_of_Science%2C_Bangalore%2C_Karnataka%2C_India_%282017%29.jpg',
    alt: {
      en: 'Main Building of the Indian Institute of Science in Bengaluru',
      kn: 'ಬೆಂಗಳೂರು ಭಾರತೀಯ ವಿಜ್ಞಾನ ಸಂಸ್ಥೆಯ ಮುಖ್ಯ ಕಟ್ಟಡ',
      hi: 'बेंगलुरु में भारतीय विज्ञान संस्थान की मुख्य इमारत',
      ta: 'பெங்களூருவில் உள்ள இந்திய அறிவியல் நிறுவனத்தின் முதன்மை கட்டிடம்',
    },
    label: { en: 'Knowledge Infrastructure', kn: 'ಜ್ಞಾನ ಮೂಲಸೌಕರ್ಯ', hi: 'ज्ञान अवसंरचना', ta: 'அறிவு அடிக்கட்டு' },
    credit: 'Sayantan Mondal',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Main_Building,_Indian_Institute_of_Science,_Bangalore,_Karnataka,_India_(2017).jpg',
  },
  {
    id: 'urban-green-core',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Lalbagh_%28Lal_Baugh%29_Botanical_Garden_in_Bangalore_%28now_Bengaluru%29_1.jpg',
    alt: {
      en: 'Lalbagh Botanical Garden in Bengaluru',
      kn: 'ಬೆಂಗಳೂರು ಲಾಲ್‌ಬಾಗ್ ಸಸ್ಯೋದ್ಯಾನ',
      hi: 'बेंगलुरु का लालबाग बॉटनिकल गार्डन',
      ta: 'பெங்களூருவின் லால்பாக் தாவரவியல் பூங்கா',
    },
    label: { en: 'Urban Green Core', kn: 'ನಗರ ಹಸಿರು ಕೇಂದ್ರ', hi: 'शहरी हरित केंद्र', ta: 'நகர் பசுமை மையம்' },
    credit: 'CreativoCamaal (Lens Naayak Photography)',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Lalbagh_(Lal_Baugh)_Botanical_Garden_in_Bangalore_(now_Bengaluru)_1.jpg',
  },
];

const LICENSE_LINKS: Record<string, string> = {
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
};

export default function ImageStrip() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn: string; hi: string; ta: string }) => pickLocalizedValue(locale, values);

  return (
    <div className="bg-[#040714] py-2 overflow-hidden">
      {/* Mobile: horizontal scroll strip; sm+: equal-width flex row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex gap-2 px-2 overflow-x-auto snap-x snap-mandatory scrollbar-none sm:overflow-x-visible"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: idx * 0.07 }}
            viewport={{ once: true }}
            className="group relative shrink-0 sm:flex-1 sm:shrink overflow-hidden rounded-xl snap-start"
            style={{ width: 'min(72vw, 260px)', aspectRatio: '16/10' }}
          >
            <Image
              src={img.src}
              alt={l(img.alt)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                          sizes="(max-width: 640px) 72vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/80">
              {l(img.label)}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-2 px-4 pb-1">
        <details className="group rounded-md border border-slate-800/70 bg-[#0b1220]/80 px-3 py-2">
          <summary className="cursor-pointer select-none text-center text-[10px] text-[#64748B] list-none">
            <span className="group-open:hidden sm:hidden">{l({ en: 'Show credits', kn: 'ಕ್ರೆಡಿಟ್ಸ್ ತೋರಿಸಿ', hi: 'क्रेडिट्स दिखाएं', ta: 'கிரெடிட்ஸை காட்டு' })}</span>
            <span className="group-open:hidden hidden sm:inline">{l({ en: 'Show Image Credits & Licenses', kn: 'ಚಿತ್ರ ಕ್ರೆಡಿಟ್ಸ್ ಮತ್ತು ಪರವಾನಗಿಗಳನ್ನು ತೋರಿಸಿ', hi: 'इमेज क्रेडिट्स और लाइसेंस दिखाएं', ta: 'பட கிரெடிட்ஸ் மற்றும் உரிமங்களை காட்டு' })}</span>
            <span className="hidden group-open:inline sm:hidden">{l({ en: 'Hide credits', kn: 'ಕ್ರೆಡಿಟ್ಸ್ ಮರೆಮಾಡಿ', hi: 'क्रेडिट्स छिपाएं', ta: 'கிரெடிட்ஸை மறை' })}</span>
            <span className="hidden group-open:inline sm:inline">{l({ en: 'Hide Image Credits & Licenses', kn: 'ಚಿತ್ರ ಕ್ರೆಡಿಟ್ಸ್ ಮತ್ತು ಪರವಾನಗಿಗಳನ್ನು ಮರೆಮಾಡಿ', hi: 'इमेज क्रेडिट्स और लाइसेंस छिपाएं', ta: 'பட கிரெடிட்ஸ் மற்றும் உரிமங்களை மறை' })}</span>
          </summary>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-[#475569]">
            {images.map((img) => (
              <span key={img.id}>
                {l(img.label)}:{' '}
                <a
                  href={img.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#94A3B8]"
                >
                  {l({ en: 'source', kn: 'ಮೂಲ', hi: 'स्रोत', ta: 'மூலம்' })}
                </a>{' '}
                ·{' '}
                <a
                  href={LICENSE_LINKS[img.license]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#94A3B8]"
                >
                  {img.license}
                </a>{' '}
                · {img.credit}
              </span>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
