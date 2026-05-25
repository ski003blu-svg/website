import { createFileRoute } from "@tanstack/react-router";
import { ConsultationForm } from "@/components/site/ConsultationForm";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Scene3D } from "@/components/site/Scene3D";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Bluski Solutions" },
      { name: "description", content: "Book a 30-minute consultation with a senior partner at Bluski Solutions. Headquartered in Des Moines, Iowa." },
      { property: "og:title", content: "Contact — Bluski Solutions" },
      { property: "og:description", content: "Talk to a senior partner. We respond within one business day." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 mesh-gradient">
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <Scene3D className="absolute inset-0" variant="ambient" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Let's talk</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-balance mb-6">
            Start a consultation.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us what you're trying to build. You'll hear from a senior partner — not an SDR —
            within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 p-8 md:p-10 rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <ConsultationForm />
          </div>
          <aside className="space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Headquarters</div>
              <p className="text-foreground font-semibold">Des Moines, Iowa</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">801 Grand Ave<br />Des Moines, IA 50309</p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Direct</div>
              <a href="mailto:hello@bluski.io" className="text-foreground font-semibold hover:text-primary">hello@bluski.io</a>
              <p className="text-sm text-muted-foreground mt-1">(515) 555-0184</p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Response time</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Senior partner response within 1 business day. Discovery scheduled within 5 days.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
