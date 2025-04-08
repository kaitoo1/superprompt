import { memo } from "react";

type CategoryPillProps = {
  category: string;
};

const CategoryPill = memo(({ category }: CategoryPillProps) => {
  return (
    <span className="px-3 dark:bg-zinc-800 bg-zinc-200 rounded-full text-xs dark:text-zinc-400  text-zinc-700 flex items-center gap-2 h-6 whitespace-nowrap capitalize">
      {category}
    </span>
  );
});

CategoryPill.displayName = "CategoryPill";

export default CategoryPill;
