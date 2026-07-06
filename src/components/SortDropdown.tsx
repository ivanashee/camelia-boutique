"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type Option = { value: string; label: string };

export default function SortDropdown({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: Option[];
  defaultValue?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(defaultValue ?? options[0].value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLabel = options.find((o) => o.value === value)?.label ?? options[0].label;

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(newValue: string) {
    setValue(newValue);
    setOpen(false);
    // Aplica el filtro directo actualizando la URL — sin necesidad
    // de que el usuario apriete otro botón.
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (newValue) params.set(name, newValue);
    else params.delete(name);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-ink hover:text-rose transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-thyme/70">Ordenar:</span>
        <span>{currentLabel}</span>
        <svg
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-3 z-30 w-56 bg-cream border border-champagne rounded-2xl shadow-xl overflow-hidden"
            role="listbox"
          >
            <div className="px-4 py-2 border-b border-champagne/60 bg-champagne/40">
              <div className="eyebrow flex items-center gap-2">
                <span className="text-rose">✿</span>
                Ordenar por
              </div>
            </div>
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => select(opt.value)}
                  className={`w-full text-left px-4 py-3 text-sm font-serif flex items-center justify-between transition-colors border-b border-champagne/40 last:border-b-0 ${
                    active
                      ? "text-rose bg-blush/25"
                      : "text-ink hover:bg-champagne/40 hover:text-rose"
                  }`}
                  role="option"
                  aria-selected={active}
                >
                  <span>{opt.label}</span>
                  {active && <span className="text-rose">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
