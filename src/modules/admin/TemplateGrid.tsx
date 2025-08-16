// loopyzee/src/modules/admin/TemplateGrid.tsx
import * as s from "./TemplateGrid.css";
import Link from "next/link";
import type { Template, Category } from "@/types/admin";
import TemplateCard from "@/components/admin/TemplateCard";

// Узкий тип для Firestore Timestamp-подобных объектов
type TimestampLike = { toDate: () => Date };
function isTimestampLike(v: unknown): v is TimestampLike {
  return (
    !!v &&
    typeof v === "object" &&
    "toDate" in (v as Record<string, unknown>) &&
    typeof (v as TimestampLike).toDate === "function"
  );
}
function toMillis(v: unknown): number | undefined {
  if (!v) return undefined;
  if (isTimestampLike(v)) return v.toDate().getTime();
  if (v instanceof Date) return v.getTime();
  if (typeof v === "number") return v;
  return undefined;
}

type Props = {
  templates: Template[];
  categories: Category[];
  loading: boolean;
  onDelete?: (id: string) => void;
};

export function TemplateGrid({
  templates,
  categories,
  loading,
  onDelete,
}: Props) {
  if (loading) return <div className={s.loading}>Loading…</div>;

  return (
    <div className={s.gridWrap}>
      <div className={s.gridHeader}>
        <h2 className={s.gridTitle}>🎨 Templates</h2>
        <Link href="/admin/templates/new" className={s.addBtn}>
          New Template
        </Link>
      </div>

      <div className={s.grid}>
        {templates.length === 0 ? (
          <div className={s.empty}>No templates yet</div>
        ) : (
          templates.map((tpl) => {
            const cat = categories.find((c) => c.id === tpl.categoryId);
            const subTitle = tpl.subcategoryId
              ? cat?.subcategories?.find((s) => s.id === tpl.subcategoryId)?.title
              : undefined;

            const fullCategory = subTitle
              ? `${cat?.title ?? "Unknown"} > ${subTitle}`
              : cat?.title ?? "Uncategorized";

            const handleEdit = () => {
              window.location.href = `/admin/templates/${tpl.id}`;
            };
            const handleDelete = () => onDelete?.(tpl.id);

            // Нормализуем даты прямо в объекте, сохранив остальную структуру
            const normalized: Template = {
              ...tpl,
              updatedAt: toMillis(tpl.updatedAt),
              createdAt: toMillis(tpl.createdAt),
            };

            return (
              <TemplateCard
                key={tpl.id}
                template={normalized}
                categoryTitle={fullCategory}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })
        )}
      </div>
    </div>
  );
}