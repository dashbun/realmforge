import PowerSystem from '../src/models/PowerSystem';
import express from 'express';


const router = express.Router();

// GET all power systems
router.get('/', async (_req, res) => {
  try {
    const powerSystems = await PowerSystem.find();
    res.json(powerSystems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch power systems' });
  }
});

// GET a power system by ID
router.get('/:id', async (req, res) => {
  try {
    const powerSystem = await PowerSystem.findById(req.params.id);
    if (!powerSystem) return res.status(404).json({ error: 'Power system not found' });
    res.json(powerSystem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch power system' });
  }
});

// POST create power system
router.post('/', async (req, res) => {
  try {
    const powerSystem = new PowerSystem(req.body);
    await powerSystem.save();
    res.status(201).json(powerSystem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create power system' });
  }
});

// PUT update power system
router.put('/:id', async (req, res) => {
  try {
    const powerSystem = await PowerSystem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!powerSystem) return res.status(404).json({ error: 'Power system not found' });
    res.json(powerSystem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update power system' });
  }
});

// DELETE power system
router.delete('/:id', async (req, res) => {
  try {
    const powerSystem = await PowerSystem.findByIdAndDelete(req.params.id);
    if (!powerSystem) return res.status(404).json({ error: 'Power system not found' });
    res.json({ message: 'Power system deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete power system' });
  }
});

export default router;
