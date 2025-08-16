import { style } from "@vanilla-extract/css";

export const footer = style({
  background: "#F3F0EB",    // bg-ui
  color: "#2E2E2E",         // text-text
  padding: "40px 24px",     // py-10 px-6
});

export const container = style({
  maxWidth: 1280,           // max-w-7xl
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "0.95rem",      // text-sm
  "@media": {
    "(min-width: 768px)": {
      flexDirection: "row",
    },
  },
});

export const copyright = style({
  marginBottom: 16,         // mb-4
  fontFamily: "Playfair Display, serif", // font-serif
  "@media": {
    "(min-width: 768px)": {
      marginBottom: 0,      // md:mb-0
    },
  },
});

export const links = style({
  display: "flex",
  gap: 16,                  // space-x-4
});

export const link = style({
  color: "#444444",         // text-accent
  textDecoration: "none",
  transition: "text-decoration 0.2s",
  ":hover": {
    textDecoration: "underline",
  },
});
