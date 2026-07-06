"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

export default function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const disabled = product.stock === 0;
  const sizes = product.sizes ?? [];
  const requiresSize = sizes.length > 0;
  const [size, setSize] = useState<string>(requiresSize ? sizes[0] : "");

  return (
    <div className="flex flex-col gap-4">
      {requiresSize && (
        <div>
          <div className="label">Talle</div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-[44px] px-3 py-2 rounded-full border text-sm transition ${
                  size === s
                    ? "bg-ink text-champagne border-ink"
                    : "bg-cream text-ink border-bisque hover:border-thyme"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="label !mb-0">Cantidad</div>
        <div className="inline-flex items-center border border-bisque rounded-full">
          <button
            className="px-3 py-1.5 text-thyme"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={disabled}
          >−</button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            className="px-3 py-1.5 text-thyme"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            disabled={disabled}
          >+</button>
        </div>
      </div>

      <button
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
        onClick={() => {
          const displayName = size ? `${product.name} (${size})` : product.name;
          add({
            productId: size ? `${product.id}::${size}` : product.id,
            slug: product.slug,
            name: displayName,
            price: product.price,
            qty,
            stock: product.stock,
            image: product.images?.[0],
          });
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
      >
        {disabled ? "Sin stock" : added ? "Agregado ✓" : "Agregar al carrito"}
      </button>
    </div>
  );
}
