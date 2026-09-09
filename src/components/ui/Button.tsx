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
  primary: 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 active:scale-[0.98]',
  secondary: 'border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white active:scale-[0.98]',
  outline: 'border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:text-white active:scale-[0.98]',
  ghost: 'text-slate-300 hover:bg-slate-900 hover:text-white active:scale-[0.98]',
  gradient: 'border border-pink-500/40 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white hover:brightness-110 shadow-lg shadow-pink-600/20 active:scale-[0.98]',
  amber: 'border border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 active:scale-[0.98]',
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
