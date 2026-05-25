import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TiltCard } from "@/components/site/TiltCard";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Field Notes — Bluski Solutions" },
      { name: "description", content: "Essays on engineering, applied AI, and building durable software in the Midwest." },
      { property: "og:title", content: "Field Notes — Bluski Solutions" },
      { property: "og:description", content: "Long-form writing from the team at Bluski." },
    ],
  }),
});

const posts = [
  { topic: "Applied AI", date: "May 18, 2026", title: "Why we still hand-write our retrieval pipelines.", excerpt: "Frameworks are great until your retrieval needs a domain glossary, a freshness scorer, and a regional bias correction.", read: "12 min" },
  { topic: "Engineering", date: "May 04, 2026", title: "The case for boring infrastructure in 2026.", excerpt: "Postgres, a queue, a cron, and good docs will outlast three quarters of the AI infra category.", read: "8 min" },
  { topic: "Field Note", date: "Apr 22, 2026", title: "What a 240ppm extrusion line taught us about LLMs.", excerpt: "Latency budgets that would terrify any backend engineer are routine in manufacturing. Here's how it changed our agent design.", read: "15 min" },
  { topic: "Practice", date: "Apr 08, 2026", title: "Senior-only teams: a hiring philosophy.", excerpt: "We don't hire juniors. Here's the math, the trade-offs, and what we lose by sticking to it.", read: "6 min" },
  { topic: "Iowa", date: "Mar 30, 2026", title: "Building a frontier company in Des Moines.", excerpt: "On talent, on quiet, on cost of living, and on the unfair advantage of working far from the noise.", read: "10 min" },
  { topic: "Architecture", date: "Mar 14, 2026", title: "Deterministic replay for multi-agent systems.", excerpt: "If you can't reproduce a failure, you can't fix it. How we engineered Orchard's replay engine.", read: "18 min" },
];

function Blog() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative animate-reveal">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Field notes</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Writing from <span className="animated-gradient-text">the workshop</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essays and field notes from our engineers. No thought leadership. No takes. Just what
            we've learned shipping production systems.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.05}>
              <TiltCard className="rounded-2xl border border-border bg-card p-7 h-full flex flex-col group">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest mb-4">
                  <span className="text-primary">{p.topic}</span>
                  <span className="text-muted-foreground">{p.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{p.excerpt}</p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">{p.read} read</span>
                  <Link to="/contact" className="text-primary opacity-70 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
