import { memo } from "react";
import ReactMarkdown from "react-markdown";

const PromptDetailMarkdown = memo(({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300"
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
});
PromptDetailMarkdown.displayName = "CustomMarcaown";

export default PromptDetailMarkdown;
