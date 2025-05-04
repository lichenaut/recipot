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
    <form
      onSubmit={handleSubmit}
      className="
        max-w-lg mx-auto
        bg-white/30 backdrop-blur-lg           /* more opaque = higher contrast */
        border border-white/40 shadow-2xl      /* thicker border + deeper shadow */
        rounded-2xl p-10 text-gray-900        /* dark text over lighter glass */
      "
    >
      <h1 className="text-center text-2xl font-extrabold mb-8 text-white">
        Upload Recipe
      </h1>

      <div className="mb-5">
        <label className="text-gray block mb-1 font-medium">Title</label>
        <input
          type="text"
          title="Enter Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="
            w-full bg-white/60 text-black placeholder-gray-500
            border border-white/50 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-indigo-600/70
          "
        />
      </div>

      <div className="mb-5">
        <label className="text-gray block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          title="Enter Recipe Steps and Description"
          onChange={(e) => setDescription(e.target.value)}
          required
          className="
            w-full bg-white/60 text-black placeholder-gray-500
            border border-white/50 rounded-md px-3 py-2 h-28
            focus:outline-none focus:ring-2 focus:ring-indigo-600/70
          "
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-gray block mb-1 font-medium">Cooking Time (min)</label>
          <input
            type="number"
            value={cookingTime}
            title="Enter Total Cooking Time"
            onChange={(e) => setCookingTime(+e.target.value)}
            required
            className="
              w-full bg-white/60 text-black placeholder-gray-500
              border border-white/50 rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-600/70
            "
          />
        </div>
        <div>
          <label className="text-gray block mb-1 font-medium">Preheat Temp (°F)</label>
          <input
            type="number"
            value={preheatTemp}
            title="Enter Preheat Temperature"
            onChange={(e) => setPreheatTemp(+e.target.value)}
            required
            className="
              w-full bg-white/60 text-black placeholder-gray-500
              border border-white/50 rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-600/70
            "
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="text-gray block mb-1 font-medium">Tags (comma‑sep)</label>
        <input
          type="text"
          value={tags}
          title="Enter Recipe Tags"
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. vegan, quick"
          className="
            w-full bg-white/60 text-black placeholder-gray-500
            border border-white/50 rounded-md px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-indigo-600/70
          "
        />
      </div>

      <button
        type="submit"
        title="Submit your recipe"
        className="
          bg-green-600/80 hover:bg-green-600
          text-white font-semibold
          px-6 py-2 rounded-md shadow-lg
          transition
        "
      >
        Upload
      </button>
    </form>
  );
}
