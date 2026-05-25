import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TiltCard } from "@/components/site/TiltCard";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { Wheat, Truck, Banknote, Factory, HeartPulse, Zap, ShoppingBag, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/industries")({
  component: Industries,
  head: () => ({
    meta: [
      { title: "Industries — Bluski Solutions" },
      { name: "description", content: "Deep domain expertise across agritech, logistics, finance, manufacturing, healthcare, energy, retail, and education." },
      { property: "og:title", content: "Industries we serve — Bluski Solutions" },
      { property: "og:description", content: "Vertical expertise built from years on the factory floor, in the operations center, and at the trading desk." },
    ],
  }),
});

const industries = [
  { icon: Wheat, name: "Agritech", desc: "Yield prediction, supply-chain optimization, autonomous machinery." },
  { icon: Truck, name: "Logistics", desc: "Routing, fleet telematics, real-time exception handling." },
  { icon: Banknote, name: "Financial Services", desc: "Fraud, risk modelling, compliance automation, AML." },
  { icon: Factory, name: "Manufacturing", desc: "Predictive maintenance, computer vision QA, MES integration." },
  { icon: HeartPulse, name: "Healthcare", desc: "Clinical NLP, imaging models, HIPAA-grade data platforms." },
  { icon: Zap, name: "Energy & Utilities", desc: "Grid optimization, demand forecasting, IoT at edge." },
  { icon: ShoppingBag, name: "Retail & CPG", desc: "Personalization, inventory ML, conversion funnels." },
  { icon: GraduationCap, name: "Education", desc: "Adaptive learning, student-success analytics, SIS integration." },
];

function Industries() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative animate-reveal">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Domain expertise</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Industries we <span className="animated-gradient-text">engineer for</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't claim to know every vertical. We know these eight deeply — and we ship work
            that respects the constraints, regulations, and dialect of each.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {industries.map((it, i) => (
            <ScrollReveal key={it.name} delay={i * 0.05}>
              <TiltCard className="bg-card p-7 h-full group">
                <div className="size-10 rounded-lg bg-muted grid place-items-center mb-5 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                  <it.icon className="size-5 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold mb-2">{it.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
