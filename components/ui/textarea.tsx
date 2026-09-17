import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-md border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground placeholder:font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors resize-y",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
