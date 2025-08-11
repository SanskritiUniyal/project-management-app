import express from 'express';
import { getProjects, addProject, deleteProject } from '../controllers/projectController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProjects);
router.post('/', protect, addProject);
router.delete('/:id', protect, deleteProject);

export default router;
