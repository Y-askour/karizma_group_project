// Import necessary libraries and dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import your CSS file

const Login = () => {
  // State for handling input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        username,
        password,
      });

      // Store the token in local storage
      localStorage.setItem('token', response.data.access_token);

      // Redirect to recipes page
      navigate('/recipes');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  // React router hook to navigate between pages
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

