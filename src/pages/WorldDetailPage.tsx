import React, { useState } from 'react';
import { useAppStore } from '../store';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  User, 
  MapPin, 
  Zap, 
  BookOpen, 
  Pencil, 
  Share2,
  ArrowLeft,
  Settings
} from 'lucide-react';
import GlassCard from '../components/core/UI/GlassCard';
import NeuButton from '../components/core/UI/NeuButton';
import CharacterCard from '../components/character/CharacterCard';
import MapCard from '../components/map/MapCard';
import PowerSystemCard from '../components/power/PowerSystemCard';
import LoreCard from '../components/lore/LoreCard';
import Modal from '../components/modals/Modal';
import CharacterForm from '../components/forms/CharacterForm';
import MapForm from '../components/forms/MapForm';
import PowerSystemForm from '../components/forms/PowerSystemForm';
import LoreForm from '../components/forms/LoreForm';

const WorldDetailPage: React.FC = () => {
  // Modal state
  const [isCharacterModalOpen, setCharacterModalOpen] = useState(false);
  const [isMapModalOpen, setMapModalOpen] = useState(false);
  const [isPowerModalOpen, setPowerModalOpen] = useState(false);
  const [isLoreModalOpen, setLoreModalOpen] = useState(false);

  // Edit modal state
  const [editingCharacter, setEditingCharacter] = useState<any | null>(null);
  const [editingMap, setEditingMap] = useState<any | null>(null);
  const [editingPowerSystem, setEditingPowerSystem] = useState<any | null>(null);
  const [editingLore, setEditingLore] = useState<any | null>(null);



  // Handlers to close modals
  const handleCloseCreateModal = (type: 'character' | 'map' | 'power' | 'lore') => {
    switch (type) {
      case 'character': setCharacterModalOpen(false); break;
      case 'map': setMapModalOpen(false); break;
      case 'power': setPowerModalOpen(false); break;
      case 'lore': setLoreModalOpen(false); break;
    }
  };

  // Handlers to open edit modals
  const handleOpenEditModal = (type: 'character' | 'map' | 'power' | 'lore', entity: any) => {
    switch (type) {
      case 'character': setEditingCharacter(entity); break;
      case 'map': setEditingMap(entity); break;
      case 'power': setEditingPowerSystem(entity); break;
      case 'lore': setEditingLore(entity); break;
    }
  };

  // Handlers to close edit modals
  const handleCloseEditModal = (type: 'character' | 'map' | 'power' | 'lore') => {
    switch (type) {
      case 'character': setEditingCharacter(null); break;
      case 'map': setEditingMap(null); break;
      case 'power': setEditingPowerSystem(null); break;
      case 'lore': setEditingLore(null); break;
    }
  };

  // Edit submit handlers
  const handleEditCharacter = async (data: any) => {
    if (!editingCharacter) return;
    await updateCharacter(editingCharacter.id, data);
    setEditingCharacter(null);
  };
  const handleEditMap = async (data: any) => {
    if (!editingMap) return;
    await updateMap(editingMap.id, data);
    setEditingMap(null);
  };
  const handleEditPowerSystem = async (data: any) => {
    if (!editingPowerSystem) return;
    await updatePowerSystem(editingPowerSystem.id, data);
    setEditingPowerSystem(null);
  };
  const handleEditLore = async (data: any) => {
    if (!editingLore) return;
    await updateLore(editingLore.id, data);
    setEditingLore(null);
  };


  // Modal submit handlers
  const handleCreateCharacter = async (data: any) => {
    await addCharacter(data);
    setCharacterModalOpen(false);
  };
  const handleCreateMap = async (data: any) => {
    await addMap(data);
    setMapModalOpen(false);
  };
  const handleCreatePowerSystem = async (data: any) => {
    await addPowerSystem(data);
    setPowerModalOpen(false);
  };
  const handleCreateLore = async (data: any) => {
    await addLore(data);
    setLoreModalOpen(false);
  };

  const { worldId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'overview';
  
  const { 
    currentWorld,
    worlds,
    setCurrentWorld,
    characters,
    maps,
    powerSystems,
    lore,
    addCharacter,
    addMap,
    addPowerSystem,
    addLore,
    updateCharacter,
    updateMap,
    updatePowerSystem,
    updateLore,
    crudLoading,
    crudError
  } = useAppStore();

  // Find and set the current world if not already set
  React.useEffect(() => {
    if (worldId && (!currentWorld || currentWorld.id !== worldId)) {
      const world = worlds.find(w => w.id === worldId);
      if (world) {
        setCurrentWorld(world);
      } else {
        navigate('/dashboard');
      }
    }
  }, [worldId, currentWorld, worlds, setCurrentWorld, navigate]);

  if (!currentWorld) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            World not found
          </h2>
          <NeuButton variant="primary" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </NeuButton>
        </div>
      </div>
    );
  }

  const handleCreateContent = async (type: 'character' | 'map' | 'power' | 'lore') => {
    try {
      switch (type) {
        case 'character': {
          const newCharacter = {
            name: 'New Character',
            appearance: {
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
            },
            background: {
              biography: 'A mysterious character with an unknown past.',
              personality: {
                traits: ['brave', 'curious'],
                alignment: 'neutral good',
                temperament: 'balanced',
                quirks: [],
                flaws: [],
                virtues: []
              },
              relationships: [],
              backstory: 'Born in a small village, this character seeks adventure.',
              goals: ['Find their true purpose'],
              fears: ['Being forgotten'],
              motivations: ['Protecting the innocent']
            },
            attributes: { 
              strength: 12, 
              dexterity: 14, 
              constitution: 13, 
              intelligence: 15, 
              wisdom: 11, 
              charisma: 16 
            },
            skills: [],
            equipment: [],
            abilities: [],
            aiGenerated: {
              dialogue: [],
              voiceProfile: {
                tone: 'confident',
                pitch: 'medium',
                accent: 'standard',
                speechPatterns: []
              },
              behaviorPatterns: [],
              suggestedQuests: []
            }
          };
          await addCharacter(newCharacter);
          break;
        }
        case 'map': {
          const newMap = {
            name: 'New Region',
            description: 'An unexplored region waiting to be mapped.',
            type: '2d' as const,
            layers: [],
            regions: [],
            markers: [],
            settings: {
              defaultZoom: 1,
              maxZoom: 5,
              minZoom: 0.2,
              enableMeasurement: true,
              enableDrawing: true,
              gridVisible: false,
              gridSize: 50,
              coordinateSystem: 'cartesian' as const
            }
          };
          await addMap(newMap);
          break;
        }
        case 'power': {
          const newPowerSystem = {
            name: 'Elemental Magic',
            type: 'magic' as const,
            description: 'A system of magic based on the classical elements.',
            mechanics: {
              powerSource: 'Elemental Energy',
              limitations: ['Requires concentration', 'Limited by elemental affinity'],
              costs: {
                type: 'mana' as const,
                baseAmount: 100,
                scalingFactor: 1.2,
                regeneration: {
                  rate: 10,
                  conditions: ['Rest', 'Meditation'],
                  modifiers: {}
                }
              },
              balancing: {
                powerLevel: 3,
                restrictions: ['Cannot use opposing elements simultaneously'],
                counters: ['Anti-magic fields', 'Elemental resistance']
              },
              scaling: {
                levelBased: true,
                attributeBased: true,
                skillBased: false
              }
            },
            abilities: [],
            skillTrees: [],
            templates: [],
            customRules: []
          };
          await addPowerSystem(newPowerSystem);
          break;
        }
        case 'lore': {
          const newLore = {
            type: 'event' as const,
            title: 'The Great Awakening',
            content: 'A significant event that shaped the world\'s history and brought magic into existence.',
            summary: 'The moment when magic first appeared in the world.',
            connections: [],
            timelinePosition: {
              era: 'Age of Awakening',
              year: 0,
              importance: 5
            },
            tags: ['magic', 'history', 'origin'],
            importance: 5,
            aiSuggestions: [],
            consistencyFlags: []
          };
          await addLore(newLore);
          break;
        }
      }
    } catch (err) {
      // Error handling is provided by crudError in UI
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'characters', label: 'Characters', icon: User, count: characters.length },
    { id: 'maps', label: 'Maps', icon: MapPin, count: maps.length },
    { id: 'powers', label: 'Powers', icon: Zap, count: powerSystems.length },
    { id: 'lore', label: 'Lore', icon: BookOpen, count: lore.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface">
      {/* Header */}
      <div className="bg-white/10 dark:bg-dark-surface/10 backdrop-blur-xl border-b border-white/20 dark:border-dark-border/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <NeuButton
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
              </NeuButton>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentWorld.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentWorld.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <NeuButton variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </NeuButton>
              <NeuButton variant="ghost" size="sm">
                <Pencil className="h-4 w-4" />
              </NeuButton>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 dark:bg-dark-surface/5 backdrop-blur-xl border-b border-white/10 dark:border-dark-border/10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(`/worlds/${worldId}?tab=${tab.id}`)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Loading/Error Feedback */}
        {crudLoading && (
          <div className="flex justify-center items-center py-4">
            <span className="text-blue-600 dark:text-blue-300 font-semibold">Loading...</span>
          </div>
        )}
        {crudError && (
          <div className="flex justify-center items-center py-4">
            <span className="text-red-600 dark:text-red-400 font-semibold">{crudError}</span>
          </div>
        )}

        {/* Character Create Modal */}
        <Modal
          isOpen={isCharacterModalOpen}
          onClose={() => handleCloseCreateModal('character')}
          title="Create Character"
          size="lg"
        >
          <CharacterForm
            onSubmit={handleCreateCharacter}
            onCancel={() => handleCloseCreateModal('character')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>
        {/* Character Edit Modal */}
        <Modal
          isOpen={!!editingCharacter}
          onClose={() => handleCloseEditModal('character')}
          title="Edit Character"
          size="lg"
        >
          <CharacterForm
            character={editingCharacter}
            onSubmit={handleEditCharacter}
            onCancel={() => handleCloseEditModal('character')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>

        {/* Map Create Modal */}
        <Modal
          isOpen={isMapModalOpen}
          onClose={() => handleCloseCreateModal('map')}
          title="Create Map"
          size="lg"
        >
          <MapForm
            onSubmit={handleCreateMap}
            onCancel={() => handleCloseCreateModal('map')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>
        {/* Map Edit Modal */}
        <Modal
          isOpen={!!editingMap}
          onClose={() => handleCloseEditModal('map')}
          title="Edit Map"
          size="lg"
        >
          <MapForm
            map={editingMap}
            onSubmit={handleEditMap}
            onCancel={() => handleCloseEditModal('map')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>

        {/* Power System Create Modal */}
        <Modal
          isOpen={isPowerModalOpen}
          onClose={() => handleCloseCreateModal('power')}
          title="Create Power System"
          size="lg"
        >
          <PowerSystemForm
            onSubmit={handleCreatePowerSystem}
            onCancel={() => handleCloseCreateModal('power')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>
        {/* Power System Edit Modal */}
        <Modal
          isOpen={!!editingPowerSystem}
          onClose={() => handleCloseEditModal('power')}
          title="Edit Power System"
          size="lg"
        >
          <PowerSystemForm
            powerSystem={editingPowerSystem}
            onSubmit={handleEditPowerSystem}
            onCancel={() => handleCloseEditModal('power')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>

        {/* Lore Create Modal */}
        <Modal
          isOpen={isLoreModalOpen}
          onClose={() => handleCloseCreateModal('lore')}
          title="Create Lore Entry"
          size="lg"
        >
          <LoreForm
            onSubmit={handleCreateLore}
            onCancel={() => handleCloseCreateModal('lore')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>
        {/* Lore Edit Modal */}
        <Modal
          isOpen={!!editingLore}
          onClose={() => handleCloseEditModal('lore')}
          title="Edit Lore Entry"
          size="lg"
        >
          <LoreForm
            lore={editingLore}
            onSubmit={handleEditLore}
            onCancel={() => handleCloseEditModal('lore')}
            isLoading={crudLoading}
            error={crudError}
          />
        </Modal>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {characters.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Characters</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {maps.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Maps</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {powerSystems.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Power Systems</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {lore.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lore Entries</p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'characters' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Characters ({characters.length})
              </h2>
              <NeuButton
                variant="primary"
                onClick={() => handleCreateContent('character')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Character
              </NeuButton>
            </div>

            {characters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map((character) => (
                  <div key={character.id} className="relative group">
                    <CharacterCard character={character} />
                    <button
                      className="absolute top-2 right-2 z-10 opacity-80 group-hover:opacity-100 bg-white dark:bg-gray-800 rounded-full p-1 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => handleOpenEditModal('character', character)}
                      aria-label="Edit Character"
                      type="button"
                    >
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-200" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No characters yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first character to bring your world to life.
                </p>
                <NeuButton
                  variant="primary"
                  onClick={() => handleCreateContent('character')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Character
                </NeuButton>
              </div>
            )}
          </div>
        )}

        {activeTab === 'maps' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Maps ({maps.length})
              </h2>
              <NeuButton
                variant="primary"
                onClick={() => handleCreateContent('map')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Map
              </NeuButton>
            </div>

            {maps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {maps.map((map) => (
                  <div key={map.id} className="relative group">
                    <MapCard map={map} />
                    <button
                      className="absolute top-2 right-2 z-10 opacity-80 group-hover:opacity-100 bg-white dark:bg-gray-800 rounded-full p-1 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => handleOpenEditModal('map', map)}
                      aria-label="Edit Map"
                      type="button"
                    >
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-200" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No maps yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first map to define the geography of your world.
                </p>
                <NeuButton
                  variant="primary"
                  onClick={() => handleCreateContent('map')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Map
                </NeuButton>
              </div>
            )}
          </div>
        )}

        {activeTab === 'powers' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Power Systems ({powerSystems.length})
              </h2>
              <NeuButton
                variant="primary"
                onClick={() => handleCreateContent('power')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Power System
              </NeuButton>
            </div>

            {powerSystems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {powerSystems.map((powerSystem) => (
                  <div key={powerSystem.id} className="relative group">
                    <PowerSystemCard powerSystem={powerSystem} />
                    <button
                      className="absolute top-2 right-2 z-10 opacity-80 group-hover:opacity-100 bg-white dark:bg-gray-800 rounded-full p-1 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => handleOpenEditModal('power', powerSystem)}
                      aria-label="Edit Power System"
                      type="button"
                    >
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-200" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No power systems yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first power system to define magic and abilities.
                </p>
                <NeuButton
                  variant="primary"
                  onClick={() => handleCreateContent('power')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Power System
                </NeuButton>
              </div>
            )}
          </div>
        )}

        {activeTab === 'lore' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Lore ({lore.length})
              </h2>
              <NeuButton
                variant="primary"
                onClick={() => handleCreateContent('lore')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Lore Entry
              </NeuButton>
            </div>

            {lore.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {lore.map((entry) => (
                  <div key={entry.id} className="relative group">
                    <LoreCard lore={entry} />
                    <button
                      className="absolute top-2 right-2 z-10 opacity-80 group-hover:opacity-100 bg-white dark:bg-gray-800 rounded-full p-1 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => handleOpenEditModal('lore', entry)}
                      aria-label="Edit Lore Entry"
                      type="button"
                    >
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-200" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No lore entries yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first lore entry to document your world's history.
                </p>
                <NeuButton
                  variant="primary"
                  onClick={() => handleCreateContent('lore')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Lore Entry
                </NeuButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldDetailPage;