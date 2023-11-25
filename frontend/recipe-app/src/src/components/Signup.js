import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 
const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/signup', { name, email, password });
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
