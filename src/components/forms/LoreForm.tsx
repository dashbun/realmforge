import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Lore } from '../../types';
import { X, Plus } from 'lucide-react';

interface LoreFormProps {
  lore?: Lore;
  onSubmit: (data: Partial<Lore>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoreForm: React.FC<LoreFormProps> = ({
  lore,
  onSubmit,
  onCancel,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    title: lore?.title || '',
    content: lore?.content || '',
    category: lore?.category || 'history',
    tags: lore?.tags || [],
  });

  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 dark:text-red-400 font-semibold text-center">
          {error}
        </div>
      )}
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        fullWidth
      />
      
      <Select
        label="Category"
        value={formData.category}
        onChange={(value) => setFormData({ ...formData, category: value as Lore['category'] })}
        options={[
          { value: 'history', label: 'History' },
          { value: 'culture', label: 'Culture' },
          { value: 'religion', label: 'Religion' },
          { value: 'technology', label: 'Technology' },
          { value: 'other', label: 'Other' },
        ]}
        required
        fullWidth
      />
      
      <TextArea
        label="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        rows={10}
        required
        fullWidth
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            fullWidth
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddTag}
            icon={<Plus className="h-4 w-4" />}
          >
            Add
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1.5 inline-flex items-center justify-center hover:text-indigo-900 dark:hover:text-indigo-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
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
          {lore ? 'Update Lore' : 'Create Lore'}
        </Button>
      </div>
    </form>
  );
};

export default LoreForm;