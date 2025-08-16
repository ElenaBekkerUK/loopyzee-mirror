import { style } from "@vanilla-extract/css";

export const header = style({
  background: "#FAF8F6",
  color: "#2E2E2E",
  padding: "16px 24px",
  borderBottom: "1px solid #F3F0EB",
  boxShadow: "0 1px 4px #0001",
});

export const container = style({
  maxWidth: 1100,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const logoLink = style({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  gap: 8,
});

export const logoImage = style({
  width: 48,
  height: 48,
  objectFit: "contain",
});

export const nav = style({
  display: "flex",
  gap: 24,
  fontSize: "1rem",
  fontWeight: 500,
  alignItems: "center",
});

export const navLink = style({
  color: "#444444",
  textDecoration: "none",
  transition: "text-decoration 0.15s",
  ":hover": {
    textDecoration: "underline",
  },
});

export const logoutButton = style([
  navLink,
  {
    color: "#e3342f",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    font: "inherit",
  },
]);
