// src/modules/admin/AdminDashboard.css.ts
import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrap = style({
  padding: "2.375rem 0 4.375rem", // 38px 0 70px
  maxWidth: "80rem",              // 1280px
  margin: "0 auto",
});

export const header = style({
  fontSize: "2rem",               // ближе к вашим типо-токенам
  lineHeight: 1.1,
  fontWeight: 800,
  marginBottom: "1.75rem",        // 28px
  fontFamily: vars.font.display,  // вместо "Playfair Display"
  color: vars.color.accentHover,  // вместо #7b2ff2
  selectors: {
    // в дарке — слегка приглушаем в сторону основного accent
    ":root.dark &": { color: vars.color.accent },
  },
});

export const sections = style({
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
  gap: "2.75rem",                 // 44px
  '@media': {
    "screen and (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      gap: "1.5rem",              // 24px
    },
  },
});
