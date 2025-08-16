// src/app/api/admin/templates/[id]/route.ts
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebaseAdmin";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { templatePublishSchema } from "@/features/templates/schema";
import { getParams } from "@/lib/next-params"; // 👈 новый хелпер

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: unknown) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await getParams<{ id: string }>(ctx);

  const snap = await firestore.collection("templates").doc(id).get();
  if (!snap.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ template: { id: snap.id, ...snap.data() } });
}

export async function PATCH(req: Request, ctx: unknown) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await getParams<{ id: string }>(ctx);
    const data = await req.json();
    const parsed = templatePublishSchema.partial().parse(data);

    await firestore.collection("templates").doc(id).set(
      {
        ...parsed,
        updatedAt: new Date(), // можно оставить, либо перейти на FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/admin/templates/[id] error:", e);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, ctx: unknown) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await getParams<{ id: string }>(ctx);
    await firestore.collection("templates").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/admin/templates/[id] error:", e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
