"use client";

import { useEffect, useState } from "react";

const CODE = "CAMELIA10";

// Flores voladoras — sus top% caen dentro del área de la copa del árbol
// (cluster está en y=4-22 de 40 → aprox 10%-55% del alto de la barra)
const FLYING = [
  { top: "12%", size: 11, duration: 24, delay: 0,  reverse: false },
  { top: "22%", size: 10, duration: 20, delay: 3,  reverse: true  },
  { top: "32%", size: 12, duration: 28, delay: 6,  reverse: false },
  { top: "42%", size: 9,  duration: 22, delay: 9,  reverse: true  },
  { top: "18%", size: 10, duration: 26, delay: 12, reverse: false },
  { top: "38%", size: 11, duration: 21, delay: 2,  reverse: true  },
  { top: "28%", size: 12, duration: 23, delay: 8,  reverse: false },
  { top: "50%", size: 10, duration: 25, delay: 14, reverse: true  },
];

export default function PromoBar() {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
            {/* Arbolito estilo niños: tronco grueso doble stroke + copa densa */}
            <svg
              className="absolute bottom-0 right-0"
              width="90"
              height="40"
              viewBox="0 0 90 40"
              fill="none"
            >
              {/* Tronco: base oscura */}
              <path
                d="M 80 40 C 78 28, 72 18, 60 8"
                stroke="#8B6F47"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Tronco: capa clara encima para dar volumen */}
              <path
                d="M 80 40 C 78 28, 72 18, 60 8"
                stroke="#a8845c"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              {/* Copa densa: 28 florcitas blush apiladas en 5 filas */}
              {/* Corona superior */}
              <circle cx="60" cy="4"  r="2.5" fill="#F0C4CB" />
              <circle cx="54" cy="4"  r="2.4" fill="#F0C4CB" />
              <circle cx="66" cy="4"  r="2.4" fill="#F0C4CB" />
              <circle cx="48" cy="6"  r="2.4" fill="#F0C4CB" />
              <circle cx="72" cy="6"  r="2.4" fill="#F0C4CB" />
              {/* Fila 1 */}
              <circle cx="60" cy="8"  r="3"   fill="#F0C4CB" />
              <circle cx="52" cy="8"  r="2.8" fill="#F0C4CB" />
              <circle cx="68" cy="8"  r="2.8" fill="#F0C4CB" />
              <circle cx="44" cy="9"  r="2.5" fill="#F0C4CB" />
              <circle cx="76" cy="9"  r="2.5" fill="#F0C4CB" />
              {/* Fila 2 */}
              <circle cx="56" cy="12" r="2.8" fill="#F0C4CB" />
              <circle cx="64" cy="12" r="2.8" fill="#F0C4CB" />
              <circle cx="48" cy="12" r="2.5" fill="#F0C4CB" />
              <circle cx="72" cy="12" r="2.5" fill="#F0C4CB" />
              <circle cx="42" cy="13" r="2.3" fill="#F0C4CB" opacity="0.95" />
              {/* Fila 3 */}
              <circle cx="60" cy="15" r="2.6" fill="#F0C4CB" />
              <circle cx="52" cy="15" r="2.5" fill="#F0C4CB" />
              <circle cx="68" cy="15" r="2.5" fill="#F0C4CB" />
              <circle cx="46" cy="16" r="2.2" fill="#F0C4CB" opacity="0.92" />
              <circle cx="74" cy="16" r="2.2" fill="#F0C4CB" opacity="0.92" />
              {/* Fila 4 */}
              <circle cx="56" cy="18" r="2.4" fill="#F0C4CB" opacity="0.9" />
              <circle cx="64" cy="18" r="2.4" fill="#F0C4CB" opacity="0.9" />
              <circle cx="50" cy="19" r="2.2" fill="#F0C4CB" opacity="0.85" />
              <circle cx="70" cy="19" r="2.2" fill="#F0C4CB" opacity="0.85" />
              {/* Fila 5 (más translúcida, sub-capa) */}
              <circle cx="60" cy="21" r="2.2" fill="#F0C4CB" opacity="0.8" />
              <circle cx="54" cy="22" r="2"   fill="#F0C4CB" opacity="0.75" />
              <circle cx="66" cy="22" r="2"   fill="#F0C4CB" opacity="0.75" />
              {/* Centros rose distribuidos */}
              <circle cx="60" cy="8"  r="1.4" fill="#C87D87" />
              <circle cx="52" cy="8"  r="1.2" fill="#C87D87" opacity="0.9" />
              <circle cx="68" cy="8"  r="1.2" fill="#C87D87" opacity="0.9" />
              <circle cx="56" cy="12" r="1"   fill="#C87D87" opacity="0.85" />
              <circle cx="64" cy="12" r="1"   fill="#C87D87" opacity="0.85" />
              <circle cx="60" cy="15" r="1"   fill="#C87D87" opacity="0.8" />
              <circle cx="54" cy="4"  r="0.9" fill="#C87D87" opacity="0.85" />
              <circle cx="66" cy="4"  r="0.9" fill="#C87D87" opacity="0.85" />
            </svg>

            {/* Flores que salen volando — nacen matcheando el área de la copa */}
            {FLYING.map((f, i) => (
              <span
                key={`fly-${i}`}
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
