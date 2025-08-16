// src/components/admin/TemplateCard.tsx
"use client";

import type { Template } from "@/types/admin";

type Props = {
  template: Template;
  categoryTitle?: string;
  onEdit: () => void;
  onDelete: () => void;
};

// встроенный SVG-плейсхолдер (без внешнего файла, чтобы не ловить 404)
const PLACEHOLDER_DATA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
      <rect width='400' height='400' fill='#e9ecef'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='system-ui' font-size='18' fill='#9aa1a9'>no preview</text>
    </svg>`
  );

export default function TemplateCard({
  template,
  categoryTitle,
  onEdit,
  onDelete,
}: Props) {
  const { title, thumbnailUrl, backgroundUrl, isLottie, updatedAt } = template;

  const safeTitle = (title ?? "").trim() || "Untitled";
  const safeCategory = categoryTitle || "Uncategorized";

  // фолбэк: thumbnail → background → встроенный плейсхолдер
  const baseUrl = thumbnailUrl || backgroundUrl || PLACEHOLDER_DATA;

  // версию добавляем только если это не data: и не плейсхолдер
  const isRealUrl = typeof baseUrl === "string" && /^https?:\/\//.test(baseUrl);
  const thumb = isRealUrl && updatedAt ? `${baseUrl}?v=${updatedAt}` : baseUrl;

  return (
    <div className="rounded-lg border border-border bg-white shadow-sm overflow-hidden">
      {/* Квадратное превью */}
      <div className="relative w-full aspect-square bg-muted/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={safeTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {isLottie && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full border border-border bg-accentLight/60 px-2 py-0.5 text-[11px] text-text shadow-sm">
              Lottie
            </span>
          </div>
        )}
      </div>

      {/* Текст и действия */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-medium text-text line-clamp-2">{safeTitle}</h3>
        <p className="text-xs text-muted truncate">{safeCategory}</p>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm hover:bg-accentLight"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-md border border-danger/40 bg-surface px-3 py-1.5 text-sm hover:bg-danger/10 text-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}