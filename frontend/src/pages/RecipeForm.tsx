import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [preheatTemp, setPreheatTemp] = useState(0);
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/recipes/`, {
        title,
        description,
        cooking_time: cookingTime,
        preheat_temperature: preheatTemp,
        tags: tags.split(",").map((t) => t.trim()),
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md text-gray-900 p-8 rounded-xl shadow-xl w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Upload Recipe</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium text-white">Cooking Time (min)</label>
            <input
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(+e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-white">Preheat Temp (°F)</label>
            <input
              type="number"
              value={preheatTemp}
              onChange={(e) => setPreheatTemp(+e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-white">Tags (comma‑sep)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. vegan, quick"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          title="Submit your recipe to the database"
          className="bg-green-600 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition w-full"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
