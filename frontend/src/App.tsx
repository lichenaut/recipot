import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./pages/RecipeList.tsx";
import RecipeForm from "./pages/RecipeForm.tsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-indigo-600 text-white shadow">
          <div className="container mx-auto flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">Recipe Book</h1>
            <nav className="flex space-x-3">
              <Link
                to="/"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded transition"
              >
                View Recipes
              </Link>
              <Link
                to="/create-recipe"
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
