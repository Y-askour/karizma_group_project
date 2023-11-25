import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Login from './src/components/Login';
import DeleteRecipe from './src/components/DeleteRecipe';
import Signup from './src/components/Signup';
import Recipes from './src/components/Recipes'; // Import the Recipes component
import './App.css'; // Import the global stylesheet

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = () => {
    setToken(localStorage.getItem('token'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleSignup = () => {
    setToken(localStorage.getItem('token'));
  };

  return (
    <Router>
      <div className="app-container">
        <h1>Recipe App</h1>
        <nav>
          <ul>
            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
            <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
            {token && (
              <>
                <li><NavLink to="/recipes" activeClassName="active">Recipes</NavLink></li>
                <li><NavLink to="/delete-recipe" activeClassName="active">Delete Recipe</NavLink></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Signup onSignup={handleSignup} />}
          />

          {token && (
            <>
              <Route
                path="/recipes"
                element={<Recipes />} // Use the Recipes component here
              />
              <Route
                path="/delete-recipe"
                element={<DeleteRecipe token={token} onDelete={handleLogin} />}
              />
            </>
          )}
          <Route path="/" element={<Outlet />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
