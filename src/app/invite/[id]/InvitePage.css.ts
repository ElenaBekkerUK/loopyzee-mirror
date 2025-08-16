// src/app/invite/[id]/InvitePage.css.ts
import { style } from "@vanilla-extract/css";

export const inviteBg = style({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #c2e9fb 0%, #fbc2eb 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3vw 0",
});

export const card = style({
  maxWidth: 420,
  width: "100%",
  margin: "0 auto",
  background: "rgba(255,255,255,0.84)",
  borderRadius: 28,
  boxShadow: "0 8px 36px 0 #b0b6ff2c",
  padding: "2.6rem 1.7rem 1.6rem 1.7rem",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const title = style({
  fontSize: "1.68rem",
  fontWeight: 800,
  letterSpacing: "-1.5px",
  fontFamily: "Playfair Display, serif",
  color: "#283176",
  marginBottom: "0.2em",
  textShadow: "0 1px 18px #fbc2eb33",
});

export const imageBox = style({
  width: "100%",
  height: "190px",
  borderRadius: 22,
  margin: "0 auto 1.2em",
  overflow: "hidden",
  position: "relative",
  boxShadow: "0 3px 18px #dad3fd33",
});

export const statsRow = style({
  display: "flex",
  justifyContent: "center",
  gap: 24,
  fontSize: "1.1rem",
  fontWeight: 500,
  color: "#5f6396",
  marginBottom: 12,
  letterSpacing: "0.02em",
});

export const input = style({
  border: "1.5px solid #d8d9fc",
  background: "#f8f8ff",
  padding: "0.92rem 1.3rem",
  borderRadius: 17,
  fontSize: "1.08rem",
  fontWeight: 500,
  boxShadow: "0 1px 12px #c6e6fa14",
  outline: "none",
  transition: "border-color 0.16s",
  marginBottom: 6,
});

export const inputFocus = style({
  border: "1.5px solid #a7c7fc",
  background: "#fff",
});

export const btnRow = style({
  display: "flex",
  gap: 12,
  justifyContent: "center",
  marginBottom: 4,
});

export const rsvpBtn = style({
  flex: 1,
  padding: "0.9em 0.5em",
  fontSize: "1.08rem",
  fontWeight: 700,
  borderRadius: 14,
  border: "none",
  boxShadow: "0 1px 8px #e6e6fa22",
  background: "linear-gradient(95deg,#f1f4ff 0%,#e3d9fd 100%)",
  color: "#393088",
  cursor: "pointer",
  outline: "none",
  transition: "box-shadow 0.15s, background 0.2s, color 0.16s",
});

export const rsvpYes = style({
  background: "linear-gradient(95deg,#d4fbe7 0%,#b7f7cc 90%)",
  color: "#22724b",
  ":hover": {
    background: "linear-gradient(95deg,#b0f6d3 0%,#89e9b8 90%)",
    color: "#134b2e",
  },
});
export const rsvpNo = style({
  background: "linear-gradient(95deg,#ffe2e2 0%,#ffb9b9 90%)",
  color: "#b12632",
  ":hover": {
    background: "linear-gradient(95deg,#ffd2d2 0%,#ff9797 90%)",
    color: "#931a26",
  },
});
export const rsvpMaybe = style({
  background: "linear-gradient(95deg,#f9f7d4 0%,#faf4b9 90%)",
  color: "#978025",
  ":hover": {
    background: "linear-gradient(95deg,#f5edb0 0%,#ede48c 90%)",
    color: "#7a681b",
  },
});
export const rsvpBtnHover = style({
  boxShadow: "0 2px 18px #e6e6fa55",
});

export const thanks = style({
  fontSize: "1.16rem",
  color: "#257249",
  fontWeight: 600,
  padding: "1.1em 0 0.7em 0",
  textShadow: "0 1px 10px #bff4e833",
});

export const small = style({
  fontSize: "0.97rem",
  color: "#928bc9",
  marginTop: "1.2em",
  letterSpacing: "0.01em",
});
