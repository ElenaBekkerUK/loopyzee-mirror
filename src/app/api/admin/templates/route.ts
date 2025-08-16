// src/app/api/admin/templates/route.ts
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebaseAdmin";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const categoryId = (searchParams.get("categoryId") || "").trim();
  const subcategoryId = (searchParams.get("subcategoryId") || "").trim();

  try {
    // Берём ограниченный набор и фильтруем на сервере — для админки ок.
    const snap = await firestore.collection("templates")
      .orderBy("updatedAt", "desc")
      .limit(500)
      .get();

    const templates = snap.docs.map((d) => {
      const data = d.data() ?? {};
      const ts = data.updatedAt?.toMillis?.() ?? (typeof data.updatedAt === "number" ? data.updatedAt : null);
      return {
        id: d.id,
        title: data.title ?? "",
        status: data.status ?? "draft", // ⬅️ теперь включаем статус
        categoryId: data.categoryId ?? "",
        subcategoryId: data.subcategoryId ?? undefined,
        thumbnailUrl: data.thumbnailUrl ?? "",
        isLottie: !!data.isLottie,
        updatedAt: ts,
      };
    })
    .filter((t) => (categoryId ? t.categoryId === categoryId : true))
    .filter((t) => (subcategoryId ? t.subcategoryId === subcategoryId : true))
    .filter((t) => (q ? t.title.toLowerCase().includes(q) : true));

    return NextResponse.json({ templates });
  } catch (e) {
    console.error("GET /api/admin/templates error:", e);
    return NextResponse.json({ error: "Failed to load templates" }, { status: 500 });
  }
}

export async function POST() {
  const user = await verifyAppSession();
  if (!user?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const doc = firestore.collection("templates").doc();
    const payload = {
      id: doc.id,
      slug: `template-${doc.id.slice(0, 6)}`,
      status: "draft" as const,
      title: "",
      description: "",
      thumbnailUrl: "",
      previewImages: [] as string[],
      createdBy: user.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    await doc.set(payload, { merge: true });
    return NextResponse.json({ id: doc.id });
  } catch (e) {
    console.error("POST /api/admin/templates error:", e);
    return NextResponse.json({ error: "Failed to create draft" }, { status: 500 });
  }
}
