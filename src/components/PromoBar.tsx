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
            {/* Sakura — rama larga marrón con clusters de flores 5-pétalos */}
            <svg
              className="absolute bottom-0 right-0"
              width="220"
              height="40"
              viewBox="0 0 220 40"
              fill="none"
            >
              {/* Rama principal — marrón oscuro con taper */}
              <path
                d="M 218 36 C 195 30, 160 26, 130 24 C 100 22, 70 20, 40 16 C 25 14, 12 12, 2 10"
                stroke="#3a2818"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sub-rama superior derecha */}
              <path
                d="M 175 26 C 180 18, 188 10, 198 5"
                stroke="#3a2818"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sub-rama que baja del medio */}
              <path
                d="M 130 24 C 122 30, 112 34, 100 37"
                stroke="#3a2818"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sub-rama superior izquierda */}
              <path
                d="M 70 20 C 60 14, 50 10, 38 6"
                stroke="#3a2818"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Ramita chica */}
              <path
                d="M 40 16 C 32 20, 22 24, 12 26"
                stroke="#3a2818"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />

              {/* Cluster A — punta derecha (arriba) */}
              <g>
                <circle cx="196" cy="3"  r="2" fill="#F0C4CB"/>
                <circle cx="199" cy="4.5" r="2" fill="#F0C4CB"/>
                <circle cx="197" cy="7" r="2" fill="#F0C4CB"/>
                <circle cx="194" cy="7" r="2" fill="#F0C4CB"/>
                <circle cx="193" cy="4.5" r="2" fill="#F0C4CB"/>
                <circle cx="196" cy="5" r="0.9" fill="#a05868"/>
                {/* Flor pequeña al lado */}
                <circle cx="201" cy="8" r="1.4" fill="#F0C4CB"/>
                <circle cx="203" cy="9" r="1.4" fill="#F0C4CB"/>
                <circle cx="202" cy="11" r="1.4" fill="#F0C4CB"/>
                <circle cx="200" cy="11" r="1.4" fill="#F0C4CB"/>
                <circle cx="199" cy="9" r="1.4" fill="#F0C4CB"/>
                <circle cx="201" cy="9.5" r="0.6" fill="#a05868"/>
                {/* Capullo cerrado */}
                <ellipse cx="190" cy="10" rx="1.2" ry="1.6" fill="#C87D87"/>
              </g>

              {/* Cluster B — cluster principal grande (medio-arriba) */}
              <g>
                {/* Flor grande */}
                <circle cx="140" cy="18" r="2.2" fill="#F0C4CB"/>
                <circle cx="143" cy="20" r="2.2" fill="#F0C4CB"/>
                <circle cx="142" cy="23" r="2.2" fill="#F0C4CB"/>
                <circle cx="139" cy="23" r="2.2" fill="#F0C4CB"/>
                <circle cx="137" cy="20" r="2.2" fill="#F0C4CB"/>
                <circle cx="140" cy="21" r="1" fill="#a05868"/>
                {/* Flor 2 arriba-izq */}
                <circle cx="132" cy="15" r="1.8" fill="#F0C4CB"/>
                <circle cx="134" cy="17" r="1.8" fill="#F0C4CB"/>
                <circle cx="133" cy="19" r="1.8" fill="#F0C4CB"/>
                <circle cx="131" cy="19" r="1.8" fill="#F0C4CB"/>
                <circle cx="129" cy="17" r="1.8" fill="#F0C4CB"/>
                <circle cx="132" cy="17" r="0.8" fill="#a05868"/>
                {/* Flor 3 abajo-der */}
                <circle cx="148" cy="21" r="1.8" fill="#F0C4CB"/>
                <circle cx="150" cy="23" r="1.8" fill="#F0C4CB"/>
                <circle cx="149" cy="25" r="1.8" fill="#F0C4CB"/>
                <circle cx="147" cy="25" r="1.8" fill="#F0C4CB"/>
                <circle cx="145" cy="23" r="1.8" fill="#F0C4CB"/>
                <circle cx="148" cy="23" r="0.8" fill="#a05868"/>
                {/* Capullos */}
                <ellipse cx="125" cy="20" rx="1.2" ry="1.6" fill="#C87D87"/>
                <ellipse cx="152" cy="16" rx="1.1" ry="1.4" fill="#C87D87" opacity="0.9"/>
              </g>

              {/* Cluster C — sub-rama que baja */}
              <g>
                <circle cx="102" cy="34" r="2" fill="#F0C4CB"/>
                <circle cx="105" cy="35" r="2" fill="#F0C4CB"/>
                <circle cx="103" cy="38" r="2" fill="#F0C4CB"/>
                <circle cx="100" cy="38" r="2" fill="#F0C4CB"/>
                <circle cx="99" cy="35" r="2" fill="#F0C4CB"/>
                <circle cx="102" cy="36" r="0.9" fill="#a05868"/>
                {/* Flor chica al lado */}
                <circle cx="93" cy="32" r="1.5" fill="#F0C4CB"/>
                <circle cx="95" cy="33.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="94" cy="35.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="92" cy="35.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="91" cy="33.5" r="1.5" fill="#F0C4CB"/>
                <circle cx="93" cy="34" r="0.7" fill="#a05868"/>
                <ellipse cx="110" cy="32" rx="1.1" ry="1.4" fill="#C87D87" opacity="0.9"/>
              </g>

              {/* Cluster D — punta izquierda arriba */}
              <g>
                <circle cx="36" cy="4" r="1.9" fill="#F0C4CB"/>
                <circle cx="38.6" cy="5.5" r="1.9" fill="#F0C4CB"/>
                <circle cx="37" cy="8" r="1.9" fill="#F0C4CB"/>
                <circle cx="34" cy="8" r="1.9" fill="#F0C4CB"/>
                <circle cx="33" cy="5.5" r="1.9" fill="#F0C4CB"/>
                <circle cx="36" cy="6" r="0.9" fill="#a05868"/>
                {/* Flor 2 */}
                <circle cx="45" cy="6" r="1.6" fill="#F0C4CB"/>
                <circle cx="47" cy="7.5" r="1.6" fill="#F0C4CB"/>
                <circle cx="46" cy="9.5" r="1.6" fill="#F0C4CB"/>
                <circle cx="44" cy="9.5" r="1.6" fill="#F0C4CB"/>
                <circle cx="43" cy="7.5" r="1.6" fill="#F0C4CB"/>
                <circle cx="45" cy="7.5" r="0.7" fill="#a05868"/>
                <ellipse cx="28" cy="10" rx="1.1" ry="1.4" fill="#C87D87" opacity="0.85"/>
              </g>

              {/* Cluster E — abajo izquierda, ramita chica */}
              <g>
                <circle cx="14" cy="24" r="1.7" fill="#F0C4CB"/>
                <circle cx="16" cy="25.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="15" cy="27.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="13" cy="27.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="12" cy="25.5" r="1.7" fill="#F0C4CB"/>
                <circle cx="14" cy="26" r="0.8" fill="#a05868"/>
                <ellipse cx="20" cy="22" rx="1" ry="1.3" fill="#C87D87" opacity="0.85"/>
              </g>

              {/* Capullos sueltos + pétalos cayendo por toda la rama */}
              <ellipse cx="80" cy="22" rx="1" ry="1.3" fill="#C87D87" opacity="0.7"/>
              <ellipse cx="60" cy="19" rx="0.9" ry="1.2" fill="#C87D87" opacity="0.6"/>
              <circle cx="115" cy="30" r="1.1" fill="#F0C4CB" opacity="0.65"/>
              <circle cx="165" cy="20" r="1" fill="#F0C4CB" opacity="0.7"/>
              <circle cx="85" cy="8" r="0.9" fill="#F0C4CB" opacity="0.65"/>
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
