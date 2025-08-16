// src/components/Hero.tsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import * as s from "./Hero.css";
import Particles from "react-tsparticles";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className={s.hero}>
      {/* Blurred glow spots */}
      <span className={s.spot1}></span>
      <span className={s.spot2}></span>
      <span className={s.spot3}></span>

      {/* Confetti particles */}
      <Particles
        id="tsparticles-hero"
        options={{
          particles: {
            number: { value: 18 },
            color: { value: ["#ffc600", "#ff99c8", "#b6ccfc", "#a0e7e5", "#232325"] },
            shape: { type: ["circle", "square"] },
            opacity: { value: 0.65 },
            size: { value: 16 },
            move: { enable: true, speed: 0.7, direction: "top", outModes: "out" },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0.1, 0.2, 1] }}
        className={s.content}
      >
        <h1 className={s.title}>What are you celebrating today?</h1>
        <div className={s.subtitle}>
          Create beautiful invitations for any event — in minutes.
        </div>
        <div className={s.description}>
          Design, customize &amp; send. The easiest way to wow your guests — right from your phone.
        </div>

        <motion.button
          className={s.button}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        >
          Start Designing
        </motion.button>

        <p className={s.microtext}>Customize & share instantly</p>

        <div className={s.previewRow}>
          {[1, 2, 3, 4].map((n) => (
            <Image
              key={n}
              src={`/templates/template_hero${n}.jpg`}
              alt={`Template ${n}`}
              width={156}
              height={234}
              className={s.previewImage}
              priority={n === 1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
