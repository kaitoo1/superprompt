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
      console.log("onMutate");
      // ✅ Optimistically update the UI
      const queryKey = ["prompts", userId];
      await queryClient.cancelQueries({ queryKey }); // Cancel ongoing queries
      const previousPrompts = queryClient.getQueryData<Prompt[]>([
        "prompts",
        userId,
      ]);
      // Update UI with optimistic favorite state
      queryClient.setQueryData(["prompts", userId], (oldData: Prompt[]) =>
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
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      queryClient.invalidateQueries({ queryKey: ["prompts", userId] });
    },
    onError: (error, _variables, context) => {
      console.error("Failed to toggle favorite:", error);
      // Rollback UI to previous state
      if (context?.previousPrompts) {
        queryClient.setQueryData(["prompts", userId], context.previousPrompts);
      }
    },
  });
}
