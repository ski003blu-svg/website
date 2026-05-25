import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    index: "01",
    name: "Grain Corridor OS",
    category: "AI · Logistics",
    year: "2025",
    description:
      "Multi-agent orchestration system re-routing 1,200 carriers in real time. 22% fuel reduction, 14ms decision latency.",
    metric: "22% fuel saved",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1600",
    color: "hsl(36 25% 92%)",
  },
  {
    index: "02",
    name: "Underwriter Copilot",
    category: "LLM · Finance",
    year: "2025",
    description:
      "Retrieval-augmented workflow that drafts complete credit memos with cited sources. 4.1× throughput, zero hallucinations.",
    metric: "4.1× throughput",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
    color: "hsl(20 15% 90%)",
  },
  {
    index: "03",
    name: "Vision QA Cell",
    category: "Computer Vision",
    year: "2024",
    description:
      "Edge-deployed vision system catching micro-defects at 240 ppm. 60× faster than human inspection, 0.03% defect rate.",
    metric: "0.03% defect rate",
    image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1600",
    color: "hsl(42 30% 90%)",
  },
  {
    index: "04",
    name: "Yield Atlas",
    category: "Geospatial AI",
    year: "2024",
    description:
      "Satellite-fed predictive yield platform across 2.4M acres. Seasonal forecasts with 94% accuracy, +11% average yield.",
    metric: "+11% avg yield",
    image: "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1600",
    color: "hsl(30 20% 91%)",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ background: project.color, boxShadow: "var(--shadow-card)" }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ y }}
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 40%, hsl(20 12% 8% / 0.7))" }}
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.5 }}
        />

        {/* Hover content */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 p-8 flex flex-col justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white/80 text-sm leading-relaxed max-w-sm font-light">
                {project.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrow */}
        <motion.div
          className="absolute top-5 right-5 size-9 rounded-full bg-white/90 flex items-center justify-center"
          animate={{ scale: hovered ? 1 : 0, rotate: hovered ? 0 : -45 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUpRight className="size-4 text-foreground" />
        </motion.div>
      </div>

      {/* Card footer */}
      <div className="px-7 py-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono tracking-widest text-foreground/40 uppercase">
              {project.index}
            </span>
            <span className="w-4 h-px bg-foreground/25" />
            <span className="text-[10px] font-mono tracking-widest text-foreground/40 uppercase">
              {project.category}
            </span>
          </div>
          <h3 className="font-serif text-xl font-light text-foreground tracking-tight">
            {project.name}
          </h3>
        </div>
        <div className="text-right">
          <div className="font-serif text-2xl font-light text-foreground/70 tracking-tight">
            {project.metric.split(" ")[0]}
          </div>
          <div className="text-[10px] tracking-widest uppercase text-foreground/35 mt-0.5">
            {project.metric.split(" ").slice(1).join(" ")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-28 md:py-40" style={{ background: "hsl(36 15% 97%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-xl">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-6 h-px bg-foreground/30" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-foreground/45 font-sans">
                Selected work · 2019–2026
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-foreground leading-[0.95] tracking-tight"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Engineering
                <br />
                <span className="italic text-foreground/40">that ships.</span>
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="text-foreground/55 text-sm leading-relaxed max-w-xs font-light font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            A curated cross-section of production systems. Real architecture, real constraints,
            measured outcomes.
          </motion.p>
        </div>

        {/* Grid: 2-col on large, 1-col on small */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} index={i} />
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href="/case-studies"
            className="inline-flex items-center gap-3 text-sm font-medium text-foreground/55 hover:text-foreground transition-colors group"
          >
            View all case studies
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
