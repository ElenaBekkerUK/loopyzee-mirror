// src/components/ui/card.tsx
import { HTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "flat" | "surface";
// flat    = цвет фона страницы (bg)
// surface = отдельная «поверхностная» карточка (surface), обычно для форм, белая в светлой теме

export function Card({
  variant = "surface", // ← делаем surface дефолтом
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: Variant }) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-border shadow-md",
        variant === "surface" ? "bg-surface" : "bg-bg", // ← токен
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-4 border-b border-border", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-4 border-t border-border", className)} {...props} />;
}
