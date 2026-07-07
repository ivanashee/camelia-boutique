import Image from "next/image";
import Link from "next/link";
import FeaturedStack from "@/components/FeaturedStack";
import Ornament from "@/components/Ornament";
import { RandomLetterSwapPingPong } from "@/components/RandomLetterSwap";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import ScrollOrnament from "@/components/ScrollOrnament";
import SpinningOrnament from "@/components/SpinningOrnament";
import HeroFlorece from "@/components/HeroFlorece";
import { getCategories, getProducts } from "@/lib/data";

// Fotos por categoría — Unsplash. Se aplican con mix-blend-luminosity
// para que el color del cuadrado siga siendo el que manda.
const CATEGORY_IMG: Record<string, string> = {
  sacos: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
  sueteres: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
  remeras: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  bufandas: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=80",
  accesorios: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
};

export const revalidate = 0;

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero — editorial con marker vertical + capas de ornamentos */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(120deg,#F0C4CB 0%,#FBEAD6 50%,#E5BCA9 100%)" }}
      >
        {/* Ornamentos con parallax */}
        <ScrollOrnament
          className="absolute -top-16 -right-16 opacity-55 pointer-events-none"
          rotate={60}
          y={-80}
        >
          <Ornament size={420} opacity={0.6} />
        </ScrollOrnament>
        <SpinningOrnament
          className="absolute top-1/3 right-1/4 opacity-25 pointer-events-none hidden md:block"
          duration={38}
        >
          <Ornament size={150} variant="bud" opacity={0.35} />
        </SpinningOrnament>
        <ScrollOrnament
          className="absolute -bottom-16 -left-10 opacity-40 pointer-events-none"
          rotate={-45}
          y={60}
        >
          <div className="rotate-180">
            <Ornament size={280} variant="bud" opacity={0.4} />
          </div>
        </ScrollOrnament>

        {/* ═══ MÁS FLORES ANIMADAS ═══ */}
        {/* Camelia mediana rotando reverse en el borde inferior derecho */}
        <SpinningOrnament
          className="absolute bottom-4 right-8 opacity-40 pointer-events-none hidden md:block"
          duration={52}
          reverse
        >
          <Ornament size={130} variant="spray" opacity={0.5} />
        </SpinningOrnament>

        {/* Bud chico girando rápido, arriba a la izquierda */}
        <SpinningOrnament
          className="absolute top-12 left-1/3 opacity-30 pointer-events-none hidden md:block"
          duration={24}
        >
          <Ornament size={70} variant="bud" opacity={0.45} />
        </SpinningOrnament>

        {/* Camelia mini flotando cerca del CTA */}
        <SpinningOrnament
          className="absolute bottom-24 left-1/2 opacity-25 pointer-events-none hidden md:block"
          duration={30}
          reverse
        >
          <Ornament size={80} opacity={0.4} />
        </SpinningOrnament>

        {/* Bud extra chico en la esquina superior derecha */}
        <SpinningOrnament
          className="absolute top-8 right-1/3 opacity-30 pointer-events-none"
          duration={20}
          reverse
        >
          <Ornament size={50} variant="bud" opacity={0.5} />
        </SpinningOrnament>

        {/* Camelia mini abajo — visible también en mobile */}
        <SpinningOrnament
          className="absolute bottom-8 right-4 opacity-25 pointer-events-none md:hidden"
          duration={32}
        >
          <Ornament size={70} variant="bud" opacity={0.4} />
        </SpinningOrnament>


        {/* Corner marks — top-left + top-right */}
        <div className="hidden md:block absolute top-8 left-12 opacity-50">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="#6B7556" strokeWidth="1" strokeLinecap="round">
            <path d="M2 2 L 14 2 M 2 2 L 2 14" />
          </svg>
        </div>
        <div className="hidden md:block absolute top-8 right-8 opacity-50">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="#6B7556" strokeWidth="1" strokeLinecap="round">
            <path d="M38 2 L 26 2 M 38 2 L 38 14" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20 relative">
          <Reveal direction="up" className="max-w-xl relative">
            {/* Eyebrow con rule */}
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-8 bg-thyme/60" />
              <div className="eyebrow">Colección Otoño · Invierno 2026</div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-ink">
              Prendas que <HeroFlorece /> con vos.
            </h1>

            {/* Divider floral */}
            <div className="flex items-center gap-2 mt-4">
              <span className="block h-px w-6 bg-rose/40" />
              <span className="text-rose text-sm">✿</span>
              <span className="block h-px w-6 bg-rose/40" />
            </div>

            <p className="text-muted mt-4 text-sm md:text-base leading-relaxed max-w-md">
              Sacos, suéteres, remeras y bufandas seleccionados a mano. Diseños atemporales,
              telas nobles y hecho en talleres locales.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/catalogo" className="group btn-primary inline-flex items-center gap-2">
                <span>Ver colección</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/catalogo?featured=1" className="btn-outline">
                Lo más nuevo
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Corner marks — bottom */}
        <div className="hidden md:block absolute bottom-8 left-12 opacity-50">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="#6B7556" strokeWidth="1" strokeLinecap="round">
            <path d="M2 38 L 14 38 M 2 38 L 2 26" />
          </svg>
        </div>
        <div className="hidden md:block absolute bottom-8 right-8 opacity-50">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="#6B7556" strokeWidth="1" strokeLinecap="round">
            <path d="M38 38 L 26 38 M 38 38 L 38 26" />
          </svg>
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
              className="font-serif text-3xl sm:text-5xl md:text-8xl text-ink tracking-[0.15em] md:tracking-widest cursor-default select-none"
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
            {/* Botón 'Ver todas' con animación floral */}
            <Link
              href="/catalogo"
              className="group relative inline-flex items-center gap-2 text-sm text-thyme hover:text-rose transition-colors pb-1.5"
            >
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-rose">
                ✿
              </span>
              <span className="tracking-wide">Ver todas</span>
              <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
              {/* Línea inferior que se pinta de rosa progresivamente */}
              <span className="absolute left-0 bottom-0 h-px w-full bg-thyme" />
              <span className="absolute left-0 bottom-0 h-px w-0 bg-rose group-hover:w-full transition-all duration-500 ease-out" />
              {/* Puntito floral que aparece al final */}
              <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500" />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.09}>
          {categories.map((c, i) => {
            const bg = ["#F0C4CB", "#FBEAD6", "#E5BCA9", "#6B7556", "#C87D87"][i % 5];
            // Decisión por slug (no por índice) porque las fotos oscurecen
            // ciertas cards independientemente del color de fondo base.
            const needsWhite = ["bufandas", "sueteres", "remeras"].includes(c.slug);
            const isDark = needsWhite || i >= 3;
            const img = CATEGORY_IMG[c.slug];
            const textColor = needsWhite ? "#FFFFFF" : (i >= 3 ? "#FFFFFF" : "#3a2f2a");
            return (
              <StaggerItem key={c.id}>
                <Link
                  href={`/catalogo?cat=${c.slug}`}
                  className="group relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 h-40 md:h-48 hover:-translate-y-1 transition-transform duration-500"
                  style={{
                    background: bg,
                    color: textColor,
                  }}
                >
                  {/* Foto de fondo — mix-blend-luminosity conserva el color */}
                  {img && (
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                        isDark
                          ? "mix-blend-soft-light opacity-80 group-hover:opacity-100"
                          : "mix-blend-luminosity opacity-70 group-hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                        priority={i < 2}
                      />
                    </div>
                  )}

                  {/* Gradiente sutil para que el texto se lea */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isDark
                        ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.12) 100%)",
                    }}
                  />

                  {/* Ornamento */}
                  <div className="absolute top-3 right-3 opacity-40 group-hover:rotate-45 group-hover:opacity-70 transition-all duration-700">
                    <Ornament
                      size={80}
                      opacity={0.5}
                      stroke={isDark ? "#FBEAD6" : "#6B7556"}
                      fillOuter={isDark ? "#FBEAD6" : "#F0C4CB"}
                      fillInner={isDark ? "#F0C4CB" : "#C87D87"}
                      fillLeaf={isDark ? "#FBEAD6" : "#6B7556"}
                      fillCenter={isDark ? "#FBEAD6" : "#6B7556"}
                    />
                  </div>

                  <div
                    className="relative font-serif text-xl md:text-2xl drop-shadow-md"
                    style={{ color: textColor }}
                  >
                    {c.name}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
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
