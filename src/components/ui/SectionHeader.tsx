import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionSlot?: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actionSlot,
  className = '',
  id,
}) => {
  return (
    <div id={id} className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 inline-block mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionSlot && <div className="shrink-0">{actionSlot}</div>}
    </div>
  );
};
