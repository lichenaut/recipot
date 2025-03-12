import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeList from "./pages/RecipeList.tsx";
import RecipeForm from "./pages/RecipeForm.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Recipe Book</h1>
        </header>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/create-recipe" element={<RecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
