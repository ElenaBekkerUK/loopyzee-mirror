// loopyzee/src/modules/admin/MenuEditor.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { MenuCategoryConfig, Category } from "@/types/admin";
import {
  fetchCategories,
  fetchMenuConfig,
  saveMenuConfig,
} from "@/lib/admin/menuApi";
import { SortableItem } from "@/components/admin/SortableItem";
import * as styles from "./MenuEditor.css";

type SubcategoryConfig = {
  subcategoryId: string;
  visible: boolean;
  order: number;
};

export default function MenuEditor() {
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 60_000,
  });

  const {
    data: menuConfig,
    isLoading,
    isError,
  } = useQuery<{ categories: MenuCategoryConfig[] }>({
    queryKey: ["menu-config"],
    queryFn: fetchMenuConfig,
    staleTime: 60_000,
  });

  const saveMutation = useMutation({
    mutationFn: saveMenuConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-config"] });
      alert("✅ Menu config saved");
    },
    onError: () => alert("❌ Failed to save config"),
  });

  // без any: у useMutation есть isPending / isLoading
const saving = saveMutation.isPending;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // небольшой delay, чтобы клики по чекбоксам не запускали DnD
      activationConstraint: { delay: 120, tolerance: 4 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [draft, setDraft] = useState<MenuCategoryConfig[]>([]);

  useEffect(() => {
    if (menuConfig?.categories) {
      setDraft(menuConfig.categories);
    }
  }, [menuConfig]);

  if (isLoading) return <p>Loading menu config...</p>;
  if (isError) return <p className="text-danger">Failed to load menu config</p>;

  if (!menuConfig || menuConfig.categories.length === 0) {
    return (
      <div className={styles.container}>
        <Link href="/admin/templates" className={styles.backBtn}>
          ← Back to Templates
        </Link>
        <h1 className={styles.heading}>🧭 Menu Editor</h1>
        <p className="mb-4 text-muted">Menu config not found. Would you like to create one?</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const initial: MenuCategoryConfig[] = categories.map((cat, i) => ({
              categoryId: cat.id,
              visible: true,
              order: i,
              subcategories:
                cat.subcategories?.map((s, j) => ({
                  subcategoryId: s.id,
                  visible: true,
                  order: j,
                })) || [],
            }));
            saveMutation.mutate({ categories: initial });
          }}
        >
          ➕ Create Default Menu
        </button>
      </div>
    );
  }

  const handleReorder = (oldIndex: number, newIndex: number) => {
    setDraft((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const handleSubReorder = (catId: string, oldIndex: number, newIndex: number) => {
    setDraft((prev) =>
      prev.map((c) =>
        c.categoryId === catId && c.subcategories
          ? { ...c, subcategories: arrayMove(c.subcategories, oldIndex, newIndex) }
          : c
      )
    );
  };

  const handleToggle = (id: string) => {
    setDraft((prev) =>
      prev.map((c) => (c.categoryId === id ? { ...c, visible: !c.visible } : c))
    );
  };

  const handleSubToggle = (catId: string, subId: string) => {
    setDraft((prev) =>
      prev.map((c) =>
        c.categoryId === catId && c.subcategories
          ? {
              ...c,
              subcategories: c.subcategories.map((s: SubcategoryConfig) =>
                s.subcategoryId === subId ? { ...s, visible: !s.visible } : s
              ),
            }
          : c
      )
    );
  };

  return (
    <div className={styles.container}>
      <Link href="/admin/templates" className={styles.backBtn}>
        ← Back to Templates
      </Link>
      <h1 className={styles.heading}>🧭 Menu Editor</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }: DragEndEvent) => {
          if (!over || active.id === over.id) return;

          const isSub = String(active.id).includes("::");
          if (isSub) {
            const [catId, subId] = String(active.id).split("::");
            const cat = draft.find((c) => c.categoryId === catId);
            if (!cat?.subcategories) return;

            const overSubId = String(over.id).split("::")[1];
            const oldIndex = cat.subcategories.findIndex(
              (s: SubcategoryConfig) => s.subcategoryId === subId
            );
            const newIndex = cat.subcategories.findIndex(
              (s: SubcategoryConfig) => s.subcategoryId === overSubId
            );
            if (oldIndex !== -1 && newIndex !== -1) {
              handleSubReorder(catId, oldIndex, newIndex);
            }
          } else {
            const oldIndex = draft.findIndex((c) => c.categoryId === active.id);
            const newIndex = draft.findIndex((c) => c.categoryId === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
              handleReorder(oldIndex, newIndex);
            }
          }
        }}
      >
        <SortableContext
          items={draft.map((c) => c.categoryId)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-4">
            {draft.map((item) => {
              const cat = categories.find((c) => c.id === item.categoryId);
              const catLabel = cat?.title || item.categoryId;

              return (
                <SortableItem key={item.categoryId} id={item.categoryId} label={catLabel}>
                  <li className={styles.categoryCard}>
                    <div className={styles.categoryHeader}>
                      <span className="font-semibold">{catLabel}</span>
                      <label className="text-sm">
                        <input
                          type="checkbox"
                          checked={item.visible}
                          onChange={() => handleToggle(item.categoryId)}
                        />
                        <span className="ml-1">Visible</span>
                      </label>
                    </div>

                    {item.subcategories?.length ? (
                      <SortableContext
                        items={item.subcategories.map(
                          (s: SubcategoryConfig) => `${item.categoryId}::${s.subcategoryId}`
                        )}
                        strategy={verticalListSortingStrategy}
                      >
                        <ul className={styles.subcategoryList}>
                          {item.subcategories.map((sub: SubcategoryConfig) => {
                            const sc = categories
                              .find((c) => c.id === item.categoryId)
                              ?.subcategories?.find((s) => s.id === sub.subcategoryId);
                            const subLabel = sc?.title || sub.subcategoryId;

                            return (
                              <SortableItem
                                key={sub.subcategoryId}
                                id={`${item.categoryId}::${sub.subcategoryId}`}
                                label={subLabel}
                              >
                                <li className={styles.subcategoryRow}>
                                  <span>{subLabel}</span>
                                  <label className={styles.subcategoryLabel}>
                                    <input
                                      type="checkbox"
                                      checked={sub.visible}
                                      onChange={() =>
                                        handleSubToggle(item.categoryId, sub.subcategoryId)
                                      }
                                    />
                                    <span>Visible</span>
                                  </label>
                                </li>
                              </SortableItem>
                            );
                          })}
                        </ul>
                      </SortableContext>
                    ) : null}
                  </li>
                </SortableItem>
              );
            })}
          </ul>
        </SortableContext>
      </DndContext>

      <button
        onClick={() => saveMutation.mutate({ categories: draft })}
        className="btn btn-primary mt-6"
        disabled={!!saving}
      >
        {saving ? "Saving…" : "Save Menu"}
      </button>
    </div>
  );
}
