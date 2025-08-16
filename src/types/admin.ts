// loopyzee/src/types/admin.ts

// Единый список статусов в админке
export type TemplateStatus = "published" | "archived";

// Базовый тип шаблона для админки (соответствует persistedTemplateSchema/TemplatePublishInput)
export type Template = {
  id: string;
  slug: string;
  status: TemplateStatus;

  title: string;
  description: string;

  categoryId: string;
  subcategoryId?: string;

  // Витрина/визуалы
  thumbnailUrl: string;
  backgroundUrl?: string; 
  previewImages: string[];

  // Опции
  isLottie: boolean;
  price?: number;

  // Фото-маска
  hasPhoto: boolean;
  photoShape?: "circle" | "rect" | "arch";
  samplePhotoUrl?: string;

  // Служебные — в админке храним как миллисекунды (number),
  // чтобы без конфликтов сортировать и прокидывать в компоненты
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
};

// Категория/подкатегория (то, что приходит из Firestore)
export type Category = {
  id: string;
  title: string;
  thumbnail?: string;
  subcategories?: { id: string; title: string }[];
};

// Конфиг меню витрины
export type MenuCategoryConfig = {
  categoryId: string;
  visible: boolean;
  order: number;
  subcategories?: {
    subcategoryId: string;
    visible: boolean;
    order: number;
  }[];
};

export type MenuConfig = {
  categories: MenuCategoryConfig[];
};