// src/styles/theme-dark.css.ts
import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root.dark", {
  vars: {
    "--bg": "26 26 26",
    "--surface": "15 17 23",
    "--text": "243 244 246",
    "--muted": "156 163 175",
    "--accent": "168 85 247",
    "--accentHover": "147 51 234",
    "--accentLight": "59 7 100",
    "--border": "55 65 81",
    "--danger": "248 113 113",
  },
});
