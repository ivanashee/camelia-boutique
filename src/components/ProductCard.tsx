import Link from "next/link";
import Ornament from "./Ornament";
import { formatGs } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ p }: { p: Product }) {
  const bg = p.images?.[0]?.startsWith("#") ? p.images[0] : "#F0C4CB";
  return (
    <Link
      href={`/producto/${p.slug}`}
      className="group bg-cream rounded-2xl overflow-hidden border border-champagne hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/5] relative flex items-center justify-center" style={{ background: bg }}>
        {p.featured && (
          <div className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-thyme text-champagne rounded px-2 py-1">
            Destacado
          </div>
        )}
        {p.stock === 0 && (
          <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-ink/80 text-champagne rounded px-2 py-1">
            Sin stock
          </div>
        )}
        <div className="opacity-60 group-hover:opacity-90 transition-opacity">
          <Ornament size={140} opacity={0.55} />
        </div>
      </div>
      <div className="p-4">
        <div className="font-serif text-lg text-ink leading-tight">{p.name}</div>
        <div className="text-xs text-thyme mt-0.5">{p.category?.name ?? ""}</div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-rose font-medium">{formatGs(p.price)}</div>
          <div className="text-[11px] text-thyme">{p.stock} en stock</div>
        </div>
      </div>
    </Link>
  );
}
