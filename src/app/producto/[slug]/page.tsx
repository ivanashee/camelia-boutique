import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import FavoriteButton from "@/components/FavoriteButton";
import Ornament from "@/components/Ornament";
import ProductCard from "@/components/ProductCard";
import ProductImageZoom from "@/components/ProductImageZoom";
import { getProductBySlug, getRelated } from "@/lib/data";
import { formatGs } from "@/lib/format";

const FALLBACK_BG: Record<string, string> = {
  sacos: "#F0C4CB",
  sueteres: "#6B7556",
  remeras: "#FBEAD6",
  bufandas: "#C87D87",
  accesorios: "#E5BCA9",
};

export const revalidate = 0;

export default async function ProductoPage({ params }: { params: { slug: string } }) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();
  const related = await getRelated(p);

  const firstImg = p.images?.[0] ?? "";
  const isUrl = firstImg.startsWith("http") || firstImg.startsWith("/");
  const isColor = firstImg.startsWith("#");
  const fallbackBg = FALLBACK_BG[p.category?.slug ?? ""] ?? "#F0C4CB";
  const bg = isColor ? firstImg : fallbackBg;

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <div className="text-xs text-thyme mb-6">
        <Link href="/">Inicio</Link> · <Link href="/catalogo">Catálogo</Link>
        {p.category && <> · <Link href={`/catalogo?cat=${p.category.slug}`}>{p.category.name}</Link></>}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] rounded-2xl relative overflow-hidden">
            {isUrl ? (
              <ProductImageZoom src={firstImg} alt={p.name} bg={bg} viewTransitionName={`image-${p.slug}`} />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{ background: bg }}
              >
                <div className="absolute top-4 left-4 opacity-25">
                  <Ornament size={70} opacity={0.5} />
                </div>
                <Ornament size={260} opacity={0.75} />
              </div>
            )}
            {p.stock === 0 && (
              <div className="absolute bottom-4 right-4 text-xs uppercase tracking-widest bg-ink/80 text-champagne rounded px-3 py-1.5 z-10">
                Sin stock
              </div>
            )}
          </div>

          {/* Galería mini — variaciones sutiles del color base */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden relative"
                style={{ background: bg }}
              >
                {isUrl && (
                  <Image
                    src={firstImg}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                    style={{ filter: `brightness(${100 - i * 8}%) saturate(${100 - i * 10}%)` }}
                  />
                )}
              </div>
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

          <div className="mt-8">
            <AddToCart product={p} />
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
