// src/app/admin/templates/new/page.tsx
export const revalidate = 0;
export const dynamic = "force-dynamic";

import NewTemplateClient from "./NewTemplateClient";

export default function NewTemplatePage() {
  return <NewTemplateClient />;
}
