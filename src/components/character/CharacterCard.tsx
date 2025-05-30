import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { Character } from '../../types';
import { User } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const defaultImageUrl = 'https://images.pexels.com/photos/7772716/pexels-photo-7772716.jpeg';
  
  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-xl"
      hoverEffect
      onClick={onClick}
    >
      <div 
        className="h-40 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${character.imageUrl || defaultImageUrl})`,
          backgroundColor: '#374151'
        }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div>
            <h3 className="text-xl font-bold text-white">{character.name}</h3>
            <p className="text-sm text-gray-300">
              {character.race} • {character.class} • Level {character.level}
            </p>
          </div>
        </div>
      </div>
      <CardContent className="h-24 overflow-hidden">
        <div className="flex items-start space-x-2">
          <User className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-600 text-sm line-clamp-3 dark:text-gray-300">
              {character.personality}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex space-x-1">
                <span className="inline-block h-2 w-2 bg-red-500 rounded-full"></span>
                <span className="text-xs text-gray-500">{character.attributes.strength}</span>
              </div>
              <div className="flex space-x-1">
                <span className="inline-block h-2 w-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-gray-500">{character.attributes.dexterity}</span>
              </div>
              <div className="flex space-x-1">
                <span className="inline-block h-2 w-2 bg-yellow-500 rounded-full"></span>
                <span className="text-xs text-gray-500">{character.attributes.constitution}</span>
              </div>
              <div className="flex space-x-1">
                <span className="inline-block h-2 w-2 bg-blue-500 rounded-full"></span>
                <span className="text-xs text-gray-500">{character.attributes.intelligence}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;