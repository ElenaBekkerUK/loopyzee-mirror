import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "default" | "primary" | "ghost" | "soft" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  loading?: boolean;
}

export function Button({
  variant = "default",
  size = "md",
  className = "",
  disabled,
  block = false,
  loading = false,
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition " +
    "select-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3",
    md: "h-10 px-4",
    lg: "h-12 px-5 text-base",
  };

  const variants: Record<Variant, string> = {
    primary:
      "border-transparent text-white bg-accent hover:bg-accentHover shadow-md",
    default:
      "border-border bg-surface text-text shadow-sm hover:bg-accentLight",
    ghost:
      "border-transparent bg-transparent text-text hover:bg-accentLight",
    soft:
      // пастельный фон + акцентный текст — идеально для «чипов»
      "border-transparent bg-accentLight text-accent hover:bg-accent/10",
    outline:
      "border-border bg-transparent text-text hover:bg-accentLight",
  };

  return (
    <button
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        block && "w-full",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      )}
      {children}
    </button>
  );
}
