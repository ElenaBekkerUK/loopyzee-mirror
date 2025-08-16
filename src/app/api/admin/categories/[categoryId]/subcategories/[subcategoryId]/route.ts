// src/app/api/admin/categories/[categoryId]/subcategories/[subcategoryId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { adminDb } from "@/lib/firebaseAdmin";

export async function DELETE(req: NextRequest, context: unknown) {
  // безопасный каст вручную
  const { params } = context as { params: { categoryId: string; subcategoryId: string } };
  const { categoryId, subcategoryId } = params;

  if (!categoryId || !subcategoryId) {
    return NextResponse.json(
      { error: "Missing category or subcategory ID" },
      { status: 400 }
    );
  }

  const user = await verifyAppSession();
  if (!user || user.isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const ref = adminDb.collection("categories").doc(categoryId);
    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const rawData = doc.data();
    const subcategories = Array.isArray(rawData?.subcategories)
      ? rawData.subcategories
      : [];

    const updated = subcategories.filter((sub): sub is { id: string; title: string } =>
      sub?.id !== subcategoryId
    );
    await ref.update({ subcategories: updated });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(
      "Failed to delete subcategory:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
