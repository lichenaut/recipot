import React, { useState, useEffect } from "react";
import axios from "axios";

interface Tag {
  id: number;
  name: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  cooking_time: number;
  preheat_temperature: number;
  tags: Tag[];
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/recipes/filter/?tag=${tag}`)
      .then((response) => {
        setRecipes(response.data as Recipe[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tag]);

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  return (
    <div>
      <h1>Recipe List</h1>
      <input
        type="text"
        value={tag}
        onChange={handleTagChange}
        placeholder="Search by tag"
      />
      <ul>
        {recipes.map((recipe: Recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>Cooking Time: {recipe.cooking_time} minutes</p>
            <p>Preheat Temperature: {recipe.preheat_temperature}°F</p>
            <ul>
              {recipe.tags.map((tag: Tag) => (
                <li key={tag.id}>{tag.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
