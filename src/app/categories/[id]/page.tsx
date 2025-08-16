// loopyzee/src/app/categories/[id]/page.tsx

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import * as styles from "./page.css";
import type { Template } from "@/types/admin";

type PageParams = { id: string };

export default async function CategoryTemplatesPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { id: categoryId } = await params;

  const q = query(collection(db, "templates"), where("categoryId", "==", categoryId));
  const snap = await getDocs(q);

  if (snap.empty) return notFound();

  const templates: Template[] = snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Template, "id">),
  }));

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Templates in category</h1>

      <div className={styles.grid}>
        {templates.map((t) => {
          const cover =
            t.thumbnailUrl || (t.previewImages?.length ? t.previewImages[0] : undefined);

          return (
            <div
              key={t.id}
              style={{
                border: `1px solid rgb(var(--border))`,
                borderRadius: "var(--radius-xl)",
                background: "rgb(var(--surface))",
                boxShadow: "var(--shadow-sm)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", paddingTop: "66%" }}>
                {cover ? (
                  <Image
                    src={cover}
                    alt={t.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: `rgb(var(--muted))`,
                      background: `rgb(var(--accentLight))`,
                      fontSize: 12,
                    }}
                  >
                    No image
                  </div>
                )}

                {t.isLottie && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: `rgb(var(--accent))`,
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      borderRadius: 8,
                      padding: "4px 8px",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    Lottie
                  </span>
                )}
              </div>

              <div style={{ padding: 12, display: "grid", gap: 6 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: `rgb(var(--text))`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={t.title}
                >
                  {t.title}
                </div>
                {typeof t.price === "number" && (
                  <div style={{ color: `rgb(var(--muted))` }}>${t.price.toFixed(2)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
