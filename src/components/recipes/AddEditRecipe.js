import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addRecipe, updateRecipe, fetchRecipe } from '../../services/api';
import { setRecipes } from '../../redux/slices/recipeSlice';

function AddEditRecipe() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      async function fetchRecipeData() {
        try {
          const response = await fetchRecipe(id);
          setFormData({
            title: response.data.recipe.title,
            description: response.data.recipe.description,
          });
        } catch (error) {
          // Handle error
          console.error(error);
        }
      }
      fetchRecipeData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing recipe
        await updateRecipe(id, formData);
        const updatedRecipes = recipes.map((recipe) =>
          recipe.id === id ? { ...recipe, ...formData } : recipe
        );
        dispatch(setRecipes(updatedRecipes));
      } else {
        // Add new recipe
        const response = await addRecipe(formData);
        dispatch(setRecipes([...recipes, response.data.recipe]));
      }
      history.push('/');
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
}

export default AddEditRecipe;
