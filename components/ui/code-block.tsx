import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-md border border-border bg-surface p-3 font-mono text-sm text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  );
}
