'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/site.config';

type ShareActionsProps = {
  title: string;
  text: string;
  url?: string;
  copyLabel?: string;
  copiedLabel?: string;
  shareLabel?: string;
  xLabel?: string;
  className?: string;
  tone?: 'light' | 'dark';
};

const DEFAULT_SHARE_URL = 'https://kwin-city.com/share';
const X_INTENT_URL = 'https://twitter.com/intent/tweet';
const X_HANDLE = SITE_CONFIG.xHandle.replace(/^@/, '');

function CopyIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M8 8.5A2.5 2.5 0 0 1 10.5 6h7A2.5 2.5 0 0 1 20 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 8 17.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M8.8 10.7 15.3 7M8.8 13.3l6.5 3.7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M7 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6ZM17 8.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6ZM17 20.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="m13.9 10.5 7.4-8.5h-1.8l-6.4 7.4L8 2H2.1l7.8 11.3L2.1 22h1.8l6.8-7.7 5.4 7.7H22l-8.1-11.5Zm-2.4 2.7-.8-1.1L4.5 3.3h2.6l5 7.1.8 1.1 6.6 9.3h-2.6l-5.4-7.6Z"
      />
    </svg>
  );
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export default function ShareActions({
  title,
  text,
  url = DEFAULT_SHARE_URL,
  copyLabel = 'Copy',
  copiedLabel = 'Copied',
  shareLabel = 'Share',
  xLabel = 'Post to X',
  className,
  tone = 'light',
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const shareText = `${text}\n${url}`;
  const xIntentHref = `${X_INTENT_URL}?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&via=${encodeURIComponent(X_HANDLE)}`;
  const buttonClass =
    tone === 'dark'
      ? 'border-white/12 bg-white/[0.06] text-white hover:border-white/24 hover:bg-white/[0.10]'
      : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50';

  const handleCopy = async () => {
    await copyText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        return;
      }
    }

    await handleCopy();
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ''}`} aria-live="polite">
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-bold transition ${buttonClass}`}
      >
        <CopyIcon />
        {copied ? copiedLabel : copyLabel}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-bold transition ${buttonClass}`}
      >
        <ShareIcon />
        {shareLabel}
      </button>
      <a
        href={xIntentHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-bold transition ${buttonClass}`}
      >
        <XIcon />
        {xLabel}
      </a>
    </div>
  );
}
