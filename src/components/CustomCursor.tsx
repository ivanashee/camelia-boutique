"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor custom:
 * - Dot rose de 8px que sigue el mouse al instante
 * - Ring que persigue con lag (interpolación 15% por frame)
 * - Al hover sobre elementos interactivos, el ring crece y cambia opacidad
 * - Se desactiva en touch devices y con prefers-reduced-motion
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desactivar en touch o si el user prefiere motion reducido
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const HOVER_SEL = "a, button, [role='button'], input, select, textarea, label, summary, [data-cursor='hover']";

    const onHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(HOVER_SEL)) {
        ringRef.current?.classList.add("cursor-ring-hover");
        dotRef.current?.classList.add("cursor-dot-hover");
      }
    };
    const onHoverOut = (e: MouseEvent) => {
      const from = e.target as HTMLElement | null;
      const to = e.relatedTarget as HTMLElement | null;
      if (from?.closest?.(HOVER_SEL) && !to?.closest?.(HOVER_SEL)) {
        ringRef.current?.classList.remove("cursor-ring-hover");
        dotRef.current?.classList.remove("cursor-dot-hover");
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onHoverIn);
    document.addEventListener("mouseout", onHoverOut);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHoverIn);
      document.removeEventListener("mouseout", onHoverOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
