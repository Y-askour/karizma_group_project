import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>ID: {recipe.id}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Steps: {recipe.steps}</p>
            <p>Preparation Time: {recipe.preparationTime} minutes</p>
			{recipe.photo && <img src={recipe.photo} alt="" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
