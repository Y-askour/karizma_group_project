import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  recipeContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  recipeList: {
    listStyleType: 'none',
    padding: '0',
  },
  recipeItem: {
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
  },
  form: {
    marginTop: '20px',
  },
};

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: [],
    preparationSteps: [],
    preparationTime: 0,
    photoUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/recipes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/recipes',
        newRecipe,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setRecipes([...recipes, response.data]);
      setNewRecipe({
        name: '',
        ingredients: [],
        preparationSteps: [],
        preparationTime: 0,
        photoUrl: '',
      });
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/auth/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Recipes</h2>
      <div style={styles.recipeContainer}>
        <ul style={styles.recipeList}>
          {recipes.map((recipe) => (
            <li key={recipe.id} style={styles.recipeItem}>
              {/* Display recipe details */}
              <strong>{recipe.name}</strong>
              <p>{recipe.ingredients.join(', ')}</p>
              <p>{recipe.preparationSteps.join(', ')}</p>
              <p>Preparation Time: {recipe.preparationTime} minutes</p>
              <p>Photo URL: {recipe.photoUrl}</p>
              {/* Add delete button */}
              <button onClick={() => handleDeleteRecipe(recipe.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form style={styles.form} onSubmit={handleAddRecipe}>
        {/* Add form fields for newRecipe */}
        <label>Name:</label>
        <input
          type="text"
          value={newRecipe.name}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, name: e.target.value })
          }
        />

        <label>Ingredients (comma-separated):</label>
        <input
          type="text"
          value={newRecipe.ingredients.join(',')}
          onChange={(e) =>
            setNewRecipe({
              ...newRecipe,
              ingredients: e.target.value.split(',').map((item) => item.trim()),
            })
          }
        />

        <label>Preparation Steps (comma-separated):</label>
        <input
          type="text"
          value={newRecipe.preparationSteps.join(',')}
          onChange={(e) =>
            setNewRecipe({
              ...newRecipe,
              preparationSteps: e.target.value
                .split(',')
                .map((step) => step.trim()),
            })
          }
        />

        <label>Preparation Time (minutes):</label>
        <input
          type="number"
          value={newRecipe.preparationTime}
          onChange={(e) =>
            setNewRecipe({
              ...newRecipe,
              preparationTime: parseInt(e.target.value, 10),
            })
          }
        />

        <label>Photo URL:</label>
        <input
          type="text"
          value={newRecipe.photoUrl}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, photoUrl: e.target.value })
          }
        />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default Recipes;
