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
            {/* Sakura sumi-e — ramas con textura pincel + clusters compactos */}
            <svg
              className="absolute bottom-0 right-0"
              width="140"
              height="40"
              viewBox="0 0 140 40"
              fill="none"
            >
              {/* Rama principal — capa base gruesa */}
              <path
                d="M 138 36 C 120 30, 100 26, 80 22 C 60 20, 42 18, 26 15"
                stroke="#1a1108"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Rama principal — capa 2 desplazada (efecto brush stroke) */}
              <path
                d="M 138 34 C 121 29, 101 25, 82 22 C 62 20, 43 17, 27 14"
                stroke="#0f0703"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
              {/* Pequeñas manchas rústicas en la rama principal */}
              <circle cx="115" cy="28" r="0.6" fill="#0f0703" opacity="0.9"/>
              <circle cx="95" cy="24"  r="0.5" fill="#0f0703" opacity="0.85"/>
              <circle cx="70" cy="21"  r="0.7" fill="#0f0703" opacity="0.9"/>
              <circle cx="50" cy="18"  r="0.5" fill="#0f0703" opacity="0.85"/>

              {/* Sub-rama superior derecha (con doble capa) */}
              <path
                d="M 110 26 C 116 18, 122 10, 128 5"
                stroke="#1a1108"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 111 26 C 117 18, 123 10, 129 5"
                stroke="#0f0703"
                strokeWidth="0.9"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              {/* Sub-rama que baja del medio */}
              <path
                d="M 80 22 C 74 28, 66 32, 58 35"
                stroke="#1a1108"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 81 22 C 75 28, 67 32, 59 35"
                stroke="#0f0703"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              {/* Ramita corta izquierda arriba */}
              <path
                d="M 42 18 C 34 12, 26 8, 18 6"
                stroke="#1a1108"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 43 18 C 35 12, 27 8, 19 6"
                stroke="#0f0703"
                strokeWidth="0.7"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              {/* Ramita chica que baja izquierda */}
              <path
                d="M 26 15 C 20 20, 12 24, 5 26"
                stroke="#1a1108"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />

              {/* Cluster A — punta derecha (arriba) */}
              <g>
                <circle cx="126" cy="3"   r="2" fill="#F0C4CB"/>
                <circle cx="129" cy="4.5" r="2" fill="#F0C4CB"/>
                <circle cx="127" cy="7"   r="2" fill="#F0C4CB"/>
                <circle cx="124" cy="7"   r="2" fill="#F0C4CB"/>
                <circle cx="123" cy="4.5" r="2" fill="#F0C4CB"/>
                <circle cx="126" cy="5"   r="0.9" fill="#a05868"/>
                <circle cx="126" cy="4"   r="0.3" fill="#f5c96e"/>
                <circle cx="127" cy="5.5" r="0.3" fill="#f5c96e"/>
                <circle cx="125" cy="5.5" r="0.3" fill="#f5c96e"/>
                <circle cx="131" cy="8"   r="1.4" fill="#F0C4CB"/>
                <circle cx="133" cy="9"   r="1.4" fill="#F0C4CB"/>
                <circle cx="132" cy="11"  r="1.4" fill="#F0C4CB"/>
                <circle cx="130" cy="11"  r="1.4" fill="#F0C4CB"/>
                <circle cx="129" cy="9"   r="1.4" fill="#F0C4CB"/>
                <circle cx="131" cy="9.5" r="0.6" fill="#a05868"/>
                <ellipse cx="120" cy="10" rx="1.2" ry="1.6" fill="#C87D87"/>
              </g>

              {/* Cluster B — cluster principal en el medio */}
              <g>
                <circle cx="90" cy="18" r="2.2" fill="#F0C4CB"/>
                <circle cx="93" cy="20" r="2.2" fill="#F0C4CB"/>
                <circle cx="92" cy="23" r="2.2" fill="#F0C4CB"/>
                <circle cx="89" cy="23" r="2.2" fill="#F0C4CB"/>
                <circle cx="87" cy="20" r="2.2" fill="#F0C4CB"/>
                <circle cx="90" cy="21" r="1" fill="#a05868"/>
                <circle cx="90"  cy="19.8" r="0.35" fill="#f5c96e"/>
                <circle cx="91.2" cy="21.7" r="0.35" fill="#f5c96e"/>
                <circle cx="88.8" cy="21.7" r="0.35" fill="#f5c96e"/>
                <circle cx="89.5" cy="20.2" r="0.25" fill="#f5c96e"/>
                <circle cx="90.5" cy="20.2" r="0.25" fill="#f5c96e"/>
                <circle cx="82" cy="15" r="1.8" fill="#F0C4CB"/>
                <circle cx="84" cy="17" r="1.8" fill="#F0C4CB"/>
                <circle cx="83" cy="19" r="1.8" fill="#F0C4CB"/>
                <circle cx="81" cy="19" r="1.8" fill="#F0C4CB"/>
                <circle cx="79" cy="17" r="1.8" fill="#F0C4CB"/>
                <circle cx="82" cy="17" r="0.8" fill="#a05868"/>
                <circle cx="98" cy="21" r="1.7" fill="#F0C4CB"/>
                <circle cx="100" cy="23" r="1.7" fill="#F0C4CB"/>
                <circle cx="99" cy="25" r="1.7" fill="#F0C4CB"/>
                <circle cx="97" cy="25" r="1.7" fill="#F0C4CB"/>
                <circle cx="95" cy="23" r="1.7" fill="#F0C4CB"/>
                <circle cx="98" cy="23" r="0.8" fill="#a05868"/>
                <ellipse cx="75" cy="21" rx="1.2" ry="1.6" fill="#C87D87"/>
                <ellipse cx="104" cy="17" rx="1.1" ry="1.4" fill="#C87D87" opacity="0.9"/>
              </g>

              {/* Cluster C — sub-rama que baja */}
              <g>
                <circle cx="60" cy="32" r="1.9" fill="#F0C4CB"/>
                <circle cx="63" cy="33.5" r="1.9" fill="#F0C4CB"/>
                <circle cx="61" cy="36" r="1.9" fill="#F0C4CB"/>
                <circle cx="58" cy="36" r="1.9" fill="#F0C4CB"/>
                <circle cx="57" cy="33.5" r="1.9" fill="#F0C4CB"/>
                <circle cx="60" cy="34" r="0.9" fill="#a05868"/>
                <circle cx="60"   cy="33"   r="0.3" fill="#f5c96e"/>
                <circle cx="61.2" cy="34.5" r="0.3" fill="#f5c96e"/>
                <circle cx="58.8" cy="34.5" r="0.3" fill="#f5c96e"/>
                <circle cx="52" cy="32" r="1.4" fill="#F0C4CB"/>
                <circle cx="54" cy="33" r="1.4" fill="#F0C4CB"/>
                <circle cx="53" cy="35" r="1.4" fill="#F0C4CB"/>
                <circle cx="51" cy="35" r="1.4" fill="#F0C4CB"/>
                <circle cx="50" cy="33" r="1.4" fill="#F0C4CB"/>
                <circle cx="52" cy="33.5" r="0.6" fill="#a05868"/>
                <ellipse cx="68" cy="30" rx="1.1" ry="1.4" fill="#C87D87" opacity="0.9"/>
              </g>

              {/* Cluster D — punta izquierda arriba */}
              <g>
                <circle cx="20" cy="5" r="1.9" fill="#F0C4CB"/>
                <circle cx="22.6" cy="6.5" r="1.9" fill="#F0C4CB"/>
                <circle cx="21" cy="9" r="1.9" fill="#F0C4CB"/>
                <circle cx="18" cy="9" r="1.9" fill="#F0C4CB"/>
                <circle cx="17" cy="6.5" r="1.9" fill="#F0C4CB"/>
                <circle cx="20" cy="7" r="0.9" fill="#a05868"/>
                <circle cx="20"   cy="6"   r="0.3" fill="#f5c96e"/>
                <circle cx="21.2" cy="7.5" r="0.3" fill="#f5c96e"/>
                <circle cx="18.8" cy="7.5" r="0.3" fill="#f5c96e"/>
                <circle cx="28" cy="8" r="1.5" fill="#F0C4CB"/>
                <circle cx="30" cy="9.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="29" cy="11.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="27" cy="11.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="26" cy="9.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="28" cy="9.5" r="0.6" fill="#a05868"/>
                <ellipse cx="12" cy="11" rx="1.1" ry="1.4" fill="#C87D87" opacity="0.85"/>
              </g>

              {/* Cluster E — abajo izquierda */}
              <g>
                <circle cx="8" cy="24" r="1.7" fill="#F0C4CB"/>
                <circle cx="10" cy="25.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="9" cy="27.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="7" cy="27.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="6" cy="25.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="8" cy="26" r="0.8" fill="#a05868"/>
                <circle cx="8"   cy="25.2" r="0.3" fill="#f5c96e"/>
                <circle cx="9"   cy="26.6" r="0.3" fill="#f5c96e"/>
                <circle cx="7"   cy="26.6" r="0.3" fill="#f5c96e"/>
              </g>

              {/* Capullos + pétalos sueltos */}
              <ellipse cx="45" cy="20" rx="1" ry="1.3" fill="#C87D87" opacity="0.7"/>
              <ellipse cx="35" cy="15" rx="0.9" ry="1.2" fill="#C87D87" opacity="0.6"/>
              <circle cx="70" cy="26" r="1" fill="#F0C4CB" opacity="0.65"/>
              <circle cx="115" cy="14" r="1" fill="#F0C4CB" opacity="0.7"/>
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
