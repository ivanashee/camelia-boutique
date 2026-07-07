"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Palabra 'florecen' con animación continua:
 * - Un underline floral (svg path) que se dibuja y borra en loop
 * - Sutil pulse en el color rose → antique rose deeper → rose
 */
export default function HeroFlorece() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="italic text-rose relative inline-block"
      animate={
        reduce
          ? undefined
          : {
              color: ["#C87D87", "#a86870", "#C87D87"],
            }
      }
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      florecen
      {/* Underline sinuoso que se dibuja y desaparece */}
      <svg
        aria-hidden
        className="absolute left-0 right-0 -bottom-1 w-full pointer-events-none overflow-visible"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        style={{ height: "0.4em" }}
      >
        <motion.path
          d="M2 5 C 20 1, 40 8, 50 4 C 60 1, 80 8, 98 5"
          stroke="#C87D87"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? undefined
              : {
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.8, 0.8, 0],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.35, 0.75, 1],
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.span>
  );
}
