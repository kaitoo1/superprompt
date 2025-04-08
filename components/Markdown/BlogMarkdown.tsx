import { memo } from "react";
import ReactMarkdown from "react-markdown";

const BlogMarkdown = memo(({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        // Headings
        h1: ({ ...props }) => (
          <h1
            className="text-4xl font-bold mt-8 mb-4 text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            className="text-2xl font-semibold mt-12 mb-3 text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3
            className="text-xl font-bold mt-12 mb-4 text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        // Paragraphs
        p: ({ ...props }) => (
          <p
            className="text-lg text-zinc-800 dark:text-white mb-4 leading-relaxed"
            {...props}
          />
        ),
        // Links
        a: ({ ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-400 flex items-center gap-2 underline"
          />
        ),
        // Bold and Italic
        strong: ({ ...props }) => (
          <strong
            className="font-bold text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        em: ({ ...props }) => (
          <em className="italic text-zinc-800 dark:text-white" {...props} />
        ),
        // Lists
        ul: ({ ...props }) => (
          <ul
            className="list-disc pl-6 mb-4 text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        ol: ({ ...props }) => (
          <ol
            className="list-decimal pl-6 mb-4 text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        li: ({ ...props }) => <li className="mb-1" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
});

BlogMarkdown.displayName = "BlogMarkdown";

export default BlogMarkdown;
