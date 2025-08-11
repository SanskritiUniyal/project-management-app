// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'https://promtap.onrender.com',
  credentials: true
}));
app.use(express.json());

// Prefix all auth routes with /api/auth
app.use('/api/auth', authRoutes);

// Prefix all auth routes with /api/projects
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
