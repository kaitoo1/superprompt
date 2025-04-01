import { memo } from "react";

type TagPillProps = {
  tag: string;
};

const TagPill = memo(({ tag }: TagPillProps) => {
  return (
    <span className="px-3 bg-zinc-800 rounded-full text-xs text-zinc-400 flex items-center gap-2 h-6 whitespace-nowrap capitalize">
      {tag}
    </span>
  );
});

TagPill.displayName = "TagPill";

export default TagPill;
