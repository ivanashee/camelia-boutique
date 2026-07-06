"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  duration?: number; // segundos de una vuelta completa
  reverse?: boolean;
};

/** Ornamento que gira continuamente (loop lineal) para dar vida a los fondos. */
export default function SpinningOrnament({
  children,
  className,
  duration = 30,
  reverse = false,
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
