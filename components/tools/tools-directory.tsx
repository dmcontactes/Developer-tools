"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/home/tool-card";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { Tool } from "@/types/tool";

export function ToolsDirectory({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    if (!activeCategory) return tools;
    return tools.filter((tool) => tool.categorySlug === activeCategory);
  }, [tools, activeCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-md border px-3 py-1.5 text-sm transition-colors",
            activeCategory === null
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-surface text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition-colors",
              activeCategory === category.slug
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
