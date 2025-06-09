import React, { useState } from 'react';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { CharacterAvatar } from '../../types';
import { Palette, Save } from 'lucide-react';

interface CharacterAvatarCreatorProps {
  initialAvatar?: CharacterAvatar;
  onSave: (avatar: CharacterAvatar) => void;
}

const CharacterAvatarCreator: React.FC<CharacterAvatarCreatorProps> = ({
  initialAvatar,
  onSave,
}) => {
  const [avatar, setAvatar] = useState<CharacterAvatar>(initialAvatar || {
    bodyType: 'athletic',
    skinColor: '#F5D0C5',
    hairStyle: 'short',
    hairColor: '#4A3728',
    eyes: 'round',
    outfit: 'casual',
    accessories: [],
  });

  const handleChange = (field: keyof CharacterAvatar, value: string | string[]) => {
    setAvatar(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-8">
        <div className="w-64 h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Palette className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Character preview will appear here</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Body Type"
          value={avatar.bodyType}
          onChange={(value) => handleChange('bodyType', value)}
          options={[
            { value: 'athletic', label: 'Athletic' },
            { value: 'slim', label: 'Slim' },
            { value: 'muscular', label: 'Muscular' },
            { value: 'heavy', label: 'Heavy' },
          ]}
          fullWidth
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Skin Color
          </label>
          <input
            type="color"
            value={avatar.skinColor}
            onChange={(e) => handleChange('skinColor', e.target.value)}
            className="h-10 w-full rounded-md cursor-pointer"
          />
        </div>

        <Select
          label="Hair Style"
          value={avatar.hairStyle}
          onChange={(value) => handleChange('hairStyle', value)}
          options={[
            { value: 'short', label: 'Short' },
            { value: 'medium', label: 'Medium' },
            { value: 'long', label: 'Long' },
            { value: 'bald', label: 'Bald' },
            { value: 'ponytail', label: 'Ponytail' },
          ]}
          fullWidth
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hair Color
          </label>
          <input
            type="color"
            value={avatar.hairColor}
            onChange={(e) => handleChange('hairColor', e.target.value)}
            className="h-10 w-full rounded-md cursor-pointer"
          />
        </div>

        <Select
          label="Eyes"
          value={avatar.eyes}
          onChange={(value) => handleChange('eyes', value)}
          options={[
            { value: 'round', label: 'Round' },
            { value: 'almond', label: 'Almond' },
            { value: 'narrow', label: 'Narrow' },
            { value: 'wide', label: 'Wide' },
          ]}
          fullWidth
        />

        <Select
          label="Outfit"
          value={avatar.outfit}
          onChange={(value) => handleChange('outfit', value)}
          options={[
            { value: 'casual', label: 'Casual' },
            { value: 'formal', label: 'Formal' },
            { value: 'adventurer', label: 'Adventurer' },
            { value: 'mage', label: 'Mage' },
            { value: 'warrior', label: 'Warrior' },
          ]}
          fullWidth
        />

        <Select
          label="Accessories"
          value={avatar.accessories}
          onChange={(value) => handleChange('accessories', Array.isArray(value) ? value : [value])}
          options={[
            { value: 'glasses', label: 'Glasses' },
            { value: 'earrings', label: 'Earrings' },
            { value: 'necklace', label: 'Necklace' },
            { value: 'hat', label: 'Hat' },
            { value: 'tattoo', label: 'Tattoo' },
          ]}
          fullWidth
          multiple
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="primary"
          icon={<Save className="h-4 w-4" />}
          onClick={() => onSave(avatar)}
        >
          Save Avatar
        </Button>
      </div>
    </div>
  );
};

export default CharacterAvatarCreator;