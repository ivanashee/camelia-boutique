"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * Wrapper de next/link que dispara document.startViewTransition() antes
 * de navegar. Si el browser no soporta la API, cae en el Link normal.
 */
export default function TransitionLink(props: ComponentProps<typeof Link>) {
  const router = useRouter();
  const { href, onClick, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e as any);
    if (e.defaultPrevented) return;
    if (typeof href !== "string") return;
    // Modificadores: dejar que el browser abra en tab nueva, etc.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (typeof doc.startViewTransition === "function") {
      e.preventDefault();
      doc.startViewTransition(() => {
        router.push(href);
      });
    }
  };

  return <Link {...rest} href={href} onClick={handleClick} />;
}
