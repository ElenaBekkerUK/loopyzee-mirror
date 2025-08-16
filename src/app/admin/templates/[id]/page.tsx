import { notFound } from "next/navigation";
import { getTemplateById } from "@/lib/server/templates";
import { TemplateForm } from "@/features/templates/TemplateForm";
import OpenInEditorButton from "@/components/admin/OpenInEditorButton";
import TemplateActions from "@/components/admin/TemplateActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageParams = { id: string };

export default async function TemplateItemPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { id } = await params;

  const tpl = await getTemplateById(id);
  if (!tpl) return notFound();

  const initial = {
    id: tpl.id,
    slug: tpl.slug,
    title: tpl.title,
    description: tpl.description,
    categoryId: tpl.categoryId,
    subcategoryId: tpl.subcategoryId,
    thumbnailUrl: tpl.thumbnailUrl,
    previewImages: tpl.previewImages ?? [],
    isLottie: !!tpl.isLottie,
    hasPhoto: !!tpl.hasPhoto,
    photoShape: tpl.photoShape,
    samplePhotoUrl: tpl.samplePhotoUrl,
    price: tpl.price,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-text">
          Edit Template Meta — {tpl.title || tpl.id}
        </h1>
        <div className="flex gap-2">
          <OpenInEditorButton templateId={tpl.id} variant="primary" />
          <TemplateActions id={tpl.id} />
        </div>
      </header>
      <TemplateForm initial={initial} />
    </div>
  );
}
