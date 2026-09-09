import React from 'react';
import { Card } from './Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  badgeText?: string;
  badgeColor?: string;
  className?: string;
  id?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendPositive = true,
  icon: Icon,
  badgeText,
  badgeColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/20',
  className = '',
  id,
}) => {
  return (
    <Card id={id} className={`flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">{title}</span>
          {Icon && (
            <div className="rounded-xl bg-slate-800 p-2 text-emerald-400">
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-['Cinzel',serif] text-2xl font-bold text-white">{value}</span>
          {badgeText && (
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-mono border ${badgeColor}`}>
              {badgeText}
            </span>
          )}
        </div>

        {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
      </div>

      {trend && (
        <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold">
          <span className={trendPositive ? 'text-emerald-400' : 'text-rose-400'}>{trend}</span>
        </div>
      )}
    </Card>
  );
};
