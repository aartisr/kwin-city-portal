type TagFilterProps = {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
};

export function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${
            activeTag === tag
              ? 'bg-[#F5A623] text-[#040714]'
              : 'border border-white/10 text-[#94A3B8] hover:border-white/25 hover:text-white'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
