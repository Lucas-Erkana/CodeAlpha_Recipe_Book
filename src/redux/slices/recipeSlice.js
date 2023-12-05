import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    updateRecipe: (state, action) => {
      const updatedRecipe = action.payload;
      const index = state.recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      }
    },
    deleteRecipe: (state, action) => {
      const recipeId = action.payload;
      state.recipes = state.recipes.filter((recipe) => recipe.id !== recipeId);
    },
  },
});

export const { setRecipes, addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
