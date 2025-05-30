import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { PowerSystem } from '../../types';
import { Zap } from 'lucide-react';

interface PowerSystemCardProps {
  powerSystem: PowerSystem;
  onClick?: () => void;
}

const PowerSystemCard: React.FC<PowerSystemCardProps> = ({ powerSystem, onClick }) => {
  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40"
      hoverEffect
      onClick={onClick}
    >
      <div className="p-6 border-b border-indigo-100 dark:border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg text-white">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">{powerSystem.name}</h3>
        </div>
      </div>
      <CardContent className="h-32 overflow-hidden">
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 dark:text-gray-300">
          {powerSystem.description}
        </p>
        
        <div className="space-y-2">
          <div>
            <p className="text-xs uppercase font-semibold text-indigo-800 dark:text-indigo-300">Categories</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {powerSystem.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded dark:bg-indigo-800 dark:text-indigo-100"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs uppercase font-semibold text-indigo-800 dark:text-indigo-300">Rules</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {powerSystem.rules.length} {powerSystem.rules.length === 1 ? 'rule' : 'rules'} defined
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerSystemCard;