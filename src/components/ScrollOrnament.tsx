"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  rotate?: number;   // grados totales de rotación mientras se scrollea
  y?: number;        // desplazamiento vertical en px
  scale?: [number, number]; // [inicial, final]
  range?: [number, number]; // rango de scrollY (px) donde se aplica la interpolación
};

export default function ScrollOrnament({
  children,
  className,
  rotate = 45,
  y = 0,
  scale,
  range = [0, 1400],
}: Props) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rot = useTransform(scrollY, range, [0, rotate]);
  const ty = useTransform(scrollY, range, [0, y]);
  const sc = useTransform(scrollY, range, scale ?? [1, 1]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ rotate: rot, y: ty, scale: sc }}>
      {children}
    </motion.div>
  );
}
