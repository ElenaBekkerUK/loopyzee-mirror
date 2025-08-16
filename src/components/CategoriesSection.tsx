import { useRef } from "react";
import Image from "next/image";
import * as s from "./CategoriesSection.css";
import Particles from "react-tsparticles";

const categories = [
  {
    title: "Baby Shower",
    description: "Sweet & playful designs",
    image: "/category-images/baby-shower.png",
  },
  {
    title: "Birthday",
    description: "Fun & festive templates",
    image: "/category-images/birthday.png",
  },
  {
    title: "Wedding",
    description: "Elegant & romantic styles",
    image: "/category-images/wedding.png",
  },
  {
    title: "Kids Party",
    description: "Bright, fun & modern",
    image: "/category-images/kids-party.png",
  },
  {
    title: "Holiday",
    description: "Seasonal, cozy, joyful",
    image: "/category-images/holiday.png",
  },
  {
    title: "Graduation",
    description: "Milestone moments",
    image: "/category-images/graduation.png",
  },
  {
    title: "Baptism",
    description: "Spiritual & gentle",
    image: "/category-images/baptism.png",
  },
];

export default function CategoriesSection() {
  // === Новый useRef для скролла ===
  const scrollRef = useRef<HTMLDivElement>(null);

  // === Функция для прокрутки вправо ===
  function handleScrollRight() {
    if (scrollRef.current) {
      // ширина одной карточки + gap
      scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  }

  return (
    <section className={s.section}>
      {/* Particles (фон, очень лёгкий) */}
      <Particles
        options={{
          particles: {
            number: { value: 8 },
            color: { value: ["#ffc600", "#ff99c8", "#b6ccfc", "#a0e7e5", "#d0c8e5"] },
            shape: { type: ["circle"] },
            opacity: { value: 0.12 },
            size: { value: 40 },
            move: { enable: true, speed: 0.15, direction: "right", outModes: "out" },
          },
        }}
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 0, pointerEvents: "none",
        }}
      />

      <h2
        style={{
          fontFamily: "Playfair Display, serif",
          fontWeight: 700,
          fontSize: "2rem",
          margin: "0 0 28px 30px",
          color: "#2a2633",
        }}
      >
        Browse by Category
      </h2>

      {/* === ref передаём в scrollWrap === */}
      <div className={s.scrollWrap} ref={scrollRef}>
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            className={s.card}
            style={{
              background: s.pastelBackgrounds[i % s.pastelBackgrounds.length],
            }}
            tabIndex={0}
            aria-label={cat.title}
          >
            {/* Shine-эффект */}
            <span className={s.shine} />
            {/* Картинка приглашения/иконка */}
            <div className={s.imgWrap}>
              <Image
                src={cat.image}
                alt={cat.title}
                width={160}
                height={160}
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 32px #a6b9ee40)",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                draggable={false}
                priority
              />
            </div>
            <div className={s.title}>{cat.title}</div>
            <div className={s.desc}>{cat.description}</div>
          </div>
        ))}
      </div>
      {/* Скролл-индикатор (теперь настоящая кнопка) */}
      <div
        style={{
          margin: "0 auto",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#edeff7bb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 28,
          color: "#bac2e3",
          marginTop: 10,
          boxShadow: "0 2px 10px #dde4ff22",
          cursor: "pointer", // делаем кликабельной
          userSelect: "none",
        }}
        onClick={handleScrollRight}
        title="Scroll right"
        tabIndex={0}
        role="button"
        aria-label="Scroll categories right"
      >
        ⇆
      </div>
    </section>
  );
}
