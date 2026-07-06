"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFavorites } from "@/lib/favorites-store";

export default function FavoritesBadge() {
  const ids = useFavorites((s) => s.ids);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? ids.length : 0;
  return (
    <Link href="/favoritos" className="relative inline-flex items-center text-ink hover:text-rose transition-colors" aria-label="Favoritos">
      <svg width="20" height="20" viewBox="0 0 24 24" fill={count > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-rose text-white text-[10px] font-medium flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
