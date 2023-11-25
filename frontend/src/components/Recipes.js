import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  header: {
    color: '#333',
  },
  recipeContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  recipeCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    minWidth: '200px',
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    if (!newRecipe.name || !newRecipe.ingredients.length || !newRecipe.preparationSteps.length || newRecipe.preparationTime <= 0) {
      setError('Please fill in all fields and ensure preparation time is greater than 0.');
      return;
    }

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
      setError('');
    } catch (error) {
      console.error('Error adding recipe:', error);
      setError('Error adding recipe. Please try again.');
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/auth/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Recipes</h2>
      <button onClick={handleLogout}>Logout</button>
      <div style={styles.recipeContainer}>
        {recipes.map((recipe) => (
          <div key={recipe._id} style={styles.recipeCard}>
            <h3>{recipe.name}</h3>
            <p>Preparation Time: {recipe.preparationTime} minutes</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Steps: {recipe.preparationSteps.join(', ')}</p>
            <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
          </div>
        ))}
      </div>

      <form style={styles.form} onSubmit={handleAddRecipe}>
        <label>Name:</label>
        <input type="text" value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} />

        <label>Ingredients (comma-separated):</label>
        <input type="text" value={newRecipe.ingredients.join(',')} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value.split(',') })} />

        <label>Preparation Steps (comma-separated):</label>
        <input type="text" value={newRecipe.preparationSteps.join(',')} onChange={(e) => setNewRecipe({ ...newRecipe, preparationSteps: e.target.value.split(',') })} />

        <label>Preparation Time (minutes):</label>
        <input type="number" value={newRecipe.preparationTime} onChange={(e) => setNewRecipe({ ...newRecipe, preparationTime: Number(e.target.value) })} />

        <label>Photo URL:</label>
        <input type="text" value={newRecipe.photoUrl} onChange={(e) => setNewRecipe({ ...newRecipe, photoUrl: e.target.value })} />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default Recipes;
