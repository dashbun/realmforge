import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CharacterCard from '../components/character/CharacterCard';
import MapCard from '../components/map/MapCard';
import PowerSystemCard from '../components/power/PowerSystemCard';
import Button from '../components/ui/Button';
import Modal from '../components/modals/Modal';
import CharacterForm from '../components/forms/CharacterForm';
import MapForm from '../components/forms/MapForm';
import PowerSystemForm from '../components/forms/PowerSystemForm';
import WorldForm from '../components/forms/WorldForm';
import LoreForm from '../components/forms/LoreForm';
import { Plus, User, MapPin, Zap, Book, ChevronRight, Pencil, Share2, Trash } from 'lucide-react';
import { useWorlds } from '../context/WorldContext';
import { Character, Map, PowerSystem, Lore } from '../types';

const WorldDetailPage: React.FC = () => {
  const { 
    currentWorld, 
    updateWorld,
    characters,
    maps,
    powerSystems,
    lore,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    createMap,
    updateMap,
    deleteMap,
    createPowerSystem,
    updatePowerSystem,
    deletePowerSystem,
    createLore,
    updateLore,
    deleteLore
  } = useWorlds();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'characters' | 'maps' | 'powers' | 'lore'>('overview');
  
  const [editWorldModal, setEditWorldModal] = useState(false);
  const [editCharacterModal, setEditCharacterModal] = useState(false);
  const [editMapModal, setEditMapModal] = useState(false);
  const [editPowerSystemModal, setEditPowerSystemModal] = useState(false);
  const [editLoreModal, setEditLoreModal] = useState(false);
  
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);
  const [selectedPowerSystem, setSelectedPowerSystem] = useState<PowerSystem | null>(null);
  const [selectedLore, setSelectedLore] = useState<Lore | null>(null);

  if (!currentWorld) {
    return <div>No world selected</div>;
  }

  const handleWorldUpdate = async (data: Partial<typeof currentWorld>) => {
    try {
      await updateWorld(currentWorld.id, data);
      setEditWorldModal(false);
    } catch (error) {
      console.error('Failed to update world:', error);
    }
  };

  const handleCharacterSubmit = async (data: Partial<Character>) => {
    try {
      if (selectedCharacter) {
        await updateCharacter(selectedCharacter.id, data);
      } else {
        await createCharacter(data as Omit<Character, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>);
      }
      setEditCharacterModal(false);
      setSelectedCharacter(null);
    } catch (error) {
      console.error('Failed to save character:', error);
    }
  };

  const handleMapSubmit = async (data: Partial<Map>) => {
    try {
      if (selectedMap) {
        await updateMap(selectedMap.id, data);
      } else {
        await createMap(data as Omit<Map, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>);
      }
      setEditMapModal(false);
      setSelectedMap(null);
    } catch (error) {
      console.error('Failed to save map:', error);
    }
  };

  const handlePowerSystemSubmit = async (data: Partial<PowerSystem>) => {
    try {
      if (selectedPowerSystem) {
        await updatePowerSystem(selectedPowerSystem.id, data);
      } else {
        await createPowerSystem(data as Omit<PowerSystem, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>);
      }
      setEditPowerSystemModal(false);
      setSelectedPowerSystem(null);
    } catch (error) {
      console.error('Failed to save power system:', error);
    }
  };

  const handleLoreSubmit = async (data: Partial<Lore>) => {
    try {
      if (selectedLore) {
        await updateLore(selectedLore.id, {
          title: data.title as string,
          content: data.content as string,
          category: data.category as string,
          location: data.location as string,
          era: data.era as string,
          importance: data.importance as 'minor' | 'major' | 'crucial',
          isSecret: data.isSecret as boolean
        });
      } else {
        await createLore({
          title: data.title as string,
          content: data.content as string,
          category: data.category as string,
          location: data.location as string,
          era: data.era as string,
          importance: data.importance as 'minor' | 'major' | 'crucial',
          isSecret: data.isSecret as boolean
        });
      }
      setEditLoreModal(false);
      setSelectedLore(null);
    } catch (error) {
      console.error('Failed to save lore:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `url(${currentWorld.imageUrl || 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg'})` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {currentWorld.name}
                </h1>
                <p className="text-gray-200 max-w-2xl">
                  {currentWorld.description}
                </p>
              </div>
              <div className="hidden md:flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Pencil className="h-4 w-4" />}
                  className="border-white text-white hover:bg-white/20"
                  onClick={() => setEditWorldModal(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Share2 className="h-4 w-4" />}
                  className="border-white text-white hover:bg-white/20"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            <button 
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'overview' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'characters' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('characters')}
            >
              Characters
            </button>
            <button 
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'maps' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('maps')}
            >
              Maps
            </button>
            <button 
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'powers' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('powers')}
            >
              Power Systems
            </button>
            <button 
              className={`px-4 py-4 font-medium text-sm border-b-2 ${
                activeTab === 'lore' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('lore')}
            >
              Lore
            </button>
          </nav>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === 'lore' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Lore Entries</h2>
              <Button
                variant="outline"
                size="sm"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  setSelectedLore(null);
                  setEditLoreModal(true);
                }}
              >
                Add Lore
              </Button>
            </div>

            {lore.length === 0 ? (
              <p className="text-gray-500">No lore entries yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lore.map((l: Lore) => (
                  <div key={l.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <h3 className="font-semibold text-lg mb-2">{l.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{l.category}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Location: {l.location}</span>
                      <span>Era: {l.era}</span>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Pencil className="h-4 w-4" />}
                        onClick={() => {
                          setSelectedLore(l);
                          setEditLoreModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash className="h-4 w-4" />}
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this lore entry?')) {
                            deleteLore(l.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="h-5 w-5 text-indigo-600 mr-2" />
                  Characters
                </h3>
                <span className="text-sm text-gray-500">{characters.length}</span>
              </div>
              
              {characters.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {characters.slice(0, 2).map(character => (
                    <div key={character.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-indigo-800 dark:text-indigo-200">
                          {character.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {character.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {character.race} • {character.class}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  No characters created yet
                </p>
              )}
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                icon={<ChevronRight className="h-4 w-4" />}
                onClick={() => setActiveTab('characters')}
              >
                View All
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
                  Maps
                </h3>
                <span className="text-sm text-gray-500">{maps.length}</span>
              </div>
              
              {maps.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {maps.slice(0, 2).map(map => (
                    <div key={map.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <MapPin className="h-4 w-4 text-blue-800 dark:text-blue-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {map.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {map.regions.length} {map.regions.length === 1 ? 'region' : 'regions'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  No maps created yet
                </p>
              )}
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                icon={<ChevronRight className="h-4 w-4" />}
                onClick={() => setActiveTab('maps')}
              >
                View All
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="h-5 w-5 text-indigo-600 mr-2" />
                  Power Systems
                </h3>
                <span className="text-sm text-gray-500">{powerSystems.length}</span>
              </div>
              
              {powerSystems.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {powerSystems.slice(0, 2).map(powerSystem => (
                    <div key={powerSystem.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                        <Zap className="h-4 w-4 text-purple-800 dark:text-purple-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {powerSystem.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {powerSystem.categories.length} {powerSystem.categories.length === 1 ? 'category' : 'categories'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  No power systems created yet
                </p>
              )}
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                icon={<ChevronRight className="h-4 w-4" />}
                onClick={() => setActiveTab('powers')}
              >
                View All
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Book className="h-5 w-5 text-indigo-600 mr-2" />
                  Lore
                </h3>
                <span className="text-sm text-gray-500">0</span>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                No lore entries created yet
              </p>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                icon={<ChevronRight className="h-4 w-4" />}
                onClick={() => setActiveTab('lore')}
              >
                View All
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'characters' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Characters</h2>
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
                onClick={() => {
                  setSelectedCharacter(null);
                  setEditCharacterModal(true);
                }}
              >
                Create Character
              </Button>
            </div>
            
            {characters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map(character => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={() => {
                      setSelectedCharacter(character);
                      setEditCharacterModal(true);
                    }}
                    onDelete={() => deleteCharacter(character.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
                  <User className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No characters yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Create memorable characters with unique attributes, backstories, and personalities.
                </p>
                <Button
                  variant="primary"
                  icon={<Plus className="h-5 w-5" />}
                  onClick={() => {
                    setSelectedCharacter(null);
                    setEditCharacterModal(true);
                  }}
                >
                  Create Your First Character
                </Button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'maps' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Maps</h2>
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
                onClick={() => {
                  setSelectedMap(null);
                  setEditMapModal(true);
                }}
              >
                Create Map
              </Button>
            </div>
            
            {maps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {maps.map(map => (
                  <MapCard
                    key={map.id}
                    map={map}
                    onClick={() => {
                      setSelectedMap(map);
                      setEditMapModal(true);
                    }}
                    onDelete={() => deleteMap(map.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
                  <MapPin className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No maps yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Create detailed maps with regions, landmarks, and geographic features.
                </p>
                <Button
                  variant="primary"
                  icon={<Plus className="h-5 w-5" />}
                  onClick={() => {
                    setSelectedMap(null);
                    setEditMapModal(true);
                  }}
                >
                  Create Your First Map
                </Button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'powers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Power Systems</h2>
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
                onClick={() => {
                  setSelectedPowerSystem(null);
                  setEditPowerSystemModal(true);
                }}
              >
                Create Power System
              </Button>
            </div>
            
            {powerSystems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {powerSystems.map(powerSystem => (
                  <PowerSystemCard
                    key={powerSystem.id}
                    powerSystem={powerSystem}
                    onClick={() => {
                      setSelectedPowerSystem(powerSystem);
                      setEditPowerSystemModal(true);
                    }}
                    onDelete={() => deletePowerSystem(powerSystem.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
                  <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No power systems yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Design your own magic, chakra, or special ability systems with rules and limitations.
                </p>
                <Button
                  variant="primary"
                  icon={<Plus className="h-5 w-5" />}
                  onClick={() => {
                    setSelectedPowerSystem(null);
                    setEditPowerSystemModal(true);
                  }}
                >
                  Create Your First Power System
                </Button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'lore' && (
          <div className="text-center py-12">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-4 inline-flex mb-4">
              <Book className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No lore entries yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              Document your world's history, cultures, religions, and important events.
            </p>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="h-5 w-5" />}
              onClick={() => {
                setSelectedLore(null);
                setEditLoreModal(true);
              }}
            >
              Create Your First Lore Entry
            </Button>
          </div>
        )}
        
        <Modal
          isOpen={editLoreModal}
          onClose={() => {
            setEditLoreModal(false);
            setSelectedLore(null);
          }}
          title={selectedLore ? 'Edit Lore' : 'Add New Lore'}
        >
          <LoreForm
            lore={selectedLore || undefined}
            onSubmit={handleLoreSubmit}
            onCancel={() => {
              setEditLoreModal(false);
              setSelectedLore(null);
            }}
          />
        </Modal>
      </main>
      
      <Modal
        isOpen={editWorldModal}
        onClose={() => setEditWorldModal(false)}
        title="Edit World"
        size="lg"
      >
        <WorldForm
          world={currentWorld}
          onSubmit={handleWorldUpdate}
          onCancel={() => setEditWorldModal(false)}
        />
      </Modal>

      <Modal
        isOpen={editCharacterModal}
        onClose={() => {
          setEditCharacterModal(false);
          setSelectedCharacter(null);
        }}
        title={selectedCharacter ? 'Edit Character' : 'Create Character'}
        size="lg"
      >
        <CharacterForm
          character={selectedCharacter || undefined}
          onSubmit={handleCharacterSubmit}
          onCancel={() => {
            setEditCharacterModal(false);
            setSelectedCharacter(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={editMapModal}
        onClose={() => {
          setEditMapModal(false);
          setSelectedMap(null);
        }}
        title={selectedMap ? 'Edit Map' : 'Create Map'}
        size="xl"
      >
        <MapForm
          map={selectedMap || undefined}
          onSubmit={handleMapSubmit}
          onCancel={() => {
            setEditMapModal(false);
            setSelectedMap(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={editPowerSystemModal}
        onClose={() => {
          setEditPowerSystemModal(false);
          setSelectedPowerSystem(null);
        }}
        title={selectedPowerSystem ? 'Edit Power System' : 'Create Power System'}
        size="xl"
      >
        <PowerSystemForm
          powerSystem={selectedPowerSystem || undefined}
          onSubmit={handlePowerSystemSubmit}
          onCancel={() => {
            setEditPowerSystemModal(false);
            setSelectedPowerSystem(null);
          }}
        />
      </Modal>

      <Footer />
    </div>
  );
};

export default WorldDetailPage;