import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Map, Region, Landmark } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface MapFormProps {
  map?: Map;
  onSubmit: (data: Partial<Map>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const MapForm: React.FC<MapFormProps> = ({
  map,
  onSubmit,
  onCancel,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    name: map?.name || '',
    description: map?.description || '',
    imageUrl: map?.imageUrl || '',
    regions: map?.regions || [],
  });

  const [newRegion, setNewRegion] = useState<Partial<Region>>({
    name: '',
    description: '',
    type: 'city',
    coordinates: { x: 0, y: 0 },
    landmarks: [],
  });

  const handleAddRegion = () => {
    if (newRegion.name && newRegion.description) {
      setFormData({
        ...formData,
        regions: [...formData.regions, { ...newRegion, id: Date.now().toString() } as Region],
      });
      setNewRegion({
        name: '',
        description: '',
        type: 'city',
        coordinates: { x: 0, y: 0 },
        landmarks: [],
      });
    }
  };

  const handleRemoveRegion = (regionId: string) => {
    setFormData({
      ...formData,
      regions: formData.regions.filter(r => r.id !== regionId),
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
        label="Map Name"
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
      
      <Input
        label="Image URL"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        placeholder="https://example.com/map.jpg"
        fullWidth
      />

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold mb-4">Regions</h3>
        
        <div className="space-y-4 mb-6">
          {formData.regions.map((region) => (
            <div key={region.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{region.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{region.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Type: {region.type} • Position: ({region.coordinates.x}, {region.coordinates.y})
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRegion(region.id)}
                  icon={<Trash2 className="h-4 w-4 text-red-500" />}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-medium mb-4">Add New Region</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Region Name"
              value={newRegion.name}
              onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
              fullWidth
            />
            
            <select
              value={newRegion.type}
              onChange={(e) => setNewRegion({ ...newRegion, type: e.target.value as Region['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="city">City</option>
              <option value="forest">Forest</option>
              <option value="mountain">Mountain</option>
              <option value="ocean">Ocean</option>
              <option value="desert">Desert</option>
              <option value="other">Other</option>
            </select>
            
            <TextArea
              label="Region Description"
              value={newRegion.description}
              onChange={(e) => setNewRegion({ ...newRegion, description: e.target.value })}
              rows={2}
              fullWidth
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                label="X Coordinate"
                value={newRegion.coordinates?.x}
                onChange={(e) => setNewRegion({
                  ...newRegion,
                  coordinates: { ...newRegion.coordinates!, x: parseInt(e.target.value) }
                })}
                fullWidth
              />
              
              <Input
                type="number"
                label="Y Coordinate"
                value={newRegion.coordinates?.y}
                onChange={(e) => setNewRegion({
                  ...newRegion,
                  coordinates: { ...newRegion.coordinates!, y: parseInt(e.target.value) }
                })}
                fullWidth
              />
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddRegion}
            icon={<Plus className="h-4 w-4" />}
            className="mt-4"
          >
            Add Region
          </Button>
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
          {map ? 'Update Map' : 'Create Map'}
        </Button>
      </div>
    </form>
  );
};

export default MapForm;