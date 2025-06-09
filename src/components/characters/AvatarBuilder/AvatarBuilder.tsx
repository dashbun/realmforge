import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../../store';
import { CharacterAppearance } from '../../../types';
import { 
  User, 
  Palette, 
  Shirt, 
  Crown,
  Save,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import GlassCard from '../../core/UI/GlassCard';
import NeuButton from '../../core/UI/NeuButton';

interface AvatarBuilderProps {
  character?: any;
  onSave: (appearance: CharacterAppearance) => void;
  onCancel: () => void;
}

const AvatarBuilder: React.FC<AvatarBuilderProps> = ({ character, onSave, onCancel }) => {
  const [appearance, setAppearance] = useState<CharacterAppearance>(
    character?.appearance || {
      avatar: '',
      customization: {
        race: 'human',
        gender: 'male',
        age: 25,
        height: 'average',
        build: 'athletic',
        skinTone: '#F5D0C5',
        hairColor: '#4A3728',
        hairStyle: 'short',
        eyeColor: '#4A90E2',
        facialFeatures: {},
        clothing: [],
        accessories: []
      }
    }
  );

  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'clothing', label: 'Clothing', icon: Shirt },
    { id: 'accessories', label: 'Accessories', icon: Crown }
  ];

  const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Orc', 'Tiefling', 'Dragonborn'];
  const genders = ['Male', 'Female', 'Non-binary'];
  const builds = ['Slim', 'Athletic', 'Muscular', 'Heavy', 'Tall', 'Short'];
  const hairStyles = ['Short', 'Medium', 'Long', 'Bald', 'Ponytail', 'Braided', 'Curly'];

  const updateAppearance = (field: string, value: any) => {
    setAppearance(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        [field]: value
      }
    }));
  };

  const generateRandomAppearance = () => {
    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomBuild = builds[Math.floor(Math.random() * builds.length)];
    const randomHairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
    
    setAppearance(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        race: randomRace.toLowerCase(),
        gender: randomGender.toLowerCase(),
        build: randomBuild.toLowerCase(),
        hairStyle: randomHairStyle.toLowerCase(),
        age: Math.floor(Math.random() * 50) + 18
      }
    }));
  };

  return (
    <div className="h-full flex">
      {/* Avatar Preview */}
      <div className="w-1/2 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20">
        <GlassCard className="p-8 mb-6">
          <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center mb-4">
            <User className="h-32 w-32 text-gray-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Character Preview
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {appearance.customization.race} • {appearance.customization.gender} • Age {appearance.customization.age}
            </p>
          </div>
        </GlassCard>

        <div className="flex space-x-3">
          <NeuButton variant="secondary" onClick={generateRandomAppearance}>
            <Sparkles className="h-4 w-4 mr-2" />
            Randomize
          </NeuButton>
          <NeuButton variant="ghost" onClick={() => setAppearance(character?.appearance || appearance)}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </NeuButton>
        </div>
      </div>

      {/* Customization Panel */}
      <div className="w-1/2 flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'basic' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Race
                </label>
                <select
                  value={appearance.customization.race}
                  onChange={(e) => updateAppearance('race', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {races.map(race => (
                    <option key={race} value={race.toLowerCase()}>{race}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  value={appearance.customization.gender}
                  onChange={(e) => updateAppearance('gender', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {genders.map(gender => (
                    <option key={gender} value={gender.toLowerCase()}>{gender}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age: {appearance.customization.age}
                </label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={appearance.customization.age}
                  onChange={(e) => updateAppearance('age', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Build
                </label>
                <select
                  value={appearance.customization.build}
                  onChange={(e) => updateAppearance('build', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {builds.map(build => (
                    <option key={build} value={build.toLowerCase()}>{build}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skin Tone
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={appearance.customization.skinTone}
                    onChange={(e) => updateAppearance('skinTone', e.target.value)}
                    className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={appearance.customization.skinTone}
                    onChange={(e) => updateAppearance('skinTone', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hair Style
                </label>
                <select
                  value={appearance.customization.hairStyle}
                  onChange={(e) => updateAppearance('hairStyle', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {hairStyles.map(style => (
                    <option key={style} value={style.toLowerCase()}>{style}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hair Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={appearance.customization.hairColor}
                    onChange={(e) => updateAppearance('hairColor', e.target.value)}
                    className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={appearance.customization.hairColor}
                    onChange={(e) => updateAppearance('hairColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Eye Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={appearance.customization.eyeColor}
                    onChange={(e) => updateAppearance('eyeColor', e.target.value)}
                    className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={appearance.customization.eyeColor}
                    onChange={(e) => updateAppearance('eyeColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'clothing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center py-8">
                <Shirt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Clothing Customization
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coming soon! Advanced clothing system with layering and materials.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'accessories' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center py-8">
                <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Accessories
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coming soon! Add jewelry, weapons, and magical items.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-end space-x-3">
            <NeuButton variant="ghost" onClick={onCancel}>
              Cancel
            </NeuButton>
            <NeuButton variant="primary" onClick={() => onSave(appearance)}>
              <Save className="h-4 w-4 mr-2" />
              Save Avatar
            </NeuButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarBuilder;