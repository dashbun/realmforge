import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { World, Character, PowerSystem, Map, LoreEntry, User, Template } from '../types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  
  // World state
  currentWorld: World | null;
  worlds: World[];
  
  // Content state
  characters: Character[];
  powerSystems: PowerSystem[];
  maps: Map[];
  lore: LoreEntry[];
  
  // UI state
  sidebarOpen: boolean;
  activeTab: string;
  selectedItems: string[];
  
  // AI state
  aiLoading: boolean;
  aiHistory: any[];
  
  // Template state
  templates: Template[];
  
  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthLoading: (loading: boolean) => void;
  
  // User Actions
  setUser: (user: User | null) => void;
  setCurrentWorld: (world: World | null) => void;
  addWorld: (world: World) => void;
  updateWorld: (id: string, updates: Partial<World>) => void;
  deleteWorld: (id: string) => void;
  
  fetchCharacters: () => Promise<void>;
  addCharacter: (character: Partial<Character>) => Promise<void>;
  updateCharacter: (id: string, updates: Partial<Character>) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;

  fetchPowerSystems: () => Promise<void>;
  addPowerSystem: (powerSystem: Partial<PowerSystem>) => Promise<void>;
  updatePowerSystem: (id: string, updates: Partial<PowerSystem>) => Promise<void>;
  deletePowerSystem: (id: string) => Promise<void>;

  fetchMaps: () => Promise<void>;
  addMap: (map: Partial<Map>) => Promise<void>;
  updateMap: (id: string, updates: Partial<Map>) => Promise<void>;
  deleteMap: (id: string) => Promise<void>;

  fetchLore: () => Promise<void>;
  addLore: (lore: Partial<LoreEntry>) => Promise<void>;
  updateLore: (id: string, updates: Partial<LoreEntry>) => Promise<void>;
  deleteLore: (id: string) => Promise<void>;

  crudLoading: boolean;
  crudError: string | null;
  
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  setSelectedItems: (items: string[]) => void;
  
  setAiLoading: (loading: boolean) => void;
  addAiHistory: (entry: any) => void;
  
  setTemplates: (templates: Template[]) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        authLoading: false,
        currentWorld: null,
        worlds: [],
        characters: [],
        powerSystems: [],
        maps: [],
        lore: [],
        sidebarOpen: true,
        activeTab: 'overview',
        selectedItems: [],
        aiLoading: false,
        aiHistory: [],
        templates: [],

        // Auth actions
        login: async (email: string, password: string) => {
          set({ authLoading: true });
          try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock user creation
            const mockUser: User = {
              id: Date.now().toString(),
              username: email.split('@')[0],
              email,
              subscription: 'free',
              createdAt: new Date(),
            };
            
            // Create a default world for new users
            const defaultWorld: World = {
              id: 'default-world-' + Date.now(),
              name: 'My First World',
              description: 'Welcome to your first world! Start building your fantasy realm here.',
              genre: 'fantasy',
              createdBy: mockUser.id,
              collaborators: [],
              createdAt: new Date(),
              updatedAt: new Date(),
              isPublic: false,
              settings: {
                theme: 'light',
                defaultTemplates: [],
                aiSettings: {
                  textModel: 'gpt-4',
                  imageModel: 'dall-e-3',
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
              tags: ['fantasy', 'starter'],
              featured: false
            };
            
            set({ 
              user: mockUser, 
              isAuthenticated: true, 
              authLoading: false,
              worlds: [defaultWorld],
              currentWorld: defaultWorld
            });
          } catch (error) {
            set({ authLoading: false });
            throw new Error('Login failed. Please check your credentials.');
          }
        },

        register: async (username: string, email: string, password: string) => {
          set({ authLoading: true });
          try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock user creation
            const mockUser: User = {
              id: Date.now().toString(),
              username,
              email,
              subscription: 'free',
              createdAt: new Date(),
            };
            
            // Create a default world for new users
            const defaultWorld: World = {
              id: 'default-world-' + Date.now(),
              name: 'My First World',
              description: 'Welcome to your first world! Start building your fantasy realm here.',
              genre: 'fantasy',
              createdBy: mockUser.id,
              collaborators: [],
              createdAt: new Date(),
              updatedAt: new Date(),
              isPublic: false,
              settings: {
                theme: 'light',
                defaultTemplates: [],
                aiSettings: {
                  textModel: 'gpt-4',
                  imageModel: 'dall-e-3',
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
              tags: ['fantasy', 'starter'],
              featured: false
            };
            
            set({ 
              user: mockUser, 
              isAuthenticated: true, 
              authLoading: false,
              worlds: [defaultWorld],
              currentWorld: defaultWorld
            });
          } catch (error) {
            set({ authLoading: false });
            throw new Error('Registration failed. Please try again.');
          }
        },

        logout: () => {
          set({ 
            user: null, 
            isAuthenticated: false, 
            currentWorld: null,
            worlds: [],
            characters: [],
            powerSystems: [],
            maps: [],
            lore: []
          });
        },

        setAuthLoading: (loading) => set({ authLoading: loading }),

        // User actions
        setUser: (user) => set({ user, isAuthenticated: !!user }),

        // World actions
        setCurrentWorld: (world) => set({ currentWorld: world }),
        addWorld: (world) => set((state) => ({ worlds: [...state.worlds, world] })),
        updateWorld: (id, updates) => set((state) => ({
          worlds: state.worlds.map(w => w.id === id ? { ...w, ...updates, updatedAt: new Date() } : w),
          currentWorld: state.currentWorld?.id === id ? { ...state.currentWorld, ...updates, updatedAt: new Date() } : state.currentWorld
        })),
        deleteWorld: (id) => set((state) => ({
          worlds: state.worlds.filter(w => w.id !== id),
          currentWorld: state.currentWorld?.id === id ? null : state.currentWorld
        })),

        // CRUD Loading/Error State
        crudLoading: false,
        crudError: null,

        // --- Characters ---
        fetchCharacters: async () => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/characters');
            const data = await res.json();
            set({ characters: data, crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to fetch characters', crudLoading: false });
          }
        },
        addCharacter: async (character) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/characters', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(character)
            });
            if (!res.ok) throw new Error('Failed to add character');
            await get().fetchCharacters();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to add character', crudLoading: false });
          }
        },
        updateCharacter: async (id, updates) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/characters/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update character');
            await get().fetchCharacters();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to update character', crudLoading: false });
          }
        },
        deleteCharacter: async (id) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/characters/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete character');
            await get().fetchCharacters();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to delete character', crudLoading: false });
          }
        },

        // --- Power Systems ---
        fetchPowerSystems: async () => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/powersystems');
            const data = await res.json();
            set({ powerSystems: data, crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to fetch power systems', crudLoading: false });
          }
        },
        addPowerSystem: async (powerSystem) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/powersystems', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(powerSystem)
            });
            if (!res.ok) throw new Error('Failed to add power system');
            await get().fetchPowerSystems();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to add power system', crudLoading: false });
          }
        },
        updatePowerSystem: async (id, updates) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/powersystems/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update power system');
            await get().fetchPowerSystems();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to update power system', crudLoading: false });
          }
        },
        deletePowerSystem: async (id) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/powersystems/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete power system');
            await get().fetchPowerSystems();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to delete power system', crudLoading: false });
          }
        },

        // --- Maps ---
        fetchMaps: async () => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/maps');
            const data = await res.json();
            set({ maps: data, crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to fetch maps', crudLoading: false });
          }
        },
        addMap: async (map) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/maps', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(map)
            });
            if (!res.ok) throw new Error('Failed to add map');
            await get().fetchMaps();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to add map', crudLoading: false });
          }
        },
        updateMap: async (id, updates) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/maps/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update map');
            await get().fetchMaps();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to update map', crudLoading: false });
          }
        },
        deleteMap: async (id) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/maps/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete map');
            await get().fetchMaps();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to delete map', crudLoading: false });
          }
        },

        // --- Lore ---
        fetchLore: async () => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/lore');
            const data = await res.json();
            set({ lore: data, crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to fetch lore', crudLoading: false });
          }
        },
        addLore: async (lore) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch('http://localhost:5000/api/lore', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(lore)
            });
            if (!res.ok) throw new Error('Failed to add lore');
            await get().fetchLore();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to add lore', crudLoading: false });
          }
        },
        updateLore: async (id, updates) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/lore/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update lore');
            await get().fetchLore();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to update lore', crudLoading: false });
          }
        },
        deleteLore: async (id) => {
          set({ crudLoading: true, crudError: null });
          try {
            const res = await fetch(`http://localhost:5000/api/lore/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete lore');
            await get().fetchLore();
            set({ crudLoading: false });
          } catch (err) {
            set({ crudError: 'Failed to delete lore', crudLoading: false });
          }
        },

        // UI actions
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        setActiveTab: (tab) => set({ activeTab: tab }),
        setSelectedItems: (items) => set({ selectedItems: items }),

        // AI actions
        setAiLoading: (loading) => set({ aiLoading: loading }),
        addAiHistory: (entry) => set((state) => ({ aiHistory: [...state.aiHistory, entry] })),

        // Template actions
        setTemplates: (templates) => set({ templates }),
      }),
      {
        name: 'realmforge-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          currentWorld: state.currentWorld,
          worlds: state.worlds,
          characters: state.characters,
          powerSystems: state.powerSystems,
          maps: state.maps,
          lore: state.lore,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    { name: 'realmforge-store' }
  )
);