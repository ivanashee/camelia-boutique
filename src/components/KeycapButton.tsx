"use client";

import { useEffect, useState } from "react";

// Profundidad 3D — 5 capas de sombras + drop shadow
const KEY_SHADOW_UP = `
  0 2px 0 #d6a4ab,
  0 4px 0 #c4939a,
  0 6px 0 #b0808a,
  0 8px 0 #9a6b76,
  0 10px 0 #855663,
  0 16px 22px rgba(58, 47, 42, 0.28)
`;

const KEY_SHADOW_DOWN = `
  0 1px 0 #d6a4ab,
  0 2px 0 #b0808a,
  0 3px 10px rgba(58, 47, 42, 0.22)
`;

/**
 * Keycap flotante con la C. de Camélia.
 * - Diseño 3D chunky con 5 capas de shadow simulando la profundidad de la tecla
 * - Hover: sube 4px (previa)
 * - Click: se hunde 9px + colapsa las shadows → tacto tipo teclado real
 * - Vibración háptica en mobile + scroll-to-top
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
      className={`fixed bottom-8 right-6 z-40 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      }`}
    >
      <div
        className={`
          relative w-14 h-14 md:w-16 md:h-16 rounded-2xl
          border border-champagne
          bg-gradient-to-b from-cream via-[#fbead6] to-[#f2dccc]
          flex items-center justify-center
          transition-all duration-150 ease-out
          ${pressed ? "translate-y-[9px]" : "hover:-translate-y-1"}
        `}
        style={{ boxShadow: pressed ? KEY_SHADOW_DOWN : KEY_SHADOW_UP }}
      >
        {/* Highlight arriba — simula la curva superior de la tecla */}
        <span className="absolute inset-x-3 top-1.5 h-1.5 rounded-full bg-white/55 blur-[2px] pointer-events-none" />

        {/* Sombra interna sutil abajo — profundidad */}
        <span className="absolute inset-x-2 bottom-1 h-2 rounded-full bg-black/[0.04] blur-sm pointer-events-none" />

        {/* Chevron ^ ancho — dibujado en SVG con ángulo abierto (~130°) */}
        <svg
          viewBox="0 0 40 22"
          width="28"
          height="16"
          fill="none"
          stroke="#3a2f2a"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M 5 18 L 20 6 L 35 18" />
        </svg>
      </div>
    </button>
  );
}
