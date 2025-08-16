// loopyzee/src/app/api/admin/categories/route.ts
// Admin API route: Handles GET and POST requests for managing categories with optional subcategories and thumbnails.
// Adds unique IDs to subcategories for proper identification and deletion.

import { NextRequest, NextResponse } from "next/server";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { adminDb } from "@/lib/firebaseAdmin";
import { randomUUID } from "crypto";

// GET: Returns all categories with subcategories including IDs
export async function GET() {
  const user = await verifyAppSession();
  if (!user || user.isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await adminDb.collection("categories").get();
  const categories = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      thumbnail: data.thumbnail || null,
      subcategories: Array.isArray(data.subcategories)
        ? data.subcategories.map((s, i) => ({
            id: s.id ?? `sub-${i}`,
            title: s.title,
          }))
        : [],
    };
  });

  return NextResponse.json({ categories });
}

// POST: Creates a new category with optional subcategories and thumbnail
export async function POST(req: NextRequest) {
  const user = await verifyAppSession();
  if (!user || user.isAdmin !== true) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      subcategories,
      thumbnail,
    }: {
      title?: string;
      subcategories?: { title: string }[];
      thumbnail?: string;
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const subcategoryList = Array.isArray(subcategories)
      ? subcategories.map((s) => ({ id: randomUUID(), title: s.title }))
      : [];

    const docRef = await adminDb.collection("categories").add({
      title,
      thumbnail: thumbnail || null,
      subcategories: subcategoryList,
      createdAt: Date.now(),
    });

    return NextResponse.json({
      id: docRef.id,
      title,
      thumbnail: thumbnail || null,
      subcategories: subcategoryList,
    });
  } catch (err: unknown) {
    console.error("Failed to add category:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}