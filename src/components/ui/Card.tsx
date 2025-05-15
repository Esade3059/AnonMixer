import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  glowing?: boolean;
  transparent?: boolean;
}

const Card: React.FC<CardProps> = ({ className = '', children, glowing = false, transparent = false }) => {
  const baseClasses = 'rounded-xl shadow-lg overflow-hidden';
  const glowingClasses = glowing ? 'animate-glow gradient-border' : '';
  const bgClasses = transparent 
    ? 'glass-panel' 
    : 'bg-dark-300';

  return (
    <div className={`${baseClasses} ${glowingClasses} ${bgClasses} ${className}`}>
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  subtitle, 
  icon, 
  action,
  className = ''
}) => {
  return (
    <div className={`px-6 py-4 border-b border-dark-200 flex items-center justify-between ${className}`}>
      <div className="flex items-center">
        {icon && <div className="mr-3 text-primary-400">{icon}</div>}
        <div>
          {title && <h3 className="text-lg font-medium text-light-100">{title}</h3>}
          {subtitle && <p className="text-sm text-light-400">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export interface CardBodyProps {
  className?: string;
  children: ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ className = '', children }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className = '', children }) => {
  return (
    <div className={`px-6 py-4 border-t border-dark-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;