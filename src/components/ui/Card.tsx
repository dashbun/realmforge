import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-md 
        overflow-hidden 
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return (
    <h3 className={`text-xl font-bold text-gray-800 dark:text-white ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export default Card;