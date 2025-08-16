// src/app/api/admin/templates/[id]/publish/route.ts
import { NextResponse } from "next/server";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { publishTemplateById } from "@/lib/server/templates";
import { getParams } from "@/lib/next-params";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request, ctx: unknown) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Пытаемся прочитать тело; если пусто/невалидно — вернётся {}
  let body: unknown = {};
  try {
    body = await req.json();
  } catch {}

  try {
    const { id } = await getParams<{ id: string }>(ctx);
    const res = await publishTemplateById(id, body);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error("POST /api/admin/templates/[id]/publish error:", e);
    const msg = e instanceof Error ? e.message : "Publish failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}