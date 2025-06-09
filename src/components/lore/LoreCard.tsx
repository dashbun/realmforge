import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { Lore } from '../../types';
import { Book } from 'lucide-react';

interface LoreCardProps {
  lore: Lore;
  onClick?: () => void;
}

const LoreCard: React.FC<LoreCardProps> = ({ lore, onClick }) => {
  const getCategoryColor = (category: Lore['category']) => {
    switch (category) {
      case 'history':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'culture':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'religion':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'technology':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-xl"
      hoverEffect
      onClick={onClick}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
            <Book className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{lore.title}</h3>
        </div>
      </div>
      <CardContent className="h-32 overflow-hidden">
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(lore.category)}`}>
            {lore.category.charAt(0).toUpperCase() + lore.category.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 dark:text-gray-300 mb-3">
          {lore.content}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {lore.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoreCard;