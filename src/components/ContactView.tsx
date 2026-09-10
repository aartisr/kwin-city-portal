import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Building, 
  Globe, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Research & Spatial Data',
    surveyNumber: '',
    message: ''
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = `REF-KWIN-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(randomRef);
    }, 800);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@hellokwincityconnect',
      url: 'https://instagram.com/hellokwincityconnect',
      icon: Instagram,
      color: 'text-pink-400 border-pink-500/30 bg-pink-500/10'
    },
    {
      name: 'Facebook',
      handle: 'facebook.com/kwincity',
      url: 'https://www.facebook.com/kwincity/',
      icon: Facebook,
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10'
    },
    {
      name: 'LinkedIn',
      handle: 'linkedin.com/company/kwin-city',
      url: 'https://linkedin.com/company/kwin-city',
      icon: Linkedin,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    },
    {
      name: 'X (Twitter)',
      handle: '@KWINCity',
      url: 'https://x.com/KWINCity',
      icon: Twitter,
      color: 'text-slate-200 border-slate-700 bg-slate-800'
    },
    {
      name: 'YouTube',
      handle: 'youtube.com/@KWINCity',
      url: 'https://youtube.com/@KWINCity',
      icon: Youtube,
      color: 'text-red-400 border-red-500/30 bg-red-500/10'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Mail className="h-3.5 w-3.5 text-emerald-400" />
              <span>Independent Research Desk & Contact Portal</span>
            </span>
          </div>
          <h2 id="contact-page-title" className="mt-3 font-['Cinzel',serif] text-2xl sm:text-4xl font-bold text-white">
            Contact & Inquiry Desk
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
            Connect with lead researcher <strong className="text-white font-semibold">Aarti S Ravikumar</strong>, spatial consultancy <strong className="text-white font-semibold">Baja Associates</strong>, and the <strong className="text-emerald-300 font-semibold">Hello KWIN City Connect</strong> team for spatial dataset verification, land survey inquiries, masterplan documentation, or institutional research partnerships.
          </p>
        </div>
      </div>

      {/* Grid: Form (Left 2 Cols) + Social & Direct Channels (Right 1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Interactive Inquiry Form */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
              <span>Send a Research or Survey Inquiry</span>
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Fill in your contact details below. Inquiries are tracked with a unique reference number.
            </p>
          </div>

          {submittedRef ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Inquiry Received Successfully!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to <strong className="text-emerald-300">Hello KWIN City Connect</strong>. Your research request has been logged.
              </p>
              <div className="inline-block rounded-xl border border-emerald-500/30 bg-slate-950 px-4 py-2 text-xs font-mono text-emerald-400">
                Reference ID: {submittedRef}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setFormData({ name: '', email: '', phone: '', category: 'Research & Spatial Data', surveyNumber: '', message: '' });
                  }}
                  className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name-input" className="text-xs font-semibold text-slate-300">
                    Your Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    placeholder="e.g. Dr. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email-input" className="text-xs font-semibold text-slate-300">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    placeholder="e.g. ramesh@institution.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone-input" className="text-xs font-semibold text-slate-300">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-category-select" className="text-xs font-semibold text-slate-300">
                    Inquiry Category
                  </label>
                  <select
                    id="contact-category-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Research & Spatial Data">Research & Spatial Data Requests</option>
                    <option value="Land Survey Verification">Survey Number & KIADB Land Verification</option>
                    <option value="Institutional Investor">Institutional Investment / University Footprint</option>
                    <option value="Press & Media">Press, Media & Publications</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-survey-input" className="text-xs font-semibold text-slate-300">
                  Survey Number or Location (Optional)
                </label>
                <input
                  id="contact-survey-input"
                  type="text"
                  placeholder="e.g. Sy No. 142/2A, Doddaballapur Hub"
                  value={formData.surveyNumber}
                  onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message-input" className="text-xs font-semibold text-slate-300">
                  Message / Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={4}
                  placeholder="Type your inquiry details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs font-bold text-white hover:brightness-110 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}</span>
                </button>

                <a
                  href={`mailto:connect@hellokwincity.org?subject=Inquiry: ${encodeURIComponent(formData.category)}&body=${encodeURIComponent(formData.message)}`}
                  className="text-xs text-slate-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Or send email directly via default mail app</span>
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Right 1 Col: Social Handles & Official Statutory Directory */}
        <div className="space-y-6">
          
          {/* Research & Spatial Advisory Principal Card */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Independent Research Principals</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <div className="font-bold text-white text-sm">Aarti S Ravikumar</div>
                <div className="text-[11px] text-emerald-400 font-semibold">Principal Research Investigator & Author</div>
                <p className="text-[11px] text-slate-400 font-light pt-1 leading-relaxed">
                  Leading empirical spatial intelligence, land valuation modeling, and statutory clearinghouse evaluation for KWIN City.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <div className="font-bold text-white text-sm">Baja Associates</div>
                <div className="text-[11px] text-cyan-400 font-semibold">Urban Masterplan & Spatial Analytics Consultancy</div>
                <p className="text-[11px] text-slate-400 font-light pt-1 leading-relaxed">
                  Specialized spatial development advisory tracking Doddaballapur & North Bengaluru megaproject corridors.
                </p>
              </div>
            </div>
          </div>

          {/* Social Channels Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span>Hello KWIN City Connect Handles</span>
            </h3>

            <div className="space-y-2.5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-slate-700 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${social.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{social.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{social.handle}</div>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Government Offices Directory */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building className="h-4 w-4 text-cyan-400" />
              <span>Official Government Offices</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>KIADB Head Office</span>
                </div>
                <p className="text-[11px] text-slate-400 font-light">
                  4th & 5th Floor, East Wing, Khanija Bhavan, 49, Race Course Rd, High Grounds, Bengaluru, Karnataka 560001
                </p>
                <div className="pt-1 text-[11px] text-emerald-400 font-mono">
                  Website: <a href="https://kiadb.karnataka.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-white">kiadb.karnataka.gov.in</a>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Karnataka Udyog Mitra (KUM)</span>
                </div>
                <p className="text-[11px] text-slate-400 font-light">
                  Single-Window Clearance Cell for Investment & Allotments
                </p>
                <div className="pt-1 text-[11px] text-cyan-400 font-mono">
                  Website: <a href="https://kum.karnataka.gov.in/" target="_blank" rel="noreferrer" className="underline hover:text-white">kum.karnataka.gov.in</a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
