import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/contact.functions";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const subscribe = useServerFn(subscribeNewsletter);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribe({ data: { email } });
      toast.success("You're subscribed.");
      setEmail("");
    } catch {
      toast.error("Please enter a valid email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="size-7 rounded-md bg-primary" />
              <span className="font-bold tracking-tight">BLUSKI SOLUTIONS</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Headquartered in Des Moines, Iowa. Engineering AI, software, and data platforms for the
              enterprise frontier.
            </p>
            <form onSubmit={onSubmit} className="flex gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Services</h4>
            <Link to="/services/ai-machine-learning" className="text-sm text-muted-foreground hover:text-foreground">AI & ML</Link>
            <Link to="/services/software-development" className="text-sm text-muted-foreground hover:text-foreground">Software</Link>
            <Link to="/services/data-analytics" className="text-sm text-muted-foreground hover:text-foreground">Data</Link>
            <Link to="/services/devops-cloud" className="text-sm text-muted-foreground hover:text-foreground">DevOps</Link>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Company</h4>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/industries" className="text-sm text-muted-foreground hover:text-foreground">Industries</Link>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">Products</Link>
            <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground">Case Studies</Link>
            <Link to="/workflow" className="text-sm text-muted-foreground hover:text-foreground">Our Workflow</Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Iowa HQ</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              801 Grand Ave<br />
              Des Moines, IA 50309<br />
              <a href="mailto:hello@bluski.io" className="hover:text-foreground">hello@bluski.io</a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Bluski Solutions LLC</span>
          <span className="hidden md:block">41.5868° N · 93.6250° W</span>
        </div>
      </div>
    </footer>
  );
}
