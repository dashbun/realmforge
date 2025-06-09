import mongoose, { Schema, Document } from 'mongoose';

export interface IPowerSystem extends Document {
  name: string;
  description: string;
  categories: Array<{ name: string }>;
  rules: Array<any>;
}

const PowerSystemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array, default: [] },
  rules: { type: Array, default: [] }
});

export default mongoose.model<IPowerSystem>('PowerSystem', PowerSystemSchema);
