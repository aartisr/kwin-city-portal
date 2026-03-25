import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';

export const metadata: Metadata = {
  title: 'Terms of Use | KWIN City Research Portal',
  description: 'Terms of use, copyright, and permitted use rules for the KWIN City Research Portal.',
};

export default function TermsPage() {
  const effectiveDate = '25 March 2026';

  return (
    <SiteFrame>
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="container max-w-4xl">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Terms of Use</h1>
          <p className="text-sm text-gray-500 mb-8">Effective date: {effectiveDate}</p>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-8">
            <p className="text-sm text-amber-900 leading-7">
              This page is a practical legal draft for your project. Please have local legal counsel review it before
              relying on it as final legal advice.
            </p>
          </div>

          <section className="space-y-8 text-gray-700 leading-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">1. About this website</h2>
              <p>
                The KWIN City Research Portal provides informational and research-oriented content about KWIN City and
                related regional development context. Content is presented in good faith from available public sources
                and internal analysis.
              </p>
              <p className="mt-3">
                Website owner: BAJA Associates. Author: Aarti S Ravikumar.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Copyright and intellectual property</h2>
              <p>
                Unless otherwise stated, the original content on this website including text, layout structure,
                graphics, visual composition, data compilation, and source code is owned by the site owner and is
                protected by copyright law.
              </p>
              <p className="mt-3">
                Copyright owner: BAJA Associates. Named author: Aarti S Ravikumar.
              </p>
              <p className="mt-3">
                Third-party trademarks, logos, datasets, and source publications remain the property of their
                respective owners and are used here for reference, commentary, and research context.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Permitted use</h2>
              <p>You may:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>view and use the website for personal, academic, journalistic, or internal business research;</li>
                <li>quote short excerpts with clear attribution and a link to this website;</li>
                <li>share source links and factual references.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Restricted use</h2>
              <p>You may not, without prior written permission:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>copy substantial portions of the site content or design for republication;</li>
                <li>reproduce the website branding, presentation, or proprietary compilation in a competing service;</li>
                <li>remove attribution, copyright notices, or source traceability markers.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Source and accuracy disclaimer</h2>
              <p>
                Project status information may change over time, and some claims may be marked as pending verification.
                This website does not constitute legal, financial, investment, engineering, or government advisory.
                Users should verify critical decisions against official records.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">6. External links</h2>
              <p>
                This website links to third-party sites for source transparency. We do not control third-party content
                and are not responsible for its availability, changes, or policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">7. Takedown and permissions</h2>
              <p>
                For permission requests, copyright concerns, or takedown notices, contact:
                <span className="font-semibold"> [replace-with-your-legal-email@example.com]</span>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">8. Updates to these terms</h2>
              <p>
                We may revise these terms periodically. Continued use of the website after updates constitutes
                acceptance of the revised terms.
              </p>
            </div>
          </section>
        </div>
      </main>
    </SiteFrame>
  );
}
