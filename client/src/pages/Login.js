import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authService';
import { loginSuccess } from '../features/auth/authSlice';
import WelcomeModal from '../components/WelcomeModal';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setShowModal(true);
    }
  }, [token]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await loginUser(formData);
    if (res.token) {
      dispatch(loginSuccess({ user: res.user, token: res.token }));
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {showModal && (
        <WelcomeModal
          isOpen={showModal}
          toggle={() => setShowModal(false)}
          username={formData.email}
          handleContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default Login;
