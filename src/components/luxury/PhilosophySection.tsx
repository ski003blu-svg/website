import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const modules = [
  {
    id: "PULSE",
    title: "Pulse",
    description: "Real-time data ingestion and event streaming architectures",
    visual: "pulse",
  },
  {
    id: "SIGNAL",
    title: "Signal",
    description: "ML model orchestration, training pipelines, inference at the edge",
    visual: "signal",
  },
  {
    id: "CONTEXT",
    title: "Context",
    description: "Retrieval-augmented generation, knowledge graphs, semantic search",
    visual: "context",
  },
  {
    id: "FORM",
    title: "Form",
    description: "Custom software platforms, APIs, enterprise integrations",
    visual: "form",
  },
];

export function PhilosophySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(36 15% 97%) 0%, hsl(20 12% 6%) 50%, hsl(20 12% 8%) 100%)",
      }}
    >
      {/* Animated background lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            hsl(42 70% 55%) 0px,
            hsl(42 70% 55%) 1px,
            transparent 1px,
            transparent 120px
          )`,
          y: backgroundY,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-sans">
              Our Philosophy
            </span>
            <div className="w-12 h-px bg-white/20" />
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] font-light text-white leading-[0.95] tracking-tight mb-6">
            Systems that
            <br />
            <span className="italic text-white/35">compound</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-sans font-light">
            Layer after layer, complexity distilled into systems that unlock new levels of value
          </p>
        </motion.div>

        {/* Module grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {modules.map((mod, i) => (
            <PhilosophyCard key={mod.id} module={mod} index={i} />
          ))}
        </div>

        {/* Bottom line */}
        <motion.div
          className="mt-24 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function PhilosophyCard({
  module,
  index,
}: {
  module: (typeof modules)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.4, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0.2, 0.5], [30, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-white/6 hover:border-white/12 transition-colors duration-500"
      style={{ opacity, y }}
      initial={{ opacity: 0.4, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, hsl(20 12% 12% / 0.8), hsl(20 12% 8% / 0.9))`,
        }}
      />

      {/* Glow on hover */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(42 60% 50% / 0.08), transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Content */}
      <div className="relative p-8 md:p-10">
        {/* ID badge */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "hsl(42 70% 55%)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
            {module.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-3xl md:text-4xl font-light text-white tracking-tight mb-4">
          {module.title}
        </h3>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed font-sans font-light">
          {module.description}
        </p>

        {/* Visual element */}
        <motion.div
          className="mt-8 h-px overflow-hidden rounded-full"
          style={{ background: "hsl(42 70% 55% / 0.2)" }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, hsl(42 70% 55%), transparent)", width: "60%" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
