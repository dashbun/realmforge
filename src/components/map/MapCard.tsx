import React, { useState } from 'react';
import Card, { CardContent } from '../ui/Card';
import { Map } from '../../types';
import { MapPin, Trash2 } from 'lucide-react';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

interface MapCardProps {
  map: Map;
  onClick?: () => void;
  onDelete?: () => void;
}

const MapCard: React.FC<MapCardProps> = ({ map, onClick, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const defaultImageUrl = 'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg';
  
  return (
    <div>
      <Card 
        className="h-full transition-all duration-300 hover:shadow-xl"
        hoverEffect
        onClick={onClick}
      >
        <div className="absolute top-2 right-2 z-10">
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteModalOpen(true);
              }}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
          )}
        </div>
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

      {onDelete && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            onDelete?.();
            setIsDeleteModalOpen(false);
          }}
          title="Delete Map"
          message={`Are you sure you want to delete ${map.name}? This action cannot be undone.`}
          loading={false}
        />
      )}
    </div>
  );
};

export default MapCard;