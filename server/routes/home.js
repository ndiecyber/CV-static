import express from 'express';
import { readDB, writeDB } from '../utils.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.home || {});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/', authenticateToken, async (req, res) => {
  try {
    const db = await readDB();
    db.home = { ...db.home, ...req.body };
    await writeDB(db);
    res.json(db.home);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
