import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import Ornament from "./Ornament";
import TransitionLink from "./TransitionLink";
import { formatGs } from "@/lib/format";
import type { Product } from "@/lib/types";

// Colores fallback por categoría cuando no hay foto.
const FALLBACK_BG: Record<string, string> = {
  sacos: "#F0C4CB",
  sueteres: "#6B7556",
  remeras: "#FBEAD6",
  bufandas: "#C87D87",
  accesorios: "#E5BCA9",
};

export default function ProductCard({ p }: { p: Product }) {
  const firstImg = p.images?.[0] ?? "";
  const isUrl = firstImg.startsWith("http") || firstImg.startsWith("/");
  const isColor = firstImg.startsWith("#");
  const fallbackBg = FALLBACK_BG[p.category?.slug ?? ""] ?? "#F0C4CB";
  const bg = isColor ? firstImg : fallbackBg;

  const hasDiscount = !!p.discount && p.discount > 0;
  const finalPrice = hasDiscount ? Math.round(p.price * (1 - p.discount! / 100)) : p.price;

  return (
    <TransitionLink
      href={`/producto/${p.slug}`}
      className="group bg-cream rounded-2xl overflow-hidden border border-champagne hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/5] relative flex items-center justify-center overflow-hidden" style={{ background: bg }}>
        {isUrl && (
          <Image
            src={firstImg}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            style={{ viewTransitionName: `image-${p.slug}` }}
          />
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="text-[10px] uppercase tracking-widest bg-rose text-cream rounded px-2 py-1">
              -{p.discount}%
            </span>
          )}
          {p.featured && (
            <span className="text-[10px] uppercase tracking-widest bg-thyme text-champagne rounded px-2 py-1">
              Destacado
            </span>
          )}
        </div>
        {p.stock === 0 && (
          <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-ink/80 text-champagne rounded px-2 py-1 z-10">
            Sin stock
          </div>
        )}
        <div className="absolute bottom-2 right-2 z-10">
          <FavoriteButton productId={p.id} size={18} className="!p-2.5" />
        </div>

        {/* Fallback ornament sólo si no hay foto */}
        {!isUrl && (
          <div className="opacity-60 group-hover:opacity-90 transition-opacity">
            <Ornament size={140} opacity={0.55} />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="font-serif text-lg text-ink leading-tight">{p.name}</div>
        <div className="text-xs text-thyme mt-0.5">{p.category?.name ?? ""}</div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <div className="text-rose font-medium">{formatGs(finalPrice)}</div>
            {hasDiscount && (
              <div className="text-[11px] text-thyme line-through">{formatGs(p.price)}</div>
            )}
          </div>
          <div className="text-[11px] text-thyme">{p.stock} en stock</div>
        </div>
      </div>
    </TransitionLink>
  );
}
