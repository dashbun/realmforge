import React, { createContext, useContext, useState, useEffect } from 'react';
import { World, Character, Map, PowerSystem } from '../types';
import { useAuth } from './AuthContext';

interface WorldContextType {
  worlds: World[];
  currentWorld: World | null;
  characters: Character[];
  maps: Map[];
  powerSystems: PowerSystem[];
  isLoading: boolean;
  setCurrentWorld: (world: World) => void;
  createWorld: (name: string, description: string, imageUrl?: string) => Promise<World>;
  updateWorld: (id: string, data: Partial<World>) => Promise<World>;
  deleteWorld: (id: string) => Promise<boolean>;
  createCharacter: (data: Omit<Character, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>) => Promise<Character>;
  updateCharacter: (id: string, data: Partial<Character>) => Promise<Character>;
  deleteCharacter: (id: string) => Promise<boolean>;
  createMap: (data: Omit<Map, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>) => Promise<Map>;
  updateMap: (id: string, data: Partial<Map>) => Promise<Map>;
  deleteMap: (id: string) => Promise<boolean>;
  createPowerSystem: (data: Omit<PowerSystem, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>) => Promise<PowerSystem>;
  updatePowerSystem: (id: string, data: Partial<PowerSystem>) => Promise<PowerSystem>;
  deletePowerSystem: (id: string) => Promise<boolean>;
}

const WorldContext = createContext<WorldContextType>({
  worlds: [],
  currentWorld: null,
  characters: [],
  maps: [],
  powerSystems: [],
  isLoading: true,
  setCurrentWorld: () => {},
  createWorld: async () => ({ 
    id: '', 
    name: '', 
    description: '', 
    createdBy: '', 
    createdAt: new Date(), 
    updatedAt: new Date(), 
    isPublic: false 
  }),
  updateWorld: async () => ({ 
    id: '', 
    name: '', 
    description: '', 
    createdBy: '', 
    createdAt: new Date(), 
    updatedAt: new Date(), 
    isPublic: false 
  }),
  deleteWorld: async () => false,
  createCharacter: async () => ({
    id: '',
    worldId: '',
    name: '',
    race: '',
    class: '',
    level: 1,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    backstory: '',
    personality: '',
    appearance: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  updateCharacter: async () => ({
    id: '',
    worldId: '',
    name: '',
    race: '',
    class: '',
    level: 1,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    backstory: '',
    personality: '',
    appearance: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  deleteCharacter: async () => false,
  createMap: async () => ({
    id: '',
    worldId: '',
    name: '',
    description: '',
    regions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  updateMap: async () => ({
    id: '',
    worldId: '',
    name: '',
    description: '',
    regions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  deleteMap: async () => false,
  createPowerSystem: async () => ({
    id: '',
    worldId: '',
    name: '',
    description: '',
    categories: [],
    rules: [],
    limitations: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  updatePowerSystem: async () => ({
    id: '',
    worldId: '',
    name: '',
    description: '',
    categories: [],
    rules: [],
    limitations: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  deletePowerSystem: async () => false,
});

export const useWorlds = () => useContext(WorldContext);

export const WorldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [currentWorld, setCurrentWorld] = useState<World | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [maps, setMaps] = useState<Map[]>([]);
  const [powerSystems, setPowerSystems] = useState<PowerSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load data when user or current world changes
  useEffect(() => {
    const loadData = async () => {
      if (!user || !currentWorld) {
        setCharacters([]);
        setMaps([]);
        setPowerSystems([]);
        return;
      }

      try {
        // Load characters
        const storedCharacters = localStorage.getItem(`realmforge_characters_${currentWorld.id}`);
        if (storedCharacters) {
          setCharacters(JSON.parse(storedCharacters));
        }

        // Load maps
        const storedMaps = localStorage.getItem(`realmforge_maps_${currentWorld.id}`);
        if (storedMaps) {
          setMaps(JSON.parse(storedMaps));
        }

        // Load power systems
        const storedPowerSystems = localStorage.getItem(`realmforge_powersystems_${currentWorld.id}`);
        if (storedPowerSystems) {
          setPowerSystems(JSON.parse(storedPowerSystems));
        }
      } catch (error) {
        console.error('Failed to load world data:', error);
      }
    };

    loadData();
  }, [user, currentWorld]);

  // Load worlds when user changes
  useEffect(() => {
    const loadWorlds = async () => {
      if (!user) {
        setWorlds([]);
        setCurrentWorld(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const storedWorlds = localStorage.getItem(`realmforge_worlds_${user.id}`);
        
        if (storedWorlds) {
          const parsedWorlds = JSON.parse(storedWorlds);
          setWorlds(parsedWorlds);
          
          if (parsedWorlds.length > 0 && !currentWorld) {
            setCurrentWorld(parsedWorlds[0]);
          }
        } else {
          const defaultWorld: World = {
            id: '1',
            name: 'My First World',
            description: 'Welcome to your first world. Start by adding characters, maps, and power systems!',
            createdBy: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPublic: false,
          };
          
          setWorlds([defaultWorld]);
          setCurrentWorld(defaultWorld);
          localStorage.setItem(`realmforge_worlds_${user.id}`, JSON.stringify([defaultWorld]));
        }
      } catch (error) {
        console.error('Failed to load worlds:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorlds();
  }, [user]);

  const createWorld = async (name: string, description: string, imageUrl?: string): Promise<World> => {
    if (!user) throw new Error('You must be logged in to create a world');
    
    const newWorld: World = {
      id: Date.now().toString(),
      name,
      description,
      imageUrl,
      createdBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
    };
    
    const updatedWorlds = [...worlds, newWorld];
    setWorlds(updatedWorlds);
    localStorage.setItem(`realmforge_worlds_${user.id}`, JSON.stringify(updatedWorlds));
    
    return newWorld;
  };

  const updateWorld = async (id: string, data: Partial<World>): Promise<World> => {
    if (!user) throw new Error('You must be logged in to update a world');
    
    const worldIndex = worlds.findIndex(world => world.id === id);
    if (worldIndex === -1) throw new Error('World not found');
    
    const updatedWorld = {
      ...worlds[worldIndex],
      ...data,
      updatedAt: new Date(),
    };
    
    const updatedWorlds = [...worlds];
    updatedWorlds[worldIndex] = updatedWorld;
    
    setWorlds(updatedWorlds);
    
    if (currentWorld && currentWorld.id === id) {
      setCurrentWorld(updatedWorld);
    }
    
    localStorage.setItem(`realmforge_worlds_${user.id}`, JSON.stringify(updatedWorlds));
    
    return updatedWorld;
  };

  const deleteWorld = async (id: string): Promise<boolean> => {
    if (!user) throw new Error('You must be logged in to delete a world');
    
    const updatedWorlds = worlds.filter(world => world.id !== id);
    
    if (updatedWorlds.length === worlds.length) {
      throw new Error('World not found');
    }
    
    setWorlds(updatedWorlds);
    
    if (currentWorld && currentWorld.id === id) {
      setCurrentWorld(updatedWorlds.length > 0 ? updatedWorlds[0] : null);
    }
    
    localStorage.setItem(`realmforge_worlds_${user.id}`, JSON.stringify(updatedWorlds));
    
    return true;
  };

  const createCharacter = async (data: Omit<Character, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>): Promise<Character> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const newCharacter: Character = {
      id: Date.now().toString(),
      worldId: currentWorld.id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedCharacters = [...characters, newCharacter];
    setCharacters(updatedCharacters);
    localStorage.setItem(`realmforge_characters_${currentWorld.id}`, JSON.stringify(updatedCharacters));
    
    return newCharacter;
  };

  const updateCharacter = async (id: string, data: Partial<Character>): Promise<Character> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const characterIndex = characters.findIndex(char => char.id === id);
    if (characterIndex === -1) throw new Error('Character not found');
    
    const updatedCharacter = {
      ...characters[characterIndex],
      ...data,
      updatedAt: new Date(),
    };
    
    const updatedCharacters = [...characters];
    updatedCharacters[characterIndex] = updatedCharacter;
    
    setCharacters(updatedCharacters);
    localStorage.setItem(`realmforge_characters_${currentWorld.id}`, JSON.stringify(updatedCharacters));
    
    return updatedCharacter;
  };

  const deleteCharacter = async (id: string): Promise<boolean> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const updatedCharacters = characters.filter(char => char.id !== id);
    setCharacters(updatedCharacters);
    localStorage.setItem(`realmforge_characters_${currentWorld.id}`, JSON.stringify(updatedCharacters));
    
    return true;
  };

  const createMap = async (data: Omit<Map, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>): Promise<Map> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const newMap: Map = {
      id: Date.now().toString(),
      worldId: currentWorld.id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedMaps = [...maps, newMap];
    setMaps(updatedMaps);
    localStorage.setItem(`realmforge_maps_${currentWorld.id}`, JSON.stringify(updatedMaps));
    
    return newMap;
  };

  const updateMap = async (id: string, data: Partial<Map>): Promise<Map> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const mapIndex = maps.findIndex(map => map.id === id);
    if (mapIndex === -1) throw new Error('Map not found');
    
    const updatedMap = {
      ...maps[mapIndex],
      ...data,
      updatedAt: new Date(),
    };
    
    const updatedMaps = [...maps];
    updatedMaps[mapIndex] = updatedMap;
    
    setMaps(updatedMaps);
    localStorage.setItem(`realmforge_maps_${currentWorld.id}`, JSON.stringify(updatedMaps));
    
    return updatedMap;
  };

  const deleteMap = async (id: string): Promise<boolean> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const updatedMaps = maps.filter(map => map.id !== id);
    setMaps(updatedMaps);
    localStorage.setItem(`realmforge_maps_${currentWorld.id}`, JSON.stringify(updatedMaps));
    
    return true;
  };

  const createPowerSystem = async (data: Omit<PowerSystem, 'id' | 'worldId' | 'createdAt' | 'updatedAt'>): Promise<PowerSystem> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const newPowerSystem: PowerSystem = {
      id: Date.now().toString(),
      worldId: currentWorld.id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedPowerSystems = [...powerSystems, newPowerSystem];
    setPowerSystems(updatedPowerSystems);
    localStorage.setItem(`realmforge_powersystems_${currentWorld.id}`, JSON.stringify(updatedPowerSystems));
    
    return newPowerSystem;
  };

  const updatePowerSystem = async (id: string, data: Partial<PowerSystem>): Promise<PowerSystem> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const powerSystemIndex = powerSystems.findIndex(ps => ps.id === id);
    if (powerSystemIndex === -1) throw new Error('Power system not found');
    
    const updatedPowerSystem = {
      ...powerSystems[powerSystemIndex],
      ...data,
      updatedAt: new Date(),
    };
    
    const updatedPowerSystems = [...powerSystems];
    updatedPowerSystems[powerSystemIndex] = updatedPowerSystem;
    
    setPowerSystems(updatedPowerSystems);
    localStorage.setItem(`realmforge_powersystems_${currentWorld.id}`, JSON.stringify(updatedPowerSystems));
    
    return updatedPowerSystem;
  };

  const deletePowerSystem = async (id: string): Promise<boolean> => {
    if (!currentWorld) throw new Error('No world selected');
    
    const updatedPowerSystems = powerSystems.filter(ps => ps.id !== id);
    setPowerSystems(updatedPowerSystems);
    localStorage.setItem(`realmforge_powersystems_${currentWorld.id}`, JSON.stringify(updatedPowerSystems));
    
    return true;
  };

  return (
    <WorldContext.Provider
      value={{
        worlds,
        currentWorld,
        characters,
        maps,
        powerSystems,
        isLoading,
        setCurrentWorld,
        createWorld,
        updateWorld,
        deleteWorld,
        createCharacter,
        updateCharacter,
        deleteCharacter,
        createMap,
        updateMap,
        deleteMap,
        createPowerSystem,
        updatePowerSystem,
        deletePowerSystem,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
};