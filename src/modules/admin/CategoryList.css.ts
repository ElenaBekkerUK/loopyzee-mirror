// loopyzee > src > modules > admin > CategoryList.css.ts
import { style, keyframes } from "@vanilla-extract/css";

const fade = keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

export const wrap = style({
  background: "linear-gradient(120deg,#ede7feee,#fff9 100%)",
  borderRadius: 28,
  boxShadow: "0 2px 28px #dabfff19",
  padding: "20px 20px 32px 20px",
  animation: `${fade} .6s`,
  minWidth: 0,
});

export const header = style({
  fontWeight: 700,
  fontSize: "1.13rem",
  color: "#7135b7",
  marginBottom: 13,
});

export const form = style({
  display: "flex",
  gap: 8,
  marginBottom: 18,
  alignItems: "center",
  flexWrap: "wrap",
});

export const input = style({
  padding: "7px 15px",
  fontSize: "1.01rem",
  borderRadius: 10,
  border: "1.5px solid #dabfff",
  flex: 1,
  background: "#fff",
});

export const uploadLabel = style({
  padding: "6px 12px",
  borderRadius: 10,
  background: "#e6baff22",
  border: "1.5px solid #dabfff",
  color: "#7b2ff2",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: ".97rem",
  ":hover": { background: "#f9e6b733" },
});

export const addBtn = style({
  background: "linear-gradient(90deg,#b6ccfc,#e6baff 100%)",
  color: "#7b2ff2",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: "1.01rem",
  padding: "7px 20px",
  cursor: "pointer",
  boxShadow: "0 2px 12px #dabfff22",
  ":hover": { background: "#e6baff", color: "#cb356b" },
});

export const thumbPreview = style({
  width: 32,
  height: 32,
  borderRadius: 10,
  objectFit: "cover",
  marginLeft: 4,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: 11,
});

export const catItem = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "8px 0",
  borderBottom: "1px solid #ede7fe",
  ":last-child": { borderBottom: "none" },
});

export const catRow = style({
  display: "flex",
  alignItems: "center",
  gap: 13,
});

export const catThumb = style({
  width: 42,
  height: 42,
  borderRadius: 18,
  background: "#f8f8fb",
});

export const catTitle = style({
  flex: 1,
  fontWeight: 500,
  fontSize: "1.01rem",
  color: "#7135b7",
});

export const delBtn = style({
  color: "#ff99c8",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: ".97rem",
  ":hover": { textDecoration: "underline", color: "#cb356b" },
});

export const subList = style({
  display: "flex",
  flexDirection: "column",
  paddingLeft: 12,
  gap: 6,
  marginTop: 6,
});

export const subItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#faf8ff",
  padding: "4px 10px",
  borderRadius: 8,
  fontSize: ".95rem",
  color: "#7135b7",
});

export const subFormWrap = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 10,
  paddingLeft: 12,
});

export const subInput = style({
  flex: 1,
  padding: "6px 10px",
  fontSize: ".95rem",
  borderRadius: 8,
  border: "1px solid #dabfff",
  background: "#fff",
});

export const subAddBtn = style({
  background: "#dabfff33",
  border: "1px solid #dabfff",
  borderRadius: 8,
  color: "#7135b7",
  padding: "4px 12px",
  fontWeight: 600,
  cursor: "pointer",
  ":hover": { background: "#e6baff" },
});
