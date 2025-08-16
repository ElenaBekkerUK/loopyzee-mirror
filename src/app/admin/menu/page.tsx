// src/app/admin/menu/page.tsx
"use client";

import Link from "next/link";
import MenuEditor from "@/modules/admin/MenuEditor";

export default function AdminMenuPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="btn">
            ← Back to Admin
          </Link>
          <h1 className="text-2xl font-bold text-text">Menu Editor</h1>
        </div>
      </header>

      <MenuEditor />
    </main>
  );
}
