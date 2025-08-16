// src/app/api/admin/templates/[id]/archive/route.ts
import { NextResponse } from "next/server";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { setTemplateStatus } from "@/lib/server/templates";
import { getParams } from "@/lib/next-params";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: Request, ctx: unknown) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await getParams<{ id: string }>(ctx);
    const res = await setTemplateStatus(id, "archived");
    return NextResponse.json({ id: res.id, status: "archived" });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
