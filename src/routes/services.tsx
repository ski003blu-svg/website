import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/services-data";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TiltCard } from "@/components/site/TiltCard";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services — Bluski Solutions" },
      { name: "description", content: "Eight integrated capabilities: AI & ML, Web Development, Software Development, Data Analytics, Digital Marketing, Branding, API Integration, DevOps & Cloud." },
      { property: "og:title", content: "Services — Bluski Solutions" },
      { property: "og:description", content: "Full-stack engineering capabilities for enterprise transformation." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function Services() {
  return (
    <>
      <section className="pt-24 pb-16 mesh-gradient relative overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative animate-reveal">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Eight capabilities, one team</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Full-stack <span className="animated-gradient-text">technical solutions</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From the model layer to the marketing funnel. Integrated capabilities so you don't have
            to manage eight vendors.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 0.05}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="block h-full"
              >
                <TiltCard className="bg-card p-10 h-full hover:bg-accent/20 transition-colors group">
                  <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">{s.number}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore service <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </TiltCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
