// loopyzee > src > modules > admin > CategoryList.tsx
// Provides the admin UI for listing, adding, and deleting categories and their subcategories.

"use client";

import { useState } from "react";
import * as s from "./CategoryList.css";
import type { Category } from "@/types/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateCategoryPayload {
  title: string;
}

interface CreateSubcategoryPayload {
  categoryId: string;
  title: string;
}

interface DeleteSubcategoryPayload {
  categoryId: string;
  subcategoryId: string;
}

type Props = {
  initialCategories: Category[];
};

export function CategoryList({ initialCategories }: Props) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [subcatTitles, setSubcatTitles] = useState<Record<string, string>>({});

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/admin/categories", {
        credentials: "include",
      });
      const json = await res.json();
      return json.categories;
    },
    initialData: initialCategories,
    staleTime: 1000 * 60 * 5,
  });

  const addCategoryMutation = useMutation({
    mutationFn: async ({ title }: CreateCategoryPayload) => {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Unknown error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setTitle("");
    },
    onError: (err) => {
      console.error("Ошибка добавления категории:", err);
      alert("Не удалось добавить категорию");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Unknown error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.error("Ошибка удаления категории:", err);
      alert("Не удалось удалить категорию");
    },
  });

  const addSubcategoryMutation = useMutation({
    mutationFn: async ({ categoryId, title }: CreateSubcategoryPayload) => {
      const res = await fetch(`/api/admin/categories/${categoryId}/subcategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Unknown error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.error("Ошибка добавления подкатегории:", err);
      alert("Не удалось добавить подкатегорию");
    },
  });

  const deleteSubcategoryMutation = useMutation({
    mutationFn: async ({ categoryId, subcategoryId }: DeleteSubcategoryPayload) => {
      const res = await fetch(`/api/admin/categories/${categoryId}/subcategories/${subcategoryId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Unknown error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.error("Ошибка удаления подкатегории:", err);
      alert("Не удалось удалить подкатегорию");
    },
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addCategoryMutation.mutate({ title: title.trim() });
  };

  const handleAddSubcategory = (categoryId: string) => {
    const subcatTitle = subcatTitles[categoryId]?.trim();
    if (!subcatTitle) return;
    addSubcategoryMutation.mutate({ categoryId, title: subcatTitle });
    setSubcatTitles((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Удалить категорию?")) return;
    deleteCategoryMutation.mutate(id);
  };

  return (
    <section className={s.wrap}>
      <h2 className={s.header}>📁 Categories</h2>
      <form className={s.form} onSubmit={handleAddCategory}>
        <input
          className={s.input}
          placeholder="New category"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={!title || addCategoryMutation.isPending}
          className={s.addBtn}
        >
          Add
        </button>
      </form>
      <ul className={s.list}>
        {categories.map(cat => (
          <li key={cat.id} className={s.catItem}>
            <div className={s.catRow}>
              <span className={s.catTitle}>{cat.title}</span>
              <button className={s.delBtn} onClick={() => handleDelete(cat.id)}>
                Delete
              </button>
            </div>

            {/* Subcategories */}
            <ul className={s.subList}>
              {cat.subcategories?.map((sub) => (
                <li key={sub.id} className={s.subItem}>
                  <span>{sub.title}</span>
                  <button
                    className={s.delBtn}
                    onClick={() => {
                      if (confirm("Удалить подкатегорию?")) {
                        deleteSubcategoryMutation.mutate({ categoryId: cat.id, subcategoryId: sub.id });
                      }
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            {/* Add subcategory */}
            <div className={s.subFormWrap}>
              <input
                className={s.subInput}
                placeholder="New subcategory"
                value={subcatTitles[cat.id] || ""}
                onChange={(e) =>
                  setSubcatTitles((prev) => ({ ...prev, [cat.id]: e.target.value }))
                }
              />
              <button
                className={s.subAddBtn}
                disabled={!subcatTitles[cat.id]?.trim() || addSubcategoryMutation.isPending}
                onClick={() => handleAddSubcategory(cat.id)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
