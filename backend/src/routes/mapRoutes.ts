import { Router } from 'express';
import Map from '../models/Map';

const router = Router();

// Get all maps
router.get('/', async (req, res, next) => {
  try {
    const maps = await Map.find({});
    res.json(maps);
  } catch (err) {
    next(err);
  }
});

// Get single map
router.get('/:id', async (req, res, next) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) {
      res.status(404);
      throw new Error('Map not found');
    }
    res.json(map);
  } catch (err) {
    next(err);
  }
});

// Create map
router.post('/', async (req, res, next) => {
  try {
    const newMap = new Map(req.body);
    const createdMap = await newMap.save();
    res.status(201).json(createdMap);
  } catch (err) {
    next(err);
  }
});

// Update map
router.put('/:id', async (req, res, next) => {
  try {
    const map = await Map.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!map) {
      res.status(404);
      throw new Error('Map not found');
    }
    res.json(map);
  } catch (err) {
    next(err);
  }
});

// Delete map
router.delete('/:id', async (req, res, next) => {
  try {
    const map = await Map.findByIdAndDelete(req.params.id);
    if (!map) {
      res.status(404);
      throw new Error('Map not found');
    }
    res.json({ message: 'Map removed' });
  } catch (err) {
    next(err);
  }
});

export default router;
