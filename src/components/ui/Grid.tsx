import React from 'react';

interface GridProps {
  className?: string;
  children: React.ReactNode;
  columns?: number;
  gap?: string;
}

export const Grid: React.FC<GridProps> = ({ className = '', children, columns = 1, gap = 'gap-4' }) => {
  const gridClasses = `grid ${gap} ${className}`;
  const columnClasses = `grid-cols-${columns}`;
  
  return (
    <div className={`${gridClasses} ${columnClasses}`}>
      {children}
    </div>
  );
};
