"use client";

import { useState } from "react";

const CODE = "CAMELIA10";

export default function PromoBar() {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="bg-thyme text-champagne text-[10px] md:text-[11px] tracking-[0.28em] uppercase py-2 flex items-center justify-center gap-3 flex-wrap px-3">
      <button
        onClick={handleCopy}
        className="group inline-flex items-center gap-1.5 border border-champagne/40 hover:border-blush rounded-full px-3 py-0.5 transition-all"
        aria-label={`Copiar cupón ${CODE}`}
      >
        <span className={`font-medium transition-colors ${copied ? "text-blush" : "text-champagne group-hover:text-blush"}`}>
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
    </div>
  );
}
