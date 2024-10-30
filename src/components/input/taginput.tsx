"use client";

import { useState } from "react";

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-700">Offered Services</label>
      <div className="flex flex-wrap items-center gap-2 border border-gray-300 p-2 rounded-lg">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-lg"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="outline-none flex-grow"
          placeholder="Add a service"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTag}
        />
      </div>

      <div className="flex gap-2 mt-2">
        {["Home Cleaning", "Office Cleaning", "Laundry", "Gardening"].map(
          (service) => (
            <button
              key={service}
              onClick={() => setTags([...tags, service])}
              className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              {service}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TagInput;
