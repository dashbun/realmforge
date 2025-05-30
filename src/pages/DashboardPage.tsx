import React, { useState } from 'react';
import { useWorlds } from '../context/WorldContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WorldCard from '../components/world/WorldCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plus, Loader, Search } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { worlds, isLoading, setCurrentWorld, createWorld } = useWorlds();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const filteredWorlds = worlds.filter(world => 
    world.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    world.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateWorld = async () => {
    setIsCreating(true);
    try {
      const newWorld = await createWorld(
        'New World',
        'Start building your new world by adding characters, maps, and power systems.',
      );
      setCurrentWorld(newWorld);
      navigate(`/worlds/${newWorld.id}`);
    } catch (error) {
      console.error('Failed to create world:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleWorldClick = (worldId: string) => {
    const world = worlds.find(w => w.id === worldId);
    if (world) {
      setCurrentWorld(world);
      navigate(`/worlds/${worldId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Worlds</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, manage, and explore your storytelling universes
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search worlds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
          </div>
          
          <Button
            variant="primary"
            icon={<Plus className="h-5 w-5" />}
            size="md"
            onClick={handleCreateWorld}
            isLoading={isCreating}
          >
            Create New World
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
          </div>
        ) : filteredWorlds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorlds.map(world => (
              <WorldCard
                key={world.id}
                world={world}
                onClick={() => handleWorldClick(world.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
              <Plus className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No worlds found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              {searchTerm 
                ? "We couldn't find any worlds matching your search. Try different keywords."
                : "You haven't created any worlds yet. Start your creative journey by creating your first world."}
            </p>
            {!searchTerm && (
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
                onClick={handleCreateWorld}
                isLoading={isCreating}
              >
                Create Your First World
              </Button>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;