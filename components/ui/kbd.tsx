import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
