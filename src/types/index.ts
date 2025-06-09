// Core Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  subscription: 'free' | 'premium' | 'enterprise';
  createdAt: Date;
}

export interface World {
  id: string;
  name: string;
  description: string;
  genre: 'fantasy' | 'sci-fi' | 'modern' | 'historical' | 'custom';
  createdBy: string;
  collaborators: CollaboratorInfo[];
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  isPublic: boolean;
  settings: WorldSettings;
  tags: string[];
  featured: boolean;
}

export interface WorldSettings {
  theme: 'light' | 'dark' | 'auto';
  defaultTemplates: string[];
  aiSettings: AIConfiguration;
}

export interface CollaboratorInfo {
  userId: string;
  username: string;
  role: 'viewer' | 'editor' | 'admin';
  joinedAt: Date;
}

export interface AIConfiguration {
  textModel: 'gpt-4' | 'gpt-3.5-turbo';
  imageModel: 'dall-e-3' | 'dall-e-2';
  maxTokens: number;
  temperature: number;
  features: {
    characterGeneration: boolean;
    loreAssistance: boolean;
    imageGeneration: boolean;
    consistencyChecking: boolean;
    nameGeneration: boolean;
  };
}

// Character Types
export interface Character {
  id: string;
  worldId: string;
  name: string;
  appearance: CharacterAppearance;
  background: CharacterBackground;
  attributes: Record<string, number>;
  skills: SkillInfo[];
  equipment: EquipmentItem[];
  abilities: AbilityInfo[];
  aiGenerated: AIGeneratedContent;
  createdAt: Date;
  updatedAt: Date;
}

export interface CharacterAppearance {
  avatar: string;
  customization: {
    race: string;
    gender: string;
    age: number;
    height: string;
    build: string;
    skinTone: string;
    hairColor: string;
    hairStyle: string;
    eyeColor: string;
    facialFeatures: Record<string, any>;
    clothing: ClothingItem[];
    accessories: AccessoryItem[];
  };
}

export interface CharacterBackground {
  biography: string;
  personality: PersonalityTraits;
  relationships: RelationshipInfo[];
  backstory: string;
  goals: string[];
  fears: string[];
  motivations: string[];
}

export interface PersonalityTraits {
  traits: string[];
  alignment: string;
  temperament: string;
  quirks: string[];
  flaws: string[];
  virtues: string[];
}

export interface RelationshipInfo {
  characterId: string;
  characterName: string;
  relationshipType: string;
  description: string;
  strength: number;
}

export interface SkillInfo {
  name: string;
  level: number;
  description: string;
  category: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  description: string;
  stats: Record<string, number>;
  rarity: string;
  equipped: boolean;
}

export interface AbilityInfo {
  id: string;
  name: string;
  description: string;
  type: string;
  cost: string;
  cooldown: string;
  damage?: string;
  range?: string;
}

export interface ClothingItem {
  type: string;
  style: string;
  color: string;
  material: string;
}

export interface AccessoryItem {
  type: string;
  style: string;
  color: string;
}

export interface AIGeneratedContent {
  dialogue: string[];
  voiceProfile: VoiceSettings;
  behaviorPatterns: string[];
  suggestedQuests: string[];
}

export interface VoiceSettings {
  tone: string;
  pitch: string;
  accent: string;
  speechPatterns: string[];
}

// Power System Types
export interface PowerSystem {
  id: string;
  worldId: string;
  name: string;
  type: 'magic' | 'technology' | 'divine' | 'natural' | 'custom';
  description: string;
  mechanics: PowerMechanics;
  abilities: PowerAbility[];
  skillTrees: SkillTree[];
  templates: SystemTemplate[];
  customRules: CustomRule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PowerMechanics {
  powerSource: string;
  limitations: string[];
  costs: CostSystem;
  balancing: BalanceRules;
  scaling: ScalingRules;
}

export interface CostSystem {
  type: 'mana' | 'stamina' | 'focus' | 'custom';
  baseAmount: number;
  scalingFactor: number;
  regeneration: RegenerationRules;
}

export interface RegenerationRules {
  rate: number;
  conditions: string[];
  modifiers: Record<string, number>;
}

export interface BalanceRules {
  powerLevel: number;
  restrictions: string[];
  counters: string[];
}

export interface ScalingRules {
  levelBased: boolean;
  attributeBased: boolean;
  skillBased: boolean;
  customFormula?: string;
}

export interface PowerAbility {
  id: string;
  name: string;
  description: string;
  type: string;
  tier: number;
  cost: number;
  cooldown: number;
  range: string;
  duration: string;
  effects: AbilityEffect[];
  prerequisites: string[];
}

export interface AbilityEffect {
  type: string;
  value: number;
  target: string;
  duration: number;
}

export interface SkillTree {
  id: string;
  name: string;
  description: string;
  nodes: SkillNode[];
  connections: SkillConnection[];
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  tier: number;
  position: { x: number; y: number };
  prerequisites: string[];
  unlocks: string[];
  cost: number;
}

export interface SkillConnection {
  from: string;
  to: string;
  type: 'prerequisite' | 'unlock' | 'synergy';
}

export interface SystemTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  data: Record<string, any>;
}

export interface CustomRule {
  id: string;
  name: string;
  description: string;
  conditions: string[];
  effects: string[];
}

// Map Types
export interface Map {
  id: string;
  worldId: string;
  name: string;
  description: string;
  type: '2d' | '3d';
  imageUrl?: string;
  layers: MapLayer[];
  regions: Region[];
  markers: MapMarker[];
  settings: MapSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'base' | 'terrain' | 'political' | 'climate' | 'custom';
  visible: boolean;
  opacity: number;
  data: LayerData;
}

export interface LayerData {
  imageUrl?: string;
  vectorData?: VectorData[];
  markers?: MapMarker[];
}

export interface VectorData {
  type: 'polygon' | 'line' | 'point';
  coordinates: number[][];
  properties: Record<string, any>;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  type: 'kingdom' | 'city' | 'forest' | 'mountain' | 'ocean' | 'desert' | 'other';
  coordinates: Coordinates;
  boundaries: number[][];
  landmarks: Landmark[];
  climate: ClimateInfo;
  population: PopulationInfo;
  government: GovernmentInfo;
  economy: EconomyInfo;
}

export interface Coordinates {
  x: number;
  y: number;
  z?: number;
}

export interface Landmark {
  id: string;
  name: string;
  description: string;
  type: string;
  coordinates: Coordinates;
  importance: number;
  connections: string[];
}

export interface ClimateInfo {
  temperature: string;
  precipitation: string;
  seasons: SeasonInfo[];
}

export interface SeasonInfo {
  name: string;
  duration: number;
  characteristics: string[];
}

export interface PopulationInfo {
  total: number;
  demographics: DemographicInfo[];
  density: string;
  growth: number;
}

export interface DemographicInfo {
  race: string;
  percentage: number;
  culture: string;
}

export interface GovernmentInfo {
  type: string;
  ruler: string;
  structure: string[];
  laws: string[];
}

export interface EconomyInfo {
  primaryIndustries: string[];
  tradeRoutes: TradeRoute[];
  currency: CurrencyInfo;
  resources: ResourceInfo[];
}

export interface TradeRoute {
  id: string;
  name: string;
  start: string;
  end: string;
  goods: string[];
  frequency: string;
}

export interface CurrencyInfo {
  name: string;
  denominations: CurrencyDenomination[];
  exchangeRates: Record<string, number>;
}

export interface CurrencyDenomination {
  name: string;
  value: number;
  material: string;
}

export interface ResourceInfo {
  name: string;
  type: string;
  abundance: string;
  quality: string;
}

export interface MapMarker {
  id: string;
  name: string;
  description: string;
  type: string;
  coordinates: Coordinates;
  icon: string;
  color: string;
  size: number;
  linkedContent: LinkedContent[];
}

export interface LinkedContent {
  type: 'character' | 'lore' | 'event' | 'location';
  id: string;
  name: string;
}

export interface MapSettings {
  defaultZoom: number;
  maxZoom: number;
  minZoom: number;
  enableMeasurement: boolean;
  enableDrawing: boolean;
  gridVisible: boolean;
  gridSize: number;
  coordinateSystem: 'cartesian' | 'geographic';
}

// Lore Types
export interface LoreEntry {
  id: string;
  worldId: string;
  type: 'event' | 'location' | 'organization' | 'culture' | 'mythology' | 'technology' | 'custom';
  title: string;
  content: string;
  summary: string;
  connections: LoreConnection[];
  timelinePosition: TimelinePosition;
  tags: string[];
  importance: number;
  aiSuggestions: string[];
  consistencyFlags: ConsistencyFlag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LoreConnection {
  type: 'character' | 'location' | 'event' | 'organization';
  id: string;
  name: string;
  relationshipType: string;
  description: string;
}

export interface TimelinePosition {
  era: string;
  year: number;
  month?: number;
  day?: number;
  importance: number;
}

export interface ConsistencyFlag {
  type: 'contradiction' | 'inconsistency' | 'gap' | 'suggestion';
  description: string;
  severity: 'low' | 'medium' | 'high';
  relatedEntries: string[];
}

// Timeline Types
export interface Timeline {
  id: string;
  worldId: string;
  name: string;
  description: string;
  eras: Era[];
  events: TimelineEvent[];
  settings: TimelineSettings;
}

export interface Era {
  id: string;
  name: string;
  description: string;
  startYear: number;
  endYear: number;
  color: string;
  importance: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: EventDate;
  type: string;
  importance: number;
  participants: string[];
  consequences: string[];
  relatedEntries: string[];
}

export interface EventDate {
  year: number;
  month?: number;
  day?: number;
  era: string;
}

export interface TimelineSettings {
  defaultView: 'linear' | 'branching' | 'circular';
  showEras: boolean;
  showImportanceFilter: boolean;
  colorCoding: boolean;
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'character' | 'map' | 'power' | 'lore' | 'world';
  type: 'free' | 'premium';
  templateData: Record<string, any>;
  customizationOptions: CustomizationOption[];
  creator: string;
  downloads: number;
  rating: number;
  tags: string[];
  previewImages: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomizationOption {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'color' | 'image';
  options?: string[];
  defaultValue: any;
  required: boolean;
}

// Legacy Types for Compatibility
export interface Lore extends LoreEntry {}

export interface CharacterAvatar {
  bodyType: string;
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  eyes: string;
  outfit: string;
  accessories: string[];
}

export interface PowerCategory {
  id: string;
  name: string;
  description: string;
  abilities: string[];
}

// Utility Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateRange?: DateRange;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DateRange {
  start: Date;
  end: Date;
}