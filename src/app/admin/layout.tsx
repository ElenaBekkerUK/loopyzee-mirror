// loopyzee/src/app/admin/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { verifyAppSession } from "@/lib/verifyAppSession";
import { QueryProvider } from "@/components/QueryProvider";
import { ToastProvider } from "@/components/ui/toast";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Loopyzee Admin",
  description: "Manage templates, categories and menu",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await verifyAppSession();
  if (!user?.isAdmin) redirect("/auth/login");

  return (
    <QueryProvider>
      <ToastProvider>
        {/* Top bar */}
        <header className="w-full border-b border-border/60 bg-bg/60 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <h1 className="text-xl font-bold mr-2">Admin</h1>
            <nav className="flex items-center gap-2">
              <Link href="/admin/templates">
                <Button size="sm" variant="primary">📄 Templates</Button>
              </Link>
              <Link href="/admin/categories">
                <Button size="sm">📁 Categories</Button>
              </Link>
              <Link href="/admin/menu">
                <Button size="sm">🧭 Menu</Button>
              </Link>
            </nav>
            <div className="ml-auto">
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </ToastProvider>
    </QueryProvider>
  );
}
