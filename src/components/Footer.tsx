import NavLink from "./NavLink";
import Ornament from "./Ornament";

/** Mariposa minimalista — 4 alas ovaladas + cuerpo */
function ButterflyIcon() {
  return (
    <svg
      width="18"
      height="15"
      viewBox="0 0 24 20"
      className="text-blush shrink-0"
      aria-hidden
    >
      {/* cuerpo */}
      <ellipse cx="12" cy="10" rx="0.7" ry="7" fill="currentColor" opacity="0.55" />
      {/* ala superior izq */}
      <ellipse cx="7" cy="7" rx="5" ry="3.5" transform="rotate(-25 7 7)" fill="currentColor" opacity="0.85" />
      {/* ala superior der */}
      <ellipse cx="17" cy="7" rx="5" ry="3.5" transform="rotate(25 17 7)" fill="currentColor" opacity="0.85" />
      {/* ala inferior izq */}
      <ellipse cx="8" cy="14" rx="3.5" ry="2.5" transform="rotate(20 8 14)" fill="currentColor" opacity="0.7" />
      {/* ala inferior der */}
      <ellipse cx="16" cy="14" rx="3.5" ry="2.5" transform="rotate(-20 16 14)" fill="currentColor" opacity="0.7" />
      {/* antenas */}
      <path d="M 12 3.5 C 11 2, 10.5 2, 10.5 3" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
      <path d="M 12 3.5 C 13 2, 13.5 2, 13.5 3" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
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
            <span>Tienda</span>
            <ButterflyIcon />
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
            <span>Contacto</span>
            <ButterflyIcon />
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
