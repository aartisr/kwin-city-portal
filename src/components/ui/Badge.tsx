import React from 'react';

export type BadgeVariant = 'emerald' | 'cyan' | 'amber' | 'indigo' | 'pink' | 'blue' | 'slate' | 'red';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ComponentType<{ className?: string }>;
  pulse?: boolean;
  className?: string;
  id?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  emerald: 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  cyan: 'border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300',
  amber: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
  indigo: 'border-indigo-300 bg-indigo-50 text-indigo-950 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300',
  pink: 'border-pink-300 bg-pink-50 text-pink-950 dark:border-pink-500/30 dark:bg-pink-500/10 dark:text-pink-300',
  blue: 'border-blue-300 bg-blue-50 text-blue-950 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300',
  slate: 'border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300',
  red: 'border-red-300 bg-red-50 text-red-950 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-3.5 py-1.5 text-xs font-bold',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  icon: Icon,
  pulse = false,
  className = '',
  id,
}) => {
  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold tracking-wide transition-all shadow-2xs ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulse && (
        <span className={`h-2 w-2 rounded-full ${variant === 'emerald' ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-current'} animate-pulse`} />
      )}
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
