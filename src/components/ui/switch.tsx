// src/components/ui/switch.tsx
"use client";

import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import clsx from "clsx";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, label, ...props }, ref) => {
  return (
    <label className="inline-flex items-center gap-2 text-text">
      <RadixSwitch.Root
        ref={ref}
        className={clsx(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors",
          // фон и рамка по умолчанию — из темы
          "border-border bg-bg",
          // при checked — акцент, рамка прозрачная
          "data-[state=checked]:bg-accent data-[state=checked]:border-transparent",
          // фокус-обводка по токенам
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",

          className
        )}
        {...props}
      >
        <RadixSwitch.Thumb
          className={clsx(
            "block h-5 w-5 translate-x-0 rounded-full shadow-sm transition-transform",
            // Контрастность: белый на акцентном фоне, акцентный на обычном фоне
            "bg-accent data-[state=checked]:bg-white",
            "data-[state=checked]:translate-x-5"
          )}
        />
      </RadixSwitch.Root>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
});
Switch.displayName = "Switch";
