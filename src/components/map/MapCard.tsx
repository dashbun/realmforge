import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { Map } from '../../types';
import { MapPin } from 'lucide-react';

interface MapCardProps {
  map: Map;
  onClick?: () => void;
}

const MapCard: React.FC<MapCardProps> = ({ map, onClick }) => {
  const defaultImageUrl = 'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg';
  
  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-xl"
      hoverEffect
      onClick={onClick}
    >
      <div 
        className="h-40 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${map.imageUrl || defaultImageUrl})`,
          backgroundColor: '#1E3A8A'
        }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h3 className="text-xl font-bold text-white">{map.name}</h3>
        </div>
      </div>
      <CardContent className="h-24 overflow-hidden">
        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-600 text-sm line-clamp-3 dark:text-gray-300">
              {map.description}
            </p>
            <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
              {map.regions.length} {map.regions.length === 1 ? 'region' : 'regions'} • 
              Created: {new Date(map.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapCard;