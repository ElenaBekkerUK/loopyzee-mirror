import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "1.5rem",
  maxWidth: "48rem",
  margin: "0 auto",
});

export const heading = style({
  fontSize: "1.5rem",
  fontWeight: "700",
  marginBottom: "1rem",
});

export const backBtn = style({
  marginBottom: "1rem",
  display: "inline-block",
  color: "#6366f1", // indigo-500
  fontWeight: 500,
  textDecoration: "none",
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const categoryCard = style({
  border: "1px solid #e5e7eb", // gray-300
  borderRadius: "0.5rem",
  padding: "0.75rem",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
});

export const categoryHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const subcategoryList = style({
  marginTop: "0.5rem",
  marginLeft: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const subcategoryRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.25rem 0.75rem",
  borderRadius: "0.375rem",
  backgroundColor: "#f9fafb", // gray-50
  border: "1px solid #e5e7eb", // gray-300
  fontSize: "0.875rem",
});

export const subcategoryLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  color: "#6b7280", // gray-500
});
