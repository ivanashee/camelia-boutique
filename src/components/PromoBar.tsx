"use client";

import { useEffect, useState } from "react";

const CODE = "CAMELIA10";
const STORAGE_KEY = "camelia-promo-dismissed";

// 8 florcitas con parámetros distintos → movimiento orquestado, no sincro
const FLOWERS = [
  { top: "15%", size: 12, duration: 24, delay: 0,  reverse: false },
  { top: "45%", size: 10, duration: 20, delay: 3,  reverse: true  },
  { top: "70%", size: 14, duration: 28, delay: 6,  reverse: false },
  { top: "25%", size: 9,  duration: 22, delay: 9,  reverse: true  },
  { top: "60%", size: 11, duration: 26, delay: 12, reverse: false },
  { top: "35%", size: 13, duration: 21, delay: 2,  reverse: true  },
  { top: "55%", size: 10, duration: 23, delay: 8,  reverse: false },
  { top: "20%", size: 11, duration: 25, delay: 14, reverse: true  },
];

export default function PromoBar() {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* noop */
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      if ("vibrate" in navigator) navigator.vibrate?.(8);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative bg-thyme text-champagne text-[10px] md:text-[11px] tracking-[0.28em] uppercase min-h-[36px] py-2 flex items-center justify-center gap-3 overflow-hidden px-3">
      {mounted && !dismissed ? (
        <>
          <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-1.5 border border-champagne/40 hover:border-blush rounded-full px-3 py-0.5 transition-all"
            aria-label={`Copiar cupón ${CODE}`}
          >
            <span
              className={`font-medium transition-colors ${
                copied ? "text-blush" : "text-champagne group-hover:text-blush"
              }`}
            >
              {CODE}
            </span>
            {copied ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blush">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            )}
          </button>
          <span className="text-champagne/90">
            {copied ? "¡Copiado! Úsalo al pagar" : "10% off en tu primera compra"}
          </span>
          <button
            onClick={handleDismiss}
            aria-label="Cerrar promoción"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-champagne/70 hover:text-blush transition-colors p-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </>
      ) : (
        mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {FLOWERS.map((f, i) => (
              <span
                key={i}
                className={f.reverse ? "flying-flower-cw" : "flying-flower-ccw"}
                style={{
                  top: f.top,
                  fontSize: f.size,
                  animationDuration: `${f.duration}s`,
                  animationDelay: `${f.delay}s`,
                  color: "#F0C4CB",
                }}
              >
                ✿
              </span>
            ))}
          </div>
        )
      )}
    </div>
  );
}
