import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { Prompt } from "../types/database";

export const usePromptsData = (
  userId?: string,
  searchQuery?: string,
  activeFilter?: string | null
) => {
  return useQuery({
    queryKey: ["prompts", searchQuery, activeFilter, userId],
    queryFn: async (): Promise<Prompt[]> => {
      // Start with the base query
      let query = supabase.from("prompts_with_stats").select("*");

      // Apply search filter if provided
      if (searchQuery) {
        query = query.textSearch("search_vector", searchQuery, {
          config: "english",
          type: "websearch",
        });
      }

      // Apply tag filter if provided (and not "favorites" which is handled separately)
      if (activeFilter && activeFilter !== "favorites") {
        // For case-insensitive tag matching, we'll convert both to lowercase
        const lowerCaseFilter = activeFilter;

        // Use a raw SQL query with ILIKE for case-insensitive matching
        // This checks if any element in the tags array contains our filter value
        query = query.filter("tags", "cs", `{${lowerCaseFilter}}`);

        // Alternative approach using PostgreSQL array functions:
        // query = query.or(`array_to_string(tags, ',') ilike '%${lowerCaseFilter}%'`);
      }

      // Always order by favorites (descending)
      const { data, error } = await query.order("favorite_count", {
        ascending: false,
      });

      if (error) {
        console.error("Error fetching prompts:", error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
