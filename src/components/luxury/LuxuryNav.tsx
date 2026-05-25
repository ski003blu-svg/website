import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { X, Menu } from "lucide-react";

const navItems = [
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "/blog" },
];

function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const isAnchor = href.startsWith("#");

  return isAnchor ? (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative text-[13px] font-medium tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-300 group"
      style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.3s" }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </a>
  ) : (
    <Link
      to={href}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative text-[13px] font-medium tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-300 group"
      style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.3s" }}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </Link>
  );
}

export function LuxuryNav() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const prev = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - prev.current;
    setAtTop(y < 40);
    if (Math.abs(diff) < 6) return;
    setHidden(diff > 0 && y > 100);
    prev.current = y;
  });

  // Close mobile on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3.5 transition-all duration-500"
          style={{
            background: atTop
              ? "transparent"
              : "hsl(0 0% 100% / 0.82)",
            backdropFilter: atTop ? "none" : "blur(20px) saturate(180%)",
            WebkitBackdropFilter: atTop ? "none" : "blur(20px) saturate(180%)",
            boxShadow: atTop ? "none" : "0 2px 40px -8px hsl(20 12% 10% / 0.08), 0 0 0 1px hsl(36 15% 88% / 0.6)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-background opacity-90" />
            </div>
            <span className="font-serif text-base tracking-[0.08em] text-foreground font-light">
              BLUSKI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <MagneticLink key={item.label} href={item.href}>
                {item.label}
              </MagneticLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="relative overflow-hidden group px-5 py-2.5 rounded-full text-[12px] font-medium tracking-wide text-background bg-foreground hover:bg-foreground/90 transition-colors duration-300"
            >
              <span className="relative z-10">Start a project</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden size-9 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-28 px-8 pb-12"
            style={{ background: "hsl(36 15% 97%)" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col gap-8 flex-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-5xl font-serif font-light text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium"
              >
                Start a project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
