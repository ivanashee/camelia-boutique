import Link from "next/link";
import Ornament from "./Ornament";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-thyme text-champagne mt-20">
      <div className="absolute -bottom-10 right-10 opacity-25 pointer-events-none">
        <Ornament size={220} stroke="#FBEAD6" fillOuter="#FBEAD6" fillInner="#FBEAD6" fillLeaf="#FBEAD6" fillCenter="#FBEAD6" opacity={0.4} />
      </div>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 relative">
        <div className="col-span-2">
          <div className="font-serif text-3xl mb-3">Camélia<span className="text-blush">.</span></div>
          <p className="text-sm opacity-85 max-w-sm leading-relaxed">
            Boutique de moda femenina. Prendas atemporales, telas nobles y hecho en Paraguay.
          </p>
        </div>
        <div>
          <div className="eyebrow text-champagne/70 mb-3">Tienda</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalogo">Catálogo</Link></li>
            <li><Link href="/catalogo?featured=1">Destacados</Link></li>
            <li><Link href="/carrito">Carrito</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-champagne/70 mb-3">Contacto</div>
          <ul className="space-y-2 text-sm">
            <li>hola@camelia.py</li>
            <li>+595 981 000 000</li>
            <li>Asunción, Paraguay</li>
            <li className="flex gap-3 pt-2">
              <a aria-label="Instagram" href="#" className="hover:text-blush">Instagram</a>
              <a aria-label="Facebook" href="#" className="hover:text-blush">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-champagne/20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 text-xs opacity-80 flex justify-between">
          <span>© {new Date().getFullYear()} Camélia Boutique</span>
          <span>Desarrollado por <strong className="text-blush">Neura</strong></span>
        </div>
      </div>
    </footer>
  );
}
