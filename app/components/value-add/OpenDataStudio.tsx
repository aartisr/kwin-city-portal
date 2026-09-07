'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { ExportJob, ExportType, OpenDataResponse, ValueAddEnvelope } from '@/types/value-add';

export default function OpenDataStudio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<ValueAddEnvelope<OpenDataResponse> | null>(null);
  const [exportType, setExportType] = useState<ExportType>('geojson');
  const [job, setJob] = useState<ExportJob | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/value-add/open-data');
        const payload = (await response.json()) as ValueAddEnvelope<OpenDataResponse> | { error?: string };

        if (!response.ok) {
          if (!cancelled) {
            setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load open data catalog.');
            setCatalog(null);
          }
          return;
        }

        if (!cancelled) {
          setCatalog(payload as ValueAddEnvelope<OpenDataResponse>);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to contact the service. Please try again.');
          setCatalog(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function queueExport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setJob(null);

    try {
      const response = await fetch('/api/value-add/exports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exportType }),
      });

      const payload = (await response.json()) as ValueAddEnvelope<ExportJob> | { error?: string };

      if (!response.ok) {
        setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to queue export.');
        return;
      }

      setJob((payload as ValueAddEnvelope<ExportJob>).data);
    } catch {
      setError('Unable to contact the service. Please try again.');
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Open Spatial Data API and Export Studio</h2>
      <p className="mt-2 text-slate-600">Browse open datasets and queue format-specific exports for downstream research workflows.</p>

      {loading ? <p className="mt-6 text-sm text-slate-600">Loading catalog...</p> : null}
      {error ? <p className="mt-6 text-sm font-medium text-rose-700">{error}</p> : null}

      {catalog ? (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Dataset</th>
                <th className="px-4 py-3 text-left font-semibold">Format</th>
                <th className="px-4 py-3 text-left font-semibold">Coverage</th>
                <th className="px-4 py-3 text-left font-semibold">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {catalog.data.datasets.map((dataset) => (
                <tr key={dataset.id}>
                  <td className="px-4 py-3 text-slate-900">{dataset.name}</td>
                  <td className="px-4 py-3 text-slate-700 uppercase">{dataset.format}</td>
                  <td className="px-4 py-3 text-slate-700">{dataset.coverage}</td>
                  <td className="px-4 py-3 text-slate-700">{new Date(dataset.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <form onSubmit={queueExport} className="mt-6 flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-slate-700">
          Export format
          <select
            value={exportType}
            onChange={(event) => setExportType(event.target.value as ExportType)}
            className="ml-2 rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          >
            <option value="geojson">GeoJSON</option>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
        </label>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800"
        >
          Queue export
        </button>
      </form>

      {job ? (
        <p className="mt-4 text-sm text-slate-700">
          Export job queued: <span className="font-semibold">{job.id}</span> ({job.exportType}, {job.status})
        </p>
      ) : null}
    </section>
  );
}
