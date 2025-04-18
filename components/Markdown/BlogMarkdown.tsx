import { memo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const BlogMarkdown = memo(({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        // Headings with anchor IDs
        h1: ({ children, ...props }) => {
          const text = children?.toString() || "";
          const id = slugify(text);
          return (
            <h1
              id={id}
              className="text-4xl font-bold mt-8 mb-4 text-zinc-800 dark:text-white"
              {...props}
            >
              {children}
            </h1>
          );
        },
        h2: ({ children, ...props }) => {
          const text = children?.toString() || "";
          const id = slugify(text);
          return (
            <h2
              id={id}
              className="text-2xl font-semibold mt-12 mb-3 text-zinc-800 dark:text-white"
              {...props}
            >
              {children}
            </h2>
          );
        },

        // Rest untouched
        h3: ({ ...props }) => (
          <h3
            className="text-xl font-bold mt-8 mb-4 text-zinc-800 dark:text-white"
            {...props}
          />
        ),

        h4: ({ ...props }) => (
          <h4
            className="text-lg font-semibold mt-8 mb-4 text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        p: ({ ...props }) => (
          <p
            className="text-lg text-zinc-800 dark:text-white mb-4 leading-relaxed"
            {...props}
          />
        ),
        a: ({ ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="inline text-zinc-500 dark:text-zinc-400 hover:text-zinc-400 flex items-center gap-2 underline"
          />
        ),
        strong: ({ ...props }) => (
          <strong
            className="font-bold text-zinc-800 dark:text-white"
            {...props}
          />
        ),
        em: ({ ...props }) => (
          <em className="italic text-zinc-800 dark:text-white" {...props} />
        ),
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
        li: ({ ...props }) => <li className="mb-1 text-lg" {...props} />,
        aside: ({ ...props }) => (
          <aside
            className="bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500 p-4 rounded-md mt-4"
            {...props}
          />
        ),
        hr: ({ ...props }) => <hr className="text-zinc-300" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
});

BlogMarkdown.displayName = "BlogMarkdown";

export default BlogMarkdown;
