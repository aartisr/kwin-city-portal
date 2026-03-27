import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="text-7xl font-extrabold text-gray-300">404</div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or deleted.
        </p>

        {/* Search suggestion */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900 mb-3">Try searching instead:</p>
          <Link
            href="/search?q="
            className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Search KWIN City
          </Link>
        </div>

        {/* Navigation suggestions */}
        <div className="space-y-2">
          <div className="text-sm text-gray-600 mb-4">Popular sections:</div>
          <div className="flex flex-col gap-2">
            <Link
              href="/about"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → About KWIN City
            </Link>
            <Link
              href="/sectors"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → Industry Sectors
            </Link>
            <Link
              href="/timeline"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → Development Timeline
            </Link>
            <Link
              href="/evidence"
              className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:underline text-left"
            >
              → Evidence Vault
            </Link>
          </div>
        </div>

        {/* Home button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
          >
            ← Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
