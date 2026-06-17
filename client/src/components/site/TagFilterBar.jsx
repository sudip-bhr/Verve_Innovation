import { cn } from '../../lib/utils';

export default function TagFilterBar({ tags, activeTag, onTagSelect, className }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {tags.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              "px-5 py-2 text-sm font-body font-medium rounded-pill transition-all duration-200 border",
              isActive 
                ? "bg-verve-orange border-verve-orange text-black shadow-md shadow-orange-500/10" 
                : "bg-transparent border-verve-border text-verve-text-secondary hover:text-verve-text-primary hover:border-verve-text-muted"
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
