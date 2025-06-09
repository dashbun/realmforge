import express from 'express';
import Character from '../src/models/Character';

const router = express.Router();

// GET all characters
router.get('/', async (_req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// GET a character by ID
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ error: 'Character not found' });
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch character' });
  }
});

// POST create character
router.post('/', async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create character' });
  }
});

// PUT update character
router.put('/:id', async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!character) return res.status(404).json({ error: 'Character not found' });
    res.json(character);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update character' });
  }
});

// DELETE character
router.delete('/:id', async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) return res.status(404).json({ error: 'Character not found' });
    res.json({ message: 'Character deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete character' });
  }
});

export default router;
