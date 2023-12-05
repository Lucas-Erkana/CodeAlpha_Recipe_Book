import axios from 'axios';

// Base URL of your API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';


// Axios instance for making API requests
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Authentication API endpoints
export const signIn = (userData) => api.post('/auth/signin', userData);
export const signUp = (userData) => api.post('/auth/signup', userData);

// Recipe API endpoints
export const fetchRecipes = () => api.get('/recipes');
export const fetchRecipe = (id) => api.get(`/recipes/${id}`);
export const addRecipe = (recipeData) => api.post('/recipes', recipeData);
export const updateRecipe = (id, recipeData) => api.put(`/recipes/${id}`, recipeData);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

// Admin API endpoints
export const fetchUsers = () => api.get('/users');
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
