import { style, keyframes } from "@vanilla-extract/css";

const trendingGradient = keyframes({
  "0%": { backgroundPosition: "0% 60%" },
  "50%": { backgroundPosition: "100% 40%" },
  "100%": { backgroundPosition: "0% 60%" },
});

export const trendingSection = style({
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(125deg, #ffe0ec 0%, #e4e9ff 55%, #ffe7b5 100%)",
  backgroundSize: "220% 220%",
  animation: `${trendingGradient} 16s ease-in-out infinite`,
  borderRadius: 32,
  minHeight: 340,
  margin: "44px 0 0 0",
  padding: "0 0 48px 0",
  '@media': { "(max-width: 600px)": { borderRadius: 16, minHeight: 180, padding: "0 0 28px 0" } }
});

export const trendingGlass = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(10px) saturate(1.07)",
  zIndex: 1,
  pointerEvents: "none",
});

export const trendingTitle = style({
  position: "relative",
  zIndex: 2,
  fontFamily: '"Playfair Display", serif',
  fontSize: "2rem",
  fontWeight: 700,
  color: "#2a2633",
  margin: "0 0 24px 32px",
  display: "flex",
  alignItems: "center",
  gap: 22,
  '@media': { "(max-width: 600px)": { fontSize: "1.22rem", margin: "0 0 16px 14px", gap: 9 } }
});

export const counter = style({
  fontSize: "1.05rem",
  color: "#ff7b54",
  background: "rgba(255,255,255,0.7)",
  borderRadius: 999,
  fontWeight: 600,
  padding: "6px 15px 5px 13px",
  marginLeft: 8,
  lineHeight: 1,
  boxShadow: "0 1px 8px #ffbfc722",
  '@media': { "(max-width: 600px)": { fontSize: "0.97rem", padding: "5px 8px 4px 8px" } }
});

export const trendingWrap = style({
  position: "relative",
  zIndex: 2,
  display: "flex",
  gap: 28,
  overflowX: "auto",
  padding: "0 18px",
  scrollSnapType: "x mandatory",
  WebkitOverflowScrolling: "touch",
  '@media': { "(max-width: 600px)": { gap: 12, padding: "0 6px" } }
});

export const inviteCard = style({
  flex: "0 0 218px",
  borderRadius: 26,
  background: "linear-gradient(109deg,#fff8 80%,#fffcfc33 100%)",
  boxShadow: "0 6px 32px #a0e7e533, 0 0 1.5px #fff8",
  overflow: "hidden",
  cursor: "pointer",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "transform 0.17s, box-shadow 0.17s",
  scrollSnapAlign: "start",
  ":hover": {
    boxShadow: "0 16px 40px #dabfff44, 0 0 38px 0 #fffd",
    transform: "scale(1.05) rotateZ(-2deg)",
  },
  '@media': { "(max-width: 600px)": { flex: "0 0 78vw", borderRadius: 14 } }
});

export const pickedNow = style({
  position: "absolute",
  top: 14,
  right: 16,
  background: "linear-gradient(90deg,#ffecb3,#ffb6b6)",
  color: "#a13f16",
  fontWeight: 700,
  fontSize: "0.99rem",
  borderRadius: 8,
  padding: "4px 12px",
  zIndex: 3,
  boxShadow: "0 2px 8px #ffc2b233",
  letterSpacing: "0.02em",
  userSelect: "none",
  '@media': { "(max-width: 600px)": { top: 7, right: 9, fontSize: "0.85rem", padding: "2px 7px" } }
});

export const inviteImg = style({
  width: "100%",
  height: 140,
  objectFit: "cover",
  '@media': { "(max-width: 600px)": { height: 84 } }
});

export const inviteInfo = style({
  padding: "10px 16px 18px 16px",
  textAlign: "center",
});

export const inviteLabel = style({
  fontSize: "1.02rem",
  fontWeight: 600,
  color: "#fd6e50",
  letterSpacing: "0.02em",
  marginBottom: 4,
  display: "block",
});

export const inviteTitle = style({
  fontSize: "1.12rem",
  fontWeight: 700,
  color: "#31313f",
});
