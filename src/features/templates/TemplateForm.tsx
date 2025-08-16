// loopyzee/src/features/templates/TemplateForm.tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { templateSchema, type TemplateInput } from "./schema";
import { saveDraft, publishTemplate } from "@/app/admin/templates/actions";

import { storage } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dropzone } from "@/components/ui/dropzone";

type Props = {
  initial?: Partial<TemplateInput> & { id?: string };
};

export function TemplateForm({ initial }: Props) {
  const router = useRouter();

  const form = useForm<TemplateInput>({
    // Черновик валидируем «мягко» (partial), но сам резолвер можно оставить полным,
    // а в onSaveDraft делать .partial().safeParse.
    resolver: zodResolver(templateSchema) as unknown as Resolver<TemplateInput>,
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      subcategoryId: "",
      isLottie: false,
      hasPhoto: false,
      thumbnailUrl: "",
      previewImages: [],
      price: undefined,
      ...initial,
    },
    mode: "onChange",
  });

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const tempIdRef = useRef<string | undefined>(initial?.id);

  const hasPhoto = !!form.watch("hasPhoto");
  const previewsStr = (form.watch("previewImages") ?? []).join(", ");

  async function ensureTemplateId(): Promise<string> {
    if (tempIdRef.current) return tempIdRef.current;
    const values = form.getValues();
    const parsed = templateSchema.partial().safeParse(values);
    const safe = parsed.success ? parsed.data : ({} as Partial<TemplateInput>);
    const res = await saveDraft(safe, undefined);
    tempIdRef.current = res.id;
    return res.id;
  }

  async function uploadFileAndGetURL(file: File, path: string) {
    const sref = storageRef(storage, path);
    const snap = await uploadBytes(sref, file);
    return await getDownloadURL(snap.ref);
  }

  async function handleUploadThumbnail(file: File) {
    setUploading(true);
    try {
      const id = await ensureTemplateId();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `templates/${id}/thumbnail.${ext}`;
      const url = await uploadFileAndGetURL(file, path);
      form.setValue("thumbnailUrl", url, { shouldValidate: true, shouldDirty: true });
    } finally {
      setUploading(false);
    }
  }

  async function handleUploadPreviews(files: FileList) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const id = await ensureTemplateId();
      const existing = form.getValues("previewImages") ?? [];
      const uploads = Array.from(files).map(async (file, idx) => {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `templates/${id}/previews/${existing.length + idx}.${ext}`;
        return await uploadFileAndGetURL(file, path);
      });
      const urls = await Promise.all(uploads);
      form.setValue("previewImages", [...existing, ...urls], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleUploadSample(file: File) {
    setUploading(true);
    try {
      const id = await ensureTemplateId();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `templates/${id}/sample.${ext}`;
      const url = await getDownloadURL((await uploadBytes(storageRef(storage, path), file)).ref);
      form.setValue("samplePhotoUrl", url, { shouldValidate: true, shouldDirty: true });
    } finally {
      setUploading(false);
    }
  }

  async function onSaveDraft() {
    setError(null);
    const parsed = templateSchema.partial().safeParse(form.getValues());
    if (!parsed.success) {
      parsed.error.issues.forEach((i) =>
        form.setError(i.path[0] as keyof TemplateInput, { message: i.message })
      );
      return;
    }
    startTransition(async () => {
      try {
        await saveDraft(parsed.data, tempIdRef.current);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Draft save failed");
      }
    });
  }

  async function onPublish() {
    setError(null);
    const parsed = templateSchema.safeParse(form.getValues() as TemplateInput);
    if (!parsed.success) {
      parsed.error.issues.forEach((i) =>
        form.setError(i.path[0] as keyof TemplateInput, { message: i.message })
      );
      return;
    }
    startTransition(async () => {
      try {
        const res = await publishTemplate(parsed.data, tempIdRef.current);
        router.push(`/admin/templates/${res.id}`);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Publish failed");
      }
    });
  }

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Basics */}
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-sm font-medium text-muted">Basics</h2>
          <label className="block text-sm text-text">Title</label>
          <Input {...form.register("title")} placeholder="Elegant Wedding Invitation" />
          {form.formState.errors.title && (
            <p className="text-danger text-sm">{form.formState.errors.title.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Category & Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-medium text-muted">Category</h2>
            <Input {...form.register("categoryId")} />
            {form.formState.errors.categoryId && (
              <p className="text-danger text-sm">{form.formState.errors.categoryId.message}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-medium text-muted">Subcategory</h2>
            <Input {...form.register("subcategoryId")} />
          </CardContent>
        </Card>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-medium text-muted">Options</h2>
            <Switch
              checked={!!form.watch("isLottie")}
              onCheckedChange={(v) => form.setValue("isLottie", Boolean(v))}
              label="Animated (Lottie)"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <Switch
              checked={!!form.watch("hasPhoto")}
              onCheckedChange={(v) => {
                const val = Boolean(v);
                form.setValue("hasPhoto", val, { shouldValidate: true, shouldDirty: true });
                if (!val) {
                  form.setValue("photoShape", undefined, { shouldValidate: true, shouldDirty: true });
                  form.setValue("samplePhotoUrl", undefined, { shouldValidate: true, shouldDirty: true });
                }
              }}
              label="User Photo"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <label className="block text-sm text-text">Price (optional)</label>
            <Input
              type="number"
              step="0.01"
              {...form.register("price", { valueAsNumber: true })}
              placeholder="19.99"
            />
          </CardContent>
        </Card>
      </div>

      {/* Photo Options */}
      {hasPhoto && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-sm font-medium text-muted">Photo Shape</h2>
              <Select {...form.register("photoShape")}>
                <option value="">-- select --</option>
                <option value="circle">Circle</option>
                <option value="rect">Rectangle</option>
                <option value="arch">Arch</option>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-sm font-medium text-muted">Sample Photo</h2>
              <Dropzone
                accept={{ "image/*": [] }}
                maxFiles={1}
                onFiles={(files) => {
                  const f = files?.[0];
                  if (f) handleUploadSample(f).catch(() => {});
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Media Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-medium text-muted">Thumbnail</h2>
            <Dropzone
              accept={{ "image/*": [] }}
              maxFiles={1}
              onFiles={(files) => {
                const f = files?.[0];
                if (f) handleUploadThumbnail(f).catch(() => {});
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm font-medium text-muted">Preview Images</h2>
            <Dropzone
              accept={{ "image/*": [] }}
              onFiles={(files) => {
                // адаптируем массив файлов под FileList
                const fl = {
                  length: files.length,
                  item: (i: number) => files[i] ?? null,
                  [Symbol.iterator]: function* () {
                    for (const f of files) yield f;
                  },
                } as unknown as FileList;
                if (fl.length) handleUploadPreviews(fl).catch(() => {});
              }}
            />
            <Input
              className="mt-2"
              placeholder="...or paste comma separated URLs"
              defaultValue={previewsStr}
              onChange={(e) =>
                form.setValue(
                  "previewImages",
                  e.currentTarget.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                  { shouldValidate: true, shouldDirty: true }
                )
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-sm font-medium text-muted">Description</h2>
          <Textarea rows={4} {...form.register("description")} />
        </CardContent>
      </Card>

      {/* Status */}
      {error && <p className="text-danger">{error}</p>}
      {uploading && <p className="text-sm text-muted">Uploading…</p>}

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="button" onClick={onSaveDraft} disabled={pending || uploading}>
          {pending ? "Saving…" : "Save draft"}
        </Button>
        <Button type="button" variant="primary" onClick={onPublish} disabled={pending || uploading}>
          {pending ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </form>
  );
}

export default TemplateForm;