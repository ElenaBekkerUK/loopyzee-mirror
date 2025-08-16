// loopyzee/src/styles/theme.css.ts
import { createVar, globalStyle } from "@vanilla-extract/css";

export const vars = {
  color: {
    bg: createVar(),
    surface: createVar(), // ← добавили surface
    text: createVar(),
    muted: createVar(),
    accent: createVar(),
    accentHover: createVar(),
    accentLight: createVar(),
    border: createVar(),
    danger: createVar(),
  },
  radius: { sm: createVar(), md: createVar(), lg: createVar(), full: createVar() },
  shadow: { sm: createVar(), md: createVar(), lg: createVar() },
  font: { sans: createVar(), display: createVar() },
} as const;

globalStyle(":root", {
  vars: {
    [vars.color.bg]: "var(--bg)",
    [vars.color.surface]: "var(--surface)", // ← маппинг на CSS-переменную
    [vars.color.text]: "var(--text)",
    [vars.color.muted]: "var(--muted)",
    [vars.color.accent]: "var(--accent)",
    [vars.color.accentHover]: "var(--accentHover)",
    [vars.color.accentLight]: "var(--accentLight)",
    [vars.color.border]: "var(--border)",
    [vars.color.danger]: "var(--danger)",
    [vars.radius.sm]: "var(--radius-sm)",
    [vars.radius.md]: "var(--radius-md)",
    [vars.radius.lg]: "var(--radius-lg)",
    [vars.radius.full]: "var(--radius-full)",
    [vars.shadow.sm]: "var(--shadow-sm)",
    [vars.shadow.md]: "var(--shadow-md)",
    [vars.shadow.lg]: "var(--shadow-lg)",
    [vars.font.sans]: "var(--font-sans)",
    [vars.font.display]: "var(--font-display)",
  },
});
