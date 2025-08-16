"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode, useId } from "react";
import type { HTMLAttributes, CSSProperties } from "react";

type SortableItemProps = {
  id: string;
  children: ReactNode;
  /** Подпись для screen reader: Drag to reorder: {label} */
  label?: string;
};

export function SortableItem({ id, children, label }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: "manipulation",
    opacity: isDragging ? 0.92 : 1,
    zIndex: isDragging || isSorting ? 5 : "auto",
  };

  const handleId = useId();

  // аккуратно извлекаем aria-describedby и склеиваем с нашим id
  const { ["aria-describedby"]: attrDescribedBy, ...restAttributes } =
    attributes as HTMLAttributes<HTMLElement>;
  const describedBy = [attrDescribedBy, handleId].filter(Boolean).join(" ");

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag handle */}
      <button
        type="button"
        aria-describedby={describedBy || undefined}
        className="absolute left-2 top-2 inline-flex items-center justify-center rounded-md border border-border bg-surface/80 backdrop-blur p-1 shadow-sm
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                   cursor-grab active:cursor-grabbing"
        {...restAttributes}
        {...listeners}
      >
        <span id={handleId} className="sr-only">
          Drag to reorder{label ? `: ${label}` : ""}
        </span>
        {/* иконка-«гриль» */}
        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" className="text-muted">
          <circle cx="5" cy="5" r="1.5" fill="currentColor" />
          <circle cx="5" cy="10" r="1.5" fill="currentColor" />
          <circle cx="5" cy="15" r="1.5" fill="currentColor" />
          <circle cx="10" cy="5" r="1.5" fill="currentColor" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          <circle cx="10" cy="15" r="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Контент без dnd listeners */}
      <div className="rounded-xl border border-border bg-surface shadow-sm">
        {children}
      </div>
    </div>
  );
}
