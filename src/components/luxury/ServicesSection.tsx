import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const services = [
  {
    slug: "ai-machine-learning",
    number: "01",
    title: "AI & Machine Learning",
    short: "LLMs · Vision · MLOps",
    description:
      "Production models that earn trust on day 400, not just during the demo. Fine-tuning, RAG, computer vision, predictive maintenance — engineered for regulated industries.",
    tags: ["Fine-tuning", "RAG", "Computer Vision", "MLOps"],
    icon: "◆",
  },
  {
    slug: "software-development",
    number: "02",
    title: "Software Development",
    short: "SaaS · Internal tools",
    description:
      "Bespoke platforms built to outlast their authors. End-to-end engineering from greenfield SaaS to legacy modernization, with type safety from the database to the UI.",
    tags: ["TypeScript", "Node.js", "Go", "Postgres"],
    icon: "◇",
  },
  {
    slug: "data-analytics",
    number: "03",
    title: "Data Analytics",
    short: "Warehouse · BI · ETL",
    description:
      "Modern data stacks that transform operational exhaust into quarterly planning signal. Single source of truth, sub-second queries, governance your CFO will sign off on.",
    tags: ["dbt", "Snowflake", "BigQuery", "Looker"],
    icon: "○",
  },
  {
    slug: "devops-cloud",
    number: "04",
    title: "DevOps & Cloud",
    short: "AWS · GCP · Kubernetes",
    description:
      "Infrastructure as a craft. Sub-15-minute deployments, FinOps that reclaims 20–40% of spend, and SRE practices that keep the pager quiet.",
    tags: ["Terraform", "Kubernetes", "ArgoCD", "Datadog"],
    icon: "△",
  },
  {
    slug: "web-development",
    number: "05",
    title: "Website Development",
    short: "Performance · SEO · CMS",
    description:
      "Marketing sites and product pages engineered for sub-second loads and obsessive attention to typography, motion, and accessibility. Lighthouse 95+ guaranteed.",
    tags: ["Next.js", "TanStack", "Tailwind", "Sanity"],
    icon: "□",
  },
  {
    slug: "api-integration",
    number: "06",
    title: "API Integration",
    short: "Middleware · iPaaS",
    description:
      "Connective tissue between systems that were never meant to talk. Event-driven backbones, legacy ERP bridges, and centralized observability for every integration.",
    tags: ["Kafka", "Temporal", "Webhooks", "gRPC"],
    icon: "⬡",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="group relative border-b border-foreground/10 last:border-b-0 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Background fill on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          background: "linear-gradient(90deg, hsl(42 50% 92% / 0.5), hsl(36 30% 96% / 0.3))",
        }}
        transition={{ duration: 0.4 }}
      />

      <Link to={`/services/${service.slug}`} className="relative block py-8 md:py-10 px-4 -mx-4">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-4 mb-3">
              <motion.span
                className="font-mono text-[10px] text-foreground/25 tracking-widest"
                animate={{ x: hovered ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {service.number}
              </motion.span>
              <motion.h3
                className="font-serif text-xl md:text-2xl font-light text-foreground tracking-tight"
                animate={{ x: hovered ? 12 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {service.title}
              </motion.h3>
            </div>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-sm text-foreground/55 leading-relaxed max-w-lg font-light mt-3 mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-[10px] tracking-wide font-mono border border-foreground/15 text-foreground/50 bg-foreground/3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 pt-1 shrink-0">
            <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/30 font-sans hidden md:block">
              {service.short}
            </span>
            <motion.div
              className="size-10 rounded-full border border-foreground/15 flex items-center justify-center overflow-hidden"
              animate={{
                background: hovered ? "hsl(20 12% 10%)" : "transparent",
                borderColor: hovered ? "hsl(20 12% 10%)" : "hsl(20 12% 10% / 0.15)",
                scale: hovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: hovered ? 45 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArrowUpRight
                  className="size-4 transition-colors duration-300"
                  style={{ color: hovered ? "hsl(36 15% 97%)" : "hsl(20 12% 10% / 0.4)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-32 md:py-48 relative overflow-hidden"
      style={{ background: "hsl(36 15% 97%)" }}
    >
      {/* Layered ambient blobs */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(42 55% 88% / 0.5), transparent 65%)",
          y,
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(36 35% 92% / 0.4), transparent 60%)",
          y: useTransform(y, (v) => -v * 0.5),
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 md:gap-24 mb-20 md:mb-28">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-8 h-px bg-foreground/30" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/45 font-sans">
                Capabilities
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-foreground leading-[0.95] tracking-tight"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Six integrated
                <br />
                <span className="italic text-foreground/40">capabilities.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-10 h-px w-32 origin-left"
              style={{ background: "linear-gradient(90deg, hsl(42 70% 55%), transparent)" }}
            />
          </div>

          <motion.div
            className="flex flex-col justify-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed font-light font-sans max-w-md">
              Full-stack technical intelligence. Integrated capabilities so you don't have to
              manage multiple vendors. One team, end-to-end accountability.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-2.5 mt-8 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors group"
            >
              View all capabilities
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Services list */}
        <motion.div
          className="border-t border-foreground/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
