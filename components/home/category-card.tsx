import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { Category } from "@/types/category";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/tools/${category.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-foreground/25"
    >
      <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-accent">
        <Icon name={category.icon} className="size-4" />
      </span>
      <span>
        <span className="block text-sm font-medium text-foreground">
          {category.name}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {category.description}
        </span>
      </span>
    </Link>
  );
}
