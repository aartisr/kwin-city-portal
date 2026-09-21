import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  bordered = true,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-2xl bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-xs dark:shadow-none transition-all ${
        bordered ? 'border border-slate-200 dark:border-slate-800' : ''
      } ${
        hoverable ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-xs text-slate-600 dark:text-slate-400 mt-0.5 ${className}`}>
    {children}
  </p>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between ${className}`}>
    {children}
  </div>
);
