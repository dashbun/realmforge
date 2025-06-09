import express from 'express';
import Lore from '../src/models/Lore';

const router = express.Router();

// GET all lore
router.get('/', async (_req, res) => {
  try {
    const lore = await Lore.find();
    res.json(lore);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lore' });
  }
});

// GET a lore by ID
router.get('/:id', async (req, res) => {
  try {
    const lore = await Lore.findById(req.params.id);
    if (!lore) return res.status(404).json({ error: 'Lore not found' });
    res.json(lore);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lore' });
  }
});

// POST create lore
router.post('/', async (req, res) => {
  try {
    const lore = new Lore(req.body);
    await lore.save();
    res.status(201).json(lore);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create lore' });
  }
});

// PUT update lore
router.put('/:id', async (req, res) => {
  try {
    const lore = await Lore.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lore) return res.status(404).json({ error: 'Lore not found' });
    res.json(lore);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update lore' });
  }
});

// DELETE lore
router.delete('/:id', async (req, res) => {
  try {
    const lore = await Lore.findByIdAndDelete(req.params.id);
    if (!lore) return res.status(404).json({ error: 'Lore not found' });
    res.json({ message: 'Lore deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete lore' });
  }
});

export default router;
