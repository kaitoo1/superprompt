import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useUser } from "@/contexts/UserContext";

type ToggleFavoriteProps = {
  userId: string;
  promptId: string;
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

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userId = user?.id;

  return useMutation({
    mutationFn: ({ userId, promptId, isCurrentlyFavorited }) =>
      toggleFavorite({ userId, promptId, isCurrentlyFavorited }),
    onMutate: async ({ promptId, isCurrentlyFavorited }) => {
      console.log("onMutate");
      // ✅ Optimistically update the UI
      await queryClient.cancelQueries(["prompts", userId]); // Cancel ongoing queries
      const previousPrompts = queryClient.getQueryData(["prompts", userId]);
      // Update UI with optimistic favorite state
      queryClient.setQueryData(["prompts", userId], (oldData) =>
        oldData
          ? oldData.map((prompt) =>
              prompt.id === promptId
                ? { ...prompt, isFavorited: !isCurrentlyFavorited } // Flip the favorite state
                : prompt
            )
          : []
      );

      return { previousPrompts };
    },
    onSuccess: () => {
      // ✅ Refetch updated favorites after toggling
      queryClient.invalidateQueries(["favorites", userId]);
      queryClient.invalidateQueries(["prompts", userId]);
    },
    onError: (error) => {
      console.error("Failed to toggle favorite:", error);
      // Rollback UI to previous state
      if (context?.previousPrompts) {
        queryClient.setQueryData(["prompts", userId], context.previousPrompts);
      }
    },
  });
}
