import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if token is not present
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:3001/auth/recipes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedRecipes = response.data;
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Fetch Recipes error:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [navigate]);

  const handleDeleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if token is not present
        navigate('/login');
        return;
      }

      await axios.delete(`http://localhost:3001/auth/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After deletion, fetch recipes again
      fetchRecipes();
    } catch (error) {
      console.error('Delete Recipe error:', error);
    }
  };

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <strong>Name:</strong> {recipe.name} <br />
            <strong>Ingredients:</strong> {recipe.ingredients} <br />
            <strong>Instructions:</strong> {recipe.instructions} <br />
            <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
