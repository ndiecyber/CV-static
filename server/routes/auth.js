import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readDB, writeDB } from '../utils.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await readDB();
    
    let isValid = false;
    const adminUsername = (db.admin && db.admin.username) ? db.admin.username : process.env.ADMIN_USERNAME;

    if (username !== adminUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (db.admin && db.admin.password) {
      isValid = await bcrypt.compare(password, db.admin.password);
    } else {
      isValid = (password === process.env.ADMIN_PASSWORD);
    }

    if (isValid) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update-credentials', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newUsername, newPassword } = req.body;
    const db = await readDB();
    
    let isOldValid = false;
    
    if (db.admin && db.admin.password) {
      isOldValid = await bcrypt.compare(oldPassword, db.admin.password);
    } else {
      isOldValid = (oldPassword === process.env.ADMIN_PASSWORD);
    }

    if (!isOldValid) {
      return res.status(400).json({ error: 'Password lama salah' });
    }

    const adminData = { ...(db.admin || {}) };

    if (newUsername && newUsername.trim() !== '') {
      adminData.username = newUsername.trim();
    }

    if (newPassword && newPassword.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      adminData.password = await bcrypt.hash(newPassword, salt);
    }
    
    db.admin = adminData;
    await writeDB(db);

    res.json({ message: 'Kredensial berhasil diubah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
