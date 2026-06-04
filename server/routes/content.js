import express from 'express';
import { readDB } from '../utils.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
