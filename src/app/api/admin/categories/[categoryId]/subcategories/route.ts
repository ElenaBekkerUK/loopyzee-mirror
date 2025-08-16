// src/app/api/admin/categories/[categoryId]/subcategories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest, context: unknown) {
  const { params } = context as { params: { categoryId: string } };
  const { categoryId } = params;

  const user = await verifyAppSession();
  if (!user || user.isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title } = await req.json();
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Missing or invalid subcategory title" }, { status: 400 });
    }

    const ref = adminDb.collection("categories").doc(categoryId);
    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const rawData = doc.data();
    const subcategories = Array.isArray(rawData?.subcategories)
      ? rawData.subcategories
      : [];

    const id = crypto.randomUUID();
    await ref.update({
      subcategories: [...subcategories, { id, title }],
    });

    return NextResponse.json({ id, title }, { status: 201 });
  } catch (err) {
    console.error("Failed to add subcategory:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
