import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selected, setSelected] = useState<Recipe | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (tagFilter) params.append("tag", tagFilter);
    if (maxCookingTime !== "") params.append("cooking_time", `${maxCookingTime}`);
    if (maxPreheatTemp !== "") params.append("preheat_temperature", `${maxPreheatTemp}`);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/recipes/filter/?${params}`)
      .then((res) => setRecipes(res.data))
      .catch(console.error);
  }, [tagFilter, maxCookingTime, maxPreheatTemp]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-md">
          Recipe List
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {([
            {
              type: "text",
              value: tagFilter,
              set: setTagFilter,
              placeholder: "Search by tag",
            },
            {
              type: "number",
              value: maxCookingTime,
              set: (v: string) => setMaxCookingTime(v === "" ? "" : +v as number),
              placeholder: "Max cooking time",
            },
            {
              type: "number",
              value: maxPreheatTemp,
              set: (v: string) => setMaxPreheatTemp(v === "" ? "" : +v as number),
              placeholder: "Max preheat temp (°F)",
            },
          ] as const).map((inp, i) => (
            <input
              key={i}
              type={inp.type}
              value={inp.value as string | number}
              onChange={(e) => inp.set(e.target.value)}
              placeholder={inp.placeholder}
              className="
                w-full bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500
                border border-gray-300 rounded-md p-2
                focus:outline-none focus:ring-2 focus:ring-indigo-600/60
              "
            />
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((r) => (
            <li
              key={r.id}
              onClick={() => setSelected(r)}
              className="
                cursor-pointer select-none
                bg-white/60 backdrop-blur-lg border border-white/80 shadow-lg rounded-2xl p-6 flex flex-col transition
                hover:shadow-2xl hover:bg-white/70
              "
            >
              <h2 className="text-xl font-semibold mb-2 text-indigo-800">
                {r.title}
              </h2>

              <p className="text-black mb-4 flex-grow line-clamp-3">
                {r.description}
              </p>

              <div className="flex justify-between text-sm text-black mb-4">
                <span>⏱ {r.cooking_time} min</span>
                <span>🔥 {r.preheat_temperature}°F</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t.id}
                    className="text-xs bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                bg-white/65 backdrop-blur-lg border border-white/80 shadow-2xl
                max-w-lg w-11/12 md:w-2/3 rounded-2xl p-10 relative text-gray-900
              "
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="recipe-title"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                aria-label="Close recipe"
              >
                &times;
              </button>

              <h2
                id="recipe-title"
                className="text-2xl font-bold mb-4 text-indigo-800"
              >
                {selected.title}
              </h2>

              <p className="text-black whitespace-pre-line mb-6">
                {selected.description}
              </p>

              <div className="flex justify-between text-sm text-black mb-6">
                <span>⏱ {selected.cooking_time} min</span>
                <span>🔥 {selected.preheat_temperature}°F</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <span
                    key={t.id}
                    className="text-xs bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
