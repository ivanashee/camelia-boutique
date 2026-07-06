"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Ornament from "@/components/Ornament";
import { useCart } from "@/lib/cart-store";
import { formatGs } from "@/lib/format";
import { createOrder } from "./actions";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  if (!mounted) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await createOrder({
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      address: String(fd.get("address") || ""),
      city: String(fd.get("city") || ""),
      delivery: String(fd.get("delivery") || "delivery"),
      payment: String(fd.get("payment") || "transferencia"),
      notes: String(fd.get("notes") || ""),
      items,
    });
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    // Persistimos snapshot para la pantalla de confirmación.
    sessionStorage.setItem(
      "camelia-last-order",
      JSON.stringify({
        id: res.orderId,
        items,
        total: subtotal,
        name: String(fd.get("name") || ""),
        phone: String(fd.get("phone") || ""),
        address: String(fd.get("address") || ""),
        city: String(fd.get("city") || ""),
        delivery: String(fd.get("delivery") || "delivery"),
        payment: String(fd.get("payment") || "transferencia"),
        notes: String(fd.get("notes") || ""),
      })
    );
    clear();
    router.push(`/pedido-confirmado/${res.orderId}`);
  }

  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-12 relative">
      <div className="absolute -top-4 -right-4 opacity-25 pointer-events-none hidden md:block">
        <Ornament size={180} opacity={0.3} />
      </div>
      <div className="eyebrow mb-2">— Checkout</div>
      <h1 className="font-serif text-4xl text-ink mb-8">Finalizar compra</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <form onSubmit={onSubmit} className="space-y-6 bg-cream border border-champagne rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="label">Nombre completo</label><input name="name" required className="input" /></div>
            <div><label className="label">Teléfono</label><input name="phone" required className="input" placeholder="+595 ..." /></div>
            <div><label className="label">Email</label><input name="email" type="email" className="input" /></div>
            <div><label className="label">Ciudad</label><input name="city" className="input" /></div>
            <div className="md:col-span-2"><label className="label">Dirección</label><input name="address" className="input" /></div>
            <div>
              <label className="label">Método de entrega</label>
              <select name="delivery" className="input" defaultValue="delivery">
                <option value="delivery">Delivery a domicilio</option>
                <option value="pickup">Retiro en tienda</option>
              </select>
            </div>
            <div>
              <label className="label">Método de pago</label>
              <select name="payment" className="input" defaultValue="transferencia">
                <option value="transferencia">Transferencia</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="efectivo">Efectivo</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="label">Observación</label>
              <textarea name="notes" rows={3} className="input" placeholder="Talle, color de preferencia, referencias del domicilio..." />
            </div>
          </div>
          {error && <div className="text-sm text-rose">Error: {error}</div>}
          <button disabled={loading || items.length === 0} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Procesando..." : "Confirmar pedido"}
          </button>
          <p className="text-xs text-thyme">
            Al confirmar te generamos un mensaje de WhatsApp con el resumen para coordinar entrega y pago.
          </p>
        </form>

        <aside className="bg-champagne/70 rounded-2xl p-6 h-fit">
          <div className="eyebrow mb-3">Resumen</div>
          <div className="space-y-2 text-sm max-h-64 overflow-auto pr-1">
            {items.map((i) => (
              <div key={i.productId} className="flex justify-between">
                <span>{i.qty} × {i.name}</span>
                <span>{formatGs(i.price * i.qty)}</span>
              </div>
            ))}
            {items.length === 0 && <div className="text-thyme text-xs">Tu carrito está vacío.</div>}
          </div>
          <div className="border-t border-bisque mt-3 pt-3 flex justify-between font-serif text-xl">
            <span>Total</span><span className="text-rose">{formatGs(subtotal)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
