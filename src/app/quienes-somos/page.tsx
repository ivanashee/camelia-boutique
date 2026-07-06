import Link from "next/link";
import Ornament from "@/components/Ornament";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import ScrollOrnament from "@/components/ScrollOrnament";
import SpinningOrnament from "@/components/SpinningOrnament";
import WordReveal from "@/components/WordReveal";

const pillars = [
  { title: "Atemporal", text: "Prendas que no siguen microtendencias." },
  { title: "Local", text: "Talleres paraguayos, cerca nuestro." },
  { title: "Artesanal", text: "Selección cuidada, prenda por prenda." },
];

export default function QuienesSomosPage() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(140deg,#FBEAD6 0%,#F0C4CB 55%,#E5BCA9 100%)" }}
      >
        <ScrollOrnament className="absolute -top-8 -right-8 opacity-55 pointer-events-none" rotate={70} y={-50}>
          <Ornament size={340} opacity={0.6} />
        </ScrollOrnament>
        <SpinningOrnament className="absolute -bottom-12 -left-8 opacity-45 pointer-events-none" duration={40}>
          <div className="rotate-180">
            <Ornament size={220} variant="bud" opacity={0.5} />
          </div>
        </SpinningOrnament>

        <div className="max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32 relative">
          <Reveal>
            <div className="eyebrow mb-4">— Nuestra historia</div>
          </Reveal>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-ink max-w-3xl">
            <WordReveal text="Prendas con" />
            <span className="italic text-rose"> <WordReveal text="alma," delay={0.3} inline /></span>
            <br />
            <WordReveal text="hechas con las manos." delay={0.6} />
          </h1>
        </div>
      </section>

      {/* ═══ Historia corta ═══ */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-20 relative text-center">
        <SpinningOrnament className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-50" duration={30}>
          <Ornament size={70} variant="bud" opacity={0.8} />
        </SpinningOrnament>

        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mt-4">
            El origen de <span className="italic text-rose">Camélia</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-muted md:text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
            Camélia nació en un taller pequeño de Asunción, con una máquina prestada
            y muchas ganas. Buscamos que cada prenda se sienta como una carta escrita
            a mano — cuidada, personal, atemporal.
          </p>
        </Reveal>
      </section>

      {/* ═══ Pilares ═══ */}
      <section className="bg-champagne/60 relative overflow-hidden">
        <SpinningOrnament className="absolute top-10 -left-6 opacity-25 pointer-events-none" duration={45}>
          <Ornament size={160} variant="spray" opacity={0.35} />
        </SpinningOrnament>
        <SpinningOrnament className="absolute bottom-10 -right-6 opacity-25 pointer-events-none" duration={45} reverse>
          <Ornament size={160} variant="spray" opacity={0.35} />
        </SpinningOrnament>

        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20 relative">
          <Reveal>
            <div className="text-center mb-10">
              <div className="eyebrow mb-2">— Nuestros pilares</div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Lo que nos <span className="italic text-rose">mueve</span>
              </h2>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4" stagger={0.13}>
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group bg-cream border border-champagne rounded-2xl p-8 h-full relative overflow-hidden hover:-translate-y-2 hover:rotate-[-1deg] transition-all duration-500">
                  <div className="absolute -top-6 -right-6 opacity-25 group-hover:opacity-45 group-hover:rotate-45 transition-all duration-700">
                    <Ornament size={110} opacity={0.55} />
                  </div>
                  <div className="relative">
                    <Ornament size={40} variant="bud" opacity={0.95} />
                    <h3 className="font-serif text-2xl text-ink mt-4">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-2">{p.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ Quote ═══ */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-20 text-center relative">
        <SpinningOrnament className="absolute top-4 left-1/2 -translate-x-1/2 opacity-25" duration={25}>
          <Ornament size={72} opacity={0.55} />
        </SpinningOrnament>
        <Reveal direction="scale" duration={1}>
          <blockquote className="font-serif italic text-2xl md:text-3xl text-ink leading-snug mt-8">
            &ldquo;Que cada prenda sea la que agarrás sin dudar cuando querés sentirte{" "}
            <span className="text-rose">vos misma</span>.&rdquo;
          </blockquote>
          <div className="eyebrow mt-6 text-thyme">— Equipo Camélia</div>
        </Reveal>
      </section>

      {/* ═══ CTA compacto ═══ */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-20">
        <Reveal>
          <div className="bg-thyme text-champagne rounded-3xl p-8 md:p-10 relative overflow-hidden text-center">
            <SpinningOrnament className="absolute -top-6 -right-6 opacity-25" duration={35}>
              <Ornament
                size={160}
                stroke="#FBEAD6"
                fillOuter="#FBEAD6"
                fillInner="#F0C4CB"
                fillLeaf="#FBEAD6"
                fillCenter="#FBEAD6"
                opacity={0.5}
              />
            </SpinningOrnament>
            <div className="relative">
              <h2 className="font-serif text-3xl md:text-4xl">
                Explorá la <span className="italic text-blush">colección</span>
              </h2>
              <div className="mt-6 flex justify-center gap-3 flex-wrap">
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
