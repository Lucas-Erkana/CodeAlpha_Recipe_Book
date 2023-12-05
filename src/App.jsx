import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import RecipeList from './components/recipes/RecipeList';
import RecipeDetails from './components/recipes/RecipeDetails';
import AddEditRecipe from './components/recipes/AddEditRecipe';
import AdminPanel from './components/admin/AdminPanel';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/manage-recipe/:id?" element={<AddEditRecipe />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
