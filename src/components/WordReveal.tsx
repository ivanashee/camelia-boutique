"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  delay?: number;
  inline?: boolean;
  stagger?: number;
};

/** Revela palabra por palabra con fade+slide. */
export default function WordReveal({
  text,
  delay = 0,
  inline = false,
  stagger = 0.08,
}: Props) {
  const reduce = useReducedMotion();
  const Wrapper: any = inline ? "span" : "span";

  if (reduce) return <Wrapper>{text}</Wrapper>;

  return (
    <Wrapper style={{ display: inline ? "inline" : "inline-block" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < text.split(" ").length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Wrapper>
  );
}
