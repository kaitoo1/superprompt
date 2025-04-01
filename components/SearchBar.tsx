"use client";

import React, { useCallback } from "react";
import { usePrompts } from "../contexts/PromptsContext";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, setActiveFilter } = usePrompts();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setActiveFilter(null);
      setSearchQuery(e.target.value);
    },
    [setSearchQuery, setActiveFilter]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  return (
    <div className="mb-8">
      <div className="relative max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="What do you want to do?"
          className="w-full py-4 px-4 sm:py-5 sm:px-8 bg-zinc-900 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-lg"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-zinc-400 hover:text-white"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
