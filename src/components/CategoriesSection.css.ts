// src/components/CategoriesSection.css.ts
import { style, keyframes } from "@vanilla-extract/css";

// Пастельные фоны по индексу
export const pastelBackgrounds = [
  "#F5E8E5", "#F9F7F4", "#D8E7F6", "#F9E6B7", "#BEEBE9", "#FFF1C9", "#D0C8E5"
];

// Контейнер секции
export const section = style({
  position: "relative",
  padding: "56px 0 32px 0",
  overflowX: "auto",
});

// Горизонтальный скролл-контейнер
export const scrollWrap = style({
  display: "flex",
  gap: 32,
  padding: "0 24px 16px 24px",
  overflowX: "auto",
  scrollbarWidth: "thin",
  scrollSnapType: "x mandatory",
  WebkitOverflowScrolling: "touch",
  '@media': { "(max-width: 650px)": { gap: 16, padding: "0 8px 12px 8px" } }
});

// Одна карточка категории
export const card = style({
  flex: "0 0 220px",
  aspectRatio: "4/5",
  borderRadius: 32,
  background: pastelBackgrounds[0], // Будет переопределяться через inline-style
  boxShadow: "0 4px 32px #a0e7e522",
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  transition: "transform 0.18s cubic-bezier(.22,.68,.32,1.16), box-shadow 0.16s",
  scrollSnapAlign: "start",
  ":hover": {
    transform: "scale(1.04) rotateZ(-3deg)",
    boxShadow: "0 12px 44px #b6ccfc33, 0 0 32px 0 #b6ccfc44",
  },
});



// Shine-эффект
const shineAnim = keyframes({
  "0%": { left: "-65%" },
  "100%": { left: "120%" }
});
export const shine = style({
  content: "",
  pointerEvents: "none",
  position: "absolute",
  top: "-35%",
  left: "-65%",
  width: "80%",
  height: "170%",
  background: "linear-gradient(110deg, rgba(255,255,255,0.0) 66%, rgba(255,255,255,0.5) 87%, rgba(255,255,255,0.0) 100%)",
  filter: "blur(8px)",
  zIndex: 2,
  opacity: 0,
  transition: "opacity 0.16s",
  selectors: {
    [`${card}:hover &`]: {
      opacity: 1,
      animation: `${shineAnim} 1.1s linear`,
    }
  }
});

// Картинка/приглашение
export const imgWrap = style({
  width: "100%",
  height: "68%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "22px 14px 10px 14px",
});

// Название категории
export const title = style({
  fontFamily: '"Playfair Display", serif',
  fontSize: "1.14rem",
  color: "#353353",
  fontWeight: 600,
  textAlign: "center",
  margin: "0 0 4px 0"
});

// Описание/сабтайтл
export const desc = style({
  fontSize: "0.98rem",
  color: "#8585a6",
  textAlign: "center",
  fontWeight: 400,
  marginBottom: 8,
});
