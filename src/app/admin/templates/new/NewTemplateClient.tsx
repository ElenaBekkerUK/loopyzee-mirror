// src/app/admin/templates/new/NewTemplateClient.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function NewTemplateClient() {
  const { show } = useToast();
  const [loading, setLoading] = useState(false);

  function goToEditorCreator() {
    setLoading(true);
    try {
      // Открываем SPA-редактор в режиме admin на экран создания
      // Страница в SPA: /template/new (TemplateCreator)
      window.location.href = "https://editor.loopyzee.com/template/new?mode=admin";
    } catch (e) {
      show({
        title: "Navigation failed",
        description: (e as Error).message,
        variant: "error",
      });
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">New Template</h1>
      <p className="text-sm text-muted">
        We’ll open the Editor (SPA) to create a new template. Metadata can be edited on the template page later.
      </p>
      <Button onClick={goToEditorCreator} variant="primary" disabled={loading}>
        {loading ? "Opening…" : "Create in Editor"}
      </Button>
    </main>
  );
}