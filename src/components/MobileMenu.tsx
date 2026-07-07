"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Ornament from "./Ornament";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?sale=1", label: "Rebajas", accent: true },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/carrito", label: "Carrito" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Cerrar con Escape + bloquear scroll de fondo
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa — sólo mobile */}
      <button
        aria-label="Abrir menú"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex flex-col items-center justify-center gap-[5px] text-ink hover:text-rose transition-colors"
      >
        <span className="block w-6 h-px bg-current" />
        <span className="block w-6 h-px bg-current" />
        <span className="block w-4 h-px bg-current ml-auto" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm md:hidden"
            />

            {/* Drawer derecho */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm bg-cream text-ink shadow-2xl md:hidden overflow-hidden flex flex-col"
              style={{ height: "100dvh" }}
            >
              {/* Ornamento decorativo esquina */}
              <div className="absolute -top-6 -right-6 opacity-45 pointer-events-none">
                <Ornament size={200} opacity={0.55} />
              </div>
              <div className="absolute -bottom-8 -left-8 opacity-40 pointer-events-none rotate-180">
                <Ornament size={180} variant="bud" opacity={0.5} />
              </div>

              {/* Header del drawer */}
              <div className="relative flex items-center justify-between p-6 border-b border-champagne">
                <div>
                  <div className="font-serif text-3xl leading-none">
                    Camélia<span className="text-rose">.</span>
                  </div>
                  <div className="eyebrow text-[9px] tracking-[0.4em] mt-1">Boutique · Py</div>
                </div>
                <button
                  aria-label="Cerrar menú"
                  onClick={() => setOpen(false)}
                  className="rounded-full w-10 h-10 flex items-center justify-center border border-champagne hover:border-rose hover:text-rose transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </div>

              {/* Divider ornamental */}
              <div className="relative flex items-center justify-center gap-3 pt-6 pb-2 opacity-80">
                <div className="h-px w-14 bg-thyme/40" />
                <span className="text-rose">✿</span>
                <div className="h-px w-14 bg-thyme/40" />
              </div>

              {/* Links */}
              <nav className="relative flex-1 overflow-y-auto px-6 py-4">
                <ul className="space-y-1">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center justify-between py-4 border-b border-champagne/60 ${
                          l.accent ? "text-rose" : "text-ink hover:text-rose"
                        } transition-colors`}
                      >
                        <span className="font-serif text-2xl">{l.label}</span>
                        <span className="text-thyme group-hover:text-rose group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Redes */}
                <div className="mt-8">
                  <div className="eyebrow text-thyme mb-3">Seguinos</div>
                  <div className="flex flex-wrap gap-2">
                    {["Instagram", "Facebook", "TikTok"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="text-[11px] uppercase tracking-widest border border-thyme/40 rounded-full px-3 py-1.5 hover:border-rose hover:text-rose transition-colors"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Footer del drawer */}
              <div className="relative border-t border-champagne px-6 py-4 flex items-center justify-between text-[10px] text-thyme">
                <span>© Camélia Boutique</span>
                <span>
                  by <span className="text-rose font-medium">Neura</span>
                </span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
