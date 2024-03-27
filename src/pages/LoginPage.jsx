// LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from "../Images/Sewzeelogo..png";



function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement your login logic here, for simplicity, let's just redirect to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="left-container">
          <img className="logo" src={logo} alt="Logo" /> {/* Insert the logo */}
          <h2>Welcome Back!</h2>
          <p>Please login to continue.</p>
        </div>
        <div className="right-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
