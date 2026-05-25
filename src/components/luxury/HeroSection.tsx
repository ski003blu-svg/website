import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ── Subtle 3D ambient mesh ──────────────────────────── */
function AmbientMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="hsl(42, 60%, 85%)"
          roughness={0.4}
          metalness={0.1}
          distort={0.25}
          speed={1.2}
          transparent
          opacity={0.55}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Stagger word animation ──────────────────────────── */
function WordReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Scroll indicator ────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 text-foreground/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <div className="w-px h-14 overflow-hidden bg-foreground/10">
        <motion.div
          className="w-full bg-foreground/40"
          style={{ height: "50%" }}
          animate={{ y: ["0%", "200%", "0%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[9px] tracking-[0.3em] uppercase font-sans rotate-90 origin-center ml-3">
        Scroll
      </span>
    </motion.div>
  );
}

/* ── Main hero ───────────────────────────────────────── */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mouse parallax for subtle depth
  const mouseX = useSpring(0, { stiffness: 80, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-warm)" }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Ambient gradient blobs */}
      <motion.div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(42 60% 82% / 0.35), transparent 70%)",
          x: mouseX,
          y: mouseY,
        }}
      />
      <motion.div
        className="absolute bottom-0 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(36 30% 88% / 0.4), transparent 70%)",
          x: useTransform(mouseX, (v) => -v * 0.6),
          y: useTransform(mouseY, (v) => -v * 0.6),
        }}
      />

      {/* Subtle 3D scene — positioned right */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-60"
        style={{ y: yCanvas }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[4, 4, 4]} intensity={0.8} color="#fff8f0" />
            <pointLight position={[-3, -2, 2]} intensity={0.6} color="hsl(42,60%,70%)" />
            <AmbientMesh />
            <Sparkles
              count={30}
              scale={6}
              size={1.5}
              speed={0.2}
              color="hsl(42,60%,70%)"
              opacity={0.4}
            />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20 w-full"
        style={{ y: yText, opacity }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-px bg-foreground/30" />
            <span className="text-[11px] tracking-[0.35em] uppercase font-sans text-foreground/50 font-medium">
              Iowa-born · Globally deployed
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] text-foreground font-light mb-10 tracking-tight">
            <div className="overflow-hidden">
              <WordReveal text="Engineered" delay={0.3} />
            </div>
            <div className="overflow-hidden mt-1">
              <WordReveal text="intelligence" delay={0.45} />
            </div>
            <div className="overflow-hidden mt-1 flex items-end gap-4 flex-wrap">
              <WordReveal text="for the" delay={0.6} />
              <motion.span
                className="font-serif italic text-foreground/40 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.8 }}
              >
                enterprise.
              </motion.span>
            </div>
          </h1>

          {/* Descriptor */}
          <motion.p
            className="text-base md:text-lg text-foreground/55 max-w-md leading-relaxed mb-12 font-sans font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            AI, software, and data systems built for organizations that need infrastructure
            to outlast its authors. From Des Moines to the frontier.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-foreground text-background text-[13px] font-medium tracking-wide hover:bg-foreground/85 transition-colors duration-300"
            >
              Start a project
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide text-foreground/70 hover:text-foreground border border-foreground/15 hover:border-foreground/30 transition-all duration-300"
            >
              View our work
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-24 flex flex-wrap gap-x-16 gap-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          {[
            { value: "120+", label: "Production systems" },
            { value: "22ms", label: "Median inference" },
            { value: "8 yrs", label: "Avg. team tenure" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-serif text-4xl md:text-5xl font-light text-foreground tracking-tight">
                {value}
              </div>
              <div className="text-[11px] tracking-[0.25em] uppercase text-foreground/40 mt-1 font-sans">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <ScrollIndicator />
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px luxury-line" />
    </section>
  );
}
