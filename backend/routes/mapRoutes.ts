import Map from '../src/models/Map';
import express from 'express';


const router = express.Router();

// GET all maps
router.get('/', async (_req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch maps' });
  }
});

// GET a map by ID
router.get('/:id', async (req, res) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) return res.status(404).json({ error: 'Map not found' });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch map' });
  }
});

// POST create map
router.post('/', async (req, res) => {
  try {
    const map = new Map(req.body);
    await map.save();
    res.status(201).json(map);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create map' });
  }
});

// PUT update map
router.put('/:id', async (req, res) => {
  try {
    const map = await Map.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!map) return res.status(404).json({ error: 'Map not found' });
    res.json(map);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update map' });
  }
});

// DELETE map
router.delete('/:id', async (req, res) => {
  try {
    const map = await Map.findByIdAndDelete(req.params.id);
    if (!map) return res.status(404).json({ error: 'Map not found' });
    res.json({ message: 'Map deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete map' });
  }
});

export default router;
