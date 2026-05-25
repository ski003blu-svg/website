import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TiltCard } from "@/components/site/TiltCard";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: Careers,
  head: () => ({
    meta: [
      { title: "Careers — Bluski Solutions" },
      { name: "description", content: "Senior engineers, applied ML researchers, and product builders. Iowa HQ + remote." },
      { property: "og:title", content: "Careers — Bluski Solutions" },
      { property: "og:description", content: "Build category-defining infrastructure with a small, senior team." },
    ],
  }),
});

const roles = [
  { title: "Senior ML Engineer", team: "Applied AI", location: "Des Moines / Remote (US)" },
  { title: "Staff Software Engineer, Platform", team: "Infrastructure", location: "Des Moines / Remote (US)" },
  { title: "Data Engineer", team: "Lattice", location: "Des Moines / Remote (US)" },
  { title: "Product Designer", team: "Design", location: "Des Moines / Remote (US)" },
  { title: "Forward-Deployed Engineer", team: "Field", location: "Des Moines (on-site)" },
  { title: "Technical Recruiter", team: "People", location: "Des Moines" },
];

const values = [
  ["Senior-only", "We hire 8+ years on average. Juniors learn fastest with masters, but only after we have the masters."],
  ["Async-first", "Documented decisions, recorded design reviews, fewer meetings, more shipping."],
  ["Iowa hours", "We close at 6, we cook dinner, we read books. Sustainable pace is a competitive advantage."],
];

function Careers() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative animate-reveal">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Join the team</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Engineers who <span className="animated-gradient-text">finish things</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a deliberately small, senior team building infrastructure that outlasts its authors.
            If you've shipped systems you're proud of, we'd love to talk.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map(([t, d], i) => (
            <ScrollReveal key={t} delay={i * 0.08}>
              <div className="p-7 border border-border rounded-2xl bg-card h-full">
                <h3 className="font-bold mb-2">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Open roles</h2>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{roles.length} positions</span>
        </div>

        <div className="grid gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {roles.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.04}>
              <TiltCard className="bg-card">
                <Link
                  to="/contact"
                  className="block p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1">{r.team}</div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{r.title}</h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4" /> {r.location}
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
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
