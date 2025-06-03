// Common Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface World {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  isPublic: boolean;
}

export interface Character {
  id: string;
  worldId: string;
  name: string;
  race: string;
  class: string;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  backstory: string;
  personality: string;
  appearance: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PowerSystem {
  id: string;
  worldId: string;
  name: string;
  description: string;
  categories: PowerCategory[];
  rules: string[];
  limitations: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lore {
  id: string;
  worldId: string;
  title: string;
  content: string;
  category: string;
  location: string;
  era: string;
  importance: 'minor' | 'major' | 'crucial';
  isSecret: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PowerCategory {
  id: string;
  name: string;
  description: string;
  abilities: string[];
}

export interface Map {
  id: string;
  worldId: string;
  name: string;
  description: string;
  imageUrl?: string;
  regions: Region[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  type: 'city' | 'forest' | 'mountain' | 'ocean' | 'desert' | 'other';
  coordinates: {
    x: number;
    y: number;
  };
  landmarks: Landmark[];
}

export interface Landmark {
  id: string;
  name: string;
  description: string;
  type: string;
  coordinates: {
    x: number;
    y: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

// Form Types
export interface CharacterFormData {
  name: string;
  race: string;
  class: string;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  backstory: string;
  personality: string;
  appearance: string;
  imageUrl?: string;
}

export interface WorldFormData {
  name: string;
  description: string;
  imageUrl?: string;
  isPublic: boolean;
}

export interface PowerSystemFormData {
  name: string;
  description: string;
  categories: PowerCategory[];
  rules: string[];
  limitations: string[];
}

export interface MapFormData {
  name: string;
  description: string;
  imageUrl?: string;
  regions: Region[];
}