"use client";

import { useEffect, useState } from "react";

/**
 * Keycap flotante estilo isométrico (inspirado en referencia keycap.avif).
 * - SVG con 3 caras visibles: top cream, lado izquierdo bisque oscuro, frente blush
 * - Outline ink negro grueso estilo ilustración
 * - Highlight blanco sobre el top para dar volumen
 * - Chevron ^ ancho sobre el top
 * - Al click: la parte superior se hunde hacia la base (translate + scale)
 * - Vibración háptica + scroll-to-top
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
      navigator.vibrate?.(15);
    }
    setTimeout(() => setPressed(false), 220);
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
      <div
        className={`relative transition-transform duration-150 ease-out ${
          pressed ? "translate-y-1 scale-[0.97]" : "hover:-translate-y-1"
        }`}
        style={{
          filter: pressed
            ? "drop-shadow(0 4px 6px rgba(58,47,42,0.25))"
            : "drop-shadow(0 10px 14px rgba(58,47,42,0.35))",
        }}
      >
        <svg
          viewBox="0 0 140 120"
          width="82"
          height="70"
          className="md:w-[92px] md:h-[78px]"
        >
          {/* CARA IZQUIERDA (más oscura, bisque) */}
          <path
            d="M 22 46
               L 22 92
               Q 24 100, 34 100
               L 34 58
               Z"
            fill="#c9a790"
            stroke="#3a2f2a"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* CARA FRONTAL (mid blush) */}
          <path
            d="M 34 58
               L 34 100
               L 118 100
               Q 128 98, 128 90
               L 128 66
               Q 82 76, 34 58
               Z"
            fill="#e5bca9"
            stroke="#3a2f2a"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* CARA SUPERIOR (top cream con leve domo) */}
          <path
            d="M 34 58
               Q 26 30, 44 22
               Q 82 12, 118 22
               Q 134 30, 128 66
               Q 82 76, 34 58
               Z"
            fill="#FFFDFA"
            stroke="#3a2f2a"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Highlight arriba (brillo del domo) */}
          <path
            d="M 50 32 Q 82 24, 110 32"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Chevron ^ ancho sobre el top */}
          <path
            d="M 55 54 L 80 40 L 105 54"
            stroke="#3a2f2a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </button>
  );
}
