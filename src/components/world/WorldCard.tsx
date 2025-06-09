import React from 'react';
import { motion } from 'framer-motion';
import { World } from '../../types';
import { 
  Globe, 
  Users, 
  Calendar, 
  Star,
  Lock,
  Eye,
  MoreVertical
} from 'lucide-react';
import GlassCard from '../core/UI/GlassCard';

interface WorldCardProps {
  world: World;
  onClick?: () => void;
  viewMode?: 'grid' | 'list';
}

const WorldCard: React.FC<WorldCardProps> = ({ 
  world, 
  onClick, 
  viewMode = 'grid' 
}) => {
  const defaultImageUrl = 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg';

  if (viewMode === 'list') {
    return (
      <GlassCard className="p-6" hover onClick={onClick}>
        <div className="flex items-center space-x-6">
          <div 
            className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
            style={{ 
              backgroundImage: `url(${world.imageUrl || defaultImageUrl})`,
              backgroundColor: '#4C1D95'
            }}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {world.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {world.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span className="capitalize">{world.genre}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{world.collaborators.length + 1} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(world.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {world.isPublic ? <Eye className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    <span>{world.isPublic ? 'Public' : 'Private'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {world.featured && (
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <GlassCard className="overflow-hidden" hover onClick={onClick}>
        {/* Image Header */}
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${world.imageUrl || defaultImageUrl})`,
            backgroundColor: '#4C1D95'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex space-x-2">
            <span className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
              {world.genre}
            </span>
            {world.featured && (
              <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 backdrop-blur-sm text-yellow-200 rounded-full flex items-center space-x-1">
                <Star className="h-3 w-3 fill-current" />
                <span>Featured</span>
              </span>
            )}
          </div>

          {/* Privacy Indicator */}
          <div className="absolute top-3 right-3">
            {world.isPublic ? (
              <Eye className="h-5 w-5 text-white/80" />
            ) : (
              <Lock className="h-5 w-5 text-white/80" />
            )}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">
              {world.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {world.description}
          </p>

          {/* Tags */}
          {world.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {world.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {world.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                  +{world.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{world.collaborators.length + 1}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(world.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default WorldCard;