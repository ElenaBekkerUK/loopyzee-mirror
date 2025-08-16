// src/components/ui/select.tsx
import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";

const sizes = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-3.5 py-2.5 text-base",
} as const;

type Size = keyof typeof sizes;

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
  size?: Size;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className = "", children, invalid, size = "md" as Size, ...props }, ref) => {
    return (
      <select
        ref={ref}
        data-invalid={invalid || undefined}
        className={clsx(
          "w-full rounded-md border bg-surface text-text shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          invalid ? "border-danger" : "border-border",
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
