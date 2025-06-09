import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import characterRoutes from './routes/characterRoutes';
import mapRoutes from './routes/mapRoutes';
import loreRoutes from './routes/loreRoutes';
import powerSystemRoutes from './routes/powerSystemRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/realmforge';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (_req, res) => {
  res.send('Realmforge Backend API');
});

app.use('/api/characters', characterRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/lore', loreRoutes);
app.use('/api/powersystems', powerSystemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
