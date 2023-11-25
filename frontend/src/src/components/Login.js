import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the stylesheet

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin();
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
