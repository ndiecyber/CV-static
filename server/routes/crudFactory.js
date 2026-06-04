import express from 'express';
import { readDB, writeDB } from '../utils.js';
import { authenticateToken } from '../middleware/auth.js';

const createCrudRouter = (entityName) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const db = await readDB();
      res.json(db[entityName] || []);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/', authenticateToken, async (req, res) => {
    try {
      const db = await readDB();
      if (!db[entityName]) db[entityName] = [];
      const newId = db[entityName].length > 0 ? Math.max(...db[entityName].map(e => e.id || 0)) + 1 : 1;
      const newItem = { id: newId, ...req.body };
      db[entityName].push(newItem);
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
      const index = db[entityName].findIndex(e => e.id === id);
      if (index === -1) return res.status(404).json({ error: 'Not found' });
      
      db[entityName][index] = { ...db[entityName][index], ...req.body, id };
      await writeDB(db);
      res.json(db[entityName][index]);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const db = await readDB();
      const id = parseInt(req.params.id);
      db[entityName] = db[entityName].filter(e => e.id !== id);
      await writeDB(db);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
};

export default createCrudRouter;
