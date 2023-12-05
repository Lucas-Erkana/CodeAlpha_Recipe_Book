// Import necessary functions and slices from Redux Toolkit and your slices
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import recipeSlice from './slices/recipeSlice';
import userSlice from './slices/userSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice,
    recipes: recipeSlice,
    users: userSlice,
  },
});

export default store;
