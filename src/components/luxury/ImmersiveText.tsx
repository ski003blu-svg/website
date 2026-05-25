import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const phrases = [
  "We build for",
  "organizations that",
  "need infrastructure",
  "to outlast its authors.",
];

export function ImmersiveTextSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        background: "hsl(20 12% 6%)",
        minHeight: "200vh",
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {phrases.map((phrase, i) => (
            <TextLine
              key={phrase}
              phrase={phrase}
              index={i}
              total={phrases.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Ambient glow */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(42 70% 50% / 0.1), transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
}

function TextLine({
  phrase,
  index,
  total,
  scrollYProgress,
}: {
  phrase: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = start + 0.3 / total;

  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end, end + 0.05], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, end], [50, -50]);
  const scale = useTransform(scrollYProgress, [start, end], [0.95, 1.02]);
  const blur = useTransform(scrollYProgress, [start, end], [4, 0]);

  return (
    <motion.div
      className="overflow-visible mb-4"
      style={{ opacity, y, scale, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
    >
      <p
        className={`font-serif font-light tracking-tight ${
          index === total - 1
            ? "text-[clamp(2rem,6vw,5rem)] text-white/60 italic"
            : "text-[clamp(3rem,9vw,8rem)] text-white"
        }`}
        style={{
          lineHeight: 0.95,
        }}
      >
        {phrase}
      </p>
    </motion.div>
  );
}
