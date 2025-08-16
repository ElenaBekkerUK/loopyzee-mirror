// src/styles/theme-light.css.ts
import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  vars: {
    // ВАЖНО: цвета в формате "R G B" (без запятых)
    "--bg": "253 250 255",
    "--surface": "255 255 255",
    "--text": "31 41 55",
    "--muted": "107 114 128",
    "--accent": "216 180 254",
    "--accentHover": "168 85 247",
    "--accentLight": "243 232 255",
    "--border": "229 231 235",
    "--danger": "239 68 68",

    "--font-sans":
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    "--font-display": "Recoleta, ui-serif, Georgia, serif",

    "--radius-sm": "6px",
    "--radius-md": "8px",
    "--radius-lg": "12px",
    "--radius-full": "9999px",

    "--shadow-sm": "0 1px 2px rgba(0,0,0,.05)",
    "--shadow-md": "0 4px 6px rgba(0,0,0,.1)",
    "--shadow-lg": "0 10px 15px rgba(0,0,0,.15)",
  },
});
