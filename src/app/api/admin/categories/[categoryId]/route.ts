// src/app/api/admin/categories/[categoryId]/route.ts
// Admin API route: Deletes a top-level category by its ID.

import { NextResponse } from "next/server";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { adminDb } from "@/lib/firebaseAdmin";
import { getParams } from "@/lib/next-params";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(_req: Request, ctx: unknown) {
  const { categoryId } = await getParams<{ categoryId: string }>(ctx);

  const user = await verifyAppSession();
  if (!user || user.isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await adminDb.collection("categories").doc(categoryId).delete();
    // 204 No Content — без тела
    return NextResponse.json(null, { status: 204 });
  } catch (err) {
    console.error("Failed to delete category:", err);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
