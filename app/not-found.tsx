import Link from 'next/link';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata() {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: '404 - Page Not Found',
      kn: '404 - ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ',
      hi: '404 - पेज नहीं मिला',
      ta: '404 - பக்கம் கிடைக்கவில்லை',
    }),
    description: pickByLocale(locale, {
      en: 'The page you are looking for could not be found.',
      kn: 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ.',
      hi: 'आप जिस पेज की तलाश कर रहे हैं, वह नहीं मिला।',
      ta: 'நீங்கள் தேடும் பக்கம் கிடைக்கவில்லை.',
    }),
  };
}

export default async function NotFound() {
  const locale = await getServerLocale();
  const l = (values: Parameters<typeof pickByLocale<string>>[1]): string => pickByLocale<string>(locale, values);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="text-7xl font-extrabold text-gray-300">404</div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {l({ en: 'Page Not Found', kn: 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ', hi: 'पेज नहीं मिला', ta: 'பக்கம் கிடைக்கவில்லை' })}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {l({
            en: "Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.",
            kn: 'ಕ್ಷಮಿಸಿ, ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಸಿಗಲಿಲ್ಲ. ಅದನ್ನು ಸ್ಥಳಾಂತರಿಸಿರಬಹುದು ಅಥವಾ ಅಳಿಸಿರಬಹುದು.',
            hi: 'क्षमा करें, हमें आपका खोजा हुआ पेज नहीं मिला। संभव है इसे स्थानांतरित या हटाया गया हो।',
            ta: 'மன்னிக்கவும், நீங்கள் தேடும் பக்கம் கிடைக்கவில்லை. அது மாற்றப்பட்டிருக்கலாம் அல்லது நீக்கப்பட்டிருக்கலாம்.',
          })}
        </p>

        {/* Search suggestion */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900 mb-3">{l({ en: 'Try searching instead:', kn: 'ಬದಲಾಗಿ ಹುಡುಕಿರಿ:', hi: 'इसके बजाय खोजें:', ta: 'இதற்கு பதிலாக தேடவும்:' })}</p>
          <Link
            href="/search?q="
            className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            {l({ en: 'Search KWIN City', kn: 'KWIN City ಹುಡುಕಿ', hi: 'KWIN City खोजें', ta: 'KWIN City தேடு' })}
          </Link>
        </div>

        {/* Navigation suggestions */}
        <div className="space-y-2">
          <div className="text-sm text-gray-600 mb-4">{l({ en: 'Popular sections:', kn: 'ಜನಪ್ರಿಯ ವಿಭಾಗಗಳು:', hi: 'लोकप्रिय अनुभाग:', ta: 'பிரபல பகுதிகள்:' })}</div>
          <div className="flex flex-col gap-2">
            <Link
              href="/about"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → {l({ en: 'About KWIN City', kn: 'KWIN City ಬಗ್ಗೆ', hi: 'KWIN City के बारे में', ta: 'KWIN City பற்றி' })}
            </Link>
            <Link
              href="/sectors"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → {l({ en: 'Industry Sectors', kn: 'ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಗಳು', hi: 'उद्योग क्षेत्र', ta: 'தொழில் துறைகள்' })}
            </Link>
            <Link
              href="/timeline"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → {l({ en: 'Development Timeline', kn: 'ಅಭಿವೃದ್ಧಿ ಕಾಲರೇಖೆ', hi: 'डेवलपमेंट टाइमलाइन', ta: 'மேம்பாட்டு காலவரிசை' })}
            </Link>
            <Link
              href="/evidence"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → {l({ en: 'Evidence Vault', kn: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ', hi: 'एविडेंस वॉल्ट', ta: 'ஆதார களஞ்சியம்' })}
            </Link>
          </div>
        </div>

        {/* Home button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
          >
            ← {l({ en: 'Back Home', kn: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ', hi: 'होम पर वापस जाएं', ta: 'முகப்புக்கு திரும்பு' })}
          </Link>
        </div>
      </div>
    </div>
  );
}
