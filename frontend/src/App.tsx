import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./pages/RecipeList.tsx";
import RecipeForm from "./pages/RecipeForm.tsx";
import RecipeIcon from "./recipot_logo.png";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-indigo-600 text-white shadow">
          <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <img src={RecipeIcon} alt="Recipe Icon" className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Recipot</h1>
            </div>
            <nav className="flex space-x-3">
              <Link
                to="/"
                title="Go to the full list of uploaded recipes"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded transition"
              >
                View Recipes
              </Link>
              <Link
                to="/create-recipe"
                title="Upload a new recipe to the database"
                className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
              >
                Upload Recipe
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/create-recipe" element={<RecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
