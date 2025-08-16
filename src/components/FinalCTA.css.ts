import { style } from "@vanilla-extract/css";

export const section = style({
  background: "#FDFBF9",    // bg-card
  color: "#2E2E2E",         // text-text
  padding: "80px 24px",     // py-20 px-6
});

export const container = style({
  maxWidth: 900,            // max-w-4xl
  margin: "0 auto",
  textAlign: "center",
});

export const heading = style({
  fontSize: "2rem",         // text-3xl
  fontWeight: 600,          // font-semibold
  fontFamily: "Playfair Display, serif", // font-serif
  marginBottom: 24,
  "@media": {
    "(min-width: 768px)": {
      fontSize: "2.5rem",   // md:text-4xl
    },
  },
});

export const subtext = style({
  color: "#444444",         // text-accent
  fontSize: "1rem",         // text-base
  marginBottom: 32,
});

export const button = style({
  display: "inline-block",
  background: "#F5A68F",
  color: "#fff",
  fontSize: "1rem",
  padding: "12px 24px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 500,
  transition: "background 0.2s",
  cursor: "pointer",
  ":hover": {
    background: "#f39377",
  },
});
