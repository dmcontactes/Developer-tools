"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { getAllTools } from "@/lib/data";
import { cn } from "@/lib/utils";

const allTools = getAllTools();

function matches(query: string, haystack: string[]) {
  const q = query.toLowerCase();
  return haystack.some((value) => value.toLowerCase().includes(q));
}

export function SearchBar({
  size = "md",
  className,
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return allTools
      .filter((tool) =>
        matches(query, [tool.name, tool.shortDescription, ...tool.keywords])
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Icon
          name="Search"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search developer tools…"
          className={cn(
            "pl-9 pr-14",
            size === "lg" && "h-12 text-base"
          )}
        />
        <Kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex">
          ⌘K
        </Kbd>
      </div>

      {open && query.trim() && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-border bg-surface shadow-lg">
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-background"
                  >
                    <Icon
                      name={tool.icon}
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="flex flex-col">
                      <span className="text-foreground">{tool.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {tool.shortDescription}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              No tools found for &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
