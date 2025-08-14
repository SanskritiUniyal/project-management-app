// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { getProjects, createProject, removeProject } from '../features/projects/projectSlice';
import { toast } from 'react-toastify';
import KanbanBoard from '../components/KanbanBoard';
import Navbar from '../components/Navbar';
import kanbanImage from '../assets/illustrations/kanban.png';
import './Dashboard.css';

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth);
  const { items: projects, loading } = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getProjects());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("You’ve been logged out.");
    navigate('/login');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warn("Project title cannot be empty.");
      return;
    }
    dispatch(createProject({ title, status }));
    setTitle('');
    setStatus('todo');
    setShowModal(false);
  };

  const handleDeleteProject = (id) => {
    dispatch(removeProject(id));
  };

  return (
    <div className="dashboard-container">
      <Navbar user={user} onLogout={handleLogout} />

      <section className="project-section">
        <h3>Your Projects</h3>

        <button className="open-modal-btn" onClick={() => setShowModal(true)}>+ Add Project</button>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <form onSubmit={handleAddProject}>
                <input
                  name="title"
                  placeholder="New project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div className="modal-actions">
                  <button type="submit">Create</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects yet. Start by adding one!</p>
        ) : (
          <ul className="project-list">
            {projects.map(project => (
              <li key={project._id} className="project-item">
                <strong>{project.title}</strong> — {project.status}
                <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}

        <img
          src={kanbanImage}
          alt="Kanban Board Preview"
          className="kanban-preview"
        />

        <KanbanBoard />
      </section>
    </div>
  );
};

export default Dashboard;
