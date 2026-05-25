import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/contact.functions";
import { toast } from "sonner";

const cols = [
  {
    title: "Services",
    links: [
      { label: "AI & ML", href: "/services/ai-machine-learning" },
      { label: "Software", href: "/services/software-development" },
      { label: "Data", href: "/services/data-analytics" },
      { label: "DevOps", href: "/services/devops-cloud" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/portfolio" },
      { label: "Industries", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
      { label: "Workflow", href: "/workflow" },
      { label: "Products", href: "/products" },
    ],
  },
];

export function LuxuryFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const subscribe = useServerFn(subscribeNewsletter);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribe({ data: { email } });
      toast.success("Subscribed to field notes.");
      setEmail("");
    } catch {
      toast.error("Please enter a valid email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="relative py-20 md:py-28"
      style={{ background: "hsl(20 12% 8%)" }}
    >
      {/* Top luxury line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-white/60" />
              </div>
              <span className="font-serif text-base tracking-[0.08em] text-white/70 font-light">
                BLUSKI
              </span>
            </Link>

            <p className="text-[13px] text-white/30 font-light leading-relaxed max-w-xs font-sans mb-8">
              Iowa-born. Engineering AI, software, and data systems for the enterprise frontier.
            </p>

            {/* Newsletter */}
            <form onSubmit={onSubmit} className="flex gap-2 max-w-xs">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-2.5 rounded-full outline-none placeholder:text-white/20 focus:border-white/25 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white/60 text-[12px] tracking-wide transition-colors disabled:opacity-40"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/25 mb-6 font-sans">
                {col.title}
              </h4>
              <div className="flex flex-col gap-4">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    to={l.href}
                    className="text-[13px] text-white/35 hover:text-white/70 transition-colors duration-200 font-light font-sans"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{ borderTop: "1px solid hsl(0 0% 100% / 0.05)" }}
        >
          <span className="text-[11px] font-mono text-white/20">
            © {new Date().getFullYear()} Bluski Solutions LLC · Des Moines, Iowa
          </span>
          <span className="text-[11px] font-mono text-white/15">
            41.5868° N · 93.6250° W
          </span>
        </div>
      </div>
    </footer>
  );
}
