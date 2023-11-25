import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList = ({ token }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recipes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    };

    fetchRecipes();
  }, [token]);

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
