"use client";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  bg?: string;
};

/**
 * Foto principal del producto con zoom que sigue al cursor.
 * - Desktop: hover mueve el origen del transform → zoom sobre el área
 *   que el usuario mira. cursor-zoom-in visual.
 * - Mobile: toca para hacer toggle entre 1x y 2x centrado.
 */
export default function ProductImageZoom({ src, alt, bg }: Props) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [zoomed, setZoomed] = useState(false);
  const [tapZoom, setTapZoom] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }

  const isZoomed = zoomed || tapZoom;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={onMove}
      onClick={() => setTapZoom((z) => !z)}
      className="relative w-full h-full overflow-hidden cursor-zoom-in select-none"
      style={{ background: bg }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: isZoomed ? "scale(1.8)" : "scale(1)",
          transformOrigin: `${pos.x}% ${pos.y}%`,
        }}
      />

      {/* Hint chico abajo — sólo cuando NO está zoomeado */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 transition-opacity duration-300 pointer-events-none ${
          isZoomed ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-[10px] uppercase tracking-widest bg-cream/85 text-ink rounded-full px-3 py-1 flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M11 8v6M8 11h6" />
            <path d="m20 20-3-3" />
          </svg>
          Zoom
        </span>
      </div>
    </div>
  );
}
