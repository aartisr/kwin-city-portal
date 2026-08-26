'use client';

import { useEffect, useState } from 'react';
import StrategicLocationMap from '@/components/StrategicLocationMap';
import type { AcquisitionPhaseId, AcquisitionPhaseVisibility, MapPresentation } from '@/components/strategic-map/mapbox';
import type { SpatialExplorerResponse, ValueAddEnvelope } from '@/types/value-add';
import { parseSpatialView, spatialViewSearch } from '@/lib/tools/spatial-view';

type Phase = SpatialExplorerResponse['phase'];

export default function SpatialExplorer() {
  const [phase, setPhase] = useState<Phase>('phase-1');
  const [acquisitionPhaseVisibility, setAcquisitionPhaseVisibility] = useState<AcquisitionPhaseVisibility>({
    'phase-1': true,
    'phase-2': false,
    'phase-3': false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<SpatialExplorerResponse> | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [viewMessage, setViewMessage] = useState<string | null>(null);
  const [presentation, setPresentation] = useState<MapPresentation>('overview');

  useEffect(() => {
    const initial = parseSpatialView(window.location.search);
    setPhase(initial.phase);
    setAcquisitionPhaseVisibility(initial.acquisition);
  }, []);

  useEffect(() => {
    const search = spatialViewSearch({ phase, acquisition: acquisitionPhaseVisibility });
    window.history.replaceState(null, '', `${window.location.pathname}${search}${window.location.hash}`);
  }, [phase, acquisitionPhaseVisibility]);

  async function shareView() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setViewMessage('Shareable view link copied.');
    } catch {
      setViewMessage(url);
    }
  }

  function saveView() {
    const view = { phase, acquisition: acquisitionPhaseVisibility, savedAt: new Date().toISOString() };
    localStorage.setItem('kwin-spatial-saved-view', JSON.stringify(view));
    setViewMessage('View saved on this device.');
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/value-add/spatial-explorer?phase=${encodeURIComponent(phase)}`);
        const payload = (await response.json()) as ValueAddEnvelope<SpatialExplorerResponse> | { error?: string };

        if (!response.ok) {
          if (!cancelled) {
            setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load map layers.');
            setResult(null);
          }
          return;
        }

        if (!cancelled) {
          setResult(payload as ValueAddEnvelope<SpatialExplorerResponse>);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to contact the service. Please try again.');
          setResult(null);
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
  }, [phase]);

  async function exportDerivedBufferGeoJson() {
    setExporting(true);
    setExportMessage(null);

    try {
      const response = await fetch('/api/value-add/spatial-explorer/export');
      if (!response.ok) {
        setExportMessage('Unable to generate export right now. Please try again.');
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'acquisition-notification-buffers-derived.geojson';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setExportMessage('Derived GeoJSON downloaded. Includes method and real-source metadata.');
    } catch {
      setExportMessage('Unable to generate export right now. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  function toggleAcquisitionPhase(phaseId: AcquisitionPhaseId) {
    setAcquisitionPhaseVisibility((current) => ({
      ...current,
      [phaseId]: !current[phaseId],
    }));
  }

  function showAllAcquisitionPhases() {
    setAcquisitionPhaseVisibility({
      'phase-1': true,
      'phase-2': true,
      'phase-3': true,
    });
  }

  function hideAllAcquisitionPhases() {
    setAcquisitionPhaseVisibility({
      'phase-1': false,
      'phase-2': false,
      'phase-3': false,
    });
  }

  const allPhasesVisible =
    acquisitionPhaseVisibility['phase-1'] && acquisitionPhaseVisibility['phase-2'] && acquisitionPhaseVisibility['phase-3'];

  const totalFutureProjects = result?.data.futureProjects.length ?? 0;
  const totalOriginalSourceLinks =
    result?.data.futureProjects.reduce((count, project) => count + project.sources.filter((source) => source.type === 'original').length, 0) ?? 0;
  const totalMirrorSourceLinks =
    result?.data.futureProjects.reduce((count, project) => count + project.sources.filter((source) => source.type === 'mirror').length, 0) ?? 0;

  function openAllOriginalLinks(projectId: string) {
    if (!result) return;

    const project = result.data.futureProjects.find((item) => item.id === projectId);
    if (!project) return;

    const originalLinks = project.sources.filter((source) => source.type === 'original').map((source) => source.url);

    for (const url of originalLinks) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  function parseSourceCheckDate(input?: string): Date | null {
    if (!input) return null;
    const normalized = input.trim();
    const isoDateMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (isoDateMatch) {
      const [, year, month, day] = isoDateMatch;
      const parsedFromParts = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
      return Number.isNaN(parsedFromParts.getTime()) ? null : parsedFromParts;
    }

    const parsed = new Date(normalized);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function formatSourceCheckDate(input?: string): string {
    const parsed = parseSourceCheckDate(input);
    if (!parsed) return input ?? 'Unknown';

    return parsed.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: 'UTC',
    });
  }

  function getSourceFreshnessBadge(lastSourceCheckAt?: string) {
    const parsed = parseSourceCheckDate(lastSourceCheckAt);
    if (!parsed) {
      return {
        label: 'Unknown freshness',
        className: 'border-slate-300 bg-slate-100 text-slate-700',
      };
    }

    const now = new Date();
    const diffMs = now.getTime() - parsed.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
      return {
        label: `Fresh (${diffDays}d)`,
        className: 'border-emerald-300 bg-emerald-100 text-emerald-900',
      };
    }

    if (diffDays <= 90) {
      return {
        label: `Aging (${diffDays}d)`,
        className: 'border-amber-300 bg-amber-100 text-amber-900',
      };
    }

    return {
      label: `Stale (${diffDays}d)`,
      className: 'border-rose-300 bg-rose-100 text-rose-900',
    };
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Spatial Explorer</h2>
          <p className="mt-2 text-slate-600">Interactive map plus phase-specific zoning, transport, and anchor overlays.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">Latest verified + derived layers</span>
          <label className="text-sm font-medium text-slate-700">
            Phase
            <select
              data-testid="spatial-phase-select"
              value={phase}
              onChange={(event) => setPhase(event.target.value as Phase)}
              className="ml-2 rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
            >
              <option value="phase-1">Phase 1</option>
              <option value="phase-2">Phase 2</option>
              <option value="phase-3">Phase 3</option>
            </select>
          </label>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-1" aria-label="Map presentation">
            <button
              type="button"
              onClick={() => setPresentation('overview')}
              aria-pressed={presentation === 'overview'}
              className={`min-h-10 rounded-lg px-3 text-sm font-semibold transition ${presentation === 'overview' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-700 hover:bg-white'}`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setPresentation('immersive')}
              aria-pressed={presentation === 'immersive'}
              className={`min-h-10 rounded-lg px-3 text-sm font-semibold transition ${presentation === 'immersive' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-700 hover:bg-white'}`}
            >
              3D context
            </button>
          </div>

          <button type="button" onClick={shareView} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">Copy view link</button>
          <button type="button" onClick={saveView} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">Save view</button>

          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-[#6F3F00]">
            <span className="font-semibold">Acquisition overlays (derived):</span>

            <button
              type="button"
              onClick={showAllAcquisitionPhases}
              disabled={allPhasesVisible}
              className="rounded-full border border-amber-300 bg-white px-2.5 py-1 font-semibold text-amber-900 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Show all
            </button>

            <button
              type="button"
              onClick={hideAllAcquisitionPhases}
              disabled={!acquisitionPhaseVisibility['phase-1'] && !acquisitionPhaseVisibility['phase-2'] && !acquisitionPhaseVisibility['phase-3']}
              className="rounded-full border border-amber-300 bg-white px-2.5 py-1 font-semibold text-amber-900 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hide all
            </button>

            <label className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 font-semibold text-amber-900">
              <input
                type="checkbox"
                checked={acquisitionPhaseVisibility['phase-1']}
                onChange={() => toggleAcquisitionPhase('phase-1')}
                className="h-3.5 w-3.5 accent-amber-700"
              />
              Phase 1
            </label>

            <label className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-100 px-2 py-0.5 font-semibold text-teal-900">
              <input
                type="checkbox"
                checked={acquisitionPhaseVisibility['phase-2']}
                onChange={() => toggleAcquisitionPhase('phase-2')}
                className="h-3.5 w-3.5 accent-teal-700"
              />
              Phase 2
            </label>

            <label className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-100 px-2 py-0.5 font-semibold text-violet-900">
              <input
                type="checkbox"
                checked={acquisitionPhaseVisibility['phase-3']}
                onChange={() => toggleAcquisitionPhase('phase-3')}
                className="h-3.5 w-3.5 accent-violet-700"
              />
              Phase 3
            </label>
          </div>
        </div>
      </div>

      {viewMessage ? <p className="mt-3 text-sm font-medium text-blue-800" role="status">{viewMessage}</p> : null}

      <div className="mt-6">
        <StrategicLocationMap
          acquisitionPhaseVisibility={acquisitionPhaseVisibility}
          presentation={presentation}
        />
        {presentation === 'immersive' ? (
          <p className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs leading-5 text-blue-950">
            3D context uses available Mapbox building coverage for orientation only. It does not depict a verified KWIN site plan, building design, or delivery status.
          </p>
        ) : null}
      </div>

      {loading ? <p className="mt-6 text-sm text-slate-600">Loading layer metadata...</p> : null}
      {error ? <p className="mt-6 text-sm font-medium text-rose-700">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {result.data.layers.map((layer) => (
            <article key={layer.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{layer.title}</h3>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold uppercase text-slate-700">{layer.status}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{layer.category}</p>
              <p className="mt-2 text-sm text-slate-700">{layer.description}</p>

              {layer.provenance ? (
                <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6F3F00]">Real source</p>
                  <a
                    href={layer.provenance.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    {layer.provenance.sourceName}
                  </a>
                  <p className="mt-1 text-xs text-slate-600">Access mode: {layer.provenance.access.replace('-', ' ')}</p>
                  {layer.provenance.note ? <p className="mt-2 text-xs text-slate-600">{layer.provenance.note}</p> : null}

                  {layer.provenance.originalSources && layer.provenance.originalSources.length > 0 ? (
                    <div className="mt-2 space-y-1.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Original source links</p>
                      {layer.provenance.originalSources.map((source) => (
                        <a
                          key={`${layer.id}-${source.url}`}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs text-slate-800 hover:bg-slate-100"
                        >
                          {source.label}
                        </a>
                      ))}
                    </div>
                  ) : null}

                  {layer.provenance.downloads && layer.provenance.downloads.length > 0 ? (
                    <div className="mt-2 space-y-1.5">
                      {layer.provenance.downloads.map((file) => (
                        <a
                          key={file.url}
                          href={file.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs text-slate-800 hover:bg-slate-100"
                        >
                          <span className="font-semibold">Download:</span> {file.label} ({file.format})
                        </a>
                      ))}
                    </div>
                  ) : null}

                  {layer.id === 'kiadb-buffer' ? (
                    <div className="mt-3 rounded-md border border-amber-200 bg-amber-50/70 p-2.5">
                      <p className="text-xs text-slate-700">
                        Need a machine-readable layer now? Export the derived GeoJSON bundle with transparent method metadata.
                      </p>
                      <button
                        type="button"
                        onClick={exportDerivedBufferGeoJson}
                        disabled={exporting}
                        className="mt-2 inline-flex rounded-full border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#6F3F00] hover:bg-amber-100 disabled:opacity-60"
                      >
                        {exporting ? 'Preparing export...' : 'Export Derived GeoJSON'}
                      </button>
                      {exportMessage ? <p className="mt-1 text-[11px] text-slate-600">{exportMessage}</p> : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <h3 className="font-semibold text-slate-900">Highlights</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {result.data.highlights.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 md:col-span-2">
            <h3 className="font-semibold text-slate-900">Future Projects Around The Area</h3>
            <p className="mt-1 text-xs text-slate-600">
              Planned overlays with source links. Each item includes mirror documents plus original-source references when available.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                Projects: {totalFutureProjects}
              </span>
              <span className="rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-1 font-semibold text-emerald-900">
                Original source links: {totalOriginalSourceLinks}
              </span>
              <span className="rounded-full border border-blue-300 bg-blue-100 px-2.5 py-1 font-semibold text-blue-900">
                Mirror links: {totalMirrorSourceLinks}
              </span>
            </div>

            <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
              <span className="font-semibold text-emerald-900">Original</span> links point to the publishing institution.
              {' '}
              <span className="font-semibold text-blue-900">Mirror</span> links point to indexed document hubs such as OpenCity.
            </div>

            <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
              Source freshness:
              {' '}
              <span className="font-semibold text-emerald-900">Fresh</span> (0-30 days),
              {' '}
              <span className="font-semibold text-amber-900">Aging</span> (31-90 days),
              {' '}
              <span className="font-semibold text-rose-900">Stale</span> (91+ days).
            </div>

            <div className="mt-3 space-y-3">
              {result.data.futureProjects.map((project) => {
                const freshness = getSourceFreshnessBadge(project.lastSourceCheckAt);

                return (
                  <article
                    key={project.id}
                    className={`rounded-lg border p-3 ${
                      project.id === 'kiadb-buffer' ? 'border-amber-300 bg-amber-50/60' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">{project.title}</h4>
                    <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
                      {project.phase}
                    </span>
                    <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
                      {project.category}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${freshness.className}`}>
                      {freshness.label}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-700">{project.summary}</p>
                  <p className="mt-1 text-[11px] text-slate-600">Last source check: {formatSourceCheckDate(project.lastSourceCheckAt)}</p>

                  {project.id === 'kiadb-buffer' ? (
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-[11px] font-semibold text-amber-900">
                        Priority: Acquisition Notification Buffers should be validated against original Gazette publication records first.
                      </p>
                      <button
                        type="button"
                        onClick={() => openAllOriginalLinks(project.id)}
                        className="rounded-full border border-amber-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-amber-900 hover:bg-amber-100"
                      >
                        Open all original links
                      </button>
                    </div>
                  ) : null}

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.sources.map((source) => (
                      <a
                        key={`${project.id}-${source.url}`}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold hover:opacity-90 ${
                          source.type === 'original'
                            ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
                            : 'border-blue-300 bg-blue-100 text-blue-900'
                        }`}
                      >
                        {source.type === 'original' ? 'Original:' : 'Mirror:'} {source.label}
                      </a>
                    ))}
                  </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
