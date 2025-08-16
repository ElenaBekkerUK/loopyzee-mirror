// src/components/admin/OpenInEditorButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type Props = {
  templateId: string;
  /** Поддерживаем локально: "secondary" маппим на "default" */
  variant?: "default" | "primary" | "secondary";
  className?: string;
  /** Открывать в новой вкладке (по умолчанию — нет) */
  newTab?: boolean;
};

export default function OpenInEditorButton({
  templateId,
  variant = "default",
  className = "",
  newTab = false,
}: Props) {
  const { show } = useToast();
  const url = `https://editor.loopyzee.com/?mode=admin&redirect=/template/${templateId}`;

  // маппим "secondary" → "default", чтобы соответствовать типам Button
  const mappedVariant: "default" | "primary" =
    variant === "secondary" ? "default" : variant;

  function openEditor() {
    if (newTab) {
      const w = window.open(url, "_blank", "noopener,noreferrer");
      if (!w) {
        show({
          title: "Popup blocked",
          description: "Please allow pop-ups for loopyzee.com",
          variant: "error",
        });
      }
    } else {
      window.location.href = url;
    }
  }

  return (
    <Button
      type="button"
      variant={mappedVariant}
      className={className}
      onClick={openEditor}
    >
      Open in Editor
    </Button>
  );
}