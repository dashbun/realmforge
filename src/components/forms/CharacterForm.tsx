import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Character } from '../../types';

interface CharacterFormProps {
  character?: Character;
  onSubmit: (data: Partial<Character>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  character,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: character?.name || '',
    race: character?.race || '',
    class: character?.class || '',
    level: character?.level || 1,
    attributes: {
      strength: character?.attributes.strength || 10,
      dexterity: character?.attributes.dexterity || 10,
      constitution: character?.attributes.constitution || 10,
      intelligence: character?.attributes.intelligence || 10,
      wisdom: character?.attributes.wisdom || 10,
      charisma: character?.attributes.charisma || 10,
    },
    personality: character?.personality || '',
    backstory: character?.backstory || '',
    appearance: character?.appearance || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          fullWidth
        />
        
        <Input
          label="Race"
          value={formData.race}
          onChange={(e) => setFormData({ ...formData, race: e.target.value })}
          required
          fullWidth
        />
        
        <Input
          label="Class"
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          required
          fullWidth
        />
        
        <Input
          type="number"
          label="Level"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
          required
          min={1}
          max={20}
          fullWidth
        />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4">Attributes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(formData.attributes).map(([key, value]) => (
            <Input
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type="number"
              value={value}
              onChange={(e) => setFormData({
                ...formData,
                attributes: {
                  ...formData.attributes,
                  [key]: parseInt(e.target.value),
                },
              })}
              min={1}
              max={20}
              required
              fullWidth
            />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <TextArea
          label="Personality"
          value={formData.personality}
          onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
          rows={3}
          required
          fullWidth
        />
        
        <TextArea
          label="Backstory"
          value={formData.backstory}
          onChange={(e) => setFormData({ ...formData, backstory: e.target.value })}
          rows={5}
          required
          fullWidth
        />
        
        <TextArea
          label="Appearance"
          value={formData.appearance}
          onChange={(e) => setFormData({ ...formData, appearance: e.target.value })}
          rows={3}
          required
          fullWidth
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {character ? 'Update Character' : 'Create Character'}
        </Button>
      </div>
    </form>
  );
};

export default CharacterForm;