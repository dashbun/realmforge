import { Router } from 'express';
import Character from '../models/Character';

const router = Router();

// Get all characters
router.get('/', async (req, res, next) => {
  try {
    const characters = await Character.find({});
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

// Get single character
router.get('/:id', async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      res.status(404);
      throw new Error('Character not found');
    }
    res.json(character);
  } catch (err) {
    next(err);
  }
});

// Create character
router.post('/', async (req, res, next) => {
  try {
    const character = new Character(req.body);
    const createdCharacter = await character.save();
    res.status(201).json(createdCharacter);
  } catch (err) {
    next(err);
  }
});

// Update character
router.put('/:id', async (req, res, next) => {
  try {
    const character = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!character) {
      res.status(404);
      throw new Error('Character not found');
    }
    res.json(character);
  } catch (err) {
    next(err);
  }
});

// Delete character
router.delete('/:id', async (req, res, next) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      res.status(404);
      throw new Error('Character not found');
    }
    res.json({ message: 'Character removed' });
  } catch (err) {
    next(err);
  }
});

export default router;
