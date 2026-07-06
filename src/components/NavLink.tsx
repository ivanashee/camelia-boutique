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
        className={`group relative text-[11px] uppercase tracking-[0.28em] text-ink hover:text-rose transition-colors pb-3 ${className}`}
      >
        {children}
        {/* Sinusoide floral que se dibuja + florcita central */}
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 right-0 -bottom-1 w-full h-2.5 overflow-visible"
          aria-hidden
        >
          <path
            d="M4 6 C 22 2, 40 9, 50 5 C 60 1, 78 8, 96 6"
            stroke="#C87D87"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
            className="[stroke-dasharray:120] [stroke-dashoffset:120] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-500 ease-out"
          />
          {/* Florcita central */}
          <g
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"
          >
            <circle cx="50" cy="5" r="1.4" fill="#C87D87" />
            <circle cx="46.5" cy="3.6" r="0.7" fill="#C87D87" fillOpacity="0.65" />
            <circle cx="53.5" cy="3.6" r="0.7" fill="#C87D87" fillOpacity="0.65" />
            <circle cx="47" cy="6.6" r="0.55" fill="#C87D87" fillOpacity="0.5" />
            <circle cx="53" cy="6.6" r="0.55" fill="#C87D87" fillOpacity="0.5" />
          </g>
          {/* Puntitos de brote en los extremos */}
          <circle
            cx="4" cy="6" r="1"
            fill="#C87D87"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
          />
          <circle
            cx="96" cy="6" r="1"
            fill="#C87D87"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500"
          />
        </svg>
      </Link>
    );
  }
  return (
    <Link
      {...rest}
      className={`group inline-flex items-center gap-2 text-sm text-champagne/85 hover:text-blush transition-colors ${className}`}
    >
      <span className="text-blush opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">✿</span>
      {children}
    </Link>
  );
}
