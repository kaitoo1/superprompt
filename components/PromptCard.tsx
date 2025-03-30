"use client";

import { useState, useCallback, memo } from "react";
import { Prompt } from "../types/database";
import { useRouter } from "next/navigation";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";
import { useUser } from "@/contexts/UserContext";
import DecoratedPrompt from "./DecoratedPrompt";
import CheckIcon from "./icons/CheckIcon";
import StarIcon from "./icons/StarIcon";
import TagPill from "./TagPill";
import { copyTextToClipboard } from "@/lib/clipboard";

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard = memo(({ prompt }: PromptCardProps) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const { user, setIsSignInModalOpen } = useUser();

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      copyTextToClipboard(prompt.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    },
    [prompt.prompt]
  );

  const handleCardClick = useCallback(() => {
    router.push(`/prompt/${prompt.slug}`);
  }, [prompt.slug, router]);

  const { mutate: toggleFavorite } = useToggleFavorite();

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!user) {
        setIsSignInModalOpen(true);
        return;
      }

      toggleFavorite({
        userId: user?.id,
        promptId: prompt.id,
        isCurrentlyFavorited: prompt.is_favorited,
      });
    },
    [user, toggleFavorite, prompt.id, prompt.is_favorited, setIsSignInModalOpen]
  );

  const hasOutputPreview =
    prompt.output_preview && prompt.output_preview.length > 0;

  const limitPromptClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className="bg-zinc-800 rounded-lg px-6 py-4 cursor-pointer hover:bg-zinc-700 transition-colors h-full flex flex-col"
      onClick={handleCardClick}
    >
      <div className="flex flex-col space-y-1 px-1">
        <h3 className="text-xl font-semibold line-clamp-2">{prompt.title}</h3>
        <div className="flex flex-col min-h-20  ">
          <p className="text-zinc-300 text-md line-clamp-3">
            {prompt.description}
          </p>
        </div>
      </div>

      {/* Scrollable Prompt Area with Copy Button */}
      {hasOutputPreview ? (
        <div
          className={`h-44 w-full flex ${
            prompt.output_preview.length === 1 ? "justify-center" : "space-x-2"
          }`}
        >
          {prompt.output_preview.slice(0, 2).map((imageUrl, index) => (
            <div
              key={index}
              className={`${
                prompt.output_preview.length === 1 ? "h-full" : "h-full flex-1"
              } overflow-hidden rounded`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={`Output preview for ${prompt.title}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div onClick={limitPromptClick} className="cursor-text">
            <DecoratedPrompt prompt={prompt.prompt} displayMode="preview" />
          </div>

          <button
            onClick={handleCopy}
            className="absolute bottom-3 right-3 p-1.5 bg-zinc-700 rounded-md hover:bg-zinc-600 transition-colors"
            title="Copy prompt"
          >
            {isCopied ? (
              <CheckIcon />
            ) : (
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
            )}
          </button>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-row justify-between items-center px-1 space-x-2 mt-3">
        <div
          className="flex flex-row space-x-2 overflow-x-auto pb-1 hide-scrollbar"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {prompt.tags?.map((tag, index) => (
            <TagPill key={index} tag={tag} />
          ))}
        </div>

        <div className="flex flex-row items-center space-x-1">
          <button
            onClick={handleToggleFavorite}
            className="cursor:pointer-text-zinc-400 hover:text-yellow-400 transition-colors"
            title={
              prompt.is_favorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            <StarIcon isFilled={prompt.is_favorited} />
          </button>
          <p className="text-zinc-400 text-xs">{prompt.favorite_count}</p>
        </div>
      </div>
    </div>
  );
});

PromptCard.displayName = "PromptCard";
export default PromptCard;
