// src/features/templates/schema.ts
import { z } from "zod";

/** Enums (только для фото-маски; размеры/ориентация убраны — по умолчанию 5×7 vertical) */
export const photoShapeEnum = z.enum(["circle", "rect", "arch"]);

/** Helper: если hasPhoto=true → требуем shape и sample */
const requirePhotoFields = (d: {
  hasPhoto?: boolean;
  photoShape?: string | null;
  samplePhotoUrl?: string | null;
}) => !d.hasPhoto || (!!d.photoShape && !!d.samplePhotoUrl);

/** Общие поля (sizes/orientation удалены) */
const baseFields = {
  id: z.string().optional(),
  slug: z.string().optional(),
  price: z.coerce.number().nonnegative().optional(),

  hasPhoto: z.boolean().default(false),
  photoShape: photoShapeEnum.optional(),
  samplePhotoUrl: z.string().url().optional(),

  // Оставляем на будущее: SSR/SPA может вычислять isLottie из designJSON
  isLottie: z.boolean().default(false),
} as const;

/**
 * ЕДИНАЯ схема метаданных шаблона.
 * Мы больше не поддерживаем draft/unlisted, только published|archived.
 */
export const templateSchema = z
  .object({
    ...baseFields,
    title: z.string().min(1, "Заголовок обязателен").trim(),
    description: z.string().min(1, "Описание обязательно"),
    categoryId: z.string().min(1, "Нужна категория"),
    subcategoryId: z.string().optional(),
    thumbnailUrl: z.string().url("Нужен главный превью-URL"),
    previewImages: z
      .array(z.string().url())
      .min(1, "Нужно хотя бы одно превью-изображение"),
    status: z.enum(["published", "archived"]).default("published"),
  })
  .refine(requirePhotoFields, {
    message:
      "photoShape и samplePhotoUrl обязательны, если включено пользовательское фото (hasPhoto=true)",
  });

export type TemplateInput = z.infer<typeof templateSchema>;

/**
 * Что хранится в Firestore (витрина читает строго по этой схеме)
 */
export const persistedTemplateSchema = templateSchema
  .extend({
    id: z.string(),
    slug: z.string(),
    createdAt: z.union([z.number(), z.date()]),
    updatedAt: z.union([z.number(), z.date()]),
    createdBy: z.string(),
  })
  .strict();

export type PersistedTemplate = z.infer<typeof persistedTemplateSchema>;

/* ----------------------------------------------------------------
   ✅ ШИМ-ЭКСПОРТЫ ДЛЯ ОБРАТНОЙ СОВМЕСТИМОСТИ
   Старые импорты в коде (TemplateForm, actions, api routes и т.п.)
   ждут templateDraftSchema / templatePublishSchema и соответствующие типы.
   Делаем алиасы на единую templateSchema, чтобы ничего больше не править.
------------------------------------------------------------------*/
export const templateDraftSchema = templateSchema;
export const templatePublishSchema = templateSchema;
export type TemplateDraftInput = TemplateInput;
export type TemplatePublishInput = TemplateInput;