"use client";
import { useEffect, useState } from "react";
import { formatGs } from "@/lib/format";

const MIN = 100_000;
const MAX = 2_000_000;
const STEP = 10_000;

export default function PriceRange({
  initialMin,
  initialMax,
}: {
  initialMin?: number;
  initialMax?: number;
}) {
  const [lo, setLo] = useState(initialMin ?? MIN);
  const [hi, setHi] = useState(initialMax ?? MAX);

  useEffect(() => {
    if (lo > hi - STEP) setLo(hi - STEP);
  }, [hi]); // eslint-disable-line
  useEffect(() => {
    if (hi < lo + STEP) setHi(lo + STEP);
  }, [lo]); // eslint-disable-line

  const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-thyme">{formatGs(lo)}</span>
        <span className="text-thyme">{formatGs(hi)}</span>
      </div>

      {/* Track visual con dos thumbs */}
      <div className="relative h-1.5 bg-champagne rounded-full">
        <div
          className="absolute h-full bg-rose rounded-full"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={lo}
          onChange={(e) => setLo(Math.min(Number(e.target.value), hi - STEP))}
          className="range-thumb"
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={hi}
          onChange={(e) => setHi(Math.max(Number(e.target.value), lo + STEP))}
          className="range-thumb"
        />
      </div>

      <input type="hidden" name="min" value={lo} />
      <input type="hidden" name="max" value={hi} />

      <div className="flex items-center justify-between text-[10px] text-thyme/70">
        <span>{formatGs(MIN)}</span>
        <span>{formatGs(MAX)}</span>
      </div>
    </div>
  );
}
