// Recipes.js
import React from 'react';
import RecipeList from './RecipeList';

const Recipes = () => {
  // Dummy recipe data for testing, replace it with your actual recipe data
  const recipes = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onion', 'garlic'],
      steps: 'Boil spaghetti, brown beef, cook sauce, combine.',
      preparationTime: 30,
      photo: 'https://example.com/spaghetti.jpg', // Replace with an actual photo URL
    },
    {
      id: 2,
      title: 'Chicken Alfredo',
      ingredients: ['fettuccine', 'chicken', 'alfredo sauce', 'butter', 'parmesan'],
      steps: 'Boil fettuccine, cook chicken, make alfredo sauce, combine.',
      preparationTime: 25,
      // No photo for this recipe
    },
    // Add more recipes as needed
  ];

  return (
    <div>
      <h2>Recipes Page</h2>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Recipes;
