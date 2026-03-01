import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border/60 placeholder:text-muted-foreground/60 focus-visible:border-primary/40 focus-visible:ring-primary/15 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-xl border bg-background px-4 py-3 text-base shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] focus-visible:bg-white dark:focus-visible:bg-background disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
