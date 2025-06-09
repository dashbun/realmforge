import { Router } from 'express';
import PowerSystem from '../models/PowerSystem';

const router = Router();

// Get all power systems
router.get('/', async (req, res, next) => {
  try {
    const powerSystems = await PowerSystem.find({});
    res.json(powerSystems);
  } catch (err) {
    next(err);
  }
});

// Get single power system
router.get('/:id', async (req, res, next) => {
  try {
    const powerSystem = await PowerSystem.findById(req.params.id);
    if (!powerSystem) {
      res.status(404);
      throw new Error('Power system not found');
    }
    res.json(powerSystem);
  } catch (err) {
    next(err);
  }
});

// Create power system
router.post('/', async (req, res, next) => {
  try {
    const powerSystem = new PowerSystem(req.body);
    const createdPowerSystem = await powerSystem.save();
    res.status(201).json(createdPowerSystem);
  } catch (err) {
    next(err);
  }
});

// Update power system
router.put('/:id', async (req, res, next) => {
  try {
    const powerSystem = await PowerSystem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!powerSystem) {
      res.status(404);
      throw new Error('Power system not found');
    }
    res.json(powerSystem);
  } catch (err) {
    next(err);
  }
});

// Delete power system
router.delete('/:id', async (req, res, next) => {
  try {
    const powerSystem = await PowerSystem.findByIdAndDelete(req.params.id);
    if (!powerSystem) {
      res.status(404);
      throw new Error('Power system not found');
    }
    res.json({ message: 'Power system removed' });
  } catch (err) {
    next(err);
  }
});

export default router;
