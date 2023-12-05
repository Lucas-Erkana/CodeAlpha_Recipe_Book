import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, deleteRecipe } from '../../services/api';
import { setRecipes } from '../../redux/slices/recipeSlice';

function RecipeList() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchRecipes();
        dispatch(setRecipes(response.data.recipes));
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    fetchData();
  }, [dispatch]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      // Update the Redux store to remove the deleted recipe
      dispatch(setRecipes(recipes.filter((recipe) => recipe.id !== recipeId)));
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <ul className="list-group">
        {recipes.map((recipe) => (
          <li className="list-group-item" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => handleDeleteRecipe(recipe.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
