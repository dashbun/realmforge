import mongoose, { Schema, Document } from 'mongoose';

export interface IMap extends Document {
  name: string;
  description: string;
  imageUrl?: string;
  regions: Array<any>;
}

const MapSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
  regions: { type: Array, default: [] }
});

export default mongoose.model<IMap>('Map', MapSchema);
