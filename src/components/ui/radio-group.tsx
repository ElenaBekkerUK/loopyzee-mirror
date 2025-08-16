// src/components/ui/radio-group.tsx
"use client";

import * as React from "react";
import * as RadixRadio from "@radix-ui/react-radio-group";
import clsx from "clsx";

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadixRadio.Root>;

export const RadioGroup = RadixRadio.Root;

export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadixRadio.Item> {
  label?: string;
}

export const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadixRadio.Item>,
  RadioItemProps
>(({ className, label, ...props }, ref) => {
  return (
    <label className="inline-flex items-center gap-2">
      <RadixRadio.Item
        ref={ref}
        className={clsx(
          "grid place-items-center h-5 w-5 rounded-full border border-border bg-surface",
          "data-[state=checked]:border-accent data-[state=checked]:bg-accentLight",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          className
        )}
        {...props}
      >
        <RadixRadio.Indicator
          className="block h-2.5 w-2.5 rounded-full bg-accent"
        />
      </RadixRadio.Item>
      {label && <span className="text-sm text-text">{label}</span>}
    </label>
  );
});
RadioItem.displayName = "RadioItem";
