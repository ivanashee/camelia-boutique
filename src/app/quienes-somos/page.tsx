import Link from "next/link";
import Ornament from "@/components/Ornament";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import ScrollOrnament from "@/components/ScrollOrnament";

const pillars = [
  {
    title: "Diseños atemporales",
    text: "Colecciones que no siguen microtendencias. Prendas que van a estar en tu placard temporada tras temporada.",
  },
  {
    title: "Hecho en Paraguay",
    text: "Trabajamos con talleres locales, cerca de nuestras diseñadoras. Cada prenda tiene nombre y trazabilidad.",
  },
  {
    title: "Selección artesanal",
    text: "Nada llega por casualidad. Cada tela, cada botón y cada terminación se elige con criterio y cariño.",
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(140deg,#FBEAD6 0%,#F0C4CB 55%,#E5BCA9 100%)" }}
      >
        <ScrollOrnament className="absolute -top-8 -right-6 opacity-55 pointer-events-none" rotate={50} y={-60}>
          <Ornament size={340} opacity={0.6} />
        </ScrollOrnament>
        <ScrollOrnament className="absolute -bottom-16 -left-8 opacity-45 pointer-events-none" rotate={-40} y={40}>
          <div className="rotate-180">
            <Ornament size={260} variant="bud" opacity={0.5} />
          </div>
        </ScrollOrnament>

        <div className="max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32 relative">
          <Reveal>
            <div className="eyebrow mb-4">— Nuestra historia</div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-ink max-w-3xl">
              Prendas con <span className="italic text-rose">alma</span>,
              <br />
              hechas con las manos.
            </h1>
            <p className="text-muted mt-6 md:text-lg max-w-2xl leading-relaxed">
              Camélia nació de la idea de que la ropa puede ser bella, honesta y cercana al mismo tiempo.
              Una boutique donde cada prenda cuenta una historia — de la tela, del taller, y de la mujer que la va a usar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Historia — texto largo con florcita ornamental */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-20 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-40">
          <Ornament size={60} variant="bud" opacity={0.7} />
        </div>

        <Reveal>
          <div className="eyebrow text-center mb-4">— Desde 2024</div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-8">
            El origen de <span className="italic text-rose">Camélia</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-muted md:text-lg leading-relaxed">
            <p>
              Todo empezó en un taller pequeño de Asunción, con una máquina de coser prestada y
              muchas ganas de hacer algo distinto. Queríamos abrir una boutique que se sintiera
              como una carta escrita a mano — cuidada, personal, atemporal.
            </p>
            <p>
              El nombre <span className="italic text-rose font-medium">Camélia</span> viene de
              la flor: elegante, tenaz y con una simetría casi perfecta. Nos gustó como metáfora
              de lo que buscamos en cada prenda — belleza que no grita, pero que se nota.
            </p>
            <p>
              Hoy trabajamos con tres talleres locales, cinco proveedores de tela y una red de
              costureras y bordadoras que le ponen el toque final. Nada de fast fashion. Todo con
              tiempo.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pilares */}
      <section className="bg-champagne/60 relative overflow-hidden">
        <ScrollOrnament className="absolute top-10 -left-6 opacity-30 pointer-events-none" rotate={30}>
          <Ornament size={160} variant="spray" opacity={0.35} />
        </ScrollOrnament>
        <ScrollOrnament className="absolute bottom-10 -right-6 opacity-30 pointer-events-none" rotate={-30}>
          <Ornament size={160} variant="spray" opacity={0.35} />
        </ScrollOrnament>

        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 relative">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow mb-2">— Nuestros pilares</div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Lo que nos <span className="italic text-rose">mueve</span>
              </h2>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-cream border border-champagne rounded-2xl p-8 h-full relative overflow-hidden hover:-translate-y-1 transition-transform duration-500">
                  <div className="absolute -top-4 -right-4 opacity-25">
                    <Ornament size={100} opacity={0.5} />
                  </div>
                  <div className="relative">
                    <Ornament size={44} variant="bud" opacity={0.9} />
                    <h3 className="font-serif text-2xl text-ink mt-4">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-3">{p.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-24 text-center relative">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-30">
          <Ornament size={80} opacity={0.5} />
        </div>
        <Reveal direction="scale">
          <blockquote className="font-serif italic text-2xl md:text-4xl text-ink leading-snug max-w-3xl mx-auto">
            &ldquo;Queremos que cada prenda de Camélia sea la que agarrás sin dudar cuando querés
            sentirte <span className="text-rose">vos misma</span>.&rdquo;
          </blockquote>
          <div className="eyebrow mt-8 text-thyme">— El equipo Camélia</div>
        </Reveal>
      </section>

      {/* CTA final */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-24 text-center">
        <Reveal>
          <div className="bg-thyme text-champagne rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 opacity-25">
              <Ornament
                size={180}
                stroke="#FBEAD6"
                fillOuter="#FBEAD6"
                fillInner="#F0C4CB"
                fillLeaf="#FBEAD6"
                fillCenter="#FBEAD6"
                opacity={0.4}
              />
            </div>
            <div className="relative">
              <div className="eyebrow text-champagne/70 mb-3">— Descubrí más</div>
              <h2 className="font-serif text-3xl md:text-4xl">
                Explorá la <span className="italic text-blush">colección</span>
              </h2>
              <p className="text-sm md:text-base text-champagne/90 mt-4 max-w-xl mx-auto">
                Pasá por el catálogo y encontrá tu próxima prenda favorita.
              </p>
              <div className="mt-8 flex justify-center gap-3 flex-wrap">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 bg-cream text-ink rounded-full px-6 py-3 text-sm uppercase tracking-widest hover:bg-blush transition-colors"
                >
                  Ver catálogo
                </Link>
                <Link
                  href="/catalogo?sale=1"
                  className="inline-flex items-center gap-2 border border-champagne text-champagne rounded-full px-6 py-3 text-sm uppercase tracking-widest hover:bg-champagne hover:text-ink transition-colors"
                >
                  Ver rebajas
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
