// src/components/Navbar.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import logo from '../assets/PROMTAPlogo.png';
import './Navbar.css';

const Navbar = () => {
  const { user, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="App Logo" className="navbar-logo" />
      <h1>PROMTAP</h1>
      <div className="navbar-links">
        {token ? (
          <>
            <span className="welcome">Welcome, {user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
