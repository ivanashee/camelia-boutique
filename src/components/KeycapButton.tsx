"use client";

import { useEffect, useState } from "react";

/**
 * Botón flotante Art Nouveau — medallón floral con chevron.
 * - Círculo con doble anillo + serifs en las 4 direcciones
 * - Camelia bud arriba (con tallo curvo)
 * - Tendril whiplash abajo
 * - Chevron ^ ancho en el centro
 * - Hover: scale up sutil + haptic
 * - Click: pulse rose + scroll-to-top
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
    setTimeout(() => setPressed(false), 260);
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
        style={{ filter: "drop-shadow(0 6px 12px rgba(58,47,42,0.22))" }}
      >
        <svg
          width="76"
          height="96"
          viewBox="0 0 76 96"
          className="md:w-[84px] md:h-[104px]"
        >
          {/* ═══ Flourish superior: camelia bud con tallo ═══ */}
          <g stroke="#C87D87" strokeWidth="0.9" fill="none" strokeLinecap="round">
            <path d="M 38 6 C 35 10, 34 15, 34 20" />
            <path d="M 38 6 C 41 10, 42 15, 42 20" />
          </g>
          <circle cx="38" cy="4" r="2.2" fill="#C87D87" />
          <circle cx="34" cy="8" r="1" fill="#C87D87" opacity="0.65" />
          <circle cx="42" cy="8" r="1" fill="#C87D87" opacity="0.65" />

          {/* ═══ Círculo principal ═══ */}
          <circle
            cx="38"
            cy="52"
            r="28"
            fill="url(#keycap-fill)"
            stroke="#C87D87"
            strokeWidth="1.4"
          />
          {/* Doble anillo interno */}
          <circle
            cx="38"
            cy="52"
            r="23"
            fill="none"
            stroke="#C87D87"
            strokeWidth="0.5"
            opacity="0.5"
          />

          {/* Gradiente para el fondo del medallón */}
          <defs>
            <radialGradient id="keycap-fill" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#FFFDFA" />
              <stop offset="60%" stopColor="#FBEAD6" />
              <stop offset="100%" stopColor="#F0C4CB" />
            </radialGradient>
          </defs>

          {/* ═══ Serifs decorativos en 4 direcciones ═══ */}
          <g stroke="#C87D87" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.75">
            {/* Norte */}
            <path d="M 34 21 Q 38 18, 42 21" />
            <circle cx="38" cy="19" r="0.9" fill="#C87D87" opacity="0.8" />
            {/* Sur */}
            <path d="M 34 83 Q 38 86, 42 83" />
            <circle cx="38" cy="85" r="0.9" fill="#C87D87" opacity="0.8" />
            {/* Oeste */}
            <path d="M 7 48 Q 10 52, 7 56" />
            <circle cx="8" cy="52" r="0.9" fill="#C87D87" opacity="0.8" />
            {/* Este */}
            <path d="M 69 48 Q 66 52, 69 56" />
            <circle cx="68" cy="52" r="0.9" fill="#C87D87" opacity="0.8" />
          </g>

          {/* ═══ Curls diagonales interiores tipo whiplash ═══ */}
          <g stroke="#C87D87" strokeWidth="0.4" fill="none" strokeLinecap="round" opacity="0.5">
            <path d="M 20 34 Q 28 32, 28 40" />
            <path d="M 56 34 Q 48 32, 48 40" />
            <path d="M 20 70 Q 28 72, 28 64" />
            <path d="M 56 70 Q 48 72, 48 64" />
          </g>

          {/* ═══ Chevron ^ ancho central ═══ */}
          <path
            d="M 22 58 L 38 44 L 54 58"
            stroke="#3a2f2a"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ═══ Tendril whiplash inferior ═══ */}
          <g stroke="#C87D87" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.75">
            <path d="M 38 90 C 34 92, 30 90, 32 86" />
            <path d="M 38 90 C 42 92, 46 90, 44 86" />
          </g>
          <circle cx="38" cy="92" r="1.2" fill="#C87D87" opacity="0.8" />
        </svg>
      </div>
    </button>
  );
}
