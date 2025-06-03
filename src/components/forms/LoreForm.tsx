import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Lore } from '../../types';

interface LoreFormProps {
  lore?: Lore;
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
  const [formData, setFormData] = useState({
    title: lore?.title || '',
    content: lore?.content || '',
    category: lore?.category || '',
    location: lore?.location || '',
    era: lore?.era || '',
    importance: lore?.importance || 'minor',
    isSecret: lore?.isSecret || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          fullWidth
        />

        <Input
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          fullWidth
        />

        <Input
          label="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          fullWidth
        />

        <Input
          label="Era"
          value={formData.era}
          onChange={(e) => setFormData({ ...formData, era: e.target.value })}
          fullWidth
        />

        <div className="col-span-full">
          <TextArea
            label="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
              value={formData.importance}
              onChange={(e) => setFormData({ ...formData, importance: e.target.value })}
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
              checked={formData.isSecret}
              onChange={(e) => setFormData({ ...formData, isSecret: e.target.checked })}
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
