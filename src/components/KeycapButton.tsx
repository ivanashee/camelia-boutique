"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Botón flotante flat — círculo thyme con chevron que rebota suave.
 */
export default function KeycapButton() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(10);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      }`}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-thyme flex items-center justify-center hover:scale-105 active:scale-90 transition-transform duration-200">
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FBEAD6"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 4 16 L 12 8 L 20 16" />
        </motion.svg>
      </div>
    </button>
  );
}
