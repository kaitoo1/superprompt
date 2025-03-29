"use client";

import { useState, useCallback, memo } from "react";
import { Prompt } from "../types/database";
import { useUser } from "../contexts/UserContext";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";
import { useFavoritedPrompts } from "@/hooks/useFavoritedPrompts";
import { DecoratedPrompt } from "./DecoratedPrompt";
import { useRouter } from "next/navigation";
import LeftArrowIcon from "./icons/LeftArrowIcon";
import StarIcon from "./icons/StarIcon";
import TagPill from "./TagPill";
import { copyTextToClipboard } from "@/lib/clipboard";

interface PromptDetailProps {
  prompt: Prompt;
}

const PromptDetail = memo(({ prompt }: PromptDetailProps) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const { user, setIsSignInModalOpen } = useUser();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const { data: favoritedPrompts } = useFavoritedPrompts(user?.id);
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  // Function to check if prompt is favorited
  const isFavorited = favoritedPrompts?.some((fav) => fav.id === prompt.id);

  const handleCopy = useCallback(() => {
    copyTextToClipboard(prompt.prompt);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [prompt.prompt]);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/prompt/${prompt.slug}`;
    copyTextToClipboard(url);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  }, [prompt.slug]);

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!user?.id) {
        setIsSignInModalOpen(true);
        return;
      }
      toggleFavorite({
        userId: user?.id,
        promptId: prompt.id,
        isCurrentlyFavorited: isFavorited,
      });
    },
    [toggleFavorite, prompt.id, isFavorited, user?.id]
  );

  const hasOutputPreview = prompt.output_preview.length > 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="hidden sm:flex mb-6  items-center">
        <button
          onClick={handleBack}
          className="hover:cursor-pointer mr-3 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          <LeftArrowIcon />
        </button>
      </div>

      <div className="bg-zinc-800 rounded-lg flex flex-col space-y-4 p-6 pb-2 mb-6">
        <h2 className="text-2xl font-bold">{prompt.title}</h2>
        <p className="text-zinc-300 mb-6">{prompt.description}</p>
        {hasOutputPreview && (
          <div
            className={`h-80 w-full flex ${
              prompt.output_preview.length === 1
                ? "justify-center"
                : "space-x-2"
            }`}
          >
            {prompt.output_preview.slice(0, 2).map((imageUrl, index) => (
              <div
                key={index}
                className={`${
                  prompt.output_preview.length === 1
                    ? "h-full"
                    : "h-full flex-1"
                } overflow-hidden rounded`}
              >
                <img
                  src={imageUrl}
                  alt={`Output preview for ${prompt.title}`}
                  className="h-full w-full object-contain"
                  // onError={() => handleImageError(imageUrl)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="relative">
          <DecoratedPrompt prompt={prompt.prompt} displayMode="full" />
          <button
            onClick={handleCopy}
            className="absolute w-38 bottom-2 right-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer flex-1 sm:w-40 justify-center transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            {copySuccess ? "Copied!" : "Copy Prompt"}
          </button>
        </div>

        {/* Responsive layout for actions */}
        <div className="flex flex-col space-y-4">
          {/* Favorites and Tags - always on top row */}
          <div className="flex flex-1 space-x-2 h-6">
            <div className="flex flex-1 gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {prompt.tags.map((tag, index) => (
                <TagPill key={index} tag={tag} />
              ))}
            </div>
            <div className="flex flex-row items-center space-x-1">
              <button
                onClick={handleToggleFavorite}
                className="hover:cursor-pointer text-zinc-400 hover:text-yellow-400 transition-colors"
                title={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <StarIcon isFilled={isFavorited || false} />
              </button>
              <p className="text-zinc-400 text-xs">{prompt.favorite_count}</p>
            </div>
          </div>

          {/* Action buttons - on second row for mobile, same row for desktop */}
          <div className="flex flex-row space-x-2 sm:justify-end w-full sm:w-auto">
            <button
              onClick={handleShare}
              className="px-4 py-2 max-w-50 rounded-md bg-zinc-700 hover:cursor-pointer hover:bg-zinc-600 transition-colors flex-1 sm:w-40 justify-center flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              {shareSuccess ? "Copied Link" : "Share Link"}
            </button>
          </div>
        </div>

        {/* Empty containers kept for compatibility */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3"></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3"></div>
      </div>
    </div>
  );
});

PromptDetail.displayName = "PromptDetail";

export default PromptDetail;
