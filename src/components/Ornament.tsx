// Camelia Art Nouveau ornada — inspirada en Mucha
// 8 pétalos exteriores + 6 interiores + estambres + hojas con nervadura
// + tallo whiplash + capullo lateral.

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
  size = 140,
  className,
  opacity = 0.75,
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
    strokeWidth: 0.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    style: { opacity },
  };

  if (variant === "bud") {
    return (
      <svg {...common}>
        {/* tallo whiplash */}
        <path d="M50 96 C 42 78, 58 60, 46 42 C 40 30, 54 20, 50 8" />
        {/* hoja pequeña izquierda */}
        <path d="M48 66 C 34 62, 22 52, 18 34 C 34 40, 44 52, 50 68 Z" fill={fillLeaf} opacity={0.28} />
        <path d="M22 40 C 34 48, 42 58, 50 68" strokeWidth={0.4} opacity={0.65} />
        {/* capullo cerrado tipo gota */}
        <path
          d="M50 22 C 44 20, 42 12, 48 8 C 54 6, 58 12, 56 20 C 54 24, 52 24, 50 22 Z"
          fill={fillOuter}
          opacity={0.9}
          stroke={fillInner}
          strokeWidth={0.5}
        />
        <path d="M48 8 C 50 14, 52 18, 54 22" strokeWidth={0.4} stroke={fillInner} opacity={0.7} />
        {/* sépalos verdes */}
        <path
          d="M46 22 C 42 26, 44 32, 50 30 C 56 32, 58 26, 54 22"
          fill={fillLeaf}
          opacity={0.5}
          stroke="none"
        />
      </svg>
    );
  }

  // === CAMELIA COMPLETA ===
  const petalOuter = "M0 0 C -6 -8, -6 -22, 0 -28 C 6 -22, 6 -8, 0 0 Z";
  const petalInner = "M0 0 C -4 -5, -4 -14, 0 -18 C 4 -14, 4 -5, 0 0 Z";
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerAngles = [22, 82, 142, 202, 262, 322];

  return (
    <svg {...common}>
      {/* Tallo whiplash entrando al centro de la flor */}
      <path d="M50 100 C 42 84, 60 68, 50 52 C 42 40, 52 32, 50 24" strokeWidth={0.7} />

      {/* Hoja grande izquierda, con nervadura */}
      <path
        d="M42 74 C 20 72, 6 58, 2 34 C 22 36, 40 50, 46 72 Z"
        fill={fillLeaf}
        opacity={0.3}
        stroke={fillLeaf}
        strokeWidth={0.4}
      />
      <path d="M42 74 C 30 62, 18 52, 6 36" strokeWidth={0.4} opacity={0.7} />
      <path d="M20 46 C 26 50, 32 56, 38 66" strokeWidth={0.3} opacity={0.55} />
      <path d="M14 58 C 20 60, 26 64, 32 70" strokeWidth={0.3} opacity={0.55} />

      {/* Hoja mediana derecha */}
      <path
        d="M56 58 C 74 54, 86 40, 88 20 C 72 24, 60 36, 54 58 Z"
        fill={fillLeaf}
        opacity={0.26}
        stroke={fillLeaf}
        strokeWidth={0.4}
      />
      <path d="M54 58 C 64 50, 74 40, 84 26" strokeWidth={0.4} opacity={0.65} />
      <path d="M70 32 C 68 40, 64 48, 60 54" strokeWidth={0.3} opacity={0.5} />

      {/* Tendril curl abajo derecha */}
      <path
        d="M50 76 C 60 78, 68 82, 74 90 C 78 92, 78 88, 76 86"
        strokeWidth={0.4}
        opacity={0.6}
      />

      {/* 8 pétalos exteriores en rosetón */}
      <g transform="translate(50 32)">
        {angles.map((a) => (
          <path
            key={a}
            d={petalOuter}
            transform={`rotate(${a})`}
            fill={fillOuter}
            fillOpacity={0.75}
            stroke={fillInner}
            strokeWidth={0.45}
          />
        ))}
      </g>

      {/* 6 pétalos interiores desfasados */}
      <g transform="translate(50 32)">
        {innerAngles.map((a) => (
          <path
            key={a}
            d={petalInner}
            transform={`rotate(${a})`}
            fill={fillInner}
            fillOpacity={0.65}
            stroke="none"
          />
        ))}
      </g>

      {/* Disco central */}
      <circle cx="50" cy="32" r="4.5" fill={fillCenter} opacity={0.9} stroke="none" />
      <circle cx="50" cy="32" r="3" fill={fillInner} opacity={0.5} stroke="none" />

      {/* Estambres radiales */}
      <g fill="#FBEAD6" stroke="none">
        <circle cx="46.5" cy="29" r="0.9" />
        <circle cx="53.5" cy="29" r="0.9" />
        <circle cx="46.5" cy="35" r="0.9" />
        <circle cx="53.5" cy="35" r="0.9" />
        <circle cx="50" cy="27.5" r="0.9" />
        <circle cx="50" cy="36.5" r="0.9" />
        <circle cx="44.5" cy="32" r="0.9" />
        <circle cx="55.5" cy="32" r="0.9" />
      </g>

      {/* Capullo lateral (solo en variant spray) */}
      {variant === "spray" && (
        <>
          <path d="M70 62 C 78 60, 82 54, 86 48" strokeWidth={0.4} opacity={0.65} />
          <path
            d="M86 44 C 90 42, 92 48, 88 52 C 84 54, 82 50, 84 46 Z"
            fill={fillOuter}
            opacity={0.85}
            stroke={fillInner}
            strokeWidth={0.4}
          />
          <path
            d="M84 52 C 82 56, 86 58, 88 54"
            fill={fillLeaf}
            opacity={0.5}
            stroke="none"
          />
        </>
      )}
    </svg>
  );
}
