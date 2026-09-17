import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { Tool } from "@/types/tool";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-foreground/25"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-accent">
        <Icon name={tool.icon} className="size-4" />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {tool.name}
        </span>
        <span className="mt-0.5 text-sm text-muted-foreground">
          {tool.shortDescription}
        </span>
      </span>
    </Link>
  );
}
