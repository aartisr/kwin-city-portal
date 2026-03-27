'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    console.error('Error caught by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 px-4">
      <div
        className="max-w-md w-full text-center"
        role="alert"
        aria-live="assertive"
      >
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="text-6xl">⚠️</div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          We&apos;re sorry for the interruption. We&apos;ve logged this error
          and our team is investigating.
        </p>

        {/* Error ID */}
        {error.digest && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700 font-mono break-all">
              Error ID: <code className="text-red-600">{error.digest}</code>
            </p>
          </div>
        )}

        {/* Error Message (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-yellow-100 rounded-lg text-left">
            <p className="text-sm font-mono text-gray-800 whitespace-pre-wrap break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors block"
          >
            ← Go Home
          </Link>
        </div>

        {/* Support */}
        <p className="mt-6 text-sm text-gray-500">
          If problems persist, please{' '}
          <Link href="/contact" className="text-amber-600 hover:underline">
            contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
