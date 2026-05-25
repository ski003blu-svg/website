import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Bluski Solutions" },
      { name: "description", content: "Bluski Solutions is an Iowa-headquartered engineering consultancy building AI, software, and data systems for ambitious enterprises." },
      { property: "og:title", content: "About — Bluski Solutions" },
      { property: "og:description", content: "Engineering consultancy from Des Moines, building for the enterprise frontier." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-20 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center animate-reveal relative">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">About Bluski</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Engineering rigor, Midwestern values.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are a senior-only team of engineers, designers, and researchers headquartered in Des
            Moines, Iowa. We build the systems that take ambitious organizations to their next decade.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <SectionEyebrow>Our story</SectionEyebrow>
            <SectionTitle className="mb-6">Founded on a single premise: the Midwest deserves world-class engineering.</SectionTitle>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Bluski Solutions was founded by engineers who had shipped AI and data platforms at
                hyperscale and wanted to bring that discipline home. Iowa builds things — equipment,
                food, finance, insurance — and those things deserve software written with the same
                obsession.
              </p>
              <p>
                Today we partner with manufacturers, agricultural distributors, financial
                institutions, and ambitious startups across North America. We're senior-only by
                design: no SDR funnels, no junior pyramid, just engineers shipping production work.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              ["8 yrs", "Avg team tenure"],
              ["120+", "Deployments"],
              ["12", "States served"],
              ["100%", "Senior engineers"],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-8">
                <div className="text-4xl font-bold text-primary mb-2">{k}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-card border-y border-border">
        <div className="max-w-2xl mb-12">
          <SectionEyebrow>Operating principles</SectionEyebrow>
          <SectionTitle>How we work.</SectionTitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["Senior-only delivery", "Every engagement is staffed with engineers who've built at scale. No juniors hidden in the back office."],
            ["Working software, every sprint", "Two-week increments. Demos with running code. Slide decks are for the keynote."],
            ["Skin in the game", "Outcome-based pricing options on request. We win when you win."],
            ["Transparent estimates", "Fixed-scope, fixed-price discovery phases. Time-and-materials only when scope is genuinely unknowable."],
            ["Documentation as a deliverable", "Architecture decision records, runbooks, and onboarding docs ship with the system."],
            ["Honesty about limits", "If we're not the right team, we'll tell you and refer you to someone who is."],
          ].map(([t, d]) => (
            <div key={t} className="p-7 rounded-2xl border border-border bg-background">
              <h3 className="font-bold mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
