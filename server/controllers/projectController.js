import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};

export const addProject = async (req, res) => {
  const { title, status } = req.body;
  const project = await Project.create({
    title,
    status: status || 'todo',
    user: req.user._id,
  });
  res.status(201).json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ message: 'Project deleted' });
};
