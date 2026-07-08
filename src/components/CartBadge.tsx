"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";

export default function CartBadge() {
  const items = useCart((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? items.reduce((a, i) => a + i.qty, 0) : 0;
  return (
    <Link href="/carrito" className="relative inline-flex items-center gap-2 text-ink hover:text-rose">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Bolsa */}
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
        {/* Florcita adentro del cuerpo de la bolsa (bajo el asa y >=14 en Y) */}
        <g stroke="none">
          <ellipse cx="12"   cy="15.5" rx="0.8" ry="1.3" fill="#C87D87" />
          <ellipse cx="13.7" cy="17"   rx="1.3" ry="0.8" fill="#C87D87" />
          <ellipse cx="12"   cy="18.5" rx="0.8" ry="1.3" fill="#C87D87" />
          <ellipse cx="10.3" cy="17"   rx="1.3" ry="0.8" fill="#C87D87" />
          <circle  cx="12"   cy="17"   r="0.75"          fill="#FBEAD6" />
        </g>
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-rose text-white text-[10px] font-medium flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
