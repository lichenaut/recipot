import React, { useState } from "react";
import axios from "axios";

function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [preheatTemperature, setPreheatTemperature] = useState(0);
  const [tags, setTags] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/v1/recipes/", {
        title,
        description,
        cooking_time: cookingTime,
        preheat_temperature: preheatTemperature,
        tags: tags.split(","),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Upload Recipe</h1>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label>
        Cooking Time:
        <input
          type="number"
          value={cookingTime}
          onChange={(event) => setCookingTime(parseInt(event.target.value, 10))}
        />
      </label>
      <label>
        Preheat Temperature:
        <input
          type="number"
          value={preheatTemperature}
          onChange={(event) =>
            setPreheatTemperature(parseInt(event.target.value, 10))
          }
        />
      </label>
      <label>
        Tags:
        <input
          type="text"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="comma separated"
        />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

export default RecipeForm;
