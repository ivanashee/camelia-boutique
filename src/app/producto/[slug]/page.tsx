import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import FavoriteButton from "@/components/FavoriteButton";
import Ornament from "@/components/Ornament";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug, getRelated } from "@/lib/data";
import { formatGs } from "@/lib/format";
import { waProductLink } from "@/lib/whatsapp";

export default async function ProductoPage({ params }: { params: { slug: string } }) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();
  const related = await getRelated(p);
  const bg = p.images?.[0]?.startsWith("#") ? p.images[0] : "#F0C4CB";
  const wa = waProductLink(p.name, p.price);

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <div className="text-xs text-thyme mb-6">
        <Link href="/">Inicio</Link> · <Link href="/catalogo">Catálogo</Link>
        {p.category && <> · <Link href={`/catalogo?cat=${p.category.slug}`}>{p.category.name}</Link></>}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] rounded-2xl relative overflow-hidden flex items-center justify-center" style={{ background: bg }}>
            <div className="absolute top-4 left-4 opacity-25"><Ornament size={70} opacity={0.5} /></div>
            <Ornament size={260} opacity={0.75} />
            {p.stock === 0 && (
              <div className="absolute bottom-4 right-4 text-xs uppercase tracking-widest bg-ink/80 text-champagne rounded px-3 py-1.5">
                Sin stock
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-lg" style={{ background: bg, opacity: 1 - i * 0.15 }} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="eyebrow">{p.category?.name ?? "Producto"}</div>
              <h1 className="font-serif text-4xl md:text-5xl text-ink mt-2">{p.name}</h1>
            </div>
            <FavoriteButton productId={p.id} size={22} className="!p-3" />
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            {p.discount && p.discount > 0 ? (
              <>
                <span className="text-2xl text-rose font-medium">
                  {formatGs(Math.round(p.price * (1 - p.discount / 100)))}
                </span>
                <span className="text-base text-thyme line-through">{formatGs(p.price)}</span>
                <span className="badge badge-critical">-{p.discount}%</span>
              </>
            ) : (
              <span className="text-2xl text-rose font-medium">{formatGs(p.price)}</span>
            )}
          </div>
          <p className="text-muted mt-5 leading-relaxed">{p.description}</p>
          <div className="text-xs text-thyme mt-4">
            {p.stock > 0 ? `${p.stock} unidades disponibles` : "Sin stock por ahora"}
          </div>

          <div className="mt-8 space-y-4">
            <AddToCart product={p} />
            <a href={wa} target="_blank" rel="noreferrer" className="btn-wa w-full md:w-auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm5.7 14.3c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .1-1.6-.1-2.3-.7-3.8-3-3.9-3.1-.1-.1-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .5 0 .1-.1.3-.3.5s-.4.4-.5.6c-.2.2-.4.4-.2.7.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.7 1.6.4.1.6.1.8-.1s.9-1 1.1-1.3c.2-.3.4-.3.7-.2s1.8.9 2.1 1c.3.2.5.2.6.3.1.2.1.7-.1 1.3Z"/></svg>
              Comprar por WhatsApp
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-champagne grid grid-cols-3 gap-4 text-xs text-thyme">
            <div><div className="eyebrow">Envío</div> A todo el país</div>
            <div><div className="eyebrow">Cambios</div> Hasta 7 días</div>
            <div><div className="eyebrow">Pago</div> Transf · Tarjeta</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <div className="eyebrow mb-2">— También te puede gustar</div>
          <h2 className="font-serif text-2xl text-ink mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </div>
      )}
    </section>
  );
}
