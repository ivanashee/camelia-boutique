"use client";

import Link from "next/link";
import Ornament from "./Ornament";
import { CardStack, type CardStackItem } from "./CardStack";
import { formatGs } from "@/lib/format";
import type { Product } from "@/lib/types";

type FeaturedItem = CardStackItem & {
  bg: string;
  price: number;
  category: string;
  stock: number;
};

export default function FeaturedStack({ products }: { products: Product[] }) {
  const items: FeaturedItem[] = products.map((p) => ({
    id: p.id,
    title: p.name,
    description: p.description ?? "",
    href: `/producto/${p.slug}`,
    bg: p.images?.[0]?.startsWith("#") ? p.images[0] : "#F0C4CB",
    price: p.price,
    category: p.category?.name ?? "",
    stock: p.stock,
  }));

  return (
    <CardStack
      items={items}
      cardWidth={420}
      cardHeight={520}
      overlap={0.55}
      spreadDeg={40}
      activeLiftPx={30}
      autoAdvance
      intervalMs={4500}
      renderCard={(item, { active }) => {
        const it = item as FeaturedItem;
        return (
          <div className="relative h-full w-full" style={{ background: it.bg }}>
            {/* etiquetas */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="eyebrow bg-cream/80 rounded-full px-3 py-1">{it.category}</span>
              {it.stock === 0 && (
                <span className="text-[10px] uppercase tracking-widest bg-ink/80 text-champagne rounded-full px-3 py-1">
                  Sin stock
                </span>
              )}
            </div>

            {/* camelia central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="transition-transform duration-500"
                style={{ transform: active ? "scale(1)" : "scale(0.9)" }}
              >
                <Ornament size={260} opacity={active ? 0.9 : 0.65} />
              </div>
            </div>

            {/* overlay + info */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 z-10">
              <div className="font-serif text-3xl text-white leading-tight drop-shadow-sm">
                {it.title}
              </div>
              {it.description && (
                <div className="text-sm text-white/85 mt-1 line-clamp-2">{it.description}</div>
              )}
              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="font-serif text-2xl text-white">{formatGs(it.price)}</div>
                {item.href && (
                  <Link
                    href={item.href}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-cream text-ink rounded-full px-4 py-2 text-xs uppercase tracking-widest hover:bg-rose hover:text-cream transition"
                  >
                    Ver producto →
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
