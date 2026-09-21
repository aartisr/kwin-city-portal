import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'amber';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  className?: string;
  id?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'border border-emerald-600 bg-emerald-700 text-white hover:bg-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-200 dark:hover:bg-emerald-500/30 shadow-xs active:scale-[0.98]',
  secondary: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 shadow-xs active:scale-[0.98]',
  outline: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white shadow-2xs active:scale-[0.98]',
  ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white active:scale-[0.98]',
  gradient: 'border border-pink-600 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white hover:brightness-110 shadow-md shadow-pink-600/20 active:scale-[0.98]',
  amber: 'border border-amber-600 bg-amber-600 text-white hover:bg-amber-700 dark:border-amber-500/40 dark:bg-amber-500/20 dark:text-amber-200 dark:hover:bg-amber-500/30 shadow-xs active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-xl font-semibold gap-1.5',
  md: 'px-4 py-2 text-xs font-bold rounded-xl gap-2',
  lg: 'px-5 py-2.5 text-sm font-bold rounded-2xl gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  id,
  ...props
}) => {
  return (
    <button
      id={id}
      className={`inline-flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4 shrink-0" />}
    </button>
  );
};
