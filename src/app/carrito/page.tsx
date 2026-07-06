"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Ornament from "@/components/Ornament";
import { useCart } from "@/lib/cart-store";
import { formatGs } from "@/lib/format";

export default function CarritoPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  if (!mounted) return null;

  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-12">
      <div className="eyebrow mb-2">— Carrito</div>
      <h1 className="font-serif text-4xl text-ink mb-8">Tu selección</h1>

      {items.length === 0 ? (
        <div className="border border-dashed border-bisque rounded-2xl p-16 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 opacity-30"><Ornament size={120} opacity={0.4} /></div>
          <div className="absolute bottom-4 right-4 opacity-30"><Ornament size={120} variant="bud" opacity={0.4} /></div>
          <div className="font-serif text-2xl text-ink mb-2">Tu carrito está vacío</div>
          <p className="text-sm text-thyme mb-6">Explorá el catálogo y agregá tus favoritos.</p>
          <Link href="/catalogo" className="btn-primary">Ver catálogo</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.productId} className="bg-cream border border-champagne rounded-xl p-4 flex gap-4 items-center">
                <div className="w-20 h-24 rounded-lg flex items-center justify-center" style={{ background: i.image?.startsWith("#") ? i.image : "#F0C4CB" }}>
                  <Ornament size={60} opacity={0.7} />
                </div>
                <div className="flex-1">
                  <Link href={`/producto/${i.slug}`} className="font-serif text-lg text-ink">{i.name}</Link>
                  <div className="text-xs text-thyme">{formatGs(i.price)} c/u</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="inline-flex items-center border border-bisque rounded-full">
                      <button className="px-3 py-1 text-thyme" onClick={() => setQty(i.productId, i.qty - 1)}>−</button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button className="px-3 py-1 text-thyme" onClick={() => setQty(i.productId, i.qty + 1)}>+</button>
                    </div>
                    <button onClick={() => remove(i.productId)} className="text-xs text-thyme hover:text-rose">Eliminar</button>
                  </div>
                </div>
                <div className="text-rose font-medium">{formatGs(i.price * i.qty)}</div>
              </div>
            ))}
            <button onClick={clear} className="text-xs text-thyme hover:text-rose">Vaciar carrito</button>
          </div>

          <aside className="bg-champagne/70 rounded-2xl p-6 h-fit sticky top-24">
            <div className="eyebrow mb-3">Resumen</div>
            <div className="flex justify-between text-sm py-2 border-b border-bisque">
              <span>Subtotal</span><span>{formatGs(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-bisque">
              <span>Envío</span><span className="text-thyme">Se coordina</span>
            </div>
            <div className="flex justify-between font-serif text-xl py-3">
              <span>Total</span><span className="text-rose">{formatGs(subtotal)}</span>
            </div>
            <Link href="/checkout" className="btn-primary w-full mt-4">Continuar al checkout</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
