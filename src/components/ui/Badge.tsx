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
  emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  indigo: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
  pink: 'border-pink-500/30 bg-pink-500/10 text-pink-300',
  blue: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  slate: 'border-slate-700 bg-slate-900/80 text-slate-300',
  red: 'border-red-500/30 bg-red-500/10 text-red-300',
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
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide transition-all ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulse && (
        <span className={`h-2 w-2 rounded-full ${variant === 'emerald' ? 'bg-emerald-400' : 'bg-current'} animate-pulse`} />
      )}
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
