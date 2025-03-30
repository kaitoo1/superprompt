"use client";

import { Suspense, useCallback, useMemo } from "react";

import { useUser } from "../contexts/UserContext";
import SearchBar from "./SearchBar";
import { usePrompts } from "@/contexts/PromptsContext";
import { usePromptsData } from "@/hooks/usePrompts";
import { useFavoritedPrompts } from "@/hooks/useFavoritedPrompts";
import CategoryTiles, { CATEGORIES } from "./CategoryTiles";
import PromptsGrid from "./PromptsGrid";
import { Prompt } from "@/types/database";

export default function HomeContent() {
  const { user } = useUser();

  const { searchQuery, activeFilter } = usePrompts();
  const { data, isLoading, error, refetch } = usePromptsData(
    user?.id,
    searchQuery,
    activeFilter
  );
  const { data: favoritedPrompts } = useFavoritedPrompts(user?.id);
  const prompts = useMemo(() => data ?? [], [data]);
  const promptsWithFavoritesMarked = useMemo(() => {
    return prompts.map((prompt) => ({
      ...prompt,
      is_favorited: favoritedPrompts?.some((fav) => fav.id === prompt.id),
    }));
  }, [prompts, favoritedPrompts]);
  const promptsToDisplay = useMemo(() => {
    if (activeFilter === "favorites") {
      return favoritedPrompts
        ? favoritedPrompts.map((fav) => ({
            ...fav,
            is_favorited: true,
          }))
        : [];
    }
    return promptsWithFavoritesMarked;
  }, [activeFilter, favoritedPrompts, promptsWithFavoritesMarked]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const categoryNameMap = useMemo(() => {
    const filterMap: Record<string, string> = {};

    CATEGORIES.forEach((category) => {
      filterMap[category.filter] = category.name;
    });

    return filterMap;
  }, []);

  const headingText = activeFilter ? categoryNameMap[activeFilter] : "Popular";

  return (
    <>
      <SearchBar />
      {!searchQuery && (
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryTiles />
        </Suspense>
      )}
      {!searchQuery && (
        <h2 className="text-xl font-semibold mb-6 text-white capitalize">
          {headingText}
        </h2>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-red-400">
          <p>{error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      )}

      <PromptsGrid
        prompts={promptsToDisplay as Prompt[]}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
