import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { services } from "@/lib/services-data";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { TiltCard } from "@/components/site/TiltCard";
import { Counter } from "@/components/site/Counter";
import { HeroVisual } from "@/components/site/HeroVisual";
import { Scene3D } from "@/components/site/Scene3D";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { ArrowRight, Cpu, Globe, Code2, BarChart3, Megaphone, Sparkles, Plug, Cloud } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Bluski Solutions — Enterprise AI, Software & Data, Engineered in Iowa" },
      { name: "description", content: "Bluski Solutions builds AI, software, and data platforms for ambitious enterprises. Iowa-headquartered, globally engaged." },
      { property: "og:title", content: "Bluski Solutions — Engineered Intelligence" },
      { property: "og:description", content: "AI, software, data, and cloud — built for the enterprise frontier." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const icons = [Cpu, Globe, Code2, BarChart3, Megaphone, Sparkles, Plug, Cloud];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 md:pt-28 pb-24 md:pb-32 overflow-hidden mesh-gradient">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative">
          <div className="animate-reveal">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-6"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping-soft" />
                <span className="relative size-1.5 rounded-full bg-primary" />
              </span>
              Iowa-Born Enterprise AI
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[0.95] mb-7">
              Engineered intelligence for the{" "}
              <span className="animated-gradient-text">industrial heartland.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Bluski Solutions builds AI, software, data, and cloud systems for organizations that
              need infrastructure to outlast its authors. From Des Moines to the enterprise frontier.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-[var(--shadow-elegant)] hover:translate-y-[-1px] hover:shadow-[0_20px_40px_-10px_hsl(217_91%_55%/0.5)] transition-all"
              >
                Start a consultation
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-7 py-3.5 glass border border-border font-semibold rounded-xl hover:bg-card transition-colors"
              >
                Explore capabilities
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:block relative aspect-square max-w-[560px] mx-auto"
          >
            <Scene3D className="absolute inset-0" />
          </motion.div>
        </div>

        {/* Stat strip */}
        <div className="max-w-7xl mx-auto px-6 mt-20 relative">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden glass">
              {[
                ["120+", "Production deployments"],
                ["22ms", "Median inference latency"],
                ["40%", "Avg. cost reduction"],
                ["8 yrs", "Average team tenure"],
              ].map(([k, v]) => (
                <div key={k} className="bg-card/60 p-6">
                  <Counter value={k} className="text-3xl md:text-4xl font-bold tracking-tight text-foreground" />
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">{v}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trusted by — marquee */}
      <section className="py-12 border-y border-border bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-6">
            Building infrastructure for
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              className="flex gap-16 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            >
              {[...Array(2)].flatMap((_, i) =>
                ["AGRITECH GLOBAL", "MIDWEST LOGISTICS", "SECURE FINANCE", "CEDAR MANUFACTURING", "DSM HEALTH", "HEARTLAND DATA", "PRAIRIE ROBOTICS"].map((n) => (
                  <span key={`${i}-${n}`} className="text-sm font-bold tracking-tighter opacity-60">{n}</span>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <Section>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-14">
            <div className="max-w-2xl">
              <SectionEyebrow>Capabilities (01—08)</SectionEyebrow>
              <SectionTitle>Full-stack intelligence. Milled for durability and scale.</SectionTitle>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              View all services <ArrowRight className="size-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={s.slug} delay={i * 0.05} className="h-full">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="block h-full"
                >
                  <TiltCard className="bg-card p-7 h-full hover:bg-accent/20 transition-colors group">
                    <div className="size-10 rounded-lg bg-muted grid place-items-center mb-5 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                      <Icon className="size-5 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{s.number}</div>
                    <h3 className="font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.tagline}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="size-3" />
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <ScrollReveal>
          <div className="max-w-3xl mb-14 relative">
            <SectionEyebrow>How we work</SectionEyebrow>
            <SectionTitle>A methodology designed for accountability, not optionality.</SectionTitle>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden relative">
          {[
            ["01", "Discover", "Map the problem, constraints, and definition of done."],
            ["02", "Design", "Architecture review with senior stakeholder sign-off."],
            ["03", "Build", "Two-week sprints with working software at every step."],
            ["04", "Deploy", "Hardening, observability, and a confident production cutover."],
            ["05", "Iterate", "Measurement against business KPIs, not vanity metrics."],
          ].map(([n, t, d], i) => (
            <ScrollReveal key={n} delay={i * 0.08}>
              <div className="bg-background p-6 h-full group hover:bg-accent/20 transition-colors">
                <div className="text-3xl font-bold text-primary mb-3 group-hover:scale-110 origin-left transition-transform">{n}</div>
                <h4 className="font-bold mb-1">{t}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Dark featured case study */}
      <section className="py-24 md:py-32 bg-[hsl(220_15%_6%)] text-white overflow-hidden relative">
        <AnimatedBackground variant="dark" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-block px-3 py-1 bg-white/10 rounded border border-white/20 font-mono text-[10px] uppercase tracking-widest text-white/70 mb-6">
                Featured Engagement
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                Automating the grain corridor.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-10">
                A multi-agent AI system for Iowa's largest agricultural distributor, optimizing
                logistics across 47 distribution centers and 1,200 contracted carriers.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-10">
                {[["22%", "Fuel saved"], ["14ms", "Latency floor"], ["3.4x", "ROI in y1"]].map(([k, v]) => (
                  <div key={k}>
                    <Counter value={k} className="text-3xl font-mono font-bold text-primary-glow" />
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 font-semibold group">
                Read the technical case study
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative aspect-square max-w-[520px] mx-auto">
                <Scene3D className="absolute inset-0" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
