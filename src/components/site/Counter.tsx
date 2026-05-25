import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Parses prefix/number/suffix from "22%", "120+", "14ms", "3.4x", "8 yrs" */
function parseValue(v: string) {
  const m = v.match(/^([^\d-.]*)([\d.]+)(.*)$/);
  if (!m) return { prefix: "", n: 0, suffix: v, decimals: 0 };
  const numStr = m[2];
  return {
    prefix: m[1] ?? "",
    n: parseFloat(numStr),
    suffix: m[3] ?? "",
    decimals: numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0,
  };
}

export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, n, suffix, decimals } = parseValue(value);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const display = useTransform(spring, (latest) => latest.toFixed(decimals));
  const [text, setText] = useState("0");

  useEffect(() => {
    if (inView) mv.set(n);
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [inView, n, mv, display]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
