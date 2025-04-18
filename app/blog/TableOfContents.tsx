"use client";

import { useState } from "react";
import clsx from "clsx";

export type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ headings }: { headings: TOCItem[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop floating sidebar */}
      <div
        className={clsx(
          "hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40",
          "transition-all duration-300 ease-in-out",
          "hover:w-64",
          "w-10", // collapsed width
          "rounded-xl shadow-xl",
          "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md",
          "overflow-hidden ",
          "flex flex-col justify-center"
        )}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div
          className={clsx(
            "transition-all duration-300 overflow-y-auto",
            expanded ? "p-4 space-y-3" : "items-center space-y-2 py-4"
          )}
        >
          {headings.map(({ id, text, level }) =>
            expanded ? (
              <a
                key={id}
                href={`#${id}`}
                className={clsx(
                  "block text-zinc-800 dark:text-white hover:underline truncate transition-all",
                  level === 2 ? "pl-0" : "pl-4 text-sm"
                )}
              >
                {text}
              </a>
            ) : (
              <a
                key={id}
                href={`#${id}`}
                className="block w-full flex justify-center"
              >
                <span
                  className={clsx(
                    "w-2 h-1 rounded-full bg-zinc-500 dark:bg-zinc-400",
                    level === 2 ? "opacity-100" : "opacity-60"
                  )}
                />
              </a>
            )
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className="fixed bottom-4 right-4 lg:hidden z-40">
        <details className="bg-zinc-900 rounded shadow-md ring-1 ring-white/10 w-56">
          <summary className="p-2 text-white text-sm cursor-pointer">
            Jump to section
          </summary>
          <div className="p-2 space-y-1 text-sm text-white">
            {headings.map(({ id, text }) => (
              <a key={id} href={`#${id}`} className="block hover:underline">
                {text}
              </a>
            ))}
          </div>
        </details>
      </div>
    </>
  );
}
