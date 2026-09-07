import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

// List activities (most recent first)
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).limit(100);
    res.json(activities);
  } catch (err) {
    console.error('GET /api/activities error', err);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activity by id
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: 'Not found' });
    res.json(activity);
  } catch (err) {
    console.error('GET /api/activities/:id error', err);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Create activity
router.post('/', async (req, res) => {
  try {
    const { userId, type, duration, calories, date } = req.body;
    const activity = new Activity({ userId, type, duration, calories, date });
    const saved = await activity.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST /api/activities error', err);
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id', async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error('PUT /api/activities/:id error', err);
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    console.error('DELETE /api/activities/:id error', err);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
