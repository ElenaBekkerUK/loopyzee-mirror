// src/app/admin/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CategoryList } from "@/modules/admin/CategoryList";
import type { Category } from "@/types/admin";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/admin/categories", { credentials: "include" });
      const json = await res.json();
      setCategories(json.categories);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="btn">
            ← Back to Admin
          </Link>
          <h1 className="text-2xl font-bold text-text">Manage Categories</h1>
        </div>
        <Link href="/admin/categories/new" className="btn btn-primary">
          + Add
        </Link>
      </header>

      {loading ? (
        <div className="text-muted">Loading...</div>
      ) : (
        <CategoryList initialCategories={categories} />
      )}
    </main>
  );
}
