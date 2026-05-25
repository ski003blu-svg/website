import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { Search, PenTool, Code2, Rocket, LineChart, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/workflow")({
  component: Workflow,
  head: () => ({
    meta: [
      { title: "Our Workflow — Bluski Solutions" },
      { name: "description", content: "How Bluski Solutions discovers, designs, builds, deploys, and iterates production AI and software systems." },
      { property: "og:title", content: "Our Workflow — Bluski Solutions" },
      { property: "og:description", content: "Five-phase delivery methodology with senior-stakeholder accountability." },
      { property: "og:url", content: "/workflow" },
    ],
    links: [{ rel: "canonical", href: "/workflow" }],
  }),
});

const phases = [
  { icon: Search, n: "01", t: "Discover", d: "We map the problem, constraints, and a binary definition of done. Stakeholder interviews, systems audit, risk register.", out: ["Problem brief", "Success metrics", "Constraint map"] },
  { icon: PenTool, n: "02", t: "Design", d: "Architecture review with senior sign-off. We design for the failure modes, not the happy path.", out: ["System architecture", "Data contracts", "ADRs"] },
  { icon: Code2, n: "03", t: "Build", d: "Two-week sprints with working software at every checkpoint. CI from day one, no demo environments.", out: ["Production code", "Test coverage", "Sprint demos"] },
  { icon: Rocket, n: "04", t: "Deploy", d: "Hardening, observability, runbooks, and a confident production cutover. We are on-call for the launch window.", out: ["Cutover plan", "Observability", "Runbooks"] },
  { icon: LineChart, n: "05", t: "Iterate", d: "Measurement against business KPIs, not vanity metrics. Monthly reviews, quarterly roadmap.", out: ["KPI dashboards", "Roadmap", "Retro reports"] },
];

function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <>
      <section className="pt-24 pb-20 mesh-gradient relative overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono uppercase tracking-widest text-primary mb-4"
          >
            How we work · Methodology
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6"
          >
            A workflow built for{" "}
            <span className="animated-gradient-text">accountability</span>, not optionality.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Five phases. Senior engineers at every step. Working software every two weeks.
          </motion.p>
        </motion.div>
      </section>

      <Section className="relative">
        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Vertical progress rail */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" aria-hidden />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary via-primary to-primary-glow -translate-x-1/2 shadow-[0_0_20px_hsl(217_91%_55%/0.6)]"
            aria-hidden
          />

          <div className="flex flex-col gap-20 md:gap-28 py-4">
            {phases.map((p, i) => {
              const Icon = p.icon;
              const left = i % 2 === 0;
              return (
                <div key={p.n} className={`relative grid md:grid-cols-2 gap-8 items-center ${left ? "" : "md:[&>*:first-child]:order-2"}`}>
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 size-12 rounded-full bg-background border-2 border-primary grid place-items-center z-10 shadow-[0_0_30px_hsl(217_91%_55%/0.4)]"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-primary"
                    />
                    <Icon className="size-5 text-primary" />
                  </motion.div>

                  {/* Card */}
                  <ScrollReveal className={`pl-24 md:pl-0 ${left ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">Phase {p.n}</div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{p.t}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.d}</p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15} className={`pl-24 md:pl-0 ${left ? "md:pl-16" : "md:pr-16"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass border border-border rounded-2xl p-6 shadow-[var(--shadow-elegant)]"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Deliverables</div>
                      <ul className="flex flex-col gap-2.5">
                        {p.out.map((o) => (
                          <li key={o} className="flex items-center gap-2.5 text-sm">
                            <CheckCircle2 className="size-4 text-primary shrink-0" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="bg-card border-y border-border">
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <SectionEyebrow>What you can expect</SectionEyebrow>
            <SectionTitle>No black boxes. No surprise invoices.</SectionTitle>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {[
            ["Weekly written updates", "Friday memos with progress, blockers, and next-week plan."],
            ["Open repos & dashboards", "You see what we see — code, tickets, metrics, costs."],
            ["Fixed-scope, fixed-fee", "We quote phases, not hours. Change orders are explicit."],
          ].map(([t, d], i) => (
            <ScrollReveal key={t} delay={i * 0.08}>
              <motion.div whileHover={{ y: -2 }} className="bg-background p-8 h-full">
                <h4 className="font-bold mb-2">{t}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Start a discovery call <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
