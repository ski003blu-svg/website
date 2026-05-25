import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-[hsl(220_15%_6%)] text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-primary/30 blur-[140px] rounded-full" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 text-[10px] font-bold tracking-widest uppercase text-white/70 mb-6">
          Ready when you are
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6 text-balance">
          Let's build the system that takes you to the next decade.
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Book a 30-minute consultation with a senior partner. No SDR funnel — you talk to the
          engineer who'd run your engagement.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-foreground font-semibold rounded-xl hover:translate-y-[-1px] transition-transform"
          >
            Request consultation
          </Link>
          <Link
            to="/case-studies"
            className="px-8 py-4 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
          >
            View case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
