// src/app/admin/templates/templates-list.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TemplateCard from "@/components/admin/TemplateCard";
import { useToast } from "@/components/ui/toast";
import type { Template, Category } from "@/types/admin";

// Timestamp-подобные значения из Firestore
type TimestampLike = { toDate: () => Date };
function isTimestampLike(v: unknown): v is TimestampLike {
  return !!v && typeof v === "object" && "toDate" in (v as Record<string, unknown>);
}
function toMillis(v: unknown): number | undefined {
  if (!v) return undefined;
  if (isTimestampLike(v)) return (v as TimestampLike).toDate().getTime();
  if (v instanceof Date) return v.getTime();
  if (typeof v === "number") return v;
  return undefined;
}

export function TemplatesList() {
  const router = useRouter();
  const sp = useSearchParams();
  const { show } = useToast();

  const getParam = (k: string) => sp?.get?.(k) ?? "";

  const [filterId, setFilterId] = useState(() => getParam("categoryId"));
  const [filterSubId, setFilterSubId] = useState(() => getParam("subcategoryId"));
  const [q, setQ] = useState(() => getParam("q"));

  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // sync query params with UI state
  useEffect(() => {
    const params = new URLSearchParams(sp?.toString() ?? "");
    const setOrDel = (k: string, v: string) => (v ? params.set(k, v) : params.delete(k));
    setOrDel("categoryId", filterId);
    setOrDel("subcategoryId", filterSubId);
    setOrDel("q", q.trim());
    router.replace(`/admin/templates?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterId, filterSubId, q]);

  // load templates + categories
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const [tRes, cRes] = await Promise.all([
          fetch("/api/admin/templates", { credentials: "include", signal: ac.signal }),
          fetch("/api/admin/categories", { credentials: "include", signal: ac.signal }),
        ]);
        if (!tRes.ok) throw new Error("Failed to load templates");
        if (!cRes.ok) throw new Error("Failed to load categories");

        const tJson = (await tRes.json()) as { templates?: unknown[] };
        const cJson = (await cRes.json()) as { categories?: Category[] };

        // Нормализация шаблонов к типу Template + приведение дат к миллисекундам
        const list: Template[] = (Array.isArray(tJson.templates) ? tJson.templates : []).map(
          (raw) => {
            const t = raw as Partial<Template> & Record<string, unknown>;
            return {
              id: String(t.id),
              slug: String(t.slug ?? ""),
              status: (t.status as Template["status"]) ?? "draft",
              title: String(t.title ?? ""),
              description: String(t.description ?? ""),
              categoryId: String(t.categoryId ?? ""),
              subcategoryId: t.subcategoryId ? String(t.subcategoryId) : undefined,
              thumbnailUrl: t.thumbnailUrl ? String(t.thumbnailUrl) : "",
              previewImages: Array.isArray(t.previewImages) ? (t.previewImages as string[]) : [],
              isLottie: Boolean(t.isLottie),
              price: typeof t.price === "number" ? t.price : undefined,
              hasPhoto: Boolean(t.hasPhoto),
              photoShape: t.photoShape as Template["photoShape"],
              samplePhotoUrl: t.samplePhotoUrl ? String(t.samplePhotoUrl) : undefined,
              createdAt: toMillis(t.createdAt),
              updatedAt: toMillis(t.updatedAt),
              createdBy: t.createdBy ? String(t.createdBy) : undefined,
            } as Template;
          }
        );

        setTemplates(list);
        setCategories(Array.isArray(cJson.categories) ? cJson.categories : []);
      } catch (e: unknown) {
        if ((e as { name?: string })?.name === "AbortError") return;
        setErr(e instanceof Error ? e.message : "Load error");
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // ensure selected subcategory belongs to selected category
  useEffect(() => {
    if (!filterId) return setFilterSubId("");
    const cat = categories.find((c) => c.id === filterId);
    if (!cat?.subcategories?.some((s) => s.id === filterSubId)) setFilterSubId("");
  }, [filterId, categories, filterSubId]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return templates
      .filter((t) => (filterId ? t.categoryId === filterId : true))
      .filter((t) => (filterSubId ? t.subcategoryId === filterSubId : true))
      .filter((t) => (ql ? (t.title || "").toLowerCase().includes(ql) : true))
      .sort((a, b) => (Number(b.updatedAt) || 0) - (Number(a.updatedAt) || 0));
  }, [templates, filterId, filterSubId, q]);

  async function callWithToast(path: string, okTitle: string, okDesc?: string, method = "POST") {
    try {
      const res = await fetch(path, { method, credentials: "include" });
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.error || `Request failed: ${res.status}`;
        show({ title: "Error", description: msg, variant: "error" });
        return false;
      }
      show({ title: okTitle, description: okDesc, variant: "success" });
      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error";
      show({ title: "Error", description: msg, variant: "error" });
      return false;
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete template?")) return;
    const ok = await callWithToast(`/api/admin/templates/${id}`, "Deleted", "Template removed.", "DELETE");
    if (ok) setTemplates((prev) => prev.filter((t) => t.id !== id));
  }

  // open SPA editor in admin mode for an existing template
  function openEditor(id: string) {
    const w = window.open(
      `https://editor.loopyzee.com/?mode=admin&redirect=/template/${id}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (!w) show({ title: "Popup blocked", description: "Please allow pop-ups for loopyzee.com" });
  }

  if (loading) return <p>Loading templates…</p>;
  if (err) return <p className="text-danger">Error: {err}</p>;

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title…"
          className="select"
        />
        <select value={filterId} onChange={(e) => setFilterId(e.target.value)} className="select">
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <select
          value={filterSubId}
          onChange={(e) => setFilterSubId(e.target.value)}
          className="select"
          disabled={!filterId}
        >
          <option value="">All Subcategories</option>
          {categories
            .find((c) => c.id === filterId)
            ?.subcategories?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
        </select>
        {/* "Open Editor (blank)" was intentionally removed */}
      </div>

      {filtered.length === 0 ? (
        <p>No templates found. Try changing filters.</p>
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {filtered.map((t) => {
            const cat = categories.find((c) => c.id === t.categoryId);
            const sub = cat?.subcategories?.find((s) => s.id === t.subcategoryId)?.title;
            const categoryTitle = sub ? `${cat?.title} > ${sub}` : cat?.title ?? "Uncategorized";
            return (
              <TemplateCard
                key={t.id}
                template={t} // теперь это полный Template
                categoryTitle={categoryTitle}
                onEdit={() => openEditor(t.id)}
                onDelete={() => handleDelete(t.id)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}