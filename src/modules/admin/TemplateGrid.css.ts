// loopyzee/src/modules/admin/TemplateGrid.css.ts
import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.98) translateY(24px)" },
  "100%": { opacity: 1, transform: "none" },
});

export const gridWrap = style({
  background: vars.color.accentLight,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.md,
  padding: "28px 24px",
  animation: `${fadeIn} .7s`,
});

export const gridHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
});

export const gridTitle = style({
  fontWeight: 800,
  fontSize: "1.21rem",
  color: vars.color.accentHover,
  fontFamily: vars.font.display,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 22,
});

export const addBtn = style({
  background: vars.color.accent,
  color: vars.color.text,
  border: "none",
  borderRadius: vars.radius.md,
  fontWeight: 700,
  fontSize: "1.07rem",
  padding: "9px 24px",
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: vars.shadow.sm,
  ":hover": { background: vars.color.accentHover, color: vars.color.bg },
});

export const empty = style({
  textAlign: "center",
  color: vars.color.muted,
  padding: "38px 0",
});

export const loading = style({
  textAlign: "center",
  color: vars.color.accentHover,
  fontSize: "1.12rem",
});
