// src/pages/Dashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import KanbanBoard from '../components/KanbanBoard';

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
        <KanbanBoard />
      </section>
    </div>
  );
};

export default Dashboard;
