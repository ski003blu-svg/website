import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Counter } from "@/components/site/Counter";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
  head: () => ({
    meta: [
      { title: "Case Studies — Bluski Solutions" },
      { name: "description", content: "Long-form engineering case studies. Architecture, trade-offs, measured outcomes." },
      { property: "og:title", content: "Case Studies — Bluski Solutions" },
      { property: "og:description", content: "How we engineered production AI systems for Iowa's enterprise leaders." },
    ],
  }),
});

const cases = [
  {
    eyebrow: "AI · Logistics",
    title: "Automating the grain corridor.",
    body: "A multi-agent orchestration layer that re-routes 1,200 carriers in real time across Iowa's largest agricultural distributor.",
    stats: [["22%", "Fuel saved"], ["14ms", "Decision latency"], ["3.4x", "Year-1 ROI"]],
  },
  {
    eyebrow: "Computer Vision · Manufacturing",
    title: "Zero-defect at line speed.",
    body: "An edge-deployed vision QA cell catching micro-defects on a 240 ppm extrusion line — 60x faster than human inspection.",
    stats: [["0.03%", "Defect rate"], ["240", "Parts/min"], ["6mo", "Payback"]],
  },
  {
    eyebrow: "LLM · Finance",
    title: "Underwriter copilot for SMB lending.",
    body: "A retrieval-grounded LLM workflow that drafts complete credit memos with cited primary sources, reviewed by humans in minutes.",
    stats: [["4.1x", "Throughput"], ["92%", "First-pass accept"], ["0", "Hallucinated citations"]],
  },
];

function CaseStudies() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative animate-reveal">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Engineering case studies</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            How the <span className="animated-gradient-text">numbers</span> got there.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Long-form technical write-ups. Real architecture, real trade-offs, real outcomes.
          </p>
        </div>
      </section>

      <Section>
        <div className="space-y-px bg-border border border-border rounded-2xl overflow-hidden">
          {cases.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.08}>
              <article className="bg-card p-10 md:p-14 grid lg:grid-cols-[1fr_auto] gap-10 items-start hover:bg-accent/10 transition-colors">
                <div className="max-w-2xl">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">{c.eyebrow}</div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">{c.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{c.body}</p>
                  <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    Request the full study <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6 lg:min-w-[160px]">
                  {c.stats.map(([k, v]) => (
                    <div key={k}>
                      <Counter value={k} className="text-2xl font-mono font-bold text-foreground block" />
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
