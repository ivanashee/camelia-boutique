"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Ornament from "@/components/Ornament";
import { formatGs } from "@/lib/format";
import { waOrderLink } from "@/lib/whatsapp";
import type { CartItem, Order } from "@/lib/types";

type Snapshot = {
  id: string;
  items: CartItem[];
  total: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  delivery: string;
  payment: string;
  notes: string;
};

export default function ConfirmadoPage({ params }: { params: { id: string } }) {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("camelia-last-order");
      if (raw) setSnap(JSON.parse(raw));
    } catch {}
  }, []);

  const order: Order | null = snap
    ? {
        id: snap.id,
        customer_name: snap.name,
        phone: snap.phone,
        address: snap.address,
        city: snap.city,
        delivery: snap.delivery,
        payment: snap.payment,
        notes: snap.notes,
        subtotal: snap.total,
        total: snap.total,
        status: "pendiente",
        created_at: new Date().toISOString(),
      }
    : null;

  return (
    <section className="max-w-2xl mx-auto px-5 md:px-8 py-16 text-center relative">
      <div className="absolute -top-4 -left-4 opacity-25 pointer-events-none">
        <Ornament size={160} opacity={0.35} />
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-25 pointer-events-none">
        <Ornament size={160} variant="spray" opacity={0.35} />
      </div>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-thyme text-champagne mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m5 12 5 5L20 7" />
        </svg>
      </div>
      <h1 className="font-serif text-4xl text-ink">¡Pedido confirmado!</h1>
      <p className="text-muted mt-3">
        Guardamos tu pedido <span className="font-mono text-ink">#{params.id.slice(0, 8)}</span>. Ahora coordinemos entrega y pago por WhatsApp.
      </p>

      {order && snap && (
        <>
          <div className="mt-8 bg-cream border border-champagne rounded-2xl p-6 text-left">
            <div className="eyebrow mb-3">Resumen</div>
            <div className="space-y-1 text-sm">
              {snap.items.map((i) => (
                <div key={i.productId} className="flex justify-between">
                  <span>{i.qty} × {i.name}</span><span>{formatGs(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-bisque mt-3 pt-3 flex justify-between font-serif text-lg">
              <span>Total</span><span className="text-rose">{formatGs(order.total)}</span>
            </div>
          </div>

          <a
            href={waOrderLink(order, snap.items)}
            target="_blank"
            rel="noreferrer"
            className="btn-wa w-full mt-6"
          >Enviar pedido por WhatsApp</a>
        </>
      )}

      <Link href="/catalogo" className="block text-sm text-thyme mt-6 hover:text-rose">← Seguir comprando</Link>
    </section>
  );
}
