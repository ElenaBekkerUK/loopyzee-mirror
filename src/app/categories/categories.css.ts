// loopyzee/src/app/categories/categories.css.ts
// Styling for the public category listing page

import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "24px",
  maxWidth: "768px",
  margin: "0 auto",
});

export const heading = style({
  fontSize: "28px",
  fontWeight: 700,
  marginBottom: "20px",
  textAlign: "center",
});

export const grid = style({
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "1fr",
  "@media": {
    "(min-width: 768px)": { gridTemplateColumns: "1fr 1fr" },
    "(min-width: 1024px)": { gridTemplateColumns: "1fr 1fr 1fr" },
  },
});

export const card = style({
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 2px 8px #0001",
  transition: "background 0.15s",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
  selectors: {
    "&:hover": {
      background: "#f9fafb",
    },
  },
});

export const thumb = style({
  width: "60px",
  height: "60px",
  borderRadius: "8px",
  objectFit: "cover",
  marginBottom: "8px",
});

export const title = style({
  fontSize: "17px",
  fontWeight: 500,
});
