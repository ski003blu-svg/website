import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass border-b border-border/60 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.08)]" : "bg-transparent border-b border-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-7 rounded-md bg-primary grid place-items-center shadow-[var(--shadow-elegant)]">
            <div className="size-2 rounded-sm bg-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight text-base">
            BLUSKI<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Consultation
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden size-9 grid place-items-center rounded-md hover:bg-muted"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground py-1"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold"
            >
              Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
