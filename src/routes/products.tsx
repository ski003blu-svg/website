import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TiltCard } from "@/components/site/TiltCard";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/products")({
  component: Products,
  head: () => ({
    meta: [
      { title: "Products — Bluski Solutions" },
      { name: "description", content: "Bluski-built platforms: Orchard (agent orchestration), Lattice (data infra), Anvil (computer-vision QA)." },
      { property: "og:title", content: "Products — Bluski Solutions" },
      { property: "og:description", content: "Productized platforms born from years of client engagements." },
    ],
  }),
});

const products = [
  {
    name: "Orchard",
    tag: "Agent orchestration platform",
    desc: "Production-grade runtime for multi-agent LLM systems. Built-in retries, eval harness, full observability.",
    features: ["Deterministic replay", "Tool sandboxing", "Eval-as-code", "On-prem option"],
  },
  {
    name: "Lattice",
    tag: "Real-time data platform",
    desc: "An opinionated stack — ingest, transform, serve — that gets a team from raw events to dashboard in under a week.",
    features: ["Sub-second queries", "dbt-native", "Lineage built in", "Row-level security"],
  },
  {
    name: "Anvil",
    tag: "Edge vision QA",
    desc: "A turnkey computer-vision quality cell for manufacturing lines. Deploys in 72 hours, runs on commodity GPUs.",
    features: ["240 ppm throughput", "On-device inference", "PLC integration", "OTA model updates"],
  },
];

function Products() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative animate-reveal">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Productized platforms</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Tools we built because <span className="animated-gradient-text">nothing else fit</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three platforms born from client engagements where the off-the-shelf stack ran out of road.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.08}>
              <TiltCard className="rounded-2xl border border-border bg-card p-8 h-full flex flex-col">
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">{p.tag}</div>
                <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Request a demo <ArrowRight className="size-4" />
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
