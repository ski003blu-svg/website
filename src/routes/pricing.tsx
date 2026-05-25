import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionEyebrow, SectionTitle } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTA";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — Bluski Solutions" },
      { name: "description", content: "Transparent engagement tiers from discovery sprints to embedded squads. Fixed-price discovery, milestone-billed delivery." },
      { property: "og:title", content: "Pricing — Bluski Solutions" },
      { property: "og:description", content: "Discovery, Delivery, and Embedded tiers. Transparent and milestone-billed." },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
});

const tiers = [
  {
    name: "Discovery",
    price: "From $12K",
    cadence: "2–3 weeks",
    description: "Fixed-price assessment that ends with a roadmap and an honest go/no-go.",
    features: ["Stakeholder interviews", "Architecture or data audit", "Build estimate & roadmap", "Senior team only", "Refunded if we engage"],
    cta: "Book discovery",
  },
  {
    name: "Delivery",
    price: "From $60K",
    cadence: "8–16 weeks",
    description: "Full engineering of a production system. Milestone-billed against working software.",
    features: ["Two-week sprint cadence", "Working demos every sprint", "Full documentation", "Production hardening", "30–90 days hypercare"],
    cta: "Scope a delivery",
    highlighted: true,
  },
  {
    name: "Embedded",
    price: "Custom",
    cadence: "Quarterly",
    description: "Dedicated squad of senior engineers, designers, and PMs embedded with your team.",
    features: ["3–8 person squad", "Quarterly objectives", "Co-located rituals", "Shared on-call", "Quarterly board reports"],
    cta: "Discuss embed",
  },
];

function Pricing() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Pricing</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Transparent engagements.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three engagement models. Senior-only delivery in every one. No SDRs, no junior pyramid,
            no surprise change orders.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`p-8 rounded-2xl border ${t.highlighted ? "border-primary bg-card shadow-[var(--shadow-elegant)]" : "border-border bg-card"} flex flex-col`}
            >
              {t.highlighted && (
                <div className="inline-block w-fit px-2 py-0.5 mb-4 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded">Most engagements</div>
              )}
              <h3 className="text-xl font-bold">{t.name}</h3>
              <div className="mt-3 mb-1">
                <span className="text-4xl font-bold tracking-tight">{t.price}</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">{t.cadence}</div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{t.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`w-full text-center py-3 rounded-xl font-semibold ${t.highlighted ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-card border-y border-border">
        <div className="max-w-3xl mx-auto">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionTitle className="mb-10">Common questions.</SectionTitle>
          <div className="divide-y divide-border">
            {[
              ["Do you take equity instead of cash?", "Cash-first. We'll consider equity supplements for aligned long-term partnerships, but the base engagement is cash."],
              ["Can we cancel mid-engagement?", "Yes — we work in two-week sprints and you can pause at any sprint boundary. No cancellation fees."],
              ["Who actually does the work?", "The people on our website. We don't subcontract or shuffle juniors onto your engagement."],
              ["What about IP?", "You own everything we build. No portfolio rights without explicit permission."],
              ["Do you offer retainers?", "Yes — post-launch maintenance and embedded squads both have retainer options."],
            ].map(([q, a]) => (
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

      <CTASection />
    </>
  );
}
