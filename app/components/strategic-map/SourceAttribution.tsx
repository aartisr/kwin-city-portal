import { AIRPORT_SOURCE, STRR_SOURCE } from './config';

export function SourceAttribution() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 rounded p-5">
      <h4 className="font-semibold text-amber-900 mb-3 text-sm">📊 Data Sources & References</h4>
      <div className="space-y-2 text-xs text-amber-800">
        <p>
          <strong>Geographic Coordinates:</strong>{' '}
          <a
            href="https://www.openstreetmap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            OpenStreetMap
          </a>{' '}
          | Verified via Government of Karnataka (KIADB official records)
        </p>
        {AIRPORT_SOURCE ? (
          <p>
            <strong>Airport & Aviation Context:</strong>{' '}
            <a href={AIRPORT_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              {AIRPORT_SOURCE.title}
            </a>{' '}
            ({AIRPORT_SOURCE.publisher})
          </p>
        ) : null}
        {STRR_SOURCE ? (
          <p>
            <strong>STRR Connectivity:</strong>{' '}
            <a href={STRR_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              {STRR_SOURCE.title}
            </a>{' '}
            ({STRR_SOURCE.publisher})
          </p>
        ) : null}
        <p>
          <strong>Note:</strong> Location data is sourced from verified public records. Site boundary is approximate and based on
          465-acre project specification. Exact Master Plan available via KIADB official channels.
        </p>
      </div>
    </div>
  );
}
