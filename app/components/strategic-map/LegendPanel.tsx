import { MAP_LEGEND_ITEMS } from './config';

export function LegendPanel() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200">
      <h3 className="font-bold text-slate-900 mb-4 text-sm">Map Legend</h3>
      <div className="space-y-3">
        {MAP_LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: item.gradient,
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
              }}
            >
              {item.icon}
            </div>
            <span className="text-xs text-slate-700">
              <strong>{item.label}</strong> — {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
