// src/components/admin/TemplateActions.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Action = "publish" | "draft" | "archive";

export default function TemplateActions({ id }: { id: string }) {
  const { show } = useToast();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const run = async (action: Action) => {
    const url = `/api/admin/templates/${id}/${action}`;
    const okTitle =
      action === "publish" ? "Published" : action === "draft" ? "Moved to Drafts" : "Archived";

    try {
      const res = await fetch(url, { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      show({ title: okTitle, variant: "success" });
      router.refresh();
    } catch (e) {
      show({
        title: "Action failed",
        description: (e as Error).message,
        variant: "error",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="primary"
        disabled={pending}
        onClick={() => startTransition(() => run("publish"))}
        aria-label="Publish template"
      >
        {pending ? "Working…" : "Publish"}
      </Button>

      {/* Вернуть в черновики */}
      <Button
        disabled={pending}
        onClick={() => startTransition(() => run("draft"))}
        aria-label="Move template to drafts"
      >
        {pending ? "Working…" : "Move to Drafts"}
      </Button>

      {/* Архив — запрашиваем подтверждение */}
      <Button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const ok = window.confirm(
              "Archive this template? It will be hidden from listings until restored."
            );
            if (!ok) return;
            await run("archive");
          })
        }
        aria-label="Archive template"
      >
        {pending ? "Working…" : "Archive"}
      </Button>
    </div>
  );
}