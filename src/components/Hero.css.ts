// src/components/Hero.css.ts
import { style, keyframes } from "@vanilla-extract/css";

// === АНИМАЦИИ ===

const pulse = keyframes({
  "0%":   { boxShadow: "0 0 0 0 #8ec2f1aa, 0 0 0 0 #e7c6ff80" },
  "60%":  { boxShadow: "0 0 0 16px #b6ccfc33, 0 0 0 34px #ffd6e722" },
  "100%": { boxShadow: "0 0 0 0 #b6ccfc00, 0 0 0 0 #ffd6e700" },
});

const gradientMove = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});

// === HERO-БЛОК ===

export const hero = style({
  minHeight: "78vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "relative",
  padding: "52px 8px 34px 8px",
  overflow: "hidden",
  background: "linear-gradient(-45deg, #f8f6f1, #e9f3ff, #f8d5e5, #f9f0ff)",
  backgroundSize: "400% 400%",
  animation: `${gradientMove} 18s ease-in-out infinite`,
  isolation: "isolate",
  transition: "background-position 0.26s",
  "@media": {
    "(max-width: 600px)": { minHeight: "62vh", padding: "28px 3vw 28px 3vw" },
    "(max-width: 400px)": { padding: "12px 2vw 22px 2vw" },
  },
});

// === BLURRED SPOTS ===

export const spot1 = style({
  position: "absolute",
  top: 0,
  left: "38%",
  width: 330,
  height: 260,
  background: "radial-gradient(circle, #b6ccfc 0%, transparent 68%)",
  opacity: 0.32,
  filter: "blur(40px)",
  zIndex: 1,
  pointerEvents: "none",
  "@media": {
    "(max-width: 600px)": { width: 170, height: 90, left: "24%" },
  },
});

export const spot2 = style({
  position: "absolute",
  bottom: 0,
  right: "26%",
  width: 220,
  height: 120,
  background: "radial-gradient(circle, #ffd6e7 0%, transparent 80%)",
  opacity: 0.19,
  filter: "blur(36px)",
  zIndex: 1,
  pointerEvents: "none",
  "@media": {
    "(max-width: 600px)": { width: 80, height: 60, right: "8%" },
  },
});

export const spot3 = style({
  position: "absolute",
  bottom: "24%",
  left: "3%",
  width: 100,
  height: 64,
  background: "radial-gradient(circle, #ffe7b5 0%, transparent 86%)",
  opacity: 0.13,
  filter: "blur(44px)",
  zIndex: 1,
  pointerEvents: "none",
  "@media": {
    "(max-width: 600px)": { width: 42, height: 36, left: "2%" },
  },
});

// === КОНТЕНТ HERO ===

export const content = style({
  position: "relative",
  zIndex: 4,
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  paddingBottom: 26,
  paddingLeft: 0,
  paddingRight: 0,
  "@media": {
    "(max-width: 520px)": { paddingLeft: 6, paddingRight: 6 },
  },
});

export const title = style({
  fontFamily: '"Playfair Display", serif',
  fontSize: "2.15rem",
  fontWeight: 700,
  lineHeight: 1.08,
  color: "#232325",
  margin: "0 0 0.42em",
  "@media": {
    "(min-width: 600px)": { fontSize: "3.1rem" },
    "(min-width: 900px)": { fontSize: "3.7rem" },
    "(max-width: 400px)": { fontSize: "1.21rem" },
  },
});

export const subtitle = style({
  fontFamily: '"Playfair Display", serif',
  fontSize: "1.22rem",
  fontWeight: 500,
  color: "#474752",
  margin: "0 0 0.85em 0",
  lineHeight: 1.21,
  "@media": {
    "(min-width: 600px)": { fontSize: "1.64rem" },
    "(max-width: 400px)": { fontSize: "0.99rem" },
  },
});

export const description = style({
  fontSize: "1.05rem",
  color: "#474752",
  fontWeight: 400,
  marginBottom: 22,
  "@media": {
    "(min-width: 600px)": { fontSize: "1.18rem" },
    "(max-width: 400px)": { fontSize: "0.92rem" },
  },
});

export const button = style({
  fontSize: "1.17rem",
  background: "linear-gradient(90deg, #232738 40%, #587ac2 100%)",
  color: "#fff",
  padding: "1em 2.2em",
  borderRadius: 999,
  fontWeight: 700,
  border: "none",
  outline: "none",
  cursor: "pointer",
  margin: "26px 0 0 0",
  boxShadow:
    "0 7px 38px 3px #8ec2f1a7," +
    "0 0 38px 10px #7dbbfc3d," +
    "0 0 0 8px #ffd6e750",
  animation: `${pulse} 2.7s infinite`,
  transition: "background 0.16s, box-shadow 0.19s, transform 0.14s",
  ":hover": {
    background: "#364B78",
    boxShadow:
      "0 14px 58px 13px #b6ccfc55," +
      "0 0 40px 17px #f7def788," +
      "0 0 0 14px #ffd6e799",
    transform: "scale(1.04)",
  },
  "@media": {
    "(max-width: 400px)": { fontSize: "1rem", padding: "0.75em 1.15em" },
  },
});

export const microtext = style({
  marginTop: 12,
  fontSize: "0.92rem",
  color: "#474752",
  opacity: 0.9,
  "@media": {
    "(max-width: 400px)": { fontSize: "0.82rem" },
  },
});

export const previewRow = style({
  marginTop: 24,
  display: "flex",
  gap: 14,
  overflowX: "auto",
  paddingBottom: 8,
  justifyContent: "center",
  scrollSnapType: "x mandatory",
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
});

export const previewImage = style({
  width: 132,
  height: "auto",
  borderRadius: 16,
  objectFit: "cover",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  scrollSnapAlign: "center",
  flexShrink: 0,
  "@media": {
    "(max-width: 600px)": { width: 108 },
    "(min-width: 800px)": { width: 156 },
  },
});
