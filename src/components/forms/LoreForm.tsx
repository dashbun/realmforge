import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Lore } from '../../types';

interface LoreFormProps {
  lore?: Partial<Lore>;
  onSubmit: (data: Partial<Lore>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const LoreForm: React.FC<LoreFormProps> = ({
  lore,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<Lore>>(() => ({
    title: lore?.title || '',
    content: lore?.content || '',
    category: lore?.category || '',
    location: lore?.location || '',
    era: lore?.era || '',
    importance: lore?.importance || 'minor',
    isSecret: lore?.isSecret || false,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      title: formData.title as string,
      content: formData.content as string,
      category: formData.category as string,
      location: formData.location as string,
      era: formData.era as string,
      importance: formData.importance as 'minor' | 'major' | 'crucial',
      isSecret: formData.isSecret as boolean
    };
    onSubmit(submissionData);
  };

  const handleChange = (field: keyof Partial<Lore>) => (value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          value={formData.title as string}
          onChange={(e) => handleChange('title')(e.target.value)}
          required
          fullWidth
        />

        <Input
          label="Category"
          value={formData.category as string}
          onChange={(e) => handleChange('category')(e.target.value)}
          required
          fullWidth
        />

        <Input
          label="Location"
          value={formData.location as string}
          onChange={(e) => handleChange('location')(e.target.value)}
          fullWidth
        />

        <Input
          label="Era"
          value={formData.era as string}
          onChange={(e) => handleChange('era')(e.target.value)}
          fullWidth
        />

        <div className="col-span-full">
          <TextArea
            label="Content"
            value={formData.content as string}
            onChange={(e) => handleChange('content')(e.target.value)}
            required
            rows={6}
            fullWidth
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Importance
            </label>
            <select
              value={formData.importance as string}
              onChange={(e) => handleChange('importance')(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="crucial">Crucial</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isSecret as boolean}
              onChange={(e) => handleChange('isSecret')(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-gray-200">Secret</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default LoreForm;
