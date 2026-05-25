import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TiltCard } from "@/components/site/TiltCard";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Portfolio — Bluski Solutions" },
      { name: "description", content: "Selected production work: AI agents, data platforms, mission-critical software." },
      { property: "og:title", content: "Portfolio — Bluski Solutions" },
      { property: "og:description", content: "Production-grade engineering across agritech, finance, manufacturing and more." },
    ],
  }),
});

const projects = [
  { name: "Grain Corridor OS", client: "Agritech Global", tag: "AI / Logistics", metric: "22% fuel saved", color: "from-blue-500/30 to-cyan-400/20" },
  { name: "Underwriter Copilot", client: "Secure Finance", tag: "LLM / Risk", metric: "4.1x throughput", color: "from-indigo-500/30 to-purple-400/20" },
  { name: "Vision QA Cell", client: "Cedar Manufacturing", tag: "Computer Vision", metric: "0.03% defect rate", color: "from-emerald-500/30 to-teal-400/20" },
  { name: "Patient Pathways", client: "DSM Health", tag: "Clinical NLP", metric: "38% faster triage", color: "from-rose-500/30 to-orange-400/20" },
  { name: "Edge Forecaster", client: "Midwest Logistics", tag: "MLOps", metric: "14ms p99", color: "from-amber-500/30 to-yellow-400/20" },
  { name: "Yield Atlas", client: "Heartland Co-op", tag: "Geospatial AI", metric: "+11% yield", color: "from-violet-500/30 to-fuchsia-400/20" },
];

function Portfolio() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative animate-reveal">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Selected work · 2019—2026</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Engineering <span className="animated-gradient-text">that ships</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated cross-section of production systems we've built for Iowa-grown and global
            enterprises.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.06}>
              <TiltCard className="rounded-2xl border border-border bg-card overflow-hidden group h-full">
                <div className={`aspect-[16/10] bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 grid-bg opacity-60" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-4xl font-bold tracking-tight text-foreground/30 font-mono">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">{p.tag}</div>
                  <h3 className="font-bold text-lg mb-1 flex items-center justify-between">
                    {p.name}
                    <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{p.client}</p>
                  <div className="text-xs font-mono text-foreground/80 border-t border-border pt-3">{p.metric}</div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Read full case studies <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
