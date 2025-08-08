// src/pages/Dashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import KanbanBoard from '../components/KanbanBoard';
import kanbanImage from '../assets/illustrations/kanban.png'; // ✅ Add your image here

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("You’ve been logged out.");
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}</h2>
      <button onClick={handleLogout}>Logout</button>

      <section>
        <h3>Your Projects</h3>

        {/*  Kanban Image Preview */}
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

        {/*  Actual Kanban Board Component */}
        <KanbanBoard />
      </section>
    </div>
  );
};

export default Dashboard;
