import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => (
  <nav className="navbar">
     <img src={logo} alt="App Logo" style={{ height: '40px' }} />
    <h1>Project Management App</h1>
    <Link to="/">Login</Link> | <Link to="/register">Register</Link> | <Link to="/dashboard">Dashboard</Link>
  </nav>
);

export default Navbar;
