import { cache } from "react";
import { supabase } from "./supabase";

// Next.js deduplicates identical async calls during the same request lifecycle
// using Request Memoization, if your function uses the cache() wrapper.
export const getPrompt = cache(async (slug: string) => {
  console.log("gett");
  const { data: prompt, error } = await supabase
    .from("prompts_with_stats")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching prompt:", error.message);

    return null;
  }

  return prompt;
});
