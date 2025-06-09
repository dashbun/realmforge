import mongoose, { Schema, Document } from 'mongoose';

interface IAttributeScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  [key: string]: number;
}

interface IAppearance {
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
    clothing: string[];
    accessories: string[];
  };
}

interface IBackground {
  biography: string;
  [key: string]: any;
}

interface IAI {
  dialogue: any[];
  [key: string]: any;
}

export interface ICharacter extends Document {
  name: string;
  appearance: IAppearance;
  attributes: IAttributeScores;
  background: IBackground;
  abilities: any[];
  aiGenerated: IAI;
  equipment: any[];
  skills: any[];
  race?: string;
  class?: string;
  level?: number;
  personality?: string;
  backstory?: string;
}

const CharacterSchema: Schema = new Schema({
  name: { type: String, required: true },
  appearance: {
    avatar: { type: String, default: '' },
    customization: {
      race: { type: String, default: '' },
      gender: { type: String, default: '' },
      age: { type: Number, default: 25 },
      height: { type: String, default: '' },
      build: { type: String, default: '' },
      skinTone: { type: String, default: '' },
      hairColor: { type: String, default: '' },
      hairStyle: { type: String, default: '' },
      eyeColor: { type: String, default: '' },
      facialFeatures: { type: Object, default: {} },
      clothing: { type: [String], default: [] },
      accessories: { type: [String], default: [] }
    }
  },
  attributes: {
    strength: { type: Number, default: 10 },
    dexterity: { type: Number, default: 10 },
    constitution: { type: Number, default: 10 },
    intelligence: { type: Number, default: 10 },
    wisdom: { type: Number, default: 10 },
    charisma: { type: Number, default: 10 }
  },
  background: {
    biography: { type: String, default: '' },
  },
  abilities: { type: [Schema.Types.Mixed], default: [] },
  aiGenerated: {
    dialogue: { type: [Schema.Types.Mixed], default: [] },
  },
  equipment: { type: [Schema.Types.Mixed], default: [] },
  skills: { type: [Schema.Types.Mixed], default: [] },
  race: { type: String },
  class: { type: String },
  level: { type: Number, min: 1, max: 20 },
  personality: { type: String },
  backstory: { type: String }
}, { timestamps: true });

export default mongoose.model<ICharacter>('Character', CharacterSchema);
