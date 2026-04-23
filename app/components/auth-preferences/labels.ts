import type { LocalizedValue } from '@/lib/i18n/messages';
import type { Preferences } from './config';

type TranslateFn = (values: LocalizedValue<string>) => string;

export function topicLabel(topic: string, l: TranslateFn) {
  if (topic === 'timeline') return l({ en: 'Timeline', kn: 'ಟೈಮ್‌ಲೈನ್', hi: 'टाइमलाइन', ta: 'காலவரிசை' });
  if (topic === 'sectors') return l({ en: 'Sectors', kn: 'ಕ್ಷೇತ್ರಗಳು', hi: 'सेक्टर', ta: 'துறைகள்' });
  if (topic === 'sustainability') return l({ en: 'Sustainability', kn: 'ಸ್ಥಿರತೆ', hi: 'स्थिरता', ta: 'நிலைத்தன்மை' });
  if (topic === 'evidence') return l({ en: 'Evidence', kn: 'ಸಾಕ್ಷ್ಯ', hi: 'प्रमाण', ta: 'ஆதாரம்' });
  if (topic === 'news-intelligence') return l({ en: 'News Intelligence', kn: 'ಸುದ್ದಿ ಒಳನೋಟ', hi: 'समाचार इंटेलिजेंस', ta: 'செய்தி நுண்ணறிவு' });
  return topic;
}

export function frequencyLabel(frequency: Preferences['digestFrequency'], l: TranslateFn) {
  if (frequency === 'daily') return l({ en: 'Daily', kn: 'ದಿನನಿತ್ಯ', hi: 'दैनिक', ta: 'தினசரி' });
  if (frequency === 'weekly') return l({ en: 'Weekly', kn: 'ವಾರಂವಾರ', hi: 'साप्ताहिक', ta: 'வாராந்திர' });
  return l({ en: 'Monthly', kn: 'ಮಾಸಿಕ', hi: 'मासिक', ta: 'மாதாந்திர' });
}
