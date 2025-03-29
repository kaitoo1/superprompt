import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Function to fetch a single prompt
const fetchPrompt = async (slug: string) => {
  const { data, error } = await supabase
    .from("prompts_with_stats")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

// Custom hook for fetching a prompt by id using the object API
export const usePrompt = (slug: string) => {
  return useQuery({
    queryKey: ["prompt", slug],
    queryFn: () => fetchPrompt(slug),
    enabled: !!slug, // Only run the query if slug is defined
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};
