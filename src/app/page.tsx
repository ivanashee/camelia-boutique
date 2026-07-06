import Link from "next/link";
import FeaturedStack from "@/components/FeaturedStack";
import Ornament from "@/components/Ornament";
import { RandomLetterSwapPingPong } from "@/components/RandomLetterSwap";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import ScrollOrnament from "@/components/ScrollOrnament";
import { getCategories, getProducts } from "@/lib/data";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero — ornamentos con parallax rotativo al scroll */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(120deg,#F0C4CB 0%,#FBEAD6 50%,#E5BCA9 100%)" }}
      >
        <ScrollOrnament
          className="absolute -top-10 -right-10 opacity-55 pointer-events-none"
          rotate={60}
          y={-80}
        >
          <Ornament size={360} opacity={0.55} />
        </ScrollOrnament>
        <ScrollOrnament
          className="absolute -bottom-16 -left-10 opacity-40 pointer-events-none"
          rotate={-45}
          y={60}
        >
          <div className="rotate-180">
            <Ornament size={280} variant="bud" opacity={0.4} />
          </div>
        </ScrollOrnament>

        <div className="max-w-6xl mx-auto px-5 md:px-8 py-24 md:py-32 relative">
          <Reveal direction="up" className="max-w-xl">
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
          </Reveal>
        </div>
      </section>

      {/* Wordmark animado — reveal en escala */}
      <section className="relative border-y border-champagne bg-cream overflow-hidden">
        <ScrollOrnament
          className="absolute -top-4 -left-4 opacity-40 pointer-events-none hidden md:block"
          rotate={90}
        >
          <Ornament size={140} variant="bud" opacity={0.5} />
        </ScrollOrnament>
        <ScrollOrnament
          className="absolute -bottom-6 -right-6 opacity-40 pointer-events-none hidden md:block"
          rotate={-90}
        >
          <div className="rotate-180">
            <Ornament size={140} variant="bud" opacity={0.5} />
          </div>
        </ScrollOrnament>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14 flex justify-center">
          <Reveal direction="scale" duration={0.9}>
            <RandomLetterSwapPingPong
              label="C A M É L I A"
              className="font-serif text-5xl md:text-8xl text-ink tracking-widest cursor-default select-none"
              staggerDuration={0.03}
            />
          </Reveal>
        </div>
      </section>

      {/* Categorías — stagger de cards */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <Reveal direction="left" y={30}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="eyebrow mb-2">— Categorías</div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Comprá por <span className="italic text-rose">estilo</span>
              </h2>
            </div>
            <Link href="/catalogo" className="text-sm text-thyme border-b border-thyme">Ver todas →</Link>
          </div>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.09}>
          {categories.map((c, i) => (
            <StaggerItem key={c.id}>
              <Link
                href={`/catalogo?cat=${c.slug}`}
                className="group relative block overflow-hidden rounded-2xl p-6 h-40 hover:opacity-95 transition-transform hover:-translate-y-1 duration-500"
                style={{
                  background: ["#F0C4CB", "#FBEAD6", "#E5BCA9", "#6B7556", "#C87D87"][i % 5],
                  color: i >= 3 ? "#FBEAD6" : "#3a2f2a",
                }}
              >
                <div className="absolute top-3 right-3 opacity-30 group-hover:rotate-45 transition-transform duration-700">
                  <Ornament size={80} opacity={0.4} />
                </div>
                <div className="font-serif italic text-xs opacity-70">0{i + 1}</div>
                <div className="font-serif text-xl mt-24">{c.name}</div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Destacados */}
      <section className="bg-champagne/60 relative overflow-hidden">
        <ScrollOrnament
          className="absolute top-10 left-10 opacity-25 pointer-events-none"
          rotate={30}
        >
          <Ornament size={140} variant="spray" opacity={0.3} />
        </ScrollOrnament>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 relative">
          <Reveal direction="right">
            <div className="mb-8">
              <div className="eyebrow mb-2">— Destacados</div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Favoritos de la <span className="italic text-rose">temporada</span>
              </h2>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <FeaturedStack products={featured.slice(0, 8)} />
          </Reveal>
        </div>
      </section>

      {/* Beneficios — stagger */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 border-y border-champagne">
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.12}>
          {[
            { t: "Envíos a todo el país", d: "Coordinado por WhatsApp" },
            { t: "Pago seguro", d: "Transferencia, tarjeta, efectivo" },
            { t: "Cambios sencillos", d: "Hasta 7 días" },
            { t: "Hecho en Paraguay", d: "Talleres locales" },
          ].map((b) => (
            <StaggerItem key={b.t}>
              <div className="flex gap-3 items-start">
                <div className="text-rose">
                  <Ornament size={44} variant="bud" opacity={0.9} />
                </div>
                <div>
                  <div className="font-serif text-base text-ink">{b.t}</div>
                  <div className="text-xs text-thyme mt-0.5">{b.d}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
