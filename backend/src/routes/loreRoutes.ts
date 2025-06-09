import { Router } from 'express';
import Lore from '../models/Lore';

const router = Router();

// Get all lore entries
router.get('/', async (req, res, next) => {
  try {
    const loreEntries = await Lore.find({});
    res.json(loreEntries);
  } catch (err) {
    next(err);
  }
});

// Get single lore entry
router.get('/:id', async (req, res, next) => {
  try {
    const lore = await Lore.findById(req.params.id);
    if (!lore) {
      res.status(404);
      throw new Error('Lore entry not found');
    }
    res.json(lore);
  } catch (err) {
    next(err);
  }
});

// Create lore entry
router.post('/', async (req, res, next) => {
  try {
    const lore = new Lore(req.body);
    const createdLore = await lore.save();
    res.status(201).json(createdLore);
  } catch (err) {
    next(err);
  }
});

// Update lore entry
router.put('/:id', async (req, res, next) => {
  try {
    const lore = await Lore.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!lore) {
      res.status(404);
      throw new Error('Lore entry not found');
    }
    res.json(lore);
  } catch (err) {
    next(err);
  }
});

// Delete lore entry
router.delete('/:id', async (req, res, next) => {
  try {
    const lore = await Lore.findByIdAndDelete(req.params.id);
    if (!lore) {
      res.status(404);
      throw new Error('Lore entry not found');
    }
    res.json({ message: 'Lore entry removed' });
  } catch (err) {
    next(err);
  }
});

export default router;
