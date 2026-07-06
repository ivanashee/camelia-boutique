// Monograma "C" — logo pequeño de Camélia.
// Círculo doble + brote de camelia arriba + base con florcita.

type Props = {
  size?: number;
  className?: string;
  tone?: "blush" | "rose" | "ink" | "champagne" | "thyme";
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  blush: "#F0C4CB",
  rose: "#C87D87",
  ink: "#3a2f2a",
  champagne: "#FBEAD6",
  thyme: "#6B7556",
};

export default function LogoMark({ size = 48, className = "", tone = "blush" }: Props) {
  const color = TONE[tone];
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size, color }}
      aria-label="Camélia"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        className="absolute inset-0"
      >
        {/* Círculo exterior */}
        <circle cx="30" cy="30" r="27" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
        {/* Círculo interior */}
        <circle cx="30" cy="30" r="23.5" stroke="currentColor" strokeWidth="0.4" opacity="0.35" />

        {/* Brote arriba: tallo + 3 dots */}
        <g opacity="0.9">
          <path
            d="M30 3 C 28 5, 27 7, 27.5 9"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <path
            d="M30 3 C 32 5, 33 7, 32.5 9"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <circle cx="30" cy="2.5" r="1.6" fill="currentColor" />
          <circle cx="26.5" cy="6" r="0.9" fill="currentColor" opacity="0.7" />
          <circle cx="33.5" cy="6" r="0.9" fill="currentColor" opacity="0.7" />
        </g>

        {/* Base: curva + florcita */}
        <g opacity="0.75">
          <path
            d="M20 54 Q 30 58, 40 54"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="30" cy="56" r="1.3" fill="currentColor" />
          <circle cx="26" cy="55" r="0.6" fill="currentColor" opacity="0.6" />
          <circle cx="34" cy="55" r="0.6" fill="currentColor" opacity="0.6" />
        </g>

        {/* Serifs decorativos flanqueando la C */}
        <path
          d="M10 30 Q 12 30, 13 28"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M10 30 Q 12 30, 13 32"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M50 30 Q 48 30, 47 28"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M50 30 Q 48 30, 47 32"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />
      </svg>

      <span
        className="font-serif italic leading-none relative select-none"
        style={{ fontSize: size * 0.52, marginTop: -size * 0.02, color }}
      >
        C
      </span>
    </div>
  );
}
