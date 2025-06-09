import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { PowerSystem, PowerCategory } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface PowerSystemFormProps {
  powerSystem?: PowerSystem;
  onSubmit: (data: Partial<PowerSystem>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const PowerSystemForm: React.FC<PowerSystemFormProps> = ({
  powerSystem,
  onSubmit,
  onCancel,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    name: powerSystem?.name || '',
    description: powerSystem?.description || '',
    categories: powerSystem?.categories || [],
    rules: powerSystem?.rules || [],
    limitations: powerSystem?.limitations || [],
  });

  const [newCategory, setNewCategory] = useState<Partial<PowerCategory>>({
    name: '',
    description: '',
    abilities: [],
  });

  const [newRule, setNewRule] = useState('');
  const [newLimitation, setNewLimitation] = useState('');
  const [newAbility, setNewAbility] = useState('');

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setFormData({
        ...formData,
        categories: [...formData.categories, { ...newCategory, id: Date.now().toString() } as PowerCategory],
      });
      setNewCategory({
        name: '',
        description: '',
        abilities: [],
      });
    }
  };

  const handleAddAbilityToCategory = () => {
    if (newAbility) {
      setNewCategory({
        ...newCategory,
        abilities: [...(newCategory.abilities || []), newAbility],
      });
      setNewAbility('');
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(c => c.id !== categoryId),
    });
  };

  const handleAddRule = () => {
    if (newRule) {
      setFormData({
        ...formData,
        rules: [...formData.rules, newRule],
      });
      setNewRule('');
    }
  };

  const handleAddLimitation = () => {
    if (newLimitation) {
      setFormData({
        ...formData,
        limitations: [...formData.limitations, newLimitation],
      });
      setNewLimitation('');
    }
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
        label="Power System Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
      />
      
      <TextArea
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={4}
        required
        fullWidth
      />

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        
        <div className="space-y-4 mb-6">
          {formData.categories.map((category) => (
            <div key={category.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.abilities.map((ability, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCategory(category.id)}
                  icon={<Trash2 className="h-4 w-4 text-red-500" />}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-medium mb-4">Add New Category</h4>
          <div className="space-y-4">
            <Input
              label="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              fullWidth
            />
            
            <TextArea
              label="Category Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              rows={2}
              fullWidth
            />
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  label="Add Ability"
                  value={newAbility}
                  onChange={(e) => setNewAbility(e.target.value)}
                  placeholder="Enter ability name"
                  fullWidth
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddAbilityToCategory}
                  icon={<Plus className="h-4 w-4" />}
                  className="mt-7"
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {newCategory.abilities?.map((ability, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCategory}
              icon={<Plus className="h-4 w-4" />}
            >
              Add Category
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4">Rules</h3>
        
        <div className="space-y-4">
          {formData.rules.map((rule, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <p className="text-sm">{rule}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormData({
                  ...formData,
                  rules: formData.rules.filter((_, i) => i !== index),
                })}
                icon={<Trash2 className="h-4 w-4 text-red-500" />}
              />
            </div>
          ))}
          
          <div className="flex gap-2">
            <Input
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              placeholder="Enter a new rule"
              fullWidth
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddRule}
              icon={<Plus className="h-4 w-4" />}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4">Limitations</h3>
        
        <div className="space-y-4">
          {formData.limitations.map((limitation, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <p className="text-sm">{limitation}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormData({
                  ...formData,
                  limitations: formData.limitations.filter((_, i) => i !== index),
                })}
                icon={<Trash2 className="h-4 w-4 text-red-500" />}
              />
            </div>
          ))}
          
          <div className="flex gap-2">
            <Input
              value={newLimitation}
              onChange={(e) => setNewLimitation(e.target.value)}
              placeholder="Enter a new limitation"
              fullWidth
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddLimitation}
              icon={<Plus className="h-4 w-4" />}
            >
              Add
            </Button>
          </div>
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
          {powerSystem ? 'Update Power System' : 'Create Power System'}
        </Button>
      </div>
    </form>
  );
};

export default PowerSystemForm;