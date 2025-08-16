// src/components/DraftPreview.tsx

"use client";

import { useEffect, useState } from "react";
import { Stage, Layer, Text as KonvaText, Image as KonvaImage } from "react-konva";
import { CANVAS_W, CANVAS_H } from "../constants/editor";
import type { Field } from "../types/editor";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
  draftId: string;
};

export default function DraftPreview({ draftId }: Props) {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(true);

  // Загрузка данных из Firestore
  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const ref = doc(db, "drafts", draftId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setBackgroundUrl(data.backgroundUrl);
          setFields(data.fields || []);
        } else {
          console.warn("Draft not found:", draftId);
        }
      } catch (err) {
        console.error("Failed to load draft", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, [draftId]);

  // Загрузка изображения
  useEffect(() => {
    if (!backgroundUrl) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = backgroundUrl;
    img.onload = () => setBgImage(img);
  }, [backgroundUrl]);

  if (loading) {
    return <p className="text-center mt-6 text-gray-500">Загрузка превью…</p>;
  }

  return (
    <div style={{ width: CANVAS_W, height: CANVAS_H, margin: "0 auto" }}>
      <Stage width={CANVAS_W} height={CANVAS_H}>
        <Layer>
          {bgImage && (
            <KonvaImage
              image={bgImage}
              width={CANVAS_W}
              height={CANVAS_H}
              listening={false}
            />
          )}
          {fields.map((f) => (
            <KonvaText
              key={f.id}
              text={f.text}
              x={f.x}
              y={f.y}
              fontSize={f.size}
              fontFamily={f.font}
              fontStyle={`${f.style} ${f.weight}`}
              fill={f.color}
              align={f.align}
              lineHeight={f.lineHeight || 1}
              letterSpacing={f.letterSpacing || 0}
              listening={false}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
