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

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [tagFilter, setTagFilter] = useState("");
  const [maxCookingTime, setMaxCookingTime] = useState<number | "">("");
  const [maxPreheatTemp, setMaxPreheatTemp] = useState<number | "">("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (tagFilter) params.append("tag", tagFilter);
    if (maxCookingTime !== "")
      params.append("cooking_time", `${maxCookingTime}`);
    if (maxPreheatTemp !== "")
      params.append("preheat_temperature", `${maxPreheatTemp}`);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/recipes/filter/?${params}`)
      .then((res) => setRecipes(res.data))
      .catch(console.error);
  }, [tagFilter, maxCookingTime, maxPreheatTemp]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Recipe List</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          placeholder="Search by tag"
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          value={maxCookingTime}
          onChange={(e) =>
            setMaxCookingTime(e.target.value === "" ? "" : +e.target.value)
          }
          placeholder="Max cooking time"
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          value={maxPreheatTemp}
          onChange={(e) =>
            setMaxPreheatTemp(e.target.value === "" ? "" : +e.target.value)
          }
          placeholder="Max preheat temp (°F)"
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* 3‑column grid of cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <li
            key={r.id}
            className="bg-white rounded-lg shadow hover:shadow-md p-5 flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2 text-indigo-800">
              {r.title}
            </h2>
            <p className="text-gray-700 mb-4 flex-grow">{r.description}</p>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>⏱ {r.cooking_time} min</span>
              <span>🔥 {r.preheat_temperature}°F</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <span
                  key={t.id}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
