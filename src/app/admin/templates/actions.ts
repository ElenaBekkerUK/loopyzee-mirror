// src/app/admin/templates/actions.ts
"use server";

import { nanoid } from "nanoid";
import {
  templateSchema,
  type TemplateInput,
} from "@/features/templates/schema";
import { firestore } from "@/lib/firebaseAdmin";
import { verifyAppSession } from "@/lib/verifyAppSession";
import slugify from "@/lib/slugify";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

/** --- helpers/types --- */
type CategoryDoc = {
  title?: string;
  subcategories?: Array<{ id: string; title?: string }>;
};

function baseFromTitle(s?: string) {
  const t = (s ?? "").trim();
  return t.length ? t : "template";
}

async function ensureUniqueSlug(baseTitle: string, id?: string): Promise<string> {
  const base = slugify(baseFromTitle(baseTitle));
  let slug = base;
  for (let i = 0; i < 25; i++) {
    const snap = await firestore.collection("templates").where("slug", "==", slug).get();
    const conflict = snap.docs.find((d) => d.id !== id);
    if (!conflict) return slug;
    slug = `${base}-${i + 1}`;
  }
  return `${base}-${nanoid(6)}`;
}

async function assertSubcategoryBelongs(categoryId?: string, subcategoryId?: string) {
  if (!categoryId) return;
  const catDocRef = firestore.collection("categories").doc(categoryId);
  const catSnap = await catDocRef.get();
  if (!catSnap.exists) throw new Error("Category not found");

  const catData = catSnap.data() as CategoryDoc | undefined;
  if (subcategoryId && catData?.subcategories?.length) {
    const ok = catData.subcategories.some((s) => s.id === subcategoryId);
    if (!ok) throw new Error("Subcategory does not belong to category");
  }
}

/**
 * ВНИМАНИЕ: драфтов как статуса больше нет.
 * Оставляем функцию saveDraft для обратной совместимости с формой,
 * но она фактически делает upsert опубликованного шаблона (status: "published").
 */
export async function saveDraft(input: unknown, existingId?: string) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) throw new Error("Forbidden");

  // позволяем частичный ввод, чтобы форма могла сохранять поэтапно
  const partial = templateSchema.partial().parse(input);
  await assertSubcategoryBelongs(partial.categoryId, partial.subcategoryId);

  const id = existingId ?? nanoid();
  const title = (partial.title ?? `Untitled ${id.slice(0, 4)}`).trim();
  const slug = await ensureUniqueSlug(partial.slug || title, existingId);

  const payload: Record<string, unknown> = {
    ...partial,
    id,
    slug,
    status: "published",
    updatedAt: FieldValue.serverTimestamp(),
    ...(existingId ? {} : { createdAt: FieldValue.serverTimestamp(), createdBy: user.uid }),
  };

  await firestore.collection("templates").doc(id).set(payload, { merge: true });

  revalidatePath("/admin/templates");
  revalidatePath(`/admin/templates/${id}`);
  return { id, slug };
}

/**
 * Публикация (жёсткая валидация обязательных полей)
 * Тоже пишет напрямую в templates/{id} c status: "published".
 */
export async function publishTemplate(input: unknown, existingId?: string) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) throw new Error("Forbidden");

  const data = templateSchema.parse(input as TemplateInput);
  await assertSubcategoryBelongs(data.categoryId, data.subcategoryId);

  const id = existingId ?? nanoid();
  const slug = await ensureUniqueSlug(data.slug || data.title, existingId);

  const payload: Record<string, unknown> = {
    ...data,
    id,
    slug,
    status: "published",
    updatedAt: FieldValue.serverTimestamp(),
    ...(existingId ? {} : { createdAt: FieldValue.serverTimestamp(), createdBy: user.uid }),
  };

  await firestore.collection("templates").doc(id).set(payload, { merge: true });

  revalidatePath("/admin/templates");
  revalidatePath(`/admin/templates/${id}`);
  return { id, slug };
}