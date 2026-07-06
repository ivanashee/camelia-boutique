"use client";

import Link from "next/link";
import { useState } from "react";
import Ornament from "./Ornament";
import { formatGs } from "@/lib/format";
import type { Product } from "@/lib/types";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FeaturedStack({ products }: { products: Product[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex gap-3 h-[420px] md:h-[520px] w-full">
      {products.map((p, idx) => {
        const bg = p.images?.[0]?.startsWith("#") ? p.images[0] : "#F0C4CB";
        const isHovered = hovered === p.id;
        const noneHovered = hovered === null;
        const flexClass = isHovered
          ? "flex-[6]"
          : noneHovered
          ? idx === 0
            ? "flex-[3]"
            : "flex-[1]"
          : "flex-[0.6]";

        return (
          <Link
            key={p.id}
            href={`/producto/${p.slug}`}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "relative overflow-hidden rounded-2xl transition-all duration-700 ease-out cursor-pointer group border border-champagne shadow-md",
              flexClass
            )}
            style={{ background: bg }}
          >
            {/* Camelia central — más grande cuando expande */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(0.75)",
                  opacity: isHovered ? 0.95 : 0.55,
                }}
              >
                <Ornament size={280} opacity={isHovered ? 0.95 : 0.55} />
              </div>
            </div>

            {/* Nombre vertical cuando colapsado */}
            <div
              className={cn(
                "absolute inset-0 flex items-end justify-center pb-6 pointer-events-none transition-opacity duration-500",
                isHovered ? "opacity-0" : "opacity-100"
              )}
            >
              <div
                className="font-serif text-ink text-base md:text-lg tracking-[0.2em] whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {p.name}
              </div>
            </div>

            {/* Etiqueta de categoría — siempre visible arriba */}
            <div className="absolute top-4 left-4 z-10">
              <span className="eyebrow bg-cream/85 rounded-full px-3 py-1 text-[9px]">
                {p.category?.name ?? ""}
              </span>
            </div>

            {/* Info completa cuando expande */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 p-6 transition-all duration-500 pointer-events-none",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent -z-10" />
              <div className="font-serif text-2xl md:text-3xl text-white leading-tight drop-shadow-md">
                {p.name}
              </div>
              {p.description && (
                <div className="text-xs md:text-sm text-white/85 mt-1 line-clamp-2 max-w-md">
                  {p.description}
                </div>
              )}
              <div className="mt-4 flex items-end justify-between gap-3 pointer-events-auto">
                <div className="font-serif text-xl md:text-2xl text-white">
                  {formatGs(p.price)}
                </div>
                <span className="bg-cream text-ink rounded-full px-4 py-2 text-[11px] uppercase tracking-widest hover:bg-rose hover:text-cream transition">
                  Ver producto →
                </span>
              </div>
            </div>

            {/* Border glow on hover */}
            <div
              className={cn(
                "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ring-2 ring-rose/40",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
