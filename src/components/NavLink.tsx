import Link from "next/link";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variant?: "top" | "footer";
};

export default function NavLink({ variant = "top", className = "", children, ...rest }: Props) {
  if (variant === "top") {
    return (
      <Link
        {...rest}
        className={`group relative text-[11px] uppercase tracking-[0.28em] text-ink hover:text-rose transition-colors ${className}`}
      >
        {children}
        <span className="pointer-events-none absolute left-1/2 -bottom-1.5 h-px w-0 bg-rose transition-all duration-300 group-hover:left-0 group-hover:w-full" />
      </Link>
    );
  }
  return (
    <Link
      {...rest}
      className={`group inline-flex items-center gap-2 text-sm text-champagne/85 hover:text-blush transition-colors ${className}`}
    >
      <span className="h-px w-0 bg-blush transition-all duration-300 group-hover:w-4" />
      {children}
    </Link>
  );
}
