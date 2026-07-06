// Camelia Art Nouveau reutilizable — versión simple.
// Props: size, color, opacity, variant.
type Props = {
  size?: number;
  className?: string;
  opacity?: number;
  stroke?: string;
  fillOuter?: string;
  fillInner?: string;
  fillLeaf?: string;
  fillCenter?: string;
  variant?: "camelia" | "bud" | "spray";
};

export default function Ornament({
  size = 120,
  className,
  opacity = 0.5,
  stroke = "#6B7556",
  fillOuter = "#F0C4CB",
  fillInner = "#C87D87",
  fillLeaf = "#6B7556",
  fillCenter = "#6B7556",
  variant = "camelia",
}: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    stroke,
    strokeWidth: 0.6,
    strokeLinecap: "round" as const,
    className,
    style: { opacity },
  };

  if (variant === "bud") {
    return (
      <svg {...common}>
        <path d="M50 92 C 44 74, 60 60, 50 40 C 44 28, 54 20, 50 8" />
        <path d="M50 62 C 34 58, 22 44, 18 24 C 38 30, 50 44, 54 62 Z" fill={fillLeaf} opacity={0.22} />
        <circle cx="50" cy="12" r="4" fill={fillOuter} opacity={0.7} stroke={fillInner} strokeWidth={0.4} />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M50 92 C 46 78, 58 68, 50 52" />
      <path
        d="M46 74 C 32 72, 22 62, 20 48 C 34 50, 44 60, 48 74 Z"
        fill={fillLeaf}
        opacity={0.25}
        stroke={fillLeaf}
        strokeWidth={0.4}
      />
      {variant === "spray" && (
        <path
          d="M54 62 C 66 58, 76 48, 76 34 C 62 38, 54 48, 52 60 Z"
          fill={fillLeaf}
          opacity={0.2}
          stroke={fillLeaf}
          strokeWidth={0.4}
        />
      )}
      <path
        d="M50 14 C 64 12, 74 24, 72 38 C 82 44, 78 60, 66 64 C 56 70, 44 66, 42 58 C 32 60, 24 50, 28 40 C 30 30, 42 26, 48 30 C 44 20, 52 12, 50 14 Z"
        fill={fillOuter}
        opacity={0.65}
        stroke={fillInner}
        strokeWidth={0.5}
      />
      <path
        d="M50 28 C 60 28, 66 38, 62 46 C 66 54, 58 62, 50 58 C 42 62, 34 54, 38 46 C 34 38, 40 28, 50 28 Z"
        fill={fillInner}
        opacity={0.5}
        stroke="none"
      />
      <circle cx="50" cy="46" r="3.5" fill={fillCenter} opacity={0.75} stroke="none" />
      <circle cx="48" cy="44" r="0.9" fill="#FBEAD6" stroke="none" />
      <circle cx="52" cy="44" r="0.9" fill="#FBEAD6" stroke="none" />
    </svg>
  );
}
