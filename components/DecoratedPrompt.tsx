import { memo } from "react";

import React, { useCallback, useMemo } from "react";

type DecoratedPromptProps = {
  prompt: string;

  displayMode: "preview" | "full";
};

const DecoratedPrompt: React.FC<DecoratedPromptProps> = memo(
  ({ prompt, displayMode = "preview" }) => {
    const renderPromptWithVariables = useCallback((promptText: string) => {
      const parts = [];
      const regex = /\\?\{(.*?)\}/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(promptText)) !== null) {
        const [fullMatch, varContent] = match;
        const isEscaped = fullMatch.startsWith("\\{");

        // Push text before match
        if (match.index > lastIndex) {
          parts.push(promptText.slice(lastIndex, match.index));
        }

        if (isEscaped) {
          // Include the braces, remove escape
          parts.push(`{${varContent}}`);
        } else {
          parts.push(
            <span key={match.index} className="text-[#9CDC2D]">
              {`{${varContent}}`}
            </span>
          );
        }

        lastIndex = match.index + fullMatch.length;
      }

      // Push the rest of the string
      if (lastIndex < promptText.length) {
        parts.push(promptText.slice(lastIndex));
      }

      return parts;
    }, []);

    const rendered = useMemo(
      () => renderPromptWithVariables(prompt),
      [prompt, renderPromptWithVariables]
    );

    return (
      <div
        className={`bg-black rounded-md p-6  overflow-y-auto text-zinc-500 text-sm font-mono whitespace-pre-wrap max-h-120 pb-16 italic ${
          displayMode === "preview" ? "h-36" : ""
        }`}
      >
        {rendered}
      </div>
    );
  }
);

DecoratedPrompt.displayName = "DecoratedPrompt";

export default DecoratedPrompt;
