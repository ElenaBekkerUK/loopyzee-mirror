// src/lib/server/templates.ts
import { firestore } from "@/lib/firebaseAdmin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import slugify from "@/lib/slugify";
import {
  templateSchema,
  persistedTemplateSchema,
  type TemplateInput,
} from "@/features/templates/schema";
import type { Field, AnimationLayer, PhotoLayer } from "@/types/editor";

/** ---------- helpers ---------- */
type CategoryDoc = {
  title?: string;
  subcategories?: Array<{ id: string; title?: string }>;
};

function isTimestampLike(val: unknown): val is { toMillis: () => number } {
  return (
    typeof val === "object" &&
    val !== null &&
    "toMillis" in val &&
    typeof (val as { toMillis: unknown }).toMillis === "function"
  );
}

function normalizeTs(v: unknown): number | Date {
  if (v instanceof Timestamp) return v.toMillis();
  if (isTimestampLike(v)) return v.toMillis();
  if (v instanceof Date) return v;
  if (typeof v === "number") return v;
  throw new Error("Invalid Firestore timestamp value");
}

function baseFromTitle(s?: string) {
  const t = (s ?? "").trim();
  return t.length ? t : "template";
}

async function ensureUniqueSlug(baseTitle: string, selfId?: string): Promise<string> {
  const base = slugify(baseFromTitle(baseTitle));
  let slug = base;
  for (let i = 0; i < 25; i++) {
    const snap = await firestore.collection("templates").where("slug", "==", slug).get();
    const conflict = snap.docs.find((d) => d.id !== selfId);
    if (!conflict) return slug;
    slug = `${base}-${i + 1}`;
  }
  return `${base}-${Math.random().toString(36).slice(2, 8)}`;
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

/** ---------- design JSON typings for SSR (legacy support) ---------- */
export type SSRDesignJSON = {
  canvas: { width: number; height: number; version: number };
  background: { url: string | null; animationUrl?: string | null };
  layers: {
    fields: Field[];
    animations: AnimationLayer[];
    photo?: PhotoLayer;
  };
};

/** ---------- reads ---------- */
export async function getTemplateById(id: string) {
  const snap = await firestore.collection("templates").doc(id).get();
  if (!snap.exists) return null;

  const data = snap.data()!;
  const parsed = persistedTemplateSchema.parse({
    ...data,
    createdAt: normalizeTs(data.createdAt),
    updatedAt: normalizeTs(data.updatedAt),
  });

  return parsed;
}

/** ---------- create new template ---------- */
export async function createTemplate(metaInput: unknown, userId: string) {
  const input = templateSchema.parse(metaInput);
  await assertSubcategoryBelongs(input.categoryId, input.subcategoryId);

  const id = crypto.randomUUID();
  const slug = await ensureUniqueSlug(input.slug || input.title, id);

  const payload = {
    ...input,
    id,
    slug,
    status: "published" as const,
    isLottie: false,
    updatedAt: FieldValue.serverTimestamp(),
    createdAt: FieldValue.serverTimestamp(),
    createdBy: userId,
  };

  await firestore.collection("templates").doc(id).set(payload, { merge: true });
  return { id, slug };
}

/** ---------- update metadata ---------- */
export async function updateTemplateMetadata(id: string, patchInput: unknown) {
  const patch = templateSchema.partial().parse(patchInput);
  await assertSubcategoryBelongs(patch.categoryId, patch.subcategoryId);

  let nextSlug: string | undefined;
  if (patch.title || patch.slug) {
    const base = (patch.slug || patch.title)!;
    nextSlug = await ensureUniqueSlug(base, id);
  }

  const update = {
    ...patch,
    ...(nextSlug ? { slug: nextSlug } : {}),
    updatedAt: FieldValue.serverTimestamp(),
  };

  await firestore.collection("templates").doc(id).set(update, { merge: true });
  return { id, slug: nextSlug };
}

/** ---------- publish ---------- */
export async function publishTemplateById(id: string, metaInput?: unknown) {
  let baseMeta: TemplateInput;
  if (metaInput) {
    baseMeta = templateSchema.parse(metaInput);
  } else {
    const snap = await firestore.collection("templates").doc(id).get();
    if (!snap.exists) throw new Error("Template not found");
    baseMeta = templateSchema.parse(snap.data() ?? {});
  }

  const slug = await ensureUniqueSlug(baseMeta.slug || baseMeta.title, id);

  await firestore.collection("templates").doc(id).set(
    {
      ...baseMeta,
      id,
      slug,
      status: "published" as const,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  return { id, slug };
}

/** ---------- set status: published | archived ---------- */
export async function setTemplateStatus(
  id: string,
  status: "published" | "archived"
) {
  const ref = firestore.collection("templates").doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw new Error("Template not found");

  await ref.set(
    { status, updatedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );

  return { id, status };
}