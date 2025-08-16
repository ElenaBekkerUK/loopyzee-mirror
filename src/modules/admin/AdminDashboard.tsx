// src/modules/admin/AdminDashboard.tsx
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { TemplateGrid } from "./TemplateGrid";
import { CategoryList } from "./CategoryList";
import * as s from "./AdminDashboard.css";
import type { Template, Category } from "@/types/admin";

function safeGetParam(sp: ReturnType<typeof useSearchParams>, key: string): string {
  // useSearchParams типизирован как потенциально null в некоторых версиях типов
  try {
    return sp?.get(key) ?? "";
  } catch {
    return "";
  }
}

function toMillis(v: unknown): number {
  if (typeof v === "number") return v;
  if (v instanceof Date) return v.getTime();
  return 0;
}

export default function AdminDashboardModule() {
  const sp = useSearchParams();

  const q = safeGetParam(sp, "q");
  const categoryId = safeGetParam(sp, "categoryId");
  const subcategoryId = safeGetParam(sp, "subcategoryId");

  // Categories
  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/admin/categories", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load categories");
      const json = await res.json();
      return (json.categories ?? []) as Category[];
    },
    staleTime: 60_000,
  });

  // Templates (фильтры синхронизированы с URL)
  const {
    data: templatesRaw,
    isLoading: tplLoading,
    error: tplError,
  } = useQuery<Template[]>({
    queryKey: ["admin", "templates", { q, categoryId, subcategoryId }],
    queryFn: async () => {
      const qs = new URLSearchParams({ q, categoryId, subcategoryId });
      const res = await fetch(`/api/admin/templates?${qs.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load templates");
      const json = await res.json();
      return (json.templates ?? []) as Template[];
    },
  });

  // Сортировка по updatedAt убыв. (без any)
  const templates = useMemo(
    () =>
      (templatesRaw ?? [])
        .slice()
        .sort((a, b) => toMillis(b.updatedAt) - toMillis(a.updatedAt)),
    [templatesRaw]
  );

  const loading = catLoading || tplLoading;
  const hasError = !!catError || !!tplError;

  return (
    <div className={s.wrap}>
      <h1 className={s.header}>🛠 Admin Dashboard</h1>

      {hasError && (
        <div className="mb-4 text-sm text-[var(--danger)]">
          Failed to load {catError ? "categories" : ""}{catError && tplError ? " & " : ""}{tplError ? "templates" : ""}.
        </div>
      )}

      <div className={s.sections}>
        <TemplateGrid
          templates={templates ?? []}
          categories={categories ?? []}
          loading={loading}
        />
        <CategoryList initialCategories={categories ?? []} />
      </div>
    </div>
  );
}
