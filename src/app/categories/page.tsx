// loopyzee/src/app/categories/page.tsx
// Public-facing page: Fetches and displays all top-level categories with thumbnails

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import * as s from "./categories.css";

type Category = {
  id: string;
  title: string;
  thumbnail?: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const snap = await getDocs(collection(db, "categories"));
      const results: Category[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Category, "id">),
      }));
      setCategories(results);
      setLoading(false);
    }

    fetchCategories();
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.heading}>Choose a category</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={s.grid}>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.id}`} className={s.card}>
              {cat.thumbnail && (
                <Image
                  src={cat.thumbnail}
                  alt={cat.title}
                  width={60}
                  height={60}
                  className={s.thumb}
                />
              )}
              <span className={s.title}>{cat.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
