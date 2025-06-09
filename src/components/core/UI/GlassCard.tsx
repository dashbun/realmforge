import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`
        bg-white/10 dark:bg-dark-surface/10 
        backdrop-blur-xl 
        border border-white/20 dark:border-dark-border/20 
        rounded-xl 
        shadow-glass
        transition-all duration-200
        ${hover ? 'hover:shadow-xl hover:bg-white/15 dark:hover:bg-dark-surface/15' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;