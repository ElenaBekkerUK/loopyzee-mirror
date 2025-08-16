import { style } from "@vanilla-extract/css";

export const main = style({
  padding: "40px 0",
  maxWidth: 820,
  margin: "0 auto",
});

export const heading = style({
  fontSize: "2.1rem",
  fontWeight: 700,
  fontFamily: "Montserrat, sans-serif",
  color: "#232234",
  letterSpacing: "-0.01em",
  marginBottom: 28,
  lineHeight: 1.2,
});

export const loading = style({
  color: "#7267d9",
  fontSize: 18,
  textAlign: "center",
  padding: "32px 0",
});

export const backBtn = style({
  display: "inline-block",
  marginBottom: 20,
  color: "#7267d9",
  fontSize: 16,
  fontWeight: 500,
  textDecoration: "none",
  transition: "opacity 0.2s ease",
  ":hover": {
    opacity: 0.75,
    textDecoration: "underline",
  },
});
