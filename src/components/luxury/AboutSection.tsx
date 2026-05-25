import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const principles = [
  {
    n: "01",
    title: "Senior-only delivery",
    body: "Every engagement is staffed with engineers who've shipped at scale. No juniors in the back office.",
  },
  {
    n: "02",
    title: "Working software, every sprint",
    body: "Two-week increments. Demos with running code. Slide decks are for the keynote.",
  },
  {
    n: "03",
    title: "Skin in the game",
    body: "Outcome-based pricing options on request. We win when you win.",
  },
  {
    n: "04",
    title: "Honesty about limits",
    body: "If we're not the right team, we'll tell you and refer you to someone who is.",
  },
];

const stats = [
  { value: "120+", label: "Production deployments" },
  { value: "12", label: "States served" },
  { value: "8 yrs", label: "Avg. team tenure" },
  { value: "100%", label: "Senior engineers" },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl h-full min-h-[440px]">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale: 1.1 }}
      />
    </div>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const headerX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ background: "hsl(36 15% 97%)" }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-6 h-px bg-foreground/30" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-foreground/45 font-sans">
            About Bluski
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start mb-24">
          {/* Left: editorial text */}
          <div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-light text-foreground leading-[0.95] tracking-tight"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Engineering rigor,
                <br />
                <span className="italic text-foreground/40">Midwestern</span>
                <br />
                values.
              </motion.h2>
            </div>

            <motion.div
              className="space-y-5 text-foreground/55 leading-relaxed text-[15px] font-light font-sans max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Bluski Solutions was founded by engineers who had shipped AI and data platforms at
                hyperscale and wanted to bring that discipline home. Iowa builds things — equipment,
                food, finance, insurance — and those things deserve software written with the same
                obsession.
              </p>
              <p>
                Today we partner with manufacturers, agricultural distributors, financial
                institutions, and ambitious startups. Senior-only by design: no SDR funnels, no
                junior pyramid, just engineers shipping production work.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-x-10 gap-y-8 mt-14"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="font-serif text-4xl font-light text-foreground tracking-tight">
                    {value}
                  </div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mt-1 font-sans">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: parallax image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ParallaxImage
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Bluski team at work"
            />
          </motion.div>
        </div>

        {/* Principles */}
        <div className="border-t border-foreground/8 pt-16">
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-serif text-xl font-light text-foreground/60 italic">
              How we work
            </span>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-mono text-[10px] text-foreground/25 tracking-widest mb-4">
                  {p.n}
                </div>
                <h3 className="font-serif text-lg font-light text-foreground mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed font-light font-sans">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
