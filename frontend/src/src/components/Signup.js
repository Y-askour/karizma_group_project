import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the stylesheet

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onSignup();
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
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
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;

