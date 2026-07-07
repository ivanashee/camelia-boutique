import NavLink from "./NavLink";
import Ornament from "./Ornament";

/** Pajarito minimalista tipo silueta de golondrina */
function BirdIcon() {
  return (
    <svg
      width="20"
      height="10"
      viewBox="0 0 24 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blush shrink-0"
      aria-hidden
    >
      <path d="M 1 7 C 4 2, 8 2, 12 6" />
      <path d="M 12 6 C 16 2, 20 2, 23 7" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-thyme text-champagne mt-20">
      {/* Ornamento decorativo */}
      <div className="absolute -bottom-10 right-6 opacity-25 pointer-events-none">
        <Ornament
          size={280}
          stroke="#FBEAD6"
          fillOuter="#FBEAD6"
          fillInner="#F0C4CB"
          fillLeaf="#FBEAD6"
          fillCenter="#FBEAD6"
          opacity={0.4}
        />
      </div>
      <div className="absolute -bottom-6 left-6 opacity-20 pointer-events-none rotate-180">
        <Ornament
          size={200}
          variant="bud"
          stroke="#FBEAD6"
          fillOuter="#FBEAD6"
          fillInner="#F0C4CB"
          fillLeaf="#FBEAD6"
          fillCenter="#FBEAD6"
          opacity={0.4}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 relative">
        <div className="col-span-2">
          <div className="font-serif text-4xl mb-3">
            Camélia<span className="text-blush">.</span>
          </div>
          <p className="text-sm text-champagne/85 max-w-sm leading-relaxed">
            Boutique de moda femenina. Prendas atemporales, telas nobles y hecho en Paraguay.
          </p>
          <div className="flex gap-3 mt-6">
            {["Instagram", "Facebook", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] uppercase tracking-widest border border-champagne/30 rounded-full px-3 py-1.5 hover:border-blush hover:text-blush transition"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow text-champagne/70 mb-4 flex items-center gap-2">
            <span className="text-blush">✿</span>
            <span className="flex-1">Tienda</span>
            <BirdIcon />
          </div>
          <ul className="space-y-2.5">
            <li><NavLink variant="footer" href="/catalogo">Catálogo</NavLink></li>
            <li><NavLink variant="footer" href="/catalogo?sale=1">Rebajas</NavLink></li>
            <li><NavLink variant="footer" href="/quienes-somos">Quiénes somos</NavLink></li>
            <li><NavLink variant="footer" href="/favoritos">Favoritos</NavLink></li>
            <li><NavLink variant="footer" href="/carrito">Carrito</NavLink></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-champagne/70 mb-4 flex items-center gap-2">
            <span className="text-blush">✿</span>
            <span className="flex-1">Contacto</span>
            <BirdIcon />
          </div>
          <ul className="space-y-2.5 text-sm text-champagne/85">
            <li>
              <a href="mailto:boutique@gmail.com" className="hover:text-blush transition-colors">
                boutique@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/595981772872" target="_blank" rel="noreferrer" className="hover:text-blush transition-colors">
                +595 981 772 872
              </a>
            </li>
            <li>Asunción, Paraguay</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-champagne/15 relative">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 text-xs text-champagne/70 flex flex-wrap justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} Camélia Boutique — Todos los derechos reservados</span>
          <span>
            Desarrollado por{" "}
            <a href="#" className="text-blush font-medium tracking-wider">
              Neura
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
