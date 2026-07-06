"use client";

import { useEffect, useState } from "react";

/**
 * Botón flotante minimalista Art Nouveau.
 * - Círculo cream con borde rose fino
 * - Un solo brote de camelia (arriba)
 * - Chevron ^ centrado
 * - Nada más — limpio
 */
export default function KeycapButton() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setPressed(true);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(12);
    }
    setTimeout(() => setPressed(false), 220);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Volver arriba"
      className={`group fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      }`}
    >
      <div
        className={`relative transition-transform duration-200 ease-out ${
          pressed ? "scale-90" : "group-hover:scale-105"
        }`}
        style={{ filter: "drop-shadow(0 4px 10px rgba(58,47,42,0.18))" }}
      >
        <svg width="64" height="76" viewBox="0 0 64 76" className="md:w-[72px] md:h-[84px]">
          {/* Brote de camelia arriba (thyme + rose) */}
          <path
            d="M 32 4 C 30 8, 29 12, 30 16"
            stroke="#6B7556"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 32 4 C 34 8, 35 12, 34 16"
            stroke="#6B7556"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="32" cy="3" r="2.5" fill="#C87D87" />
          <circle cx="28" cy="6" r="1" fill="#F0C4CB" />
          <circle cx="36" cy="6" r="1" fill="#F0C4CB" />

          {/* Círculo principal */}
          <circle
            cx="32"
            cy="44"
            r="26"
            fill="#FBEAD6"
            stroke="#C87D87"
            strokeWidth="1.2"
          />

          {/* Chevron centrado */}
          <path
            d="M 20 50 L 32 38 L 44 50"
            stroke="#3a2f2a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </button>
  );
}
