"use client";

import { useEffect, useState } from "react";

const CODE = "CAMELIA10";

// Flores voladoras distribuidas por todo el alto de la barra
const FLYING = [
  { top: "10%", size: 11, duration: 24, delay: 0,  reverse: false },
  { top: "25%", size: 10, duration: 20, delay: 3,  reverse: true  },
  { top: "40%", size: 12, duration: 28, delay: 6,  reverse: false },
  { top: "55%", size: 9,  duration: 22, delay: 9,  reverse: true  },
  { top: "70%", size: 10, duration: 26, delay: 12, reverse: false },
  { top: "20%", size: 11, duration: 21, delay: 2,  reverse: true  },
  { top: "50%", size: 12, duration: 23, delay: 8,  reverse: false },
  { top: "65%", size: 10, duration: 25, delay: 14, reverse: true  },
];

export default function PromoBar() {
  const [copied, setCopied] = useState(false);          // estado breve (1.6s)
  const [everCopied, setEverCopied] = useState(false);  // permanente ← Opción B
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setEverCopied(true);
      if ("vibrate" in navigator) navigator.vibrate?.(8);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  const handleDismiss = () => setDismissed(true);

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
                copied || everCopied ? "text-blush" : "text-champagne group-hover:text-blush"
              }`}
            >
              {CODE}
            </span>
            {everCopied ? (
              // ✓ permanente (Opción B) — indica que el usuario ya copió el cupón
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
            {/* Ramita delicada — trazos champagne + capullos blush */}
            <svg
              className="absolute bottom-0 right-0"
              width="70"
              height="40"
              viewBox="0 0 70 40"
              fill="none"
            >
              {/* Rama principal con whiplash — sube desde bottom-right */}
              <path
                d="M 66 40 C 60 32, 54 24, 48 14"
                stroke="#FBEAD6"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.95"
              />
              {/* Sub-rama superior-izquierda */}
              <path
                d="M 52 22 C 46 18, 38 15, 28 10"
                stroke="#FBEAD6"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Sub-rama superior-derecha */}
              <path
                d="M 58 26 C 60 22, 62 16, 66 8"
                stroke="#FBEAD6"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Ramita chica intermedia */}
              <path
                d="M 50 20 C 48 17, 44 15, 40 14"
                stroke="#FBEAD6"
                strokeWidth="0.7"
                strokeLinecap="round"
                opacity="0.55"
              />
              {/* Capullos blush en tips + a lo largo de las ramas */}
              <circle cx="48" cy="14" r="2.4" fill="#F0C4CB" />
              <circle cx="28" cy="10" r="2"   fill="#F0C4CB" opacity="0.92" />
              <circle cx="66" cy="8"  r="2"   fill="#F0C4CB" opacity="0.85" />
              <circle cx="38" cy="14" r="1.4" fill="#F0C4CB" opacity="0.75" />
              <circle cx="60" cy="18" r="1.5" fill="#F0C4CB" opacity="0.7" />
              <circle cx="34" cy="12" r="1"   fill="#F0C4CB" opacity="0.6" />
              <circle cx="56" cy="14" r="1.1" fill="#F0C4CB" opacity="0.65" />
              {/* Centro rose en el capullo principal */}
              <circle cx="48" cy="14" r="0.8" fill="#C87D87" />
            </svg>

            {/* Flores voladoras — SVG con 5 pétalos + centro rose, sin depender de font */}
            {FLYING.map((f, i) => (
              <span
                key={`fly-${i}`}
                className={f.reverse ? "flying-flower-cw" : "flying-flower-ccw"}
                style={{
                  top: f.top,
                  animationDuration: `${f.duration}s`,
                  animationDelay: `${f.delay}s`,
                  lineHeight: 0,
                }}
              >
                <svg width={f.size + 4} height={f.size + 4} viewBox="-10 -10 20 20">
                  <circle cx="0"    cy="-6"   r="4"   fill="#F0C4CB" />
                  <circle cx="5.7"  cy="-1.8" r="4"   fill="#F0C4CB" />
                  <circle cx="3.5"  cy="4.8"  r="4"   fill="#F0C4CB" />
                  <circle cx="-3.5" cy="4.8"  r="4"   fill="#F0C4CB" />
                  <circle cx="-5.7" cy="-1.8" r="4"   fill="#F0C4CB" />
                  <circle cx="0"    cy="0"    r="2.5" fill="#C87D87" />
                </svg>
              </span>
            ))}
          </div>
        )
      )}
    </div>
  );
}
