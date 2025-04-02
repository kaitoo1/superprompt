import { memo } from "react";

type CategoryPillProps = {
  category: string;
};

const CategoryPill = memo(({ category }: CategoryPillProps) => {
  return (
    <span className="px-3 bg-zinc-800 rounded-full text-xs text-zinc-400 flex items-center gap-2 h-6 whitespace-nowrap capitalize">
      {category}
    </span>
  );
});

CategoryPill.displayName = "CategoryPill";

export default CategoryPill;
