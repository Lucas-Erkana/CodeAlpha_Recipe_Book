import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../../services/api';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchRecipe(id);
        setRecipe(response.data.recipe);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recipe Details</h2>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeDetails;
