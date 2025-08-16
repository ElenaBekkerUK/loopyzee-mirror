// src/components/HowItWorksSection.css.ts
import { style } from "@vanilla-extract/css";

export const section = style({
  position: "relative",
  padding: "64px 0 38px 0",
  width: "100%",
  background: "none",
  '@media': {
    "(max-width: 600px)": { padding: "36px 0 16px 0" },
  },
});

export const title = style({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 700,
  fontSize: "2rem",
  margin: "0 0 38px 30px",
  color: "#2a2633",
  '@media': {
    "(max-width: 600px)": { fontSize: "1.38rem", margin: "0 0 22px 16px" },
  },
});

export const stepsWrap = style({
  display: "flex",
  gap: 36,
  overflowX: "auto",
  padding: "0 18px 8px 18px",
  scrollSnapType: "x mandatory",
  WebkitOverflowScrolling: "touch",
  '@media': {
    "(max-width: 750px)": {
      gap: 16,
      padding: "0 3vw 6px 3vw",
    },
    "(max-width: 600px)": {
      gap: 12,
      padding: "0 2vw 4px 2vw",
    },
  },
});

export const tilt = style({
  flex: "0 0 292px",
  '@media': { "(max-width: 600px)": { flex: "0 0 88vw" } }
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "linear-gradient(120deg,rgba(255,255,255,0.46) 44%,rgba(255,255,255,0.17) 100%)",
  borderRadius: 32,
  boxShadow: "0 6px 32px #a0e7e522, 0 0 1.5px #fff8",
  backdropFilter: "blur(18px) saturate(1.14)",
  border: "1.5px solid rgba(255,255,255,0.27)",
  scrollSnapAlign: "start",
  position: "relative",
  zIndex: 2,
  padding: "28px 22px 24px 22px", // Было 32px сверху — стало 28px
  minHeight: 340,                // Было 320 — стало выше
  transition: "box-shadow 0.18s, transform 0.18s",
  ":hover": {
    boxShadow: "0 20px 62px #dabfff55, 0 0 42px 0 #dabfff66",
    transform: "scale(1.04) translateY(-6px)",
  },
  ":focus": {
    boxShadow: "0 20px 62px #dabfff55, 0 0 42px 0 #dabfff66",
    transform: "scale(1.04) translateY(-6px)",
  },
  '@media': {
    "(max-width: 800px)": {
      padding: "18px 12px 14px 12px",
      minHeight: 260,
      borderRadius: 24,
    },
    "(max-width: 600px)": {
      padding: "13px 4px 10px 4px",
      minHeight: 180,
      borderRadius: 18,
    },
  }
});

export const img = style({
  width: 170,
  height: 170,
  objectFit: "contain",
  marginBottom: 28,
  marginTop: 12,
  display: "block",
  transition: "filter 0.18s, transform 0.18s",
  '@media': {
    "(max-width: 800px)": {
      width: 124,
      height: 124,
      marginBottom: 18,
      marginTop: 6,
    },
    "(max-width: 600px)": {
      width: 96,
      height: 96,
      marginBottom: 10,
      marginTop: 3,
    },
  },
});

export const stepTitle = style({
  fontWeight: 700,
  fontSize: "1.13rem",
  color: "#212132",
  textAlign: "center",
  margin: "0 0 12px 0",
  fontFamily: '"Playfair Display", serif',
  '@media': {
    "(max-width: 600px)": { fontSize: "1.02rem", margin: "0 0 7px 0" },
  },
});

export const stepText = style({
  fontSize: "1.01rem",
  color: "#57577b",
  textAlign: "center",
  fontWeight: 400,
  lineHeight: 1.38,
  fontFamily: "inherit",
  '@media': {
    "(max-width: 600px)": { fontSize: "0.97rem" },
  },
});
