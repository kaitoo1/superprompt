import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

async function fetchFavoritedPrompts(userId: string | undefined) {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("prompt:prompts(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching favorited prompts:", error);
    throw error;
  }

  // Extract the prompt data from the joined results
  return (
    data?.map((item) => ({
      ...item.prompt,
      is_favorited: true,
    })) || []
  );
}

export function useFavoritedPrompts(userId: string | undefined) {
  return useQuery({
    queryKey: ["favorited-prompts", userId],
    queryFn: () => fetchFavoritedPrompts(userId),
    // Only run the query if we have a userId
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
