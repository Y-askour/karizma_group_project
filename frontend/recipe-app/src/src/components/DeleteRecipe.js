import React, { useState } from 'react';
import axios from 'axios';

const DeleteRecipe = ({ token, onDelete }) => {
  const [recipeId, setRecipeId] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete();
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
    }
  };

  return (
    <div>
      <h2>Delete Recipe</h2>
      <input
        type="text"
        placeholder="Recipe ID"
        value={recipeId}
        onChange={(e) => setRecipeId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default DeleteRecipe;
