import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Star,
  Clock,
  Users,
  Globe,
  User,
  MapPin,
  Zap,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import GlassCard from '../components/core/UI/GlassCard';
import NeuButton from '../components/core/UI/NeuButton';
import WorldCard from '../components/world/WorldCard';

const DashboardPage: React.FC = () => {
  const { 
    user, 
    worlds, 
    addWorld, 
    setCurrentWorld,
    characters,
    maps,
    powerSystems,
    lore,
    fetchCharacters,
    fetchMaps,
    fetchPowerSystems,
    fetchLore,
    addCharacter,
    addMap,
    addPowerSystem,
    addLore,
    crudLoading,
    crudError,
    currentWorld
  } = useAppStore();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('updated');

  React.useEffect(() => {
    fetchCharacters();
    fetchMaps();
    fetchPowerSystems();
    fetchLore();
    // eslint-disable-next-line
  }, []);

  const filteredWorlds = worlds.filter(world => 
    world.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    world.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedWorlds = [...filteredWorlds].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'updated':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const handleCreateWorld = () => {
    const newWorld = {
      id: Date.now().toString(),
      name: 'New World',
      description: 'A fresh world waiting to be explored and developed.',
      genre: 'fantasy' as const,
      createdBy: user?.id || '',
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      settings: {
        theme: 'light' as const,
        defaultTemplates: [],
        aiSettings: {
          textModel: 'gpt-4' as const,
          imageModel: 'dall-e-3' as const,
          maxTokens: 2000,
          temperature: 0.7,
          features: {
            characterGeneration: true,
            loreAssistance: true,
            imageGeneration: true,
            consistencyChecking: true,
            nameGeneration: true
          }
        }
      },
      tags: [],
      featured: false
    };

    addWorld(newWorld);
    setCurrentWorld(newWorld);
    navigate(`/worlds/${newWorld.id}`);
  };

  const handleWorldClick = (worldId: string) => {
    const world = worlds.find(w => w.id === worldId);
    if (world) {
      setCurrentWorld(world);
      navigate(`/worlds/${worldId}`);
    }
  };

  const handleQuickCreate = async (type: 'character' | 'map' | 'power' | 'lore') => {
    if (!currentWorld) {
      // If no current world, create one first
      handleCreateWorld();
      return;
    }

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
              biography: '',
              personality: {
                traits: [],
                alignment: 'neutral',
                temperament: 'balanced',
                quirks: [],
                flaws: [],
                virtues: []
              },
              relationships: [],
              backstory: '',
              goals: [],
              fears: [],
              motivations: []
            },
            attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
            skills: [],
            equipment: [],
            abilities: [],
            aiGenerated: {
              dialogue: [],
              voiceProfile: {
                tone: 'neutral',
                pitch: 'medium',
                accent: 'standard',
                speechPatterns: []
              },
              behaviorPatterns: [],
              suggestedQuests: []
            }
          };
          await addCharacter(newCharacter);
          navigate(`/worlds/${currentWorld.id}?tab=characters`);
          break;
        }
        case 'map': {
          const newMap = {
            name: 'New Map',
            description: 'A new area to explore',
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
          navigate(`/worlds/${currentWorld.id}?tab=maps`);
          break;
        }
        case 'power': {
          const newPowerSystem = {
            name: 'New Power System',
            type: 'magic' as const,
            description: 'A new magical system',
            mechanics: {
              powerSource: 'Elemental Energy',
              limitations: [],
              costs: {
                type: 'mana' as const,
                baseAmount: 100,
                scalingFactor: 1.2,
                regeneration: {
                  rate: 10,
                  conditions: [],
                  modifiers: {}
                }
              },
              balancing: {
                powerLevel: 1,
                restrictions: [],
                counters: []
              },
              scaling: {
                levelBased: true,
                attributeBased: false,
                skillBased: false
              }
            },
            abilities: [],
            skillTrees: [],
            templates: [],
            customRules: []
          };
          await addPowerSystem(newPowerSystem);
          navigate(`/worlds/${currentWorld.id}?tab=powers`);
          break;
        }
        case 'lore': {
          const newLore = {
            type: 'event' as const,
            title: 'New Lore Entry',
            content: 'A new piece of world lore',
            summary: '',
            connections: [],
            timelinePosition: {
              era: 'Current Era',
              year: 1000,
              importance: 1
            },
            tags: [],
            importance: 1,
            aiSuggestions: [],
            consistencyFlags: []
          };
          await addLore(newLore);
          navigate(`/worlds/${currentWorld.id}?tab=lore`);
          break;
        }
      }
    } catch (err) {
      // Error handling is provided by crudError in UI
    }
  };

  const stats = [
    {
      label: 'Total Worlds',
      value: worlds.length,
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      action: () => handleCreateWorld()
    },
    {
      label: 'Characters',
      value: characters.length,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      action: () => handleQuickCreate('character')
    },
    {
      label: 'Maps',
      value: maps.length,
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      action: () => handleQuickCreate('map')
    },
    {
      label: 'Lore Entries',
      value: lore.length,
      icon: BookOpen,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      action: () => handleQuickCreate('lore')
    }
  ];

  const quickActions = [
    {
      title: 'Create Character',
      description: 'Design a new character with custom attributes',
      icon: User,
      color: 'from-green-500 to-emerald-600',
      action: () => handleQuickCreate('character')
    },
    {
      title: 'Build Map',
      description: 'Create interactive maps and regions',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-600',
      action: () => handleQuickCreate('map')
    },
    {
      title: 'Design Powers',
      description: 'Create magic systems and abilities',
      icon: Zap,
      color: 'from-purple-500 to-violet-600',
      action: () => handleQuickCreate('power')
    },
    {
      title: 'Write Lore',
      description: 'Document your world\'s history and culture',
      icon: BookOpen,
      color: 'from-orange-500 to-red-600',
      action: () => handleQuickCreate('lore')
    }
  ];

   return (
    <div className="space-y-8">
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

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Continue building your worlds or start a new creative journey
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6 cursor-pointer" hover onClick={stat.action}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <Plus className="h-5 w-5 text-gray-400" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Jump right into creating content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 cursor-pointer group" hover onClick={action.action}>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300">
                  Get started
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current World Section */}
      {currentWorld && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Current World
            </h2>
            <NeuButton 
              variant="primary" 
              onClick={() => navigate(`/worlds/${currentWorld.id}`)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Open World
            </NeuButton>
          </div>

          <GlassCard className="p-6">
            <div className="flex items-start space-x-6">
              <div 
                className="w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0"
                style={{ 
                  backgroundImage: `url(${currentWorld.imageUrl || 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg'})`,
                  backgroundColor: '#4C1D95'
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentWorld.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {currentWorld.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{characters.length} characters</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{maps.length} maps</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>{powerSystems.length} power systems</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{lore.length} lore entries</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Worlds Section */}
      <div className="space-y-6">
        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Worlds
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {worlds.length} {worlds.length === 1 ? 'world' : 'worlds'} created
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search worlds..."
                className="pl-10 pr-4 py-2 w-64 bg-white/10 dark:bg-dark-elevated/50 border border-white/20 dark:border-dark-border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white/10 dark:bg-dark-elevated/50 border border-white/20 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="updated">Last Updated</option>
              <option value="created">Date Created</option>
              <option value="name">Name</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-white/10 dark:bg-dark-elevated/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Create Button */}
            <NeuButton variant="primary" onClick={handleCreateWorld}>
              <Plus className="h-4 w-4 mr-2" />
              Create World
            </NeuButton>
          </div>
        </div>

        {/* Worlds Grid/List */}
        {sortedWorlds.length > 0 ? (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {sortedWorlds.map((world, index) => (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <WorldCard
                  world={world}
                  onClick={() => handleWorldClick(world.id)}
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <GlassCard className="p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {searchTerm ? 'No worlds found' : 'No worlds yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms or create a new world."
                  : "Start your creative journey by creating your first world."}
              </p>
              {!searchTerm && (
                <NeuButton variant="primary" onClick={handleCreateWorld}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First World
                </NeuButton>
              )}
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;