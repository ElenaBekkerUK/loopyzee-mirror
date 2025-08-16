// src/app/admin/templates/page.tsx
export const revalidate = 0;
export const dynamic = "force-dynamic";

import Link from "next/link";
import { TemplatesList } from "./templates-list";
import { Button } from "@/components/ui/button";

export default function AdminTemplatesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="default">← Back to Admin</Button>
          </Link>
          <h1 className="text-2xl font-bold text-text">Templates</h1>
        </div>
        <Link href="/admin/templates/new">
          <Button variant="primary">New template</Button>
        </Link>
      </header>
      <TemplatesList />
    </main>
  );
}
