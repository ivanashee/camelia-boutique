"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Ornament from "@/components/Ornament";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/lib/favorites-store";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import type { Product } from "@/lib/types";

export default function FavoritosPage() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ids = useFavorites((s) => s.ids);
  const clear = useFavorites((s) => s.clear);

  useEffect(() => {
    setMounted(true);
    // Levantamos productos del endpoint
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => {
        // Fallback demo
        setProducts(
          demoProducts.map((p) => ({
            ...p,
            category: demoCategories.find((c) => c.id === p.category_id) || null,
          }))
        );
      });
  }, []);

  if (!mounted) return null;
  const favs = products.filter((p) => ids.includes(p.id));

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="eyebrow mb-2">— Favoritos</div>
          <h1 className="font-serif text-4xl text-ink">
            Tu lista de <span className="italic text-rose">deseos</span>
          </h1>
        </div>
        {favs.length > 0 && (
          <button onClick={clear} className="text-xs text-thyme hover:text-rose">
            Vaciar favoritos
          </button>
        )}
      </div>

      {favs.length === 0 ? (
        <div className="border border-dashed border-bisque rounded-2xl p-16 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 opacity-30">
            <Ornament size={120} opacity={0.4} />
          </div>
          <div className="absolute bottom-4 right-4 opacity-30">
            <Ornament size={120} variant="bud" opacity={0.4} />
          </div>
          <div className="font-serif text-2xl text-ink mb-2">Aún no tenés favoritos</div>
          <p className="text-sm text-thyme mb-6">
            Mientras navegás el catálogo, tocá el ♥ de los productos que te gusten.
          </p>
          <Link href="/catalogo" className="btn-primary">Ver catálogo</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {favs.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
  );
}
