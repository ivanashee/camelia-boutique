"use client";

import { useEffect, useState } from "react";

/**
 * Botón flotante estilo keycap con la C de Camélia.
 * - Aparece al scrollear > 400px
 * - Al clickear: se hunde (translateY), vibra en mobile y hace scroll-to-top
 * - Doble click: se queda hundido 400ms para que se vea el efecto
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
    // Haptic feedback en mobile
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(15);
    }
    setTimeout(() => setPressed(false), 180);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16">
        {/* Base (parte inferior 3D — más oscura, offset hacia abajo) */}
        <div
          className={`absolute inset-x-0 top-0 h-full rounded-2xl bg-gradient-to-b from-rose to-[#8a5561] shadow-lg transition-transform duration-150 ${
            pressed ? "translate-y-[3px]" : "translate-y-[6px]"
          }`}
        />

        {/* Top face — donde va la C */}
        <div
          className={`relative rounded-2xl border border-champagne/70 bg-gradient-to-b from-cream via-champagne/50 to-champagne shadow-inner w-full h-full flex items-center justify-center transition-transform duration-150 ${
            pressed ? "translate-y-[5px]" : "translate-y-0"
          } hover:-translate-y-0.5`}
        >
          <span
            className="font-serif italic text-3xl md:text-4xl text-ink leading-none select-none"
            style={{ marginTop: "-2px" }}
          >
            C
          </span>

          {/* Puntito decorativo tipo LED */}
          <span className="absolute top-1.5 right-2 w-1 h-1 rounded-full bg-rose/70 shadow-[0_0_4px_rgba(200,125,135,0.7)]" />

          {/* Brillo sutil arriba */}
          <span className="absolute inset-x-2 top-1 h-2 rounded-full bg-white/40 blur-[2px] pointer-events-none" />

          {/* Serifs decorativos que flanquean la C — 4 rayitas mini */}
          <span className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40">
            <span className="block w-1 h-px bg-ink" />
            <span className="block w-1 h-px bg-ink" />
          </span>
          <span className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40">
            <span className="block w-1 h-px bg-ink" />
            <span className="block w-1 h-px bg-ink" />
          </span>
        </div>
      </div>
    </button>
  );
}
