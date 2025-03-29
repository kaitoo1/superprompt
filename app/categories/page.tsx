import React from "react";
import Link from "next/link";

// Define all categories with icons, colors, and filter values
const ALL_CATEGORIES = [
  { name: "Favorited", filter: "favorited", icon: "⭐", color: "bg-amber-500" },
  {
    name: "My Prompts",
    filter: "my-prompts",
    icon: "📝",
    color: "bg-indigo-600",
  },
  { name: "Coding", filter: "coding", icon: "💻", color: "bg-blue-500" },
  { name: "Coach", filter: "coach", icon: "🏆", color: "bg-green-500" },
  { name: "Travel", filter: "travel", icon: "✈️", color: "bg-purple-500" },
  {
    name: "Nutrition",
    filter: "nutrition",
    icon: "🥗",
    color: "bg-yellow-500",
  },
  { name: "Writing", filter: "writing", icon: "✍️", color: "bg-pink-500" },
  {
    name: "Education",
    filter: "education",
    icon: "📚",
    color: "bg-indigo-500",
  },
  {
    name: "Productivity",
    filter: "productivity",
    icon: "⏱️",
    color: "bg-red-500",
  },
  {
    name: "Image Generation",
    filter: "image-generation",
    icon: "🎨",
    color: "bg-teal-500",
  },
  { name: "Business", filter: "business", icon: "💼", color: "bg-gray-500" },
  { name: "Health", filter: "health", icon: "🩺", color: "bg-red-400" },
  { name: "Finance", filter: "finance", icon: "💰", color: "bg-green-600" },
  {
    name: "Marketing",
    filter: "marketing",
    icon: "📊",
    color: "bg-orange-500",
  },
  { name: "Science", filter: "science", icon: "🔬", color: "bg-cyan-500" },
  { name: "Art", filter: "art", icon: "🎭", color: "bg-purple-400" },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mr-2">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-white">All Categories</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ALL_CATEGORIES.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center justify-center p-6 rounded-lg transition-colors border bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-600`}
          >
            <span className="text-3xl mb-3">{category.icon}</span>
            <span className="text-sm font-medium text-zinc-200">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
