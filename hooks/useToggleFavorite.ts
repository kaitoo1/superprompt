import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useUser } from "@/contexts/UserContext";
import { Prompt } from "@/types/database";

type ToggleFavoriteProps = {
  userId: string;
  promptId: number;
  isCurrentlyFavorited: boolean;
};

async function toggleFavorite({
  userId,
  promptId,
  isCurrentlyFavorited,
}: ToggleFavoriteProps) {
  if (!userId || !promptId) throw new Error("Missing userId or promptId");

  if (isCurrentlyFavorited) {
    // ✅ Remove favorite
    console.log("Removing favorite");
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("prompt_id", promptId);

    if (error) throw error;
    return { success: true, action: "removed" };
  } else {
    // ✅ Add favorite
    console.log("Adding favorite", userId);
    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id: userId, prompt_id: promptId }]);

    if (error) throw error;
    return { success: true, action: "added" };
  }
}

type ToggleFavoriteArgs = {
  userId: string;
  promptId: number;
  isCurrentlyFavorited: boolean;
};

type ToggleFavoriteResult = {
  success: boolean;
  action: string;
};

type OptimisticContext = {
  previousPrompts?: Prompt[];
  previousFavorites?: Prompt[];
};

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userId = user?.id;

  return useMutation<
    ToggleFavoriteResult,
    Error,
    ToggleFavoriteArgs,
    OptimisticContext
  >({
    mutationFn: ({ userId, promptId, isCurrentlyFavorited }) =>
      toggleFavorite({ userId, promptId, isCurrentlyFavorited }),
    onMutate: async ({ promptId, isCurrentlyFavorited }) => {
      if (!userId) return;

      // Cancel both queries
      const promptsKey = ["prompts", "", null, userId]; // Adjust if using search/filter
      const favoritedKey = ["favorited-prompts", userId];
      await Promise.all([
        queryClient.cancelQueries({ queryKey: promptsKey }),
        queryClient.cancelQueries({ queryKey: favoritedKey }),
      ]);

      // Take a snapshot of both caches
      const previousPrompts = queryClient.getQueryData<Prompt[]>(promptsKey);
      const previousFavorites =
        queryClient.getQueryData<Prompt[]>(favoritedKey);

      console.log("previousPrompts", previousPrompts, previousFavorites);

      // Optimistically update prompts
      queryClient.setQueryData<Prompt[]>(promptsKey, (old = []) =>
        old.map((p) =>
          p.id === promptId
            ? {
                ...p,
                isFavorited: !isCurrentlyFavorited,
                favorite_count:
                  p.favorite_count + (isCurrentlyFavorited ? -1 : 1),
              }
            : p
        )
      );

      // Optimistically update favorited prompts
      const toggledPrompt =
        previousPrompts?.find((p) => p.id === promptId) ??
        previousFavorites?.find((p) => p.id === promptId);

      if (toggledPrompt) {
        queryClient.setQueryData<Prompt[]>(favoritedKey, (old = []) => {
          if (isCurrentlyFavorited) {
            // Remove
            return old.filter((p) => p.id !== promptId);
          } else {
            // Add
            return [...old, { ...toggledPrompt, isFavorited: true }];
          }
        });
      }

      // Optimistically update single prompt cache (["prompt", slug])
      queryClient.setQueriesData<Prompt>({ queryKey: ["prompt"] }, (data) => {
        if (!data || data.id !== promptId) return data;
        return {
          ...data,
          isFavorited: !isCurrentlyFavorited,
          favorite_count: data.favorite_count + (isCurrentlyFavorited ? -1 : 1),
        };
      });

      return {
        previousPrompts,
        previousFavorites,
      };
    },

    onSuccess: () => {
      // Ensure latest state from server
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["prompts", undefined, null, userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["favorited-prompts", userId],
        });
        queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      }
    },
    onError: (_err, _vars, context) => {
      if (!userId) return;
      if (context?.previousPrompts) {
        queryClient.setQueryData(
          ["prompts", undefined, null, userId],
          context.previousPrompts
        );
      }
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorited-prompts", userId],
          context.previousFavorites
        );
      }
    },
  });
}
