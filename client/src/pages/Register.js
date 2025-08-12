// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authService';
import { loginSuccess } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.warn("All fields are required!");
      return;
    }

    try {
      const res = await registerUser(formData);
      console.log("Register response:", res); // Added this
      if (res.token) {
        dispatch(loginSuccess({ user: res.user, token: res.token }));
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Register error:", err); // Added this
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
