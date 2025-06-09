import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store';
import { PowerSystem, PowerAbility, SkillTree } from '../../types';
import { 
  Zap, 
  Plus, 
  Trash2, 
  Edit3, 
  Save,
  BarChart3,
  Network,
  Settings,
  Sparkles
} from 'lucide-react';
import GlassCard from '../core/UI/GlassCard';
import NeuButton from '../core/UI/NeuButton';

interface MagicSystemDesignerProps {
  powerSystem?: PowerSystem;
  onSave: (system: PowerSystem) => void;
  onCancel: () => void;
}

const MagicSystemDesigner: React.FC<MagicSystemDesignerProps> = ({ 
  powerSystem, 
  onSave, 
  onCancel 
}) => {
  const [system, setSystem] = useState<PowerSystem>(
    powerSystem || {
      id: '',
      worldId: '',
      name: '',
      type: 'magic',
      description: '',
      mechanics: {
        powerSource: '',
        limitations: [],
        costs: {
          type: 'mana',
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
      customRules: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAbility, setSelectedAbility] = useState<PowerAbility | null>(null);
  const [showAbilityModal, setShowAbilityModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Zap },
    { id: 'abilities', label: 'Abilities', icon: Sparkles },
    { id: 'trees', label: 'Skill Trees', icon: Network },
    { id: 'balance', label: 'Balance', icon: BarChart3 },
    { id: 'rules', label: 'Rules', icon: Settings }
  ];

  const powerTypes = [
    { value: 'magic', label: 'Magic' },
    { value: 'technology', label: 'Technology' },
    { value: 'divine', label: 'Divine' },
    { value: 'natural', label: 'Natural' },
    { value: 'custom', label: 'Custom' }
  ];

  const costTypes = [
    { value: 'mana', label: 'Mana' },
    { value: 'stamina', label: 'Stamina' },
    { value: 'focus', label: 'Focus' },
    { value: 'custom', label: 'Custom' }
  ];

  const updateSystem = (field: string, value: any) => {
    setSystem(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date()
    }));
  };

  const updateMechanics = (field: string, value: any) => {
    setSystem(prev => ({
      ...prev,
      mechanics: {
        ...prev.mechanics,
        [field]: value
      },
      updatedAt: new Date()
    }));
  };

  const addAbility = () => {
    const newAbility: PowerAbility = {
      id: Date.now().toString(),
      name: 'New Ability',
      description: '',
      type: 'offensive',
      tier: 1,
      cost: 10,
      cooldown: 0,
      range: 'self',
      duration: 'instant',
      effects: [],
      prerequisites: []
    };
    
    setSelectedAbility(newAbility);
    setShowAbilityModal(true);
  };

  const saveAbility = (ability: PowerAbility) => {
    setSystem(prev => ({
      ...prev,
      abilities: prev.abilities.some(a => a.id === ability.id)
        ? prev.abilities.map(a => a.id === ability.id ? ability : a)
        : [...prev.abilities, ability],
      updatedAt: new Date()
    }));
    setShowAbilityModal(false);
    setSelectedAbility(null);
  };

  const deleteAbility = (abilityId: string) => {
    setSystem(prev => ({
      ...prev,
      abilities: prev.abilities.filter(a => a.id !== abilityId),
      updatedAt: new Date()
    }));
  };

  const calculatePowerLevel = () => {
    const abilityCount = system.abilities.length;
    const avgTier = system.abilities.reduce((sum, a) => sum + a.tier, 0) / abilityCount || 0;
    const complexityScore = system.customRules.length * 0.5;
    
    return Math.round((abilityCount * 0.3 + avgTier * 0.5 + complexityScore) * 10) / 10;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {powerSystem ? 'Edit Power System' : 'Create Power System'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Design custom magic and power systems for your world
            </p>
          </div>
          <div className="flex space-x-3">
            <NeuButton variant="ghost" onClick={onCancel}>
              Cancel
            </NeuButton>
            <NeuButton variant="primary" onClick={() => onSave(system)}>
              <Save className="h-4 w-4 mr-2" />
              Save System
            </NeuButton>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          System Name
                        </label>
                        <input
                          type="text"
                          value={system.name}
                          onChange={(e) => updateSystem('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Enter system name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Type
                        </label>
                        <select
                          value={system.type}
                          onChange={(e) => updateSystem('type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          {powerTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={system.description}
                        onChange={(e) => updateSystem('description', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Describe how this power system works..."
                      />
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Power Mechanics
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Power Source
                        </label>
                        <input
                          type="text"
                          value={system.mechanics.powerSource}
                          onChange={(e) => updateMechanics('powerSource', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="e.g., Elemental energy, Divine blessing"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cost Type
                        </label>
                        <select
                          value={system.mechanics.costs.type}
                          onChange={(e) => updateMechanics('costs', { ...system.mechanics.costs, type: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          {costTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === 'abilities' && (
                <motion.div
                  key="abilities"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Abilities ({system.abilities.length})
                    </h3>
                    <NeuButton variant="primary" onClick={addAbility}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Ability
                    </NeuButton>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {system.abilities.map((ability) => (
                      <GlassCard key={ability.id} className="p-4" hover>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {ability.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Tier {ability.tier} • {ability.type}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                setSelectedAbility(ability);
                                setShowAbilityModal(true);
                              }}
                              className="p-1 text-gray-400 hover:text-primary-500"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteAbility(ability.id)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {ability.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Cost: {ability.cost}</span>
                          <span>Range: {ability.range}</span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'balance' && (
                <motion.div
                  key="balance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Power Level Analysis
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">
                          {calculatePowerLevel()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Overall Power Level
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {system.abilities.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Total Abilities
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round((system.abilities.reduce((sum, a) => sum + a.tier, 0) / system.abilities.length) * 10) / 10 || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Average Tier
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Balance Recommendations
                        </label>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                          <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                            <li>• Consider adding more low-tier abilities for balance</li>
                            <li>• High-tier abilities should have significant costs</li>
                            <li>• Ensure each ability has clear counters or limitations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Ability Modal */}
      <AnimatePresence>
        {showAbilityModal && selectedAbility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {selectedAbility.id ? 'Edit Ability' : 'Create Ability'}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={selectedAbility.name}
                      onChange={(e) => setSelectedAbility({ ...selectedAbility, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tier
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={selectedAbility.tier}
                      onChange={(e) => setSelectedAbility({ ...selectedAbility, tier: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={selectedAbility.description}
                    onChange={(e) => setSelectedAbility({ ...selectedAbility, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cost
                    </label>
                    <input
                      type="number"
                      value={selectedAbility.cost}
                      onChange={(e) => setSelectedAbility({ ...selectedAbility, cost: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Range
                    </label>
                    <input
                      type="text"
                      value={selectedAbility.range}
                      onChange={(e) => setSelectedAbility({ ...selectedAbility, range: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={selectedAbility.duration}
                      onChange={(e) => setSelectedAbility({ ...selectedAbility, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <NeuButton 
                  variant="ghost" 
                  onClick={() => {
                    setShowAbilityModal(false);
                    setSelectedAbility(null);
                  }}
                >
                  Cancel
                </NeuButton>
                <NeuButton 
                  variant="primary" 
                  onClick={() => saveAbility(selectedAbility)}
                >
                  Save Ability
                </NeuButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagicSystemDesigner;