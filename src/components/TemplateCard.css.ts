// src/components/TemplateCard.css.ts
import { style } from "@vanilla-extract/css";

export const card = style({
  cursor: "pointer",
  background: "#FDFBF9",
  borderRadius: 24,
  boxShadow: "0 4px 20px #0001",
  transition: "box-shadow 0.2s, transform .15s ease",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(0,0,0,.04)",
  selectors: {
    "&:hover": { boxShadow: "0 12px 32px #0002", transform: "translateY(-1px)" },
    "&:active": { transform: "translateY(0)" },
  },
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  // зафиксируй нужный аспект: 4/5 (постер). Для квадрата — "1 / 1".
  aspectRatio: "4 / 5",
  background: "#F6F4FF",
});

export const image = style({
  objectFit: "contain", // важно: не режем изображение
});

export const fallback = style({
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  color: "#6b7280",
  fontSize: "0.875rem",
});

export const content = style({
  padding: 16,
});

export const title = style({
  fontSize: "1.125rem",
  fontFamily: "Playfair Display, serif",
  fontWeight: 600,
  color: "#2E2E2E",
  marginBottom: 4,
  lineHeight: 1.2,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

export const subtitle = style({
  fontSize: "0.95rem",
  color: "#444444",
});