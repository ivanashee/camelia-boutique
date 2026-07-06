import Link from "next/link";
import Ornament from "@/components/Ornament";
import ProductCard from "@/components/ProductCard";
import { RandomLetterSwapPingPong } from "@/components/RandomLetterSwap";
import { getCategories, getProducts } from "@/lib/data";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{
        background: "linear-gradient(120deg,#F0C4CB 0%,#FBEAD6 50%,#E5BCA9 100%)"
      }}>
        <div className="absolute -top-10 -right-10 opacity-55 pointer-events-none">
          <Ornament size={360} opacity={0.55} />
        </div>
        <div className="absolute -bottom-16 -left-10 opacity-40 pointer-events-none rotate-180">
          <Ornament size={280} variant="bud" opacity={0.4} />
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-24 md:py-32 relative">
          <div className="max-w-xl">
            <div className="eyebrow mb-5">Colección Otoño · Invierno</div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1] text-ink">
              Prendas que <span className="italic text-rose">florecen</span> con vos.
            </h1>
            <p className="text-muted mt-6 md:text-lg leading-relaxed max-w-md">
              Sacos, suéteres, remeras y bufandas seleccionados a mano. Diseños atemporales,
              telas nobles y hecho en talleres locales.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/catalogo" className="btn-primary">Ver colección</Link>
              <Link href="/catalogo?featured=1" className="btn-outline">Lo más nuevo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wordmark animado — hover para intercambiar letras */}
      <section className="relative border-y border-champagne bg-cream overflow-hidden">
        <div className="absolute -top-4 -left-4 opacity-40 pointer-events-none hidden md:block">
          <Ornament size={140} variant="bud" opacity={0.5} />
        </div>
        <div className="absolute -bottom-6 -right-6 opacity-40 pointer-events-none hidden md:block rotate-180">
          <Ornament size={140} variant="bud" opacity={0.5} />
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14 flex justify-center">
          <RandomLetterSwapPingPong
            label="C A M É L I A"
            className="font-serif text-5xl md:text-8xl text-ink tracking-widest cursor-default select-none"
            staggerDuration={0.03}
          />
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow mb-2">— Categorías</div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              Comprá por <span className="italic text-rose">estilo</span>
            </h2>
          </div>
          <Link href="/catalogo" className="text-sm text-thyme border-b border-thyme">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/catalogo?cat=${c.slug}`}
              className="relative overflow-hidden rounded-2xl p-6 h-40 flex flex-col justify-between hover:opacity-95"
              style={{
                background: ["#F0C4CB", "#FBEAD6", "#E5BCA9", "#6B7556", "#C87D87"][i % 5],
                color: i >= 3 ? "#FBEAD6" : "#3a2f2a",
              }}
            >
              <div className="absolute top-3 right-3 opacity-30">
                <Ornament size={80} opacity={0.4} />
              </div>
              <div className="font-serif italic text-xs opacity-70">0{i + 1}</div>
              <div className="font-serif text-xl">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="bg-champagne/60 relative overflow-hidden">
        <div className="absolute top-10 left-10 opacity-25 pointer-events-none">
          <Ornament size={140} variant="spray" opacity={0.3} />
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 relative">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="eyebrow mb-2">— Destacados</div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Favoritos de la <span className="italic text-rose">temporada</span>
              </h2>
            </div>
            <Link href="/catalogo?featured=1" className="text-sm text-thyme border-b border-thyme">Ver todos →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 border-y border-champagne">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { t: "Envíos a todo el país", d: "Coordinado por WhatsApp" },
            { t: "Pago seguro", d: "Transferencia, tarjeta, efectivo" },
            { t: "Cambios sencillos", d: "Hasta 7 días" },
            { t: "Hecho en Paraguay", d: "Talleres locales" },
          ].map((b) => (
            <div key={b.t} className="flex gap-3 items-start">
              <div className="text-rose"><Ornament size={44} variant="bud" opacity={0.9} /></div>
              <div>
                <div className="font-serif text-base text-ink">{b.t}</div>
                <div className="text-xs text-thyme mt-0.5">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
