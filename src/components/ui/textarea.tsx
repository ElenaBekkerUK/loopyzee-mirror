// src/components/ui/textarea.tsx
import { forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className = "", invalid, size = "md", ...props }, ref) => {
    const sizes = {
      sm: "px-2.5 py-1.5 text-sm",
      md: "px-3 py-2 text-sm",
      lg: "px-3.5 py-2.5 text-base",
    } as const;

    return (
      <textarea
        ref={ref}
        data-invalid={invalid || undefined}
        className={clsx(
  "w-full rounded-md border bg-surface text-text placeholder:text-muted shadow-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  invalid ? "border-danger" : "border-border",
  sizes[size],
  className
)}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
