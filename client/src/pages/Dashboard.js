// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { getProjects, createProject, removeProject } from '../features/projects/projectSlice';
import { toast } from 'react-toastify';
import KanbanBoard from '../components/KanbanBoard';
import kanbanImage from '../assets/illustrations/kanban.png';

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth);
  const { items: projects, loading } = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const title = e.target.title.value.trim();
    if (title) {
      dispatch(createProject({ title }));
      e.target.reset();
    } else {
      toast.warn("Project title cannot be empty.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}</h2>
      <button onClick={handleLogout}>Logout</button>

      <section>
        <h3>Your Projects</h3>

        <form onSubmit={handleAddProject}>
          <input name="title" placeholder="New project title" />
          <button type="submit">Add Project</button>
        </form>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <ul>
            {projects.map(project => (
              <li key={project._id}>
                {project.title} ({project.status})
                <button onClick={() => dispatch(removeProject(project._id))}>Delete</button>
              </li>
            ))}
          </ul>
        )}

        {/* Kanban Image Preview */}
        <img
          src={kanbanImage}
          alt="Kanban Board Preview"
          style={{
            width: '100%',
            maxWidth: '700px',
            margin: '1rem auto',
            display: 'block',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />

        {/* Actual Kanban Board Component */}
        <KanbanBoard />
      </section>
    </div>
  );
};

export default Dashboard;
