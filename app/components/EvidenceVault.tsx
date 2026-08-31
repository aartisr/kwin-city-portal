'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';
import { KWIN_EVIDENCE_PRINCIPLES, KWIN_EVIDENCE_SOURCES } from '@/data/constants';

const statusStyles = {
  contextual: 'bg-blue-50 text-blue-700 border-blue-200',
  'project-adjacent': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function EvidenceVault() {
  const { locale } = useI18n();

  const l = (en: string, kn: string, hi: string, ta: string) =>
    pickLocalizedValue(locale, { en, kn, hi, ta });

  return (
    <section id="research" className="section bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{l('Evidence Vault', 'ಪ್ರಮಾಣ ಕೋಶ', 'साक्ष्य संग्रह', 'ஆதாரக் களஞ್ஞம')}</h2>
          <p className="text-lg text-gray-600">
            {l(
              'OpenCity is useful for defending the regional logic behind KWIN City. It helps us talk responsibly about corridor growth, connectivity, water planning, and Karnataka\'s economic capacity without overstating what those datasets prove about KWIN itself.',
              'OpenCity KWIN City ನ ಪಿಂಛೆಯ ಆಞ್ಞಾ ವಿವರಣೆಯನ್ನು ರಕ್ಷಿಸಲು ಉಪಯುಕ್ತವಾಗಿದೆ. ಇದು ಕಾರಿಡಾರ್ ಬೃದ್ಧಿ, ಸಂಪರ್ಕ, ನೀರಿನ ಯೋಜನೆ ಮತ್ತು ಕರ್ನಾಟಕದ ಆರ್ಥಿಕ ಸಾಮರ್ಥ್ಯ ಬಗ್ಗೆ ಕೂಜಗುಂಪಾಗಿ ಮಾತನಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ, ಆ ಡೇಟಾಸೆಟ್‌ಗಳು KWIN ಸ್ವತಃ ಯಾವುದನ್ನು ಪ್ರಮಾಣಿತ ಮಾಡುತ್ತವೆ ಎಂದು ಓವರ‌ಸ್ಟೇಟ್ ಮಾಡದೆ.',
              'OpenCity KWIN City के पीछे का क्षेत्रीय तर्क रक्षा करने के लिए उपयोगी है। यह हमें गलियारे की वृद्धि, कनेक्टिविटी, जल योजना और कर्नाटक की आर्थिक क्षमता के बारे में जिम्मेदारी से बात करने में मदद करता है, बिना यह दावा किए कि ये डेटासेट KWIN को वैध ठहराते हैं।',
              'OpenCity ஆனது KWIN City இன் பகுதிசார்ந்த தர்க்கத்தை பாதுகாக்க பயனுள்ளதாக உள்ளது. இது பகுதி வளர்ச்சி, இணைப்பு, நீர் திட்ட மதிப்பீடு மற்றும் கர்நாடகத்தின் பொருளாதார தொழில்ச்சுறிப்பைப் பற்றி பொறுப்பாக பேசக் கூடிய முறையைத் தொகுக்கிறது.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-8 items-start mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{l('How To Use These Sources', 'ಈ ಮೂಲಗಳನ್ನು ಹೇಗೆ ಬಳಸುವುದು', 'इन स्रोतों का उपयोग कैसे करें', 'இந்த ஆதாரங்களை எவ்வாறு பயன்படுத்துவது')}</h3>
            <ul className="space-y-3">
              {KWIN_EVIDENCE_PRINCIPLES.map((principle: string, index: number) => (
                <li key={index} className="flex gap-3 text-sm text-gray-700">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gray-900" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{l('Safe Narrative Frame', 'ಸುರಕ್ಷಿತ ವಿವರಣೆಯ ಚೌಕಟ್ಟು', 'सुरक्षित आख्यान ढांचा', 'பாதுகாப்பான விবরണ சارameworkk')}</h3>
            <p className="text-gray-700 leading-8">
              {l(
                'KWIN City should be presented as a proposed node within larger patterns that are already visible in Karnataka and the Bengaluru region: airport-led growth, corridor-based mobility planning, measurable water constraints, and state-level industrial ambition. That is a strong case. It is also a much more credible case than treating contextual datasets as if they validate every KWIN project claim.',
                'KWIN City ಅನ್ನು ಕರ್ನಾಟಕ ಮತ್ತು ಬೆಂಗಳೂರು ಪ್ರಾಂತ್ಯದಲ್ಲಿ ಈಗಾಗಲೇ ಗೋಚರವಾದ ದೊಡ್ಡ ನಿದರ್ಶನಗಳಲ್ಲಿ ಪ್ರಸ್ತಾವಿತ ನೋಡ್ ಆಗಿ ಪ್ರಸ್ತುತಪಡಿಸಬೇಕು: ವಿಮಾನ ನಿಲ್ದಾಣದಿಂದ ನೇತೃತ್ವದ ಬೃದ್ಧಿ, ಕಾರಿಡಾರ್-ಆಧಾರಿತ ಗತಿಶೀಲತೆ ಯೋಜನೆ, ಅಳೆಯಬಹುದಾದ ನೀರಿನ ನಿರ್ಬಂಧಗಳು ಮತ್ತು ರಾಜ್ಯ-ಪದರ ಶಿಲ್ಪ ಆಸಕ್ತಿ. ಅದು ಬಲವಾದ ಪ್ರಕರಣ. ಸಂಪರ್ಕ ಡೇಟಾಸೆಟ್‌ಗಳನ್ನು ಪ್ರತಿಯೊಂದು KWIN ಯೋಜನೆಯ ಬಯಕೆಯನ್ನು ಮೌಲ್ಯೀಕರಿಸುವಂತೆ ಪರಿಚಾಲನೆ ಮಾಡುವುದಕ್ಕಿಂತ ಹೆಚ್ಚು ವಿಶ್ವಾಸಾರ್ಹ ಪ್ರಕರಣವಾಗಿದೆ.',
                'KWIN City को कर्नाटक और बेंगलुरु क्षेत्र में पहले से दृश्यमान बड़े पैटर्न के भीतर एक प्रस्तावित नोड के रूप में प्रस्तुत किया जाना चाहिए: हवाई अड्डे द्वारा संचालित वृद्धि, कॉरिडोर-आधारित गतिशीलता योजना, औसत दर्जे के जल बाधाएं, और राज्य-स्तरीय औद्योगिक महत्वाकांक्षा। यह एक मजबूत मामला है। यह संदर्भित डेटासेट को ऐसे मानने की तुलना में अधिक विश्वसनीय है जैसे वे प्रत्येक KWIN परियोजना दावे को सही ठहराते हैं।',
                'KWIN City ஆனது கர்நாடகம் மற்றும் பெங்களூரு பிரதேசத்தில் ஏற்கனவே தெரிந்த உள்ள பெரிய வடிவங்களில் சொல்லப்பட்ட கண்டம் வழங்கப்பட வேண்டும்: விமான நிலைய-தலைமை வளர்ச்சி, குறுக்குப்பாதை-அடிப்படை গতিமுறைयோजnা, அளவிடக்கூடிய நீர் நிrain, மற்றும் மாநில-தல மேற்க்கூட்டு야वस्था। அது வலுவான கடன். இது சூழல் ডெটாசेட்களை ஒவ்வொரு KWIN திட்ட தகுதியை சரிபிண்டமாக நடத்துவதை விட மேலும் நம்பக্கூடையதாகும்.'
              )}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {KWIN_EVIDENCE_SOURCES.map((source, index) => (
            <motion.article
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{source.title}</h3>
                  <p className="text-sm text-gray-500">{source.publisher}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[source.status]}`}>
                  {l(
                    source.status === 'contextual' ? 'Contextual evidence' : 'Project-adjacent evidence',
                    source.status === 'contextual' ? 'ಸಾಂದರ್ಭಿಕ ಪ್ರಮಾಣ' : 'ಯೋಜನೆ-ಪರಿಣತ ಪ್ರಮಾಣ',
                    source.status === 'contextual' ? 'संदर्भ साक्ष्य' : 'परियोजना-सटीक साक्ष्य',
                    source.status === 'contextual' ? 'சூழல் ஆதாரம்' : 'திட்ட-பக்கலான ஆதாரம்'
                  )}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{source.scope}</p>
              <p className="text-gray-700 leading-7 mb-5">{source.summary}</p>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{l('Useful for saying', 'ಹೇಳಲು ಉಪಯುಕ್ತ', 'कहने के लिए उपयोगी', 'சொல்ல பயனுள்ள')}</h4>
                  <ul className="space-y-2">
                    {source.supports.map((statement: string, statementIndex: number) => (
                      <li key={statementIndex} className="flex gap-2 text-sm text-gray-700">
                        <span className="mt-1 text-green-600">+</span>
                        <span>{statement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{l('Not enough to prove', 'ಸಾಬೀತು ಮಾಡಲು ಸಾಕಾಗಲ ಮಾಡುವುದಿಲ್ಲ', 'साबित करने के लिए काफी नहीं', 'நிரூपிக்க போதுமானதல்ல')}</h4>
                  <ul className="space-y-2">
                    {source.cannotProve.map((statement: string, statementIndex: number) => (
                      <li key={statementIndex} className="flex gap-2 text-sm text-gray-700">
                        <span className="mt-1 text-rose-600">-</span>
                        <span>{statement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-200 flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{l('OpenCity dataset', 'OpenCity ಡೇಟಾಸೆಟ್', 'OpenCity डेटासेट', 'OpenCity தரவுத்தொகுப்பு')}</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {l('View source', 'ಮೂಲವನ್ನು ವೀಕ್ಷಿಸಿ', 'स्रोत देखें', 'வழிപோக்கைக் காண்',)}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );}