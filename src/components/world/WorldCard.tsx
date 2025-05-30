import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { World } from '../../types';
import { Globe } from 'lucide-react';

interface WorldCardProps {
  world: World;
  isActive?: boolean;
  onClick?: () => void;
}

const WorldCard: React.FC<WorldCardProps> = ({ world, isActive = false, onClick }) => {
  const defaultImageUrl = 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg';
  
  return (
    <Card 
      className={`h-full transition-all duration-300 ${
        isActive 
          ? 'ring-2 ring-indigo-500 ring-offset-2' 
          : 'hover:shadow-xl'
      }`}
      hoverEffect
      onClick={onClick}
    >
      <div 
        className="h-32 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${world.imageUrl || defaultImageUrl})`,
          backgroundColor: '#4C1D95'
        }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h3 className="text-xl font-bold text-white">{world.name}</h3>
        </div>
      </div>
      <CardContent className="h-24 overflow-hidden">
        <div className="flex items-start space-x-2">
          <Globe className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-600 text-sm line-clamp-3 dark:text-gray-300">
              {world.description}
            </p>
            <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
              Created: {new Date(world.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldCard;