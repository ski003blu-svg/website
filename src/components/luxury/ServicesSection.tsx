import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
  },
  {
    slug: "software-development",
    number: "02",
    title: "Software Development",
    short: "SaaS · Internal tools",
    description:
      "Bespoke platforms built to outlast their authors. End-to-end engineering from greenfield SaaS to legacy modernization, with type safety from the database to the UI.",
    tags: ["TypeScript", "Node.js", "Go", "Postgres"],
  },
  {
    slug: "data-analytics",
    number: "03",
    title: "Data Analytics",
    short: "Warehouse · BI · ETL",
    description:
      "Modern data stacks that transform operational exhaust into quarterly planning signal. Single source of truth, sub-second queries, governance your CFO will sign off on.",
    tags: ["dbt", "Snowflake", "BigQuery", "Looker"],
  },
  {
    slug: "devops-cloud",
    number: "04",
    title: "DevOps & Cloud",
    short: "AWS · GCP · Kubernetes",
    description:
      "Infrastructure as a craft. Sub-15-minute deployments, FinOps that reclaims 20–40% of spend, and SRE practices that keep the pager quiet.",
    tags: ["Terraform", "Kubernetes", "ArgoCD", "Datadog"],
  },
  {
    slug: "web-development",
    number: "05",
    title: "Website Development",
    short: "Performance · SEO · CMS",
    description:
      "Marketing sites and product pages engineered for sub-second loads and obsessive attention to typography, motion, and accessibility. Lighthouse 95+ guaranteed.",
    tags: ["Next.js", "TanStack", "Tailwind", "Sanity"],
  },
  {
    slug: "api-integration",
    number: "06",
    title: "API Integration",
    short: "Middleware · iPaaS",
    description:
      "Connective tissue between systems that were never meant to talk. Event-driven backbones, legacy ERP bridges, and centralized observability for every integration.",
    tags: ["Kafka", "Temporal", "Webhooks", "gRPC"],
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

  return (
    <motion.div
      className="group relative border-b border-foreground/10 last:border-b-0 py-0 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link to={`/services/${service.slug}`} className="block py-7 md:py-9">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-mono text-[10px] text-foreground/30 tracking-widest">
                {service.number}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-light text-foreground tracking-tight">
                {service.title}
              </h3>
            </div>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-foreground/55 leading-relaxed max-w-lg font-light mt-3 mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[10px] tracking-wide font-mono border border-foreground/12 text-foreground/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 pt-0.5 shrink-0">
            <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/30 font-sans hidden md:block">
              {service.short}
            </span>
            <motion.div
              className="size-8 rounded-full border border-foreground/15 flex items-center justify-center"
              animate={{
                background: hovered ? "hsl(20 12% 10%)" : "transparent",
                borderColor: hovered ? "hsl(20 12% 10%)" : "hsl(20 12% 10% / 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight
                className="size-3.5 transition-colors duration-300"
                style={{ color: hovered ? "hsl(36 15% 97%)" : "hsl(20 12% 10% / 0.4)" }}
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-28 md:py-40 relative overflow-hidden"
      style={{ background: "hsl(36 12% 95%)" }}
    >
      {/* Ambient blob */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(42 50% 88% / 0.4), transparent 70%)",
          transform: "translate(25%, -25%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-16 md:mb-24">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-6 h-px bg-foreground/30" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-foreground/45 font-sans">
                Capabilities
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-light text-foreground leading-[0.95] tracking-tight"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Eight integrated
                <br />
                <span className="italic text-foreground/40">capabilities.</span>
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="text-foreground/50 text-base leading-relaxed font-light font-sans self-end max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Full-stack technical intelligence. Integrated capabilities so you don't have to
            manage eight vendors. One team, end-to-end accountability.
          </motion.p>
        </div>

        {/* Services list */}
        <div className="border-t border-foreground/10">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        {/* All services link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/45 hover:text-foreground transition-colors group"
          >
            All capabilities
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
