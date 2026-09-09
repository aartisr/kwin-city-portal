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
      className={`rounded-2xl bg-slate-900/80 p-6 backdrop-blur-sm transition-all ${
        bordered ? 'border border-slate-800' : ''
      } ${
        hoverable ? 'cursor-pointer hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between border-b border-slate-800 pb-3 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mt-4 pt-3 border-t border-slate-800 flex items-center justify-between ${className}`}>
    {children}
  </div>
);
