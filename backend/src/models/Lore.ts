import mongoose, { Schema, Document } from 'mongoose';

export interface ILore extends Document {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

const LoreSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] }
});

export default mongoose.model<ILore>('Lore', LoreSchema);
