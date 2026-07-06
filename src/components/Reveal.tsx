"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale" | "fade";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
  duration?: number;
  className?: string;
};

const buildVariants = (direction: Direction, y: number): Variants => {
  switch (direction) {
    case "up":
      return { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { opacity: 0, x: -y }, visible: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: y }, visible: { opacity: 1, x: 0 } };
    case "scale":
      return { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } };
    default:
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  }
};

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  direction = "up",
  once = true,
  amount = 0.2,
  duration = 0.7,
  className,
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={buildVariants(direction, y)}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper para stagger — hijos se revelan en cascada. Usá <Reveal.Item /> dentro. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 30,
  className,
}: {
  children: ReactNode;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
