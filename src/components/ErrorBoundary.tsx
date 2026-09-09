import React from 'react';
import { reportClientError } from '../services/observability';

interface Props { children: React.ReactNode; }
interface State { hasError: boolean; }

// External wallet or injected extension errors that should never break the portal UI
const IGNORED_BOUNDARY_ERRORS = [
  /metamask/i,
  /ethereum/i,
  /web3/i,
  /phantom/i,
  /coinbase/i,
  /failed to connect/i,
];

export class ErrorBoundary extends React.Component<Props, State> {
  props!: Props;
  constructor(props: Props) {
    super(props);
  }
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    const message = String(error?.message || error || '');
    if (IGNORED_BOUNDARY_ERRORS.some((pattern) => pattern.test(message))) {
      return { hasError: false };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    reportClientError(error, 'error-boundary');
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
        <section className="mx-auto max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">KWIN City Research Portal</p>
          <h1 className="mt-3 text-2xl font-bold">This page could not load.</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">The issue has been recorded without sending your form entries or personal details. Please reload the portal to try again.</p>
          <button onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">Reload portal</button>
        </section>
      </main>
    );
  }
}
