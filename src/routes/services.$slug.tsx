import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { services, getService, type ServiceSlug } from "@/lib/services-data";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { ConsultationForm } from "@/components/site/ConsultationForm";
import { CTASection } from "@/components/site/CTA";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    if (!services.find((s) => s.slug === params.slug)) throw notFound();
  },
  component: ServiceDetail,
  head: ({ params }) => {
    const s = services.find((x) => x.slug === (params.slug as ServiceSlug));
    const title = s ? `${s.title} — Bluski Solutions` : "Service — Bluski Solutions";
    const description = s?.tagline ?? "Bluski Solutions service.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-[60vh] grid place-items-center text-center px-6">
      <div>
        <h1 className="text-4xl font-bold mb-3">Service not found</h1>
        <Link to="/services" className="text-primary font-semibold">← All services</Link>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = getService(slug as ServiceSlug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 mesh-gradient">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative">
          <div>
            <Link to="/services" className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
              ← All services
            </Link>
            <div className="mt-8">
              <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Service {service.number}</div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl leading-relaxed mb-4">{service.tagline}</p>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{service.description}</p>
            </div>
          </div>
          <div className="hidden lg:block relative aspect-square max-w-[480px] ml-auto w-full">
            <Scene3D className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Features */}
      <Section>
        <div className="max-w-2xl mb-14">
          <SectionEyebrow>Capabilities</SectionEyebrow>
          <SectionTitle>What you get.</SectionTitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {service.features.map((f) => (
            <div key={f.title} className="bg-card p-7">
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process timeline */}
      <Section className="bg-card border-y border-border">
        <div className="max-w-2xl mb-14">
          <SectionEyebrow>Engagement roadmap</SectionEyebrow>
          <SectionTitle>From discovery to deployed system.</SectionTitle>
        </div>
        <div className="grid md:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {service.process.map((p) => (
            <div key={p.step} className="bg-background p-6">
              <div className="text-3xl font-bold text-primary mb-3">{p.step}</div>
              <h4 className="font-bold mb-1">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tech stack */}
      <Section>
        <div className="max-w-2xl mb-10">
          <SectionEyebrow>Stack</SectionEyebrow>
          <SectionTitle>The tools we reach for.</SectionTitle>
        </div>
        <div className="flex flex-wrap gap-2">
          {service.techStack.map((t) => (
            <span key={t} className="px-4 py-2 rounded-full border border-border bg-card text-sm font-mono">{t}</span>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-card border-y border-border">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionEyebrow>Outcomes</SectionEyebrow>
            <SectionTitle>What changes for your team.</SectionTitle>
          </div>
          <ul className="space-y-4">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-lg">
                <Check className="size-5 text-primary shrink-0 mt-1" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <div className="max-w-2xl mb-12">
          <SectionEyebrow>Engagement tiers</SectionEyebrow>
          <SectionTitle>Choose a starting point.</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {service.pricing.map((p) => (
            <div
              key={p.name}
              className={`p-8 rounded-2xl border ${p.highlighted ? "border-primary shadow-[var(--shadow-elegant)]" : "border-border"} bg-card flex flex-col`}
            >
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="text-4xl font-bold mt-3 mb-2">{p.price}</div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{p.description}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`w-full text-center py-3 rounded-xl font-semibold ${p.highlighted ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
              >
                Discuss this tier
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-card border-y border-border">
        <div className="max-w-3xl mx-auto">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionTitle className="mb-10">Common questions.</SectionTitle>
          <div className="divide-y divide-border">
            {service.faq.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold list-none">
                  {q}
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Consultation form */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionEyebrow>Get started</SectionEyebrow>
            <SectionTitle className="mb-6">Request a {service.title.toLowerCase()} consultation.</SectionTitle>
            <p className="text-muted-foreground leading-relaxed">
              You'll talk directly with a senior engineer who'd lead the engagement. We respond
              within one business day.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <ConsultationForm defaultService={service.title} compact />
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
