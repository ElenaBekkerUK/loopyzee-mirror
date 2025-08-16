export type Field = {
  id: string;
  label: string;
  text: string;
  font: string;
  color: string;
  align: "left" | "center" | "right";
  weight: "normal" | "bold";
  style: "normal" | "italic";
  size: number;
  x: number;
  y: number;
  isEditable: boolean;
  lineHeight?: number;
  letterSpacing?: number;
};

/** Lottie-анимация */
export type LottieAnimationLayer = {
  id: string;
  type: "lottie";
  // Firestore
  lottieSrc?: string;                // URL в Storage
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  name?: string;

  // Runtime (не сохраняем в Firestore)
  lottieData?: Record<string, unknown>;

  // трансформации
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
};

export type AnimationLayer = LottieAnimationLayer;

// 🆕 Photo types
export type PhotoShape = "circle" | "rect" | "arch";

export type PhotoLayer = {
  hasPhoto: boolean;
  photoShape: PhotoShape;
  samplePhotoUrl?: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
};