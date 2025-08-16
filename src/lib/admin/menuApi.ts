
//loopyzee/src/lib/admin/menuApi.ts
import type { MenuConfig } from "@/types/admin";

export async function fetchCategories() {
  const res = await fetch("/api/admin/categories", { credentials: "include" });
  const json = await res.json();
  return json.categories;
}

export async function fetchMenuConfig(): Promise<MenuConfig> {
  const res = await fetch("/api/admin/menu", { credentials: "include" });
  return res.json();
}

export async function saveMenuConfig(data: MenuConfig): Promise<MenuConfig> {
  const res = await fetch("/api/admin/menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
}
