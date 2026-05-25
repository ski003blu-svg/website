import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const phrases = [
  { text: "RHYTHM IN CHAOS", delay: 0 },
  { text: "ORDER IN FLUX", delay: 0.15 },
  { text: "CLARITY FROM COMPLEXITY", delay: 0.3 },
];

export function CinematicIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mouse parallax
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(20 12% 6%)" }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(42 70% 50% / 0.15), transparent 60%)",
          filter: "blur(100px)",
          x: mouseX,
          y: mouseY,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(200 30% 30% / 0.1), transparent 60%)",
          filter: "blur(80px)",
          x: useTransform(mouseX, (v) => -v * 0.5),
          y: useTransform(mouseY, (v) => -v * 0.5),
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ opacity, scale, y }}
      >
        {/* Top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px mx-auto mb-16"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(42 70% 55%), transparent)",
          }}
        />

        {/* Conceptual phrases */}
        <div className="space-y-6">
          {phrases.map((phrase, i) => (
            <motion.div
              key={phrase.text}
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + phrase.delay, duration: 0.8 }}
            >
              <motion.p
                className="font-serif text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] text-white/70"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.6 + phrase.delay,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {phrase.text}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Bottom descriptor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20"
        >
          <p className="text-white/25 text-xs tracking-[0.4em] uppercase font-sans max-w-md mx-auto leading-relaxed">
            Layer after layer, complexity distilled into systems that unlock new levels of value
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-24 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] tracking-[0.5em] uppercase text-white/20">Scroll</span>
          <motion.div
            className="w-px h-12 overflow-hidden"
            style={{ background: "linear-gradient(180deg, hsl(42 70% 55% / 0.4), transparent)" }}
          >
            <motion.div
              className="w-full h-4 bg-white/30"
              animate={{ y: [-16, 48] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, hsl(36 15% 97%) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
