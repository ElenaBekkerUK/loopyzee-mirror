// src/components/ui/dropzone.tsx
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

export type DropzoneProps = {
  onFiles: (files: File[]) => void;
  accept?: { [mime: string]: string[] };
  maxFiles?: number;
  className?: string;
  hint?: string;
  error?: string;
  id?: string;
};

export function Dropzone({
  onFiles,
  accept,
  maxFiles,
  className,
  hint = "Drag & drop files here, or click to select",
  error,
  id = "dropzone",
}: DropzoneProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted?.length) onFiles(accepted);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple: (maxFiles ?? 99) > 1,
  });

  const describedBy =
    [hint ? `${id}-hint` : null, (isDragReject || error) ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const invalid = isDragReject || !!error;

  return (
    <div className="space-y-1.5">
      <div
        {...getRootProps()}
        role="button"
        aria-label="File drop zone"
        aria-describedby={describedBy}
        tabIndex={0}
        className={clsx(
          "w-full cursor-pointer rounded-lg border border-dashed p-4 transition shadow-sm",
          // поверхность карточки
          "bg-surface",
          // состояния
          invalid ? "border-danger" : "border-border",
          isDragActive ? "bg-accentLight" : "hover:bg-accentLight/40",
          // корректный focus ring на surface
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          className
        )}
      >
        <input {...getInputProps()} />
        <p id={`${id}-hint`} className="text-sm text-text">
          {isDragActive ? "Drop files to upload" : hint}
        </p>
      </div>

      {(isDragReject || error) && (
        <p id={`${id}-error`} className="text-xs text-danger">
          Some files are not accepted{error ? ` — ${error}` : ""}
        </p>
      )}
    </div>
  );
}
