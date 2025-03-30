"use client";

import React, { useCallback, useMemo } from "react";
import { useUser } from "../contexts/UserContext";
import { usePrompts } from "../contexts/PromptsContext";

// Define the categories we want to display
const CATEGORIES = ["Coding", "Coach", "Travel", "Nutrition"];

const FilterPills: React.FC = () => {
  const { user } = useUser();
  const { activeFilter, setActiveFilter } = usePrompts();

  // Memoize the combined list of filters (favorites + categories)
  const allFilters = useMemo(() => {
    return ["favorites", ...CATEGORIES];
  }, []);

  // Toggle filter callback
  const toggleFilter = useCallback(
    (filter: string) => {
      setActiveFilter((prev) => (prev === filter ? null : filter));
    },
    [setActiveFilter]
  );

  // Render a single pill
  const renderPill = useCallback(
    (filter: string) => {
      const isActive = activeFilter === filter.toLowerCase();
      const isFavorites = filter.toLowerCase() === "favorites";
      const isDisabled = isFavorites && !user;

      return (
        <button
          key={filter}
          onClick={() => toggleFilter(filter.toLowerCase())}
          disabled={isDisabled}
          className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors ${
            isActive
              ? isFavorites
                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/50"
              : "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title={
            isFavorites && !user
              ? "Sign in to use favorites"
              : `Filter by ${filter}`
          }
        >
          <div className="flex items-center gap-1.5">
            {isFavorites ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${isActive ? "text-yellow-400" : ""}`}
                fill={isActive ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ) : (
              <span className="w-4 h-4 flex items-center justify-center">
                #
              </span>
            )}
            {filter}
          </div>
        </button>
      );
    },
    [activeFilter, toggleFilter, user]
  );

  return (
    <div className="flex flex-wrap gap-2 mt-4 max-w-4xl mx-auto">
      {allFilters.map(renderPill)}
    </div>
  );
};

export default React.memo(FilterPills);
