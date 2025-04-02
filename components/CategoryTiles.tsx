"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePrompts } from "../contexts/PromptsContext";

type Category = {
  name: string;
  filter: string;
  icon: string;
  disabled?: boolean;
  comingSoon?: boolean;
};

// Define the categories with icons, colors, and filter values
export const CATEGORIES: Category[] = [
  {
    name: "Image Generation",
    filter: "image generation",
    icon: "🎨",
  },
  {
    name: "Resume Building",
    filter: "resume",
    icon: "📄",
  },
  {
    name: "Interview Prep",
    filter: "interview",
    icon: "🎤",
  },
  {
    name: "Email Writing",
    filter: "email",
    icon: "✉️",
  },
  {
    name: "Productivity",
    filter: "productivity",
    icon: "⏰",
  },
  // {
  //   name: "Coding",
  //   filter: "coding",
  //   icon: "💻",
  // },
  {
    name: "Writing",
    filter: "writing",
    icon: "✍️",
  },
  {
    name: "Marketing",
    filter: "marketing",
    icon: "📣",
  },
  // {
  //   name: "Trip Planning",
  //   filter: "trip-planning",
  //   icon: "✈️",
  // },
  {
    name: "Research",
    filter: "research",
    icon: "🔍",
  },
  {
    name: "Language Coaching",
    filter: "language coaching",
    icon: "🗣️",
  },
  {
    name: "Negotiation",
    filter: "negotiation",
    icon: "🤝",
  },
  {
    name: "Event Planning",
    filter: "event planning",
    icon: "🎉",
  },
  // {
  //   name: "Cooking",
  //   filter: "cooking",
  //   icon: "🍳",
  // },
  // {
  //   name: "Brainstorming",
  //   filter: "brainstorming",
  //   icon: "💡",
  // },
  // {
  //   name: "Social Media",
  //   filter: "social-media",
  //   icon: "📱",
  // },
  // {
  //   name: "Learning Aid",
  //   filter: "learning-aid",
  //   icon: "📚",
  // },
  {
    name: "Personal Finance",
    filter: "personal finance",
    icon: "💰",
  },
  // {
  //   name: "Wellness",
  //   filter: "wellness",
  //   icon: "🧘",
  // },
  // {
  //   name: "Project Management",
  //   filter: "project-management",
  //   icon: "📊",
  // },
  // {
  //   name: "Exercise",
  //   filter: "exercise",
  //   icon: "🏋️",
  // },
  // {
  //   name: "Gaming",
  //   filter: "gaming",
  //   icon: "🎮",
  // },
  // {
  //   name: "Parenting",
  //   filter: "parenting",
  //   icon: "👶",
  // },
  // {
  //   name: "DIY Projects",
  //   filter: "diy-projects",
  //   icon: "🔧",
  // },
];

// User-specific categories
const USER_CATEGORIES = [
  // {
  //   name: "My Prompts",
  //   filter: "my prompts",
  //   icon: "📝",
  //   color: "bg-zinc-500",
  //   disabled: true,
  //   comingSoon: true,
  // },
  { name: "Favorited", filter: "favorites", icon: "⭐", color: "bg-amber-500" },
];

const CategoryTiles: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activeFilter, setActiveFilter } = usePrompts();
  const [expanded, setExpanded] = useState(false);
  const expandedContentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Set initial filter from URL on component mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveFilter(categoryParam.replace(/-/g, " "));
    }
  }, [searchParams, setActiveFilter]);

  // Calculate the height of the expanded content for animation
  useEffect(() => {
    if (expandedContentRef.current) {
      setContentHeight(expanded ? expandedContentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  const handleCategoryClick = useCallback(
    (filter: string, disabled: boolean = false) => {
      if (disabled) return; // Don't do anything if the category is disabled

      // Toggle the filter - if it's already active, deselect it
      const newFilter = activeFilter === filter ? null : filter;
      setActiveFilter(newFilter);

      // Update URL search params
      const params = new URLSearchParams(searchParams.toString());
      if (newFilter) {
        const formattedFilter = newFilter.replace(/\s+/g, "-");
        params.set("category", formattedFilter);
      } else {
        params.delete("category");
      }

      // Update the URL without refreshing the page
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [activeFilter, setActiveFilter, router, searchParams]
  );

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  // Determine which categories to show
  const firstRowCategories = [...USER_CATEGORIES, ...CATEGORIES].slice(0, 8);
  const expandedCategories = CATEGORIES.slice(8, 24); // Show 16 more categories (2 rows of 8)

  // Render a category tile
  const renderCategoryTile = useCallback(
    (category: (typeof CATEGORIES)[0]) => {
      const isActive = activeFilter === category.filter && !category.disabled;
      const isDisabled = category.disabled;

      return (
        <button
          key={category.name}
          onClick={() => handleCategoryClick(category.filter, isDisabled)}
          className={`hover:cursor-pointer sm:h-24 flex flex-row sm:flex-col items-center sm:justify-center py-2 px-3 sm:p-4 rounded-lg transition-colors  ${
            isDisabled
              ? "bg-zinc-800/50 border-zinc-700/50 cursor-default opacity-70"
              : isActive
              ? `bg-zinc-500/20 border-zinc-500 border border-2
                )}/50 text-zinc-300`
              : "bg-zinc-900 hover:bg-zinc-700  hover:border-zinc-600"
          }`}
          // bg-gradient-to-r from-[#1E221F] to-[#616B64]
        >
          <span
            className={`text-xl sm:text-2xl sm:mb-2 mr-2 sm:mr-0 ${
              isActive && !isDisabled
                ? "scale-110 transform transition-transform"
                : ""
            }`}
          >
            {category.icon}
          </span>
          <div className="flex flex-col items-start sm:items-center">
            <span
              className={`text-xs sm:text-sm font-medium ${
                isActive && !isDisabled ? "text-white" : "text-zinc-200"
              }`}
            >
              {category.name}
            </span>
            {category.comingSoon && (
              <span className="text-[10px] sm:text-xs text-zinc-400 sm:mt-1">
                Coming Soon
              </span>
            )}
          </div>
        </button>
      );
    },
    [activeFilter, handleCategoryClick]
  );

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Explore categories</h2>
        <button
          onClick={toggleExpand}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {expanded ? "View less ↑" : "View more ↓"}
        </button>
      </div>

      {/* First row - always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
        {firstRowCategories.map(renderCategoryTile)}
      </div>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: contentHeight, opacity: contentHeight ? 1 : 0 }}
      >
        <div ref={expandedContentRef} className="pt-3 sm:pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
            {expandedCategories.map(renderCategoryTile)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryTiles);
