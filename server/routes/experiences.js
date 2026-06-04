import express from 'express';
import { readDB, writeDB } from '../utils.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.experiences || []);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const db = await readDB();
    if (!db.experiences) db.experiences = [];
    const newId = db.experiences.length > 0 ? Math.max(...db.experiences.map(e => e.id || 0)) + 1 : 1;
    const newItem = { id: newId, ...req.body };
    db.experiences.push(newItem);
    await writeDB(db);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const db = await readDB();
    const id = parseInt(req.params.id);
    const index = db.experiences.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    
    db.experiences[index] = { ...db.experiences[index], ...req.body, id };
    await writeDB(db);
    res.json(db.experiences[index]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const db = await readDB();
    const id = parseInt(req.params.id);
    db.experiences = db.experiences.filter(e => e.id !== id);
    await writeDB(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
