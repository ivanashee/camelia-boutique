import NavLink from "./NavLink";
import Ornament from "./Ornament";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-thyme text-champagne mt-20">
      {/* Franja curva superior con camelias */}
      <div className="relative border-b border-champagne/15">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 flex items-center justify-center gap-4 opacity-80">
          <div className="h-px bg-champagne/30 flex-1 max-w-[120px]" />
          <span className="text-blush text-lg">✿</span>
          <span className="eyebrow tracking-[0.35em] text-champagne/80">Camélia Boutique</span>
          <span className="text-blush text-lg">✿</span>
          <div className="h-px bg-champagne/30 flex-1 max-w-[120px]" />
        </div>
      </div>

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
            <span className="text-blush">✿</span> Tienda
          </div>
          <ul className="space-y-2.5">
            <li><NavLink variant="footer" href="/catalogo">Catálogo</NavLink></li>
            <li><NavLink variant="footer" href="/catalogo?sale=1">Rebajas</NavLink></li>
            <li><NavLink variant="footer" href="/favoritos">Favoritos</NavLink></li>
            <li><NavLink variant="footer" href="/carrito">Carrito</NavLink></li>
            <li><NavLink variant="footer" href="/admin">Admin</NavLink></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-champagne/70 mb-4 flex items-center gap-2">
            <span className="text-blush">✿</span> Contacto
          </div>
          <ul className="space-y-2.5 text-sm text-champagne/85">
            <li>hola@camelia.py</li>
            <li>+595 981 000 000</li>
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
