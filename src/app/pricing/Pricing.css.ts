import { style } from "@vanilla-extract/css";

export const pricingWrap = style({
  background: "linear-gradient(120deg, #f4e3ea 0%, #e3e7ff 100%)",
  borderRadius: 28,
  padding: 40,
  maxWidth: 960,
  margin: "40px auto",
  boxShadow: "0 8px 32px #c5baff22",
  display: "flex",
  flexDirection: "column",
  gap: 32,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: 24,
      margin: "20px auto",
      borderRadius: 18,
    }
  }
});

export const pricingTitle = style({
  fontSize: 34,
  fontWeight: 700,
  fontFamily: "Caveat, serif",
  color: "#3c3954",
  marginBottom: 12,
});

export const optionCard = style({
  background: "#fff",
  borderRadius: 20,
  border: "2px solid #ececf9",
  padding: "18px 24px",
  cursor: "pointer",
  transition: "all .2s",
  display: "flex",
  alignItems: "center",
  gap: 12,
  fontSize: 18,
  fontWeight: 500,
  selectors: {
    "&:hover": {
      border: "2px solid #b9d6fa",
      boxShadow: "0 6px 20px #e5e9ff88"
    }
  }
});

export const optionSelected = style({
  border: "2.5px solid #7267d9",
  background: "#f9f8ff",
});

export const continueButton = style({
  marginTop: 32,
  padding: "16px 32px",
  borderRadius: 14,
  background: "linear-gradient(90deg, #b9d6fa 0%, #d6b4fc 100%)",
  fontSize: 18,
  fontWeight: 700,
  color: "#3c3954",
  border: "none",
  boxShadow: "0 4px 12px #c3b6e822",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: "linear-gradient(90deg, #d6b4fc 0%, #b9d6fa 100%)",
      boxShadow: "0 6px 16px #b7cafc44",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed"
    }
  }
});
