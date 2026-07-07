"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Ornament from "./Ornament";
import { formatGs } from "@/lib/format";
import type { Product } from "@/lib/types";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function resolveImage(p: Product) {
  const first = p.images?.[0] ?? "";
  const isUrl = first.startsWith("http") || first.startsWith("/");
  const isColor = first.startsWith("#");
  return {
    url: isUrl ? first : null,
    bg: isColor ? first : "#F0C4CB",
  };
}

export default function FeaturedStack({ products }: { products: Product[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* ============ DESKTOP: bars expandibles al hover ============ */}
      <div className="hidden md:flex gap-3 h-[520px] w-full">
        {products.map((p, idx) => {
          const { url, bg } = resolveImage(p);
          const isHovered = hovered === p.id;
          const noneHovered = hovered === null;
          const flexClass = isHovered
            ? "flex-[2.5]"
            : noneHovered
            ? idx === 0
              ? "flex-[1.4]"
              : "flex-1"
            : "flex-[0.85]";

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
              {/* Foto real si existe */}
              {url ? (
                <Image
                  src={url}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1024px) 40vw, 25vw"
                  className={cn(
                    "object-cover transition-transform duration-700",
                    isHovered ? "scale-105" : "scale-100"
                  )}
                />
              ) : (
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
              )}

              {/* Nombre vertical si NO está hovereada — más legible con drop-shadow */}
              <div
                className={cn(
                  "absolute inset-0 flex items-end justify-center pb-6 pointer-events-none transition-opacity duration-500 z-10",
                  isHovered ? "opacity-0" : "opacity-100"
                )}
              >
                <div
                  className={cn(
                    "font-serif text-base md:text-lg tracking-[0.2em] whitespace-nowrap",
                    url ? "text-white drop-shadow-md" : "text-ink"
                  )}
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {p.name}
                </div>
              </div>

              {/* Overlay superior — categoría */}
              <div className="absolute top-4 left-4 z-10">
                <span className="eyebrow bg-cream/85 rounded-full px-3 py-1 text-[9px]">
                  {p.category?.name ?? ""}
                </span>
              </div>

              {/* Info completa cuando hover — con gradiente */}
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-6 transition-all duration-500 pointer-events-none z-10",
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent -z-10" />
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

              {/* Ring rosa al hover */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ring-2 ring-rose/40 z-10",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
          );
        })}
      </div>

      {/* ============ MOBILE: carousel con snap ============ */}
      <div className="md:hidden -mx-5 pl-5 overflow-x-auto scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-4 pr-5">
          {products.map((p) => {
            const { url, bg } = resolveImage(p);
            const hasDiscount = !!p.discount && p.discount > 0;
            const finalPrice = hasDiscount
              ? Math.round(p.price * (1 - p.discount! / 100))
              : p.price;
            return (
              <Link
                key={p.id}
                href={`/producto/${p.slug}`}
                className="relative shrink-0 w-[78vw] max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-champagne shadow-md snap-center"
                style={{ background: bg }}
              >
                {url ? (
                  <Image
                    src={url}
                    alt={p.name}
                    fill
                    sizes="80vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Ornament size={200} opacity={0.85} />
                  </div>
                )}

                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  <span className="eyebrow bg-cream/85 rounded-full px-3 py-1 text-[9px]">
                    {p.category?.name ?? ""}
                  </span>
                  {hasDiscount && (
                    <span className="text-[10px] uppercase tracking-widest bg-rose text-cream rounded-full px-2.5 py-1">
                      -{p.discount}%
                    </span>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent -z-10" />
                  <div className="font-serif text-xl text-white leading-tight drop-shadow-md">
                    {p.name}
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg text-white">
                        {formatGs(finalPrice)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[11px] text-white/70 line-through">
                          {formatGs(p.price)}
                        </span>
                      )}
                    </div>
                    <span className="bg-cream text-ink rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest">
                      Ver →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
