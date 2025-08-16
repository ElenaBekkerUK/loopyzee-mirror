// src/constants/editor.ts

// Размеры канваса и блоков
export const CANVAS_W = 420;
export const CANVAS_H = 620;
export const BOX_WIDTH = 320;
export const BOX_PAD = 8;

// Палитра по умолчанию
export const pastelColors = [
  "#48435c",
  "#333333",
  "#6c6c81"
];

// Шрифты по умолчанию
export const fonts = [
  "Affection",
  "Willowshine",
  "Montserrat",
  "Caveat",
  "Playfair Display",
  "Cormorant Garamond"
];

// Получение размеров для обрезки по контейнеру
export function getCoverSize(
  imgWidth: number,
  imgHeight: number,
  containerWidth: number,
  containerHeight: number
) {
  const scale = Math.max(containerWidth / imgWidth, containerHeight / imgHeight);
  const width = imgWidth * scale;
  const height = imgHeight * scale;
  const x = (containerWidth - width) / 2;
  const y = (containerHeight - height) / 2;
  return { width, height, x, y };
}

// Конвертация жирности/курсива в fontStyle для Konva
export function getKonvaFontStyle(
  weight: "normal" | "bold",
  style: "normal" | "italic"
): "normal" | "bold" | "italic" | "bold italic" {
  if (weight === "bold" && style === "italic") return "bold italic";
  if (weight === "bold") return "bold";
  if (style === "italic") return "italic";
  return "normal";
}
