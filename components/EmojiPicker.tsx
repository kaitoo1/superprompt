import { useState, useEffect } from "react";

// Common emoji categories
const emojiCategories = {
  smileys: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
  ],
  gestures: [
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👏",
    "🙌",
    "👐",
  ],
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
  ],
  food: [
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🍆",
    "🥑",
    "🌮",
    "🍕",
    "🍔",
  ],
  activities: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🥅",
    "🏒",
    "🏑",
    "🥍",
    "🏏",
    "🎿",
    "🛷",
    "🥌",
  ],
  travel: [
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏎️",
    "🚓",
    "🚑",
    "🚒",
    "🚐",
    "🚚",
    "🚛",
    "🚜",
    "🛴",
    "🚲",
    "🛵",
    "🏍️",
    "🚨",
    "✈️",
    "🚀",
  ],
  objects: [
    "💡",
    "🔦",
    "🧯",
    "🛢️",
    "💸",
    "💵",
    "💴",
    "💶",
    "💷",
    "💰",
    "💳",
    "💎",
    "⚖️",
    "🔧",
    "🔨",
    "⚒️",
    "🛠️",
    "⛏️",
    "🔩",
    "⚙️",
  ],
  symbols: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✝️",
    "☪️",
    "🔯",
    "✡️",
  ],
};

// Flatten all emojis for search
const allEmojis = Object.values(emojiCategories).flat();

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({
  onEmojiSelect,
  onClose,
}: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof emojiCategories>("smileys");
  const [filteredEmojis, setFilteredEmojis] = useState<string[]>([]);

  // Filter emojis based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmojis([]);
      return;
    }

    const filtered = allEmojis.filter((emoji) =>
      emoji.includes(searchTerm.toLowerCase())
    );
    setFilteredEmojis(filtered);
  }, [searchTerm]);

  // Get emojis to display based on search or category
  const displayEmojis =
    searchTerm.trim() !== "" ? filteredEmojis : emojiCategories[activeCategory];

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-3 w-72 z-10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Add reaction</h3>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        placeholder="Search emojis..."
        className="w-full px-2 py-1 mb-2 text-sm bg-zinc-100 dark:bg-zinc-700 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category tabs */}
      {searchTerm.trim() === "" && (
        <div className="flex overflow-x-auto mb-2 pb-1 hide-scrollbar">
          {Object.keys(emojiCategories).map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(category as keyof typeof emojiCategories)
              }
              className={`px-2 py-1 text-xs whitespace-nowrap mr-1 rounded ${
                activeCategory === category
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  : "bg-zinc-100 dark:bg-zinc-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Emoji grid */}
      <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
        {displayEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onEmojiSelect(emoji)}
            className="flex items-center justify-center h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded"
          >
            {emoji}
          </button>
        ))}

        {searchTerm.trim() !== "" && filteredEmojis.length === 0 && (
          <div className="col-span-6 text-center py-4 text-zinc-500">
            No emojis found
          </div>
        )}
      </div>
    </div>
  );
}
