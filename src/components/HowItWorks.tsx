// src/components/HowItWorksSection.tsx
import { useRef } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import * as s from "./HowItWorks.css";

// Статичные PNG из public (или import если в assets)
const steps = [
  {
    title: "Choose Template",
    text: "Pick a design that fits your occasion.",
    img: "/howitworks/howitworks-choose.png",
  },
  {
    title: "Customize & Personalize",
    text: "Edit text, colors & add your details.",
    img: "/howitworks/howitworks-customize.png",
  },
  {
    title: "Send & Track",
    text: "Share instantly. Track responses in real time.",
    img: "/howitworks/howitworks-send.png",
  },
];

export default function HowItWorksSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className={s.section}>
      <h2 className={s.title}>How It Works</h2>
      <div className={s.stepsWrap} ref={scrollRef}>
        {steps.map((step, i) => (
          <Tilt
            key={step.title}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.05}
            transitionSpeed={650}
            glareEnable={false}
            className={s.tilt}
          >
            <motion.div
              className={s.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.13,
                duration: 0.65,
                ease: [0.3, 0.65, 0.48, 1],
              }}
              viewport={{ once: true }}
              whileHover="hover"
              whileFocus="hover"
            >
              <motion.img
                src={step.img}
                alt={step.title}
                className={s.img}
                variants={{
                  hover: {
                    scale: 1.11,
                    filter: "drop-shadow(0 10px 46px #dabfffbb) brightness(1.12)",
                  },
                  initial: {
                    scale: 1,
                    filter: "drop-shadow(0 4px 20px #c0adf522)",
                  },
                }}
                initial="initial"
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                draggable={false}
              />
              <div className={s.stepTitle}>{step.title}</div>
              <div className={s.stepText}>{step.text}</div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
