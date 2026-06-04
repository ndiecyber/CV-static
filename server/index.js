import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import homeRoutes from './routes/home.js';
import experiencesRoutes from './routes/experiences.js';
import projectsRoutes from './routes/projects.js';
import publicationsRoutes from './routes/publications.js';
import researchRoutes from './routes/research.js';
import servicesRoutes from './routes/services.js';
import teachingRoutes from './routes/teaching.js';
import uploadRoutes from './routes/upload.js';
import contentRoutes from './routes/content.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:5173', 'https://randirizal.my.id'];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/publications', publicationsRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/teaching', teachingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
