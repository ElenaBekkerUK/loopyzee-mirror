// loopyzee/src/app/api/admin/menu/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyAppSession } from "@/lib/verifyAppSession";

export async function GET() {
  const session = await verifyAppSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const snap = await adminDb.doc("menuConfig/main").get();
  return NextResponse.json(snap.exists ? snap.data() : { categories: [] });
}

export async function POST(req: Request) {
  const session = await verifyAppSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const body = await req.json();
  await adminDb.doc("menuConfig/main").set(body);
  return NextResponse.json({ ok: true });
}
